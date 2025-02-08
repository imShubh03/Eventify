import { useEffect, useState, useContext, useCallback } from "react";
import { fetchEvents, attendEvent } from "../services/api";
import AuthContext from "../context/AuthContext";
import { io } from "socket.io-client";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState({ category: "", date: "" });
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_URL, { autoConnect: false });
        socket.connect();

        const loadEvents = async () => {
            try {
                const { data } = await fetchEvents();
                setEvents(data);
                setFilteredEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        loadEvents();

        socket.on("eventUpdated", (updatedEvent) => {
            setEvents((prevEvents) =>
                prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
            );
        });

        return () => {
            socket.off("eventUpdated");
            socket.disconnect();
        };
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));

        let filtered = events;
        if (name === "category" && value.trim()) {
            filtered = events.filter(event => event.category.toLowerCase().includes(value.toLowerCase()));
        } else if (name === "date" && value) {
            filtered = events.filter(event => event.date.startsWith(value));
        }
        setFilteredEvents(filtered);
    };

    const handleAttendEvent = useCallback(async (eventId) => {
        if (!user?.token) {
            alert("Please log in to attend the event.");
            return;
        }

        try {
            await attendEvent(eventId, user.token);
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId ? { ...event, attendees: [...event.attendees, user._id] } : event
                )
            );
        } catch (error) {
            console.error("Failed to attend event:", error);
        }
    }, [user]);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-lg sm:text-2xl font-semibold text-center mb-4">Upcoming Events</h2>

            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <input
                    type="text"
                    name="category"
                    placeholder="Filter by category"
                    value={filter.category}
                    onChange={handleFilterChange}
                    className="border p-2 rounded w-full sm:w-1/2"
                />
                <input
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                    className="border p-2 rounded w-full sm:w-1/2 mt-2 sm:mt-0"
                />
            </div>

            {filteredEvents.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
            ) : (
                filteredEvents.map((event) => (
                    <div key={event._id} className="p-4 border rounded-lg mb-3 shadow-sm bg-white">
                        <h3 className="text-lg font-medium">{event.name}</h3>
                        <p className="text-sm text-gray-700">{event.description}</p>
                        <p className="text-sm"><strong>Attendees:</strong> {event.attendees.length}</p>
                        <button
                            onClick={() => handleAttendEvent(event._id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 text-sm rounded w-full sm:w-auto"
                        >
                            Attend
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;
