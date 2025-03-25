import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import chatRoutes from "./routes/chat.js";

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
app.use("/products", productRoutes);
app.use("/api", chatRoutes);

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
      products: {
        create: "POST /products",
        getAll: "GET /products",
        getOne: "GET /products/:id",
        update: "PUT /products/:id",
        delete: "DELETE /products/:id",
        getSellerProducts: "GET /products/seller/:sellerId",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
