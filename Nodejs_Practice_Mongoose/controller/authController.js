import {
  authCookieName,
  buildAuthCookieOptions,
  createHttpError,
  findUserById,
  loginUser,
  registerUser,
  sanitizeUser,
} from "../services/authService.js";

function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error.";

  return res.status(statusCode).json({ message });
}

export async function register(req, res) {
  try {
    const { user, token } = await registerUser(req.body);
    res.cookie(authCookieName, token, buildAuthCookieOptions());
    return res.status(201).json({
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function login(req, res) {
  try {
    const { user, token } = await loginUser(req.body);
    res.cookie(authCookieName, token, buildAuthCookieOptions());
    return res.json({
      message: "Login successful.",
      user,
    });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function getCurrentUser(req, res) {
  try {
    if (!req.user) {
      throw createHttpError("Unauthorized.", 401);
    }

    const user = await findUserById(req.user._id);

    if (!user) {
      throw createHttpError("User not found.", 404);
    }

    return res.json({
      user: sanitizeUser(user),
    });
  } catch (error) {
    return sendError(res, error);
  }
}

export async function logout(req, res) {
  res.clearCookie(authCookieName, buildAuthCookieOptions());
  return res.json({ message: "Logged out successfully." });
}