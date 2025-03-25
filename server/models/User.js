import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: String, enum: ["buyer", "supplier"], required: true },
  sizeOfIndustry: { type: String },
  productsExpected: [{ type: String }],
  productsOffered: [{ type: String }],
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Ensure both passwords are strings and trimmed
    const hashedPassword = String(this.password).trim();
    const password = String(candidatePassword).trim();
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

const User = mongoose.model("User", userSchema);

export default User;
