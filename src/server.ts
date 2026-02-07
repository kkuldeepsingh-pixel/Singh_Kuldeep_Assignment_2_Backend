import express from "express";
import ticketRoutes from "./api/v1/routes/ticketRoutes";
import healthRoutes from "./api/v1/routes/healthRoutes";

const app = express();

app.use(express.json());

app.use("/api/v1", healthRoutes);
app.use("/api/v1", ticketRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
