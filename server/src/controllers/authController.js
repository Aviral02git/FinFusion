const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // ✅ make sure environment variables load

const prisma = new PrismaClient();

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    //  Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({
      message: "Login successful",
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
