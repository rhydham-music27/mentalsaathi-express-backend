import crypto from "node:crypto"
import { config } from "dotenv";
import razorpay from '../config/razorpay.config.js';
config()
export const verifyPaymentController = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // ✅ Payment is verified
        // 👉 Save to DB, mark user as paid, unlock MindCheck etc.
        return res.status(200).json({ success: true, message: "Payment Verified" });
    } else {
        // ❌ Invalid signature — possible fraud
        return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
}
export const createOrderController = async (req, res) => {
    try {
        const amount = 20 * 100; // ₹20 in paise
        const currency = "INR";

        const options = {
            amount: amount,
            currency: currency,
            receipt: "receipt_" + Date.now(),
            payment_capture: 1, // auto-capture payment
        };

        const order = await razorpay.orders.create(options);

        console.log("Order created:", order);

        res.status(200).json(order); // Send to frontend
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
}