import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendTemplate(req, res) {
  const phoneNumber = req.params.number;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${process.env.Version}/${process.env.PhoneNumberID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "template",
        template: {
          name: "get_started", 
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://cataas.com/cat/says/Ayya%20Namaskaaram?fontSize=40&color=white&unique=" + Date.now()
                  }
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ 'get_started' template sent:", response.data);
    res.status(200).json({ success: true, data: response.data });

  } catch (err) {
    console.error("❌ Failed to send:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
}
