// // server.ts
// import express from "express";
// import cors from "cors";

// import authRoutes from "./routes/auth.route";
// import testRoutes from "./routes/route"; // DB test route

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// app.use(express.json());

// /* ROUTES */
// app.use("/api/auth", authRoutes);
// app.use("/api", testRoutes);

// /* ROOT */
// app.get("/", (req, res) => {
//   res.send("API running");
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import { env } from "./config/env"; // Import your validated env
import authRoutes from "./routes/auth.route";
import testRoutes from "./routes/route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);

/* ROOT */
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = env.PORT; // Use the variable from your config

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
