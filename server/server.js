import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Root route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the API",
    endpoints: {
      auth: {
        register: "POST /auth/register",
        login: "POST /auth/login",
        profile: "GET /auth/profile/:userId",
        updateProfile: "PUT /auth/profile/:userId",
      },
      posts: {
        create: "POST /posts",
        getAll: "GET /posts",
        getOne: "GET /posts/:id",
        update: "PUT /posts/:id",
        delete: "DELETE /posts/:id",
        addComment: "POST /posts/:id/comments",
        like: "POST /posts/:id/like",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
