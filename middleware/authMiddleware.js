import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../app/modules/auth/User.model.js";
// const base64url = require('base64url');
const { verify } = jwt;

// Function to validate Base64Url encoded strings
function isValidBase64Url(str) {
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
  return base64UrlRegex.test(str);
}

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    // Validate token structure
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid token structure" });
    }

    // Validate each part of the token
    const [headerPart, payloadPart, signaturePart] = tokenParts;
    if (
      !isValidBase64Url(headerPart) ||
      !isValidBase64Url(payloadPart) ||
      !isValidBase64Url(signaturePart)
    ) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid token format" });
    }

    try {
      // Verify the token
      const decoded = verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ status: 401, message: "Not authorized" });
      }

      // Attach the user to the request object
      req.employee = await User.findById(decoded?._id).select("-password -__v");

      next();
    } catch (error) {
      console.error("Error during token verification:", error);
      return res.status(401).json({ status: 401, message: "Not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ status: 401, message: "Not authorized, no token" });
  }
});

const protectByLevel = asyncHandler(async (req, res, next) => {
  if (req.employee?.level === "admin") {
    next();
  } else {
    res.send({ status: 400, message: "You have to must be admin" });
  }
});

const protectByDesignations = asyncHandler(async (req, res, next) => {
  if (req.employee?.desigantions === "sbuManager") {
    next();
  } else {
    res.send({ status: 400, message: "You have an designation" });
  }
});

export { protect, protectByLevel, protectByDesignations };
