const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const path = require("path");


app.use(cors());
app.use(express.json());

// Get all products
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, password } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email, password } });
  if (user) res.json(user);
  else res.status(401).json({ error: "Invalid credentials" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));