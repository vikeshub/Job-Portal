import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // If no token is found in the cookies, return an error response
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // If decoded token is valid, attach the user ID to the request
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error);

        // Handle expired token separately
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired, please log in again",
                success: false,
            });
        }

        // Handle any other errors (like invalid token signature)
        return res.status(401).json({
            message: "Invalid token",
            success: false,
        });
    }
};

export default isAuthenticated;
