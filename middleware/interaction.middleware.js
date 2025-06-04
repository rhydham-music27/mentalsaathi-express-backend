// middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const formRateLimiter = rateLimit({
    windowMs: 0.25 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 5 requests per windowMs
    message: {
        status: 429,
        message: "Too many submissions from this IP, please try again later.",
    },
});
