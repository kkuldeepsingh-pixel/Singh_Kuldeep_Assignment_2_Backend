import express from "express";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app = express();
app.use(express.json());

app.use("/api/v1", ticketRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
