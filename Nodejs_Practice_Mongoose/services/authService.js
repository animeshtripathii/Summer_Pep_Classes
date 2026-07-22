import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authCookieName = "authToken";
const authCookieMaxAge = 7 * 24 * 60 * 60 * 1000;

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw createHttpError("JWT_SECRET is not configured.", 500);
  }

  return secret;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function createToken(user) {
  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
}

export function buildAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authCookieMaxAge,
  };
}

export function sanitizeUser(user) {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

export async function registerUser(data) {
  const { firstName, lastName, email, password, role } = data;

  if (!firstName || !lastName || !email || !password) {
    throw createHttpError("All fields are required.", 400);
  }

  const cleanedFirstName = firstName.trim();
  const cleanedLastName = lastName.trim();
  const cleanedEmail = normalizeEmail(email);
  const cleanedPassword = password.trim();

  if (!cleanedFirstName || !cleanedLastName || !cleanedEmail || !cleanedPassword) {
    throw createHttpError("All fields must be filled in.", 400);
  }

  const existingUser = await User.findOne({ email: cleanedEmail });

  if (existingUser) {
    throw createHttpError("User already exists with this email.", 409);
  }

  const hashedPassword = await bcrypt.hash(cleanedPassword, 10);
  const createdUser = await User.create({
    firstName: cleanedFirstName,
    lastName: cleanedLastName,
    email: cleanedEmail,
    password: hashedPassword,
    role,
  });

  return {
    user: sanitizeUser(createdUser),
    token: createToken(createdUser),
  };
}

export async function loginUser(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw createHttpError("Email and password are required.", 400);
  }

  const cleanedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanedEmail });

  if (!user) {
    throw createHttpError("Invalid email or password.", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError("Invalid email or password.", 401);
  }

  return {
    user: sanitizeUser(user),
    token: createToken(user),
  };
}

export async function findUserById(userId) {
  return User.findById(userId).select("-password");
}

export { authCookieName, createHttpError };