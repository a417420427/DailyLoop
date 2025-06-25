import axios from 'axios';

export class AIService {
  static async generateText(prompt: string): Promise<string> {
    // 以 OpenAI 为例（你可以替换成其他服务）
    const apiKey = process.env.OPENAI_API_KEY; 

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data.choices[0].message.content.trim();
    return result;
  }
}
