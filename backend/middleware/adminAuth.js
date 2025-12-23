import jwt from "jsonwebtoken";

const isAdminLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token; // CORRECT

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Compare token email + password to ENV values
    if (
      decoded.email !== process.env.ADMIN_EMAIL ||
      decoded.password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({ message: "Not authorized, login again" });
    }

    // Attach admin data if needed
    req.admin = { email: decoded.email };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAdminLoggedIn;
