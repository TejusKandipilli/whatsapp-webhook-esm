import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

function buildHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
}

// 🔹 Base WhatsApp Send Function
async function sendCatImage(phoneNumber, imageUrl, res) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${process.env.Version}/${process.env.PhoneNumberID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'image',
        image: {
          link: imageUrl,
        },
      },
      buildHeaders()
    );

    console.log('✅ Message sent:', response.data);
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error('❌ Failed to send:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
}

// 🔹 1. Hello Cat
export async function sendHelloCat(req, res) {
  const phoneNumber = req.params.number;
  const rand = Math.random().toString(36).substring(7);
  const url = `https://cataas.com/cat/says/hello?unique=${rand}`;
  await sendCatImage(phoneNumber, url, res);
}

// 🔹 2. Custom Text Cat
export async function sendCustomCat(req, res) {
  const phoneNumber = req.params.number;
  const text = encodeURIComponent(req.params.text);
  const rand = Math.random().toString(36).substring(7);
  const url = `https://cataas.com/cat/says/${text}?unique=${rand}`;
  await sendCatImage(phoneNumber, url, res);
}

// 🔹 3. Random Cat (no text)
export async function sendRandomCat(req, res) {
  const phoneNumber = req.params.number;
  const rand = Math.random().toString(36).substring(7);
  const url = `https://cataas.com/cat?unique=${rand}`;
  await sendCatImage(phoneNumber, url, res);
}

// 🔹 4. Cat with Filter (mono, sepia, blur, etc.)
export async function sendCatWithFilter(req, res) {
  const phoneNumber = req.params.number;
  const filter = req.params.filter;
  const rand = Math.random().toString(36).substring(7);
  const url = `https://cataas.com/cat/says/Hi?filter=${filter}&unique=${rand}`;
  await sendCatImage(phoneNumber, url, res);
}

// 🔹 5. Cat GIF
export async function sendCatGif(req, res) {
  const phoneNumber = req.params.number;
  const rand = Math.random().toString(36).substring(7);
  const url = `https://cataas.com/cat/gif?unique=${rand}`;
  await sendCatImage(phoneNumber, url, res);
}
