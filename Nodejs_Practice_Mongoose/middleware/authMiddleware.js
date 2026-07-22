import jwt from "jsonwebtoken";
import User from "../models/User.js";

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw createHttpError("JWT_SECRET is not configured.", 500);
    }

    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please log in again." });
    }

    req.user = user;
    req.auth = payload;
    return next();
  } catch (error) {
    const statusCode = error.statusCode || 401;
    const message = statusCode === 500 ? error.message : "Unauthorized. Please log in again.";
    return res.status(statusCode).json({ message });
  }
}