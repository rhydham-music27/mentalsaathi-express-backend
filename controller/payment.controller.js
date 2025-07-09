import { config } from "dotenv";

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