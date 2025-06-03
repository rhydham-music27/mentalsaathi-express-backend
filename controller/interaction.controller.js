import contactusModel from "../models/contactus.model.js"
import getintouchModel from "../models/getintouch.model.js"
import waitinglistModel from "../models/waitinglist.model.js"
import emailTransporter from "../utils/email.utils.js"

export const waitingListController = async (request, response) => {
    const { email } = request.body
    if (!email) return response.status(400)
        .send({
            message: "email is not entered", success: false
        })
    try {
        const existingUser = await waitinglistModel.findOne({ email })
        if (existingUser) return response.status(409)
            .send({
                message: "you are already on our waiting list",
                success: false
            })
        const adminMailOptions = {
            from: '"rhydham937@gmail.com',
            to: "rhydham937@gmail.com", // your admin email
            subject: `🧠 New Waiting List Entry`,
            text: `A new user has joined the Mental Saathi waiting list.\n\nEmail: ${email}\n\nTime to welcome a future Saathi!`,
        };
        const userMailOptions = {
            from: 'rhydham937@gmail.com',
            to: email, // user email from form
            subject: "🎉 You're on the Mental Saathi Waiting List!",
            text: `Hi n\nThank you for joining the Mental Saathi waiting list!\nWe'll notify you as soon as we launch.\n\nUntil then, take care of your mind and soul. 💙\n\n- Team Mental Saathi`,
        }
        const user = await new waitinglistModel({ email: email }).save()

        await emailTransporter.sendMail(adminMailOptions)
        await emailTransporter.sendMail(userMailOptions)
        response.status(200)
            .send({
                success: true,
                message: "congrats you joined our waiting list",
                email: user.email
            })

    } catch (error) {
        console.log(error)
        response.status(503)
            .send({ message: "database server unreachable", success: false })

    }
}

export const contactUsController = async (request, response) => {
    const { name, email, phone, subject, message } = request.body
    if (!name) return response.status(400).send({
        success: false,
        message: "enter your name"
    })
    if (!email) return response.status(400).send({
        success: false,
        message: "enter your email"
    })
    if (!phone) return response.status(400).send({
        success: false,
        message: "enter your phone"
    })
    if (!subject) return response.status(400).send({
        success: false,
        message: "enter your subject"
    })
    if (!message) return response.status(400).send({
        success: false,
        message: "enter your message"
    })
    const userMailOptions = {
        from: 'rhydham937@gmail.com',
        to: email,
        subject: `Thank You for Reaching Out to Mental Saathi 💙`,



        text: `Dear ${name} ,

Thank you for getting in touch with us through the Mental Saathi Contact Us form. We’ve received your message and truly appreciate you taking the time to reach out.

Our team is currently reviewing your query, and we’ll get back to you as soon as possible — usually within 24 to 48 hours. Your thoughts, questions, and concerns are important to us, and we're here to support you every step of the way.

If your message was urgent or related to mental health support, please consider exploring our resources section or speaking to a certified professional listed on our platform. You’re not alone — we’re here for you.

In the meantime, feel free to explore our community stories, wellness tips, or upcoming support events on our website and social channels.

With warmth and care,
Team Mental Saathi
    `
    }
    const adminMailOptions = {
        from: 'rhydham937@gmail.com',
        to: 'rhydham937@gmail.com',

        subject: `New Contact Form Submission on Mental Saathi`,



        text: `Hey Rhydham,

A new user just submitted the Contact Us form on the Mental Saathi website. Here are the details:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}

Please review their message and get back to them within 24–48 hours if needed. You can reply directly to their email or follow up through your support dashboard.

Keep being the Saathi people need. 💙

— Mental Saathi Notification System
    `
    }
    try {
        const data = new contactusModel({ name, email, phone, subject, message }).save()
        await emailTransporter.sendMail(userMailOptions)
        await emailTransporter.sendMail(adminMailOptions)
        response.status(200).send({
            message: "email sent succesfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        response.status(503).send({
            message: error, success: false
        })
    }

}
export const getInTouchController = async (request, response) => {
    const { name, email, phone, role, institution } = request.body
    if (!name) return response.status(400).send({
        message: "enter your name",
        success: false
    })
    if (!email) return response.status(400).send({
        message: "enter your email",
        success: false
    })
    if (!phone) return response.status(400).send({
        message: "enter your phone",
        success: false
    })
    if (!role) return response.status(400).send({
        message: "enter your role",
        success: false
    })
    if (!institution) return response.status(400).send({
        message: "enter your institution",
        success: false
    })
    const userMailOptions = {
        from: 'rhydham937@gmail.com',
        to: email,
        subject: `Thank You for Getting in Touch with Mental Saathi 💬
`, text: `Dear ${name}

Thank you for reaching out through our Get In Touch form. We've received your message and are glad you chose to connect with us.

Our team will review your submission and respond shortly if a reply is required. Whether it’s feedback, a collaboration idea, or just a kind hello — it means a lot to us.

In the meantime, feel free to explore our platform for resources, community stories, and wellness tools designed to support you on your journey.

Warm regards,
Team Mental Saathi`
    }
    const adminMailOptions = {
        from: 'rhydham937@gmail.com',
        to: 'rhydham937@gmail.com',
        subject: `📥 New "Get In Touch" Submission on Mental Saathi`,

        text:

            `Hey Rhydham,

Someone just filled out the Get In Touch form on the site. Here are their details:

Name:${name}
Email: ${email}
Phone: ${phone}
role:${role}
institution:${institution}

Please review and follow up as needed. This could be a potential user, partner, or supporter — so handle with your usual Saathi-level empathy and fire. 🔥

— Your Mental Saathi Notification Bot 🤖`
    }
    try {
        const getintouchuser = await new getintouchModel({ name, email, phone, role, institution }).save()
        await emailTransporter.sendMail(userMailOptions)
        await emailTransporter.sendMail(adminMailOptions)
        return response.status(200).send({
            message: "email sent succesfully",
            success: true,
            id: getintouchuser._id
        })
    } catch (error) {
        console.log(error)
        return response.status(503).send({
            message: "email not sent due to server side issues",
            success: false,
            error
        })
    }
}