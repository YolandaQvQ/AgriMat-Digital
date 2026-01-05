
import { GoogleGenAI, Type } from "@google/genai";

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
 * Uses Gemini 3 Flash to predict material performance based on input parameters.
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
    // Initializing with the system-provided API key directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Use recommended model for text tasks
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
          required: ["lifespan", "efficiency", "riskAnalysis", "maintenanceAdvice"]
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as PredictionResult;
    } else {
      throw new Error("No data returned from AI");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getMockData();
  }
};

const getMockData = (): PredictionResult => ({
  lifespan: 1000,
  efficiency: 85,
  riskAnalysis: "由于环境配置或API调用问题，显示模拟数据。高温高湿环境下存在疲劳断裂风险。",
  maintenanceAdvice: "建议每200小时检查一次表面裂纹。",
});