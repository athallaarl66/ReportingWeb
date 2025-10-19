import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import exampleRoutes from "./routes/exampleroutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ini penting, pastikan path-nya sesuai
app.use("/api", exampleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
