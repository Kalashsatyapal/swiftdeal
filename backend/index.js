require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");
const bcrypt = require("bcrypt");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Register Admin
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, role: "admin" },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login Admin
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({ user }); // Send session token here in production
});

// Get Products (filtered)
app.get("/api/products", async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  const filters = {};
  if (category) filters.category = category;
  if (minPrice || maxPrice) filters.price = {
    gte: parseFloat(minPrice) || 0,
    lte: parseFloat(maxPrice) || Infinity,
  };

  const products = await prisma.product.findMany({ where: filters });
  res.json(products);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
