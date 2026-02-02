// auth.controler.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users: any[] = []; // TEMP (replace with DB later)

export const register = async (req: any, res: any) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }



  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET || "fallback_secret",
  { expiresIn: "7d" }
);


  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
