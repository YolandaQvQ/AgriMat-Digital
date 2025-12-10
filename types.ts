

export interface ChemicalComposition {
  [key: string]: string; // Allow dynamic keys like C, Si, Mn OR Fe, Cu, Mg
}

export interface MechanicalProperties {
  [key: string]: string; // Allow dynamic keys like YS, TS, AKv OR Hardness, Friction
}

export interface Material {
  id: string;
  name: string;
  category: string; // '钢材' | '铝合金' | '涂层材料'
  shape?: string; // 产品形态 / 材料形态
  grade?: string; // 标准牌号
  standard?: string; // 适用标准
  productCategory?: string; // Used for generic grouping if needed
  process?: string; // 加工工艺 / 制备工艺
  
  // Specific filter fields
  supplyCondition?: string; // 供货状态 (For Steel/Aluminum)
  materialSystem?: string; // 材料体系 (For Coatings: 铁基/镍基...)
  
  description: string;
  
  // Property Groups
  chemicalComposition: ChemicalComposition; // 化学成分 / 主要成分
  mechanicalProperties: MechanicalProperties; // 力学性能 / 涂层耐磨性能
  physicalProperties?: Record<string, string>; // 物理性能 (密度, 泊松比 / 熔点, 显微硬度)
  thermalProperties?: Record<string, string>; // 热性能 (导热率, 比热容, 线膨胀系数, 熔点)
  characteristicProperties?: Record<string, string>; // 材料特性 (for coatings: particle size etc.)
  
  // Specific performance text
  wearResistance?: string; // 耐磨性能
  corrosionResistance?: string; // 耐腐蚀性

  applicationParts: string[];
  imageUrl: string;
}

export interface Part {
  id: string;
  name: string;
  category?: string;
  materialId: string;
  materialName: string;
  // Denormalized references for easier UI access without lookups
  equipment?: Equipment; 
  materialDetail?: Material;
}

export interface Equipment {
  id: string;
  name: string;
  category: string; // Major category: 农用动力机械, 农用搬运机械, etc.
  type: string;    // Sub category: 拖拉机, 挖掘机械, etc.
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
  // New field for data icons visualization
  resultMetrics?: Record<string, { value: string; unit: string; trend?: 'up' | 'down' | 'neutral' }>;
}

export interface Experiment {
  id: string;
  testCode: string; // e.g. EXP-2023-001
  title: string;
  type: '力学测试' | '耐久性测试' | '环境测试' | '物理性能';
  materialName: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Pending';
  standard: string; // e.g. GB/T 228.1
  operator: string;
  
  // Test Conditions
  conditions: Record<string, string>; // e.g. { Temperature: '25C', Rate: '2mm/min' }
  
  // Key Results
  results: Record<string, string>; // e.g. { Rm: '980MPa', A: '12%' }
  
  // Chart Data (Optional)
  chartType?: 'line' | 'bar';
  chartData?: any[]; // Array of objects for Recharts
  chartConfig?: { xKey: string; yKey: string; xLabel: string; yLabel: string };
  
  imageUrl?: string; // Photo of the specimen
}

export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  content?: string; // Full article content
  date: string;
  imageUrl: string;
  tags: string[];
}

export enum AuthStatus {
  GUEST,
  AUTHENTICATED
}

export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}