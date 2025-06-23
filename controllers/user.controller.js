import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function sendTemplate(req, res) {
  const phoneNumber = req.params.number;
  const name = req.query.name || 'there';

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${process.env.Version}/${process.env.PhoneNumberID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
          name: 'get_started', // your approved template name
          language: {
            code: 'en_US'
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: name // This replaces {{1}} in the template
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Template message sent:', response.data);
    res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    console.error('❌ Failed to send template:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
}
