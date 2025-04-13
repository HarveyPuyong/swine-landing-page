import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import rateLimit from "express-rate-limit";
import appointmentModel from "./models/appointment.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connection
mongoose.connect("mongodb://localhost:27017/swineguard_db", { useNewUrlParser: true, useUnifiedTopology: true });

// For my landing page only
const appointmentLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `windowMs`
    message: {
      status: 429,
      error: "Too many appointment requests, please try again later."
    }
});

// Appointment route
app.post('/appointment', appointmentLimiter, (req, res) => {
    appointmentModel.create(req.body)
        .then(appointmentRequest => res.json(appointmentRequest))
        .catch(err => res.json(err));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});