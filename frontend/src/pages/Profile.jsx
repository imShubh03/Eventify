import { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventCard from "../components/EventCard.jsx";

const Profile = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const { data } = await fetchEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
                All Events
            </h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : events.length === 0 ? (
                <p className="text-center">No events found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
