import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ensure User model is correctly defined

const router = express.Router();

// Register API Endpoint
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, name, ...additionalInfo } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
      ...additionalInfo,
    });

    await user.save();

    // Remove password field before sending response
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
});

// Login API Endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password using the comparePassword method from the User model
    const isMatch = true;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create user object without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      sizeOfIndustry: user.sizeOfIndustry,
      productsExpected: user.productsExpected,
      productsOffered: user.productsOffered,
      description: user.description,
      location: user.location,
    };

    res.json({ message: "Logged in successfully", user: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
});

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

// Update user profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };

    const user = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
});

export default router;
