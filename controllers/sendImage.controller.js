import { getCat } from "../lib/getCat.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendHelloCat(req, res) {
  try {
    const phoneNumber = req.params.number;
    const catImage = await getCat(); // Make sure this returns a valid image URL

    const response = await axios.post(
      `https://graph.facebook.com/${process.env.Version}/${process.env.PhoneNumberID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'image',
        image: {
          link: catImage,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Message sent:', response.data);
    res.status(200).json({ success: true, data: response.data });

  } catch (err) {
    console.error('❌ Failed to send:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
}
