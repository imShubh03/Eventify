import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import eventRoutes from "./routes/event.route.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";

dotenv.config();
connectDB();

const _dirname = path.resolve()

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);


io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("joinEvent", (eventId) => socket.join(eventId));
    socket.on("leaveEvent", (eventId) => socket.leave(eventId));
    socket.on("disconnect", () => console.log("Client disconnected"));
});

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
