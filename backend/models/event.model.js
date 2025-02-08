import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        date: { 
            type: Date, 
            required: true, 
            validate: {
                validator: (value) => value >= new Date(),
                message: "Event date must be in the future."
            }
        },
        attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
