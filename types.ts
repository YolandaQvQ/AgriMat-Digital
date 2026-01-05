
export interface Material {
  id: string;
  name: string; // 材料名称 (如: 超高强韧抗疲劳可焊接铝基复合材料)
  grade: string; // 材料牌号 (如: TiB2/Al-Zn-Mg-Cu)
  process: string; // 热处理/制备工艺 (如: 870淬火+200回火)
  category: '钢材' | '铝合金' | '涂层材料';
  
  // 化学成分 (wt.%)
  composition: Record<string, string>; 
  
  // 力学性能
  mechanicalProperties: Record<string, string>;
  
  // 专项性能 (耐磨/腐蚀/备注)
  specialProperties: Record<string, string>;

  description: string;
  imageUrl: string;
  applicationParts: string[];

  // 扩展属性，用于详情对比
  standard?: string;
  shape?: string;
  supplyCondition?: string;
  wearResistance?: string;
  corrosionResistance?: string;
  
  // 保持与旧组件兼容的结构
  technicalSpecifications: {
    '基本信息': Record<string, string>;
    '化学成分': Record<string, string>;
    '力学性能': Record<string, string>;
    '专项性能': Record<string, string>;
    '物理性能'?: Record<string, string>;
    '热性能'?: Record<string, string>;
  };
}

export interface Part {
  id: string;
  name: string;
  materialId: string;
  materialName: string;
  category?: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  type: string;
  model: string;
  description: string;
  imageUrl: string;
  parts: Part[];
}

export interface SimulationModel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  specs: Record<string, string>;
  resultMetrics?: Record<string, { value: string; unit: string; trend?: 'up' | 'down' | 'neutral' }>;
}

export interface Experiment {
  id: string;
  testCode: string;
  title: string;
  type: string;
  materialName: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Pending';
  standard: string;
  operator: string;
  conditions: Record<string, string>;
  results: Record<string, string>;
  // 实验数据可视化扩展
  chartData?: any[];
  chartType?: 'line' | 'bar';
  chartConfig?: { xKey: string; yKey: string; xLabel: string; yLabel: string; };
  imageUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  tags: string[];
  content?: string;
}
