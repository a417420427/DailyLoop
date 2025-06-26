import dotenv from "dotenv";

const config = dotenv.config().parsed || {};

const PLATFORM_HOT_WORDS: Record<string, string[]> = {
  淘宝: ["正品保障", "爆款热卖", "官方旗舰"],
  拼多多: ["百亿补贴", "限时秒杀", "拼单立减"],
  京东: ["自营正品", "京东配送", "次日达"],
};

const HOT_WORDS = [
  "爆款",
  "正品保障",
  "次日达",
  "新品",
  "限时抢购",
  "包邮",
  "热销",
  "优惠",
  "好评如潮",
  "官方旗舰店",
];

export class DeepSeekService {
  static async generateText(prompt: string): Promise<string> {
    const apiKey = config.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error("Missing DEEPSEEK_API_KEY");

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat", // 确认 DeepSeek 的模型名称
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  static async generateProductTitles(options: {
    productName: string;
    productPoints: string;
    targetAudience?: string;
    platform: "淘宝" | "拼多多" | "京东";
    tone: "官方" | "亲切" | "潮流";
  }): Promise<string> {
    const { productName, productPoints, targetAudience, platform, tone } =
      options;

    const hotWords = PLATFORM_HOT_WORDS[platform].join("、");
    const audiencePart = targetAudience ? `目标人群是 ${targetAudience}。` : "";

    const prompt = `
请基于以下信息生成 3 到 5 个 20-30 字的电商商品标题，标题应适合${platform}平台风格，包含其常用热词（例如：${hotWords}），符合${tone}语气，突出卖点，吸引用户点击。

商品名称：${productName}
主要卖点：${productPoints}
${audiencePart}

每个标题单独换行输出。不要额外说明或解释。
    `.trim();

    return await this.generateText(prompt);
  }

  static async extractKeyPoints(description: string): Promise<string> {
    const prompt = `
请基于以下商品特性描述，自动提炼3到5个简洁、精准的关键卖点。卖点适合用于电商推广，可中英文输出。

商品描述：
${description}

请每条卖点单独换行输出，不要额外说明。
    `.trim();

    return await this.generateText(prompt);
  }

  /**
   * 根据商品特性和卖点，生成完整详情页主文案
   */
  static async generateDetailPageCopy(params: {
    productFeatures: string;
    keyPoints: string; // 可手工补充或自动生成的卖点
  }): Promise<string> {
    const prompt = `
请根据以下商品特性和卖点，生成一段适合电商详情页图文详情模块的完整主文案。文案要吸引人且逻辑清晰。

商品特性：
${params.productFeatures}

卖点：
${params.keyPoints}

请输出一段连续流畅的中文推广文案。
    `.trim();

    return await this.generateText(prompt);
  }

  static async embedHotWords(params: {
    titles: string[];
    keyPoints: string[];
  }): Promise<{ titles: string[]; keyPoints: string[] }> {
    // 简单示例：用 prompt 让模型帮你调整，也可以自己写逻辑
    const prompt = `
请帮我将以下电商热词：${HOT_WORDS.join(
      "，"
    )}，合理地嵌入到这些商品标题和卖点中，使它们更具吸引力和销售力。

商品标题：
${params.titles.join("\n")}

卖点：
${params.keyPoints.join("\n")}

请返回嵌入关键词后的标题和卖点，格式如下：

标题：
1. ...
2. ...
...

卖点：
1. ...
2. ...
...
    `.trim();

    const rawResult = await this.generateText(prompt);

    // 简单解析结果，提取标题和卖点，返回数组
    // 这里做了简单分割，你可以根据实际结果优化
    const [titlesPart, keyPointsPart] = rawResult.split("卖点：");

    const titlesRaw = titlesPart.replace(/^标题：/, "").trim();
    const titles = titlesRaw
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    const keyPointsRaw = keyPointsPart.trim();
    const keyPoints = keyPointsRaw
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    return { titles, keyPoints };
  }
}
