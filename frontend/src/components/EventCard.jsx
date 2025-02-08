import React, { useState } from "react";

const EventCard = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="event-card border p-4 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p className="text-gray-600">{event.description}</p>

            {showDetails && <EventDetails event={event} />}

            <button 
                onClick={() => setShowDetails(!showDetails)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {showDetails ? "Hide Details" : "Show More"}
            </button>
        </div>
    );
};

const EventDetails = ({ event }) => (
    <div className="mt-2 text-sm text-gray-700">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Category:</strong> {event.category || "General"}</p>
        <p><strong>Created By:</strong> {event.createdBy?.name || "Unknown"}</p>
    </div>
);

export default EventCard;
