import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/auth.route";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
