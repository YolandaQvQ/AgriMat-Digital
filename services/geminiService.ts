

import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini API
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    // Safety check for browser environments where process might not be defined
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    if (!apiKey) {
      console.warn("API Key not found in process.env. AI features will use mock data.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export interface PredictionInput {
  materialType: string;
  environment: string; // e.g., 'humid', 'dry', 'high-load'
  temperature: number;
  load: number;
}

export interface PredictionResult {
  lifespan: number;
  efficiency: number;
  riskAnalysis: string;
  maintenanceAdvice: string;
}

/**
 * Uses Gemini 2.5 to predict material performance based on input parameters.
 * Returns structured JSON data for visualization.
 */
export const predictPerformance = async (input: PredictionInput): Promise<PredictionResult> => {
  const prompt = `
    作为农机材料专家，请根据以下工况预测材料性能：
    材料类型: ${input.materialType}
    环境条件: ${input.environment}
    工作温度: ${input.temperature}°C
    负载: ${input.load} kN

    请基于物理模型逻辑进行估算，并以JSON格式返回以下数据：
    1. lifespan (预期寿命，单位小时，数字)
    2. efficiency (预期工作效率保持率，0-100，数字)
    3. riskAnalysis (风险分析，简短文本)
    4. maintenanceAdvice (维护建议，简短文本)
  `;

  try {
    const client = getAI();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lifespan: { type: Type.NUMBER },
            efficiency: { type: Type.NUMBER },
            riskAnalysis: { type: Type.STRING },
            maintenanceAdvice: { type: Type.STRING },
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as PredictionResult;
    } else {
      throw new Error("No data returned from AI");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data in case of API failure (graceful degradation)
    return {
      lifespan: 1000,
      efficiency: 85,
      riskAnalysis: "API调用失败，显示模拟数据。高温高湿环境下存在疲劳断裂风险。",
      maintenanceAdvice: "建议每200小时检查一次表面裂纹。",
    };
  }
};