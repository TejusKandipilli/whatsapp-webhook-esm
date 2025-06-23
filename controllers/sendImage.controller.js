import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendHelloCat(req, res) {
  try {
    const phoneNumber = req.params.number;

    // 🔄 Step 1: Get a unique cat image ID with text
    const catRes = await axios.get('https://cataas.com/cat/says/hello?json=true');
    const catId = catRes.data._id;
    const catImageUrl = `https://cataas.com/cat/${catId}`;

    // 📨 Step 2: Send the image to WhatsApp
    const response = await axios.post(
      `https://graph.facebook.com/${process.env.Version}/${process.env.PhoneNumberID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'image',
        image: {
          link: catImageUrl,
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
