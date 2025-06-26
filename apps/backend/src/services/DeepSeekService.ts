import dotenv from "dotenv";

const config = dotenv.config().parsed || {};

export class DeepSeekService {
  static async generateText(prompt: string): Promise<string> {
    const apiKey = config.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error('Missing DEEPSEEK_API_KEY');

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',  // 确认 DeepSeek 的模型名称
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }
}
