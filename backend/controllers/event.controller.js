import Event from "../models/event.model.js";

export const createEvent = async (req, res) => {
    try {
        

        const { name, description, date } = req.body;
        if (!name || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const event = new Event({ name, description, date, createdBy: req.user._id });
        await event.save();

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("createdBy", "name")
            .populate("attendees", "name")
            .lean();

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const attendEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const attendeesSet = new Set(event.attendees.map(String));
        if (!attendeesSet.has(req.user._id.toString())) {
            event.attendees.push(req.user._id);
            await event.save();
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Ensure only the creator can delete the event
        if (event.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this event" });
        }

        await event.deleteOne(); // Delete the event
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
