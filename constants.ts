
import { Material, Equipment, SimulationModel, CaseStudy, Experiment } from './types';

export const MATERIALS: Material[] = [
  // ==========================================
  // 1. Steel (钢材)
  // ==========================================
  {
    id: 'm1',
    name: '高强度合金钢',
    grade: '40Cr',
    standard: 'GB/T 3077-2015',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '淬火+回火',
    process: '锻造',
    description: '具有良好的综合力学性能，广泛用于制造齿轮、轴类零件。',
    chemicalComposition: { C: '0.40', Si: '0.27', Mn: '0.65', P: '0.03', S: '0.03', Cr: '0.90', Ni: '0.02', Mo: '0.02', Cu: '0.02', Fe: '余量' },
    physicalProperties: { '密度': '7.82 g/cm³', '泊松比': '0.28' },
    mechanicalProperties: { '弹性模量': '210 GPa', '屈服强度': '785 MPa', '抗拉强度': '980 MPa', '断后伸长率': '9%', '断面收缩率': '45%', '冲击功': '47 J' },
    thermalProperties: { '导热率': '46.6 W/(m·K)', '比热容': '460 J/(kg·K)', '线膨胀系数': '11.5 µm/(m·K)', '熔点': '1420°C' },
    wearResistance: '中等耐磨性，表面淬火后可显著提高。',
    applicationParts: ['传动轴', '齿轮', '连杆'],
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'm4',
    name: '高强度弹簧钢',
    grade: '65Mn',
    standard: 'GB/T 1222-2007',
    category: '钢材',
    shape: '线材',
    supplyCondition: '退火',
    process: '热处理',
    description: '具有优良的弹性、淬透性和耐磨性，广泛用于制造各种弹簧。',
    chemicalComposition: { C: '0.65', Si: '0.27', Mn: '1.00', P: '0.03', S: '0.03', Cr: '0.20', Fe: '余量' },
    physicalProperties: { '密度': '7.81 g/cm³', '泊松比': '0.29' },
    mechanicalProperties: { '弹性模量': '206 GPa', '屈服强度': '430 MPa', '抗拉强度': '735 MPa', '断后伸长率': '15%', '断面收缩率': '30%', '冲击功': '-' },
    thermalProperties: { '导热率': '48 W/(m·K)', '比热容': '460 J/(kg·K)', '线膨胀系数': '11.8 µm/(m·K)', '熔点': '1450°C' },
    wearResistance: '硬度高，耐磨性好。',
    applicationParts: ['减震弹簧', '离合器膜片'],
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 'm7',
    name: '优质碳素结构钢',
    grade: '45#',
    standard: 'GB/T 699-2015',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '正火',
    process: '锻造',
    description: '常用的中碳调质钢，强度较高，切削加工性良好。',
    chemicalComposition: { C: '0.45', Si: '0.20', Mn: '0.60', P: '0.03', S: '0.03', Cr: '0.15', Ni: '0.10', Cu: '0.10', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³', '泊松比': '0.30' },
    mechanicalProperties: { '弹性模量': '200 GPa', '屈服强度': '355 MPa', '抗拉强度': '600 MPa', '断后伸长率': '16%', '断面收缩率': '40%', '冲击功': '39 J' },
    thermalProperties: { '导热率': '45 W/(m·K)', '比热容': '480 J/(kg·K)', '线膨胀系数': '11.2 µm/(m·K)', '熔点': '1495°C' },
    wearResistance: '一般，调质后可提高。',
    applicationParts: ['普通轴', '销钉', '连接件'],
    imageUrl: 'https://picsum.photos/400/300?random=101'
  },
  {
    id: 'm8',
    name: '渗碳齿轮钢',
    grade: '20CrMnTi',
    standard: 'GB/T 3077-2015',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '热轧',
    process: '锻造',
    description: '性能良好的渗碳钢，淬透性较高，用于高速重载齿轮。',
    chemicalComposition: { C: '0.20', Si: '0.25', Mn: '1.00', P: '0.03', S: '0.03', Cr: '1.10', Ti: '0.06', Fe: '余量' },
    physicalProperties: { '密度': '7.80 g/cm³', '泊松比': '0.28' },
    mechanicalProperties: { '弹性模量': '210 GPa', '屈服强度': '850 MPa', '抗拉强度': '1100 MPa', '断后伸长率': '10%', '断面收缩率': '45%', '冲击功': '55 J' },
    thermalProperties: { '导热率': '42 W/(m·K)', '比热容': '460 J/(kg·K)', '线膨胀系数': '11.0 µm/(m·K)', '熔点': '1460°C' },
    wearResistance: '渗碳淬火后表面极硬，耐磨性极佳。',
    applicationParts: ['变速箱齿轮', '齿圈'],
    imageUrl: 'https://picsum.photos/400/300?random=102'
  },
  {
    id: 'm9',
    name: '低合金高强度结构钢',
    grade: 'Q345B',
    standard: 'GB/T 1591-2018',
    category: '钢材',
    shape: '板材',
    supplyCondition: '热轧',
    process: '热处理',
    description: '综合性能好，低温性能好，冷冲压性能，焊接性能和可切削性能好。',
    chemicalComposition: { C: '0.16', Si: '0.30', Mn: '1.30', P: '0.03', S: '0.03', Nb: '0.02', V: '0.02', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³', '泊松比': '0.30' },
    mechanicalProperties: { '弹性模量': '206 GPa', '屈服强度': '345 MPa', '抗拉强度': '470 MPa', '断后伸长率': '21%', '断面收缩率': '-', '冲击功': '34 J' },
    thermalProperties: { '导热率': '48 W/(m·K)', '比热容': '470 J/(kg·K)', '线膨胀系数': '11.5 µm/(m·K)', '熔点': '1500°C' },
    wearResistance: '一般。',
    applicationParts: ['机架', '结构件'],
    imageUrl: 'https://picsum.photos/400/300?random=103'
  },
  {
    id: 'm14',
    name: '高强度合金钢',
    grade: '42CrMo',
    standard: 'GB/T 3077-2015',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '淬火+回火',
    process: '锻造',
    description: '强度高，韧性好，淬透性好。',
    chemicalComposition: { C: '0.42', Si: '0.30', Mn: '0.70', Cr: '1.00', Mo: '0.20', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³', '泊松比': '0.28' },
    mechanicalProperties: { '屈服强度': '930 MPa', '抗拉强度': '1080 MPa', '断后伸长率': '12%', '冲击功': '63 J' },
    thermalProperties: { '导热率': '42 W/(m·K)' },
    wearResistance: '优良',
    applicationParts: ['半轴', '齿轮'],
    imageUrl: 'https://picsum.photos/400/300?random=114'
  },
  {
    id: 'm33',
    name: '普通碳素结构钢',
    grade: 'Q235B',
    standard: 'GB/T 700-2006',
    category: '钢材',
    shape: '板材',
    supplyCondition: '热轧',
    process: '热轧',
    description: '塑性高，韧性好，焊接性能优良。',
    chemicalComposition: { C: '0.20', Mn: '0.50', Si: '0.30', S: '0.045', P: '0.045', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³' },
    mechanicalProperties: { '屈服强度': '235 MPa', '抗拉强度': '420 MPa', '断后伸长率': '26%' },
    applicationParts: ['机架', '覆盖件'],
    imageUrl: 'https://picsum.photos/400/300?random=133'
  },
  {
    id: 'm10',
    name: '弹簧钢',
    grade: '60Si2Mn',
    standard: 'GB/T 1222-2007',
    category: '钢材',
    shape: '板材',
    supplyCondition: '热轧',
    process: '热处理',
    description: '高弹性极限，屈服比高，疲劳强度高。',
    chemicalComposition: { C: '0.60', Si: '1.75', Mn: '0.70', Fe: '余量' },
    physicalProperties: { '密度': '7.75 g/cm³' },
    mechanicalProperties: { '屈服强度': '1175 MPa', '抗拉强度': '1275 MPa', '断后伸长率': '5%' },
    applicationParts: ['板簧'],
    imageUrl: 'https://picsum.photos/400/300?random=110'
  },
  {
    id: 'm36',
    name: '碳素工具钢',
    grade: 'T10A',
    standard: 'GB/T 1298-2008',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '退火',
    process: '锻造',
    description: '耐磨性好，韧性适中，用于耐磨零件。',
    chemicalComposition: { C: '1.00', Mn: '0.25', Si: '0.25', Fe: '余量' },
    physicalProperties: { '密度': '7.81 g/cm³' },
    mechanicalProperties: { '屈服强度': '-', '抗拉强度': '600 MPa', '硬度': '197 HB' },
    wearResistance: '优良',
    applicationParts: ['耐磨片', '销轴'],
    imageUrl: 'https://picsum.photos/400/300?random=136'
  },
   {
    id: 'm48',
    name: '优质碳素结构钢',
    grade: '60#',
    standard: 'GB/T 699-2015',
    category: '钢材',
    shape: '板材',
    supplyCondition: '正火',
    process: '热轧',
    description: '强度、硬度较高，弹性好。',
    chemicalComposition: { C: '0.60', Mn: '0.65', Si: '0.25', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³' },
    mechanicalProperties: { '屈服强度': '380 MPa', '抗拉强度': '675 MPa', '断后伸长率': '12%' },
    wearResistance: '良好',
    applicationParts: ['刮土板'],
    imageUrl: 'https://picsum.photos/400/300?random=148'
  },
   {
    id: 'm56',
    name: '硼钢',
    grade: '20MnTiB',
    standard: 'GB/T 3077',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '冷轧',
    process: '冷镦',
    description: '用于高强度螺栓。',
    chemicalComposition: { C: '0.20', Mn: '1.45', Ti: '0.08', B: '0.002', Fe: '余量' },
    physicalProperties: { '密度': '7.80 g/cm³' },
    mechanicalProperties: { '屈服强度': '900 MPa', '抗拉强度': '1100 MPa' },
    applicationParts: ['高强度螺栓'],
    imageUrl: 'https://picsum.photos/400/300?random=156'
  },
  {
    id: 'm57',
    name: '硼钢',
    grade: '40MnB',
    standard: 'GB/T 3077',
    category: '钢材',
    shape: '板材',
    supplyCondition: '淬火+回火',
    process: '锻造',
    description: '中碳硼钢，淬透性好，强度高。',
    chemicalComposition: { C: '0.40', Mn: '1.25', B: '0.002', Fe: '余量' },
    physicalProperties: { '密度': '7.80 g/cm³' },
    mechanicalProperties: { '屈服强度': '800 MPa', '抗拉强度': '980 MPa' },
    wearResistance: '优良',
    applicationParts: ['刀片', '铲尖'],
    imageUrl: 'https://picsum.photos/400/300?random=157'
  },
  {
    id: 'm58',
    name: '耐热钢',
    grade: '15CrMo',
    standard: 'GB/T 3077',
    category: '钢材',
    shape: '棒材',
    supplyCondition: '正火',
    process: '锻造',
    description: '珠光体耐热钢，高温强度高。',
    chemicalComposition: { C: '0.15', Cr: '0.90', Mo: '0.50', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³' },
    mechanicalProperties: { '屈服强度': '295 MPa', '抗拉强度': '440 MPa' },
    thermalProperties: { '熔点': '1500°C' },
    applicationParts: ['气门', '锅炉管'],
    imageUrl: 'https://picsum.photos/400/300?random=158'
  },
  {
    id: 'm35',
    name: '优质碳素结构钢',
    grade: '20#',
    standard: 'GB/T 699',
    category: '钢材',
    shape: '管材',
    supplyCondition: '热轧',
    process: '无缝轧制',
    description: '塑性、韧性好，焊接性好。',
    chemicalComposition: { C: '0.20', Mn: '0.45', Si: '0.25', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³' },
    mechanicalProperties: { '屈服强度': '245 MPa', '抗拉强度': '410 MPa', '断后伸长率': '25%' },
    applicationParts: ['输送管', '液压管'],
    imageUrl: 'https://picsum.photos/400/300?random=135'
  },
  {
    id: 'm49',
    name: '高强度结构钢',
    grade: 'Q460C',
    standard: 'GB/T 1591',
    category: '钢材',
    shape: '板材',
    supplyCondition: '热轧',
    process: '热处理',
    description: '高强度低合金钢，综合力学性能好。',
    chemicalComposition: { C: '0.20', Si: '0.55', Mn: '1.70', P: '0.03', S: '0.03', Nb: '0.07', Fe: '余量' },
    physicalProperties: { '密度': '7.85 g/cm³' },
    mechanicalProperties: { '屈服强度': '460 MPa', '抗拉强度': '550 MPa', '断后伸长率': '17%' },
    applicationParts: ['起重臂', '高应力结构件'],
    imageUrl: 'https://picsum.photos/400/300?random=149'
  },

  // ==========================================
  // 2. Aluminum (铝合金)
  // ==========================================
  {
    id: 'm2',
    name: '超硬铝合金',
    grade: '7075-T6',
    standard: 'GB/T 3190-2008',
    category: '铝合金',
    shape: '板材',
    supplyCondition: '淬火+回火',
    process: '挤压',
    description: '超高强度变形铝合金，良好的机械性能和阳极氧化反应。',
    chemicalComposition: { Si: '0.40', Fe: '0.50', Cu: '1.60', Mn: '0.30', Mg: '2.50', Cr: '0.23', Zn: '5.6', Ti: '0.20', Zr: '0.05', Al: '余量' },
    physicalProperties: { '密度': '2.81 g/cm³', '泊松比': '0.33' },
    mechanicalProperties: { '弹性模量': '71 GPa', '屈服强度': '503 MPa', '抗拉强度': '572 MPa', '断口伸长率': '11%', '硬度': '150 HB', '疲劳强度': '160 MPa' },
    thermalProperties: { '热导率': '130 W/(m·K)', '比热容': '960 J/(kg·K)', '线膨胀系数': '23.6 µm/(m·K)', '熔点': '635°C' },
    corrosionResistance: '一般，不如5系和6系铝合金。',
    applicationParts: ['无人机机架', '轻型覆盖件'],
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'm5',
    name: '防锈铝合金',
    grade: '5052-H32',
    standard: 'GB/T 3190-2008',
    category: '铝合金',
    shape: '板材',
    supplyCondition: '冷轧',
    process: '冷轧',
    description: '具有较高的疲劳强度，塑性与耐腐蚀性高，不能热处理强化。',
    chemicalComposition: { Si: '0.25', Fe: '0.40', Cu: '0.10', Mn: '0.10', Mg: '2.50', Cr: '0.25', Zn: '0.10', Ti: '-', Zr: '-', Al: '余量' },
    physicalProperties: { '密度': '2.68 g/cm³', '泊松比': '0.33' },
    mechanicalProperties: { '弹性模量': '69 GPa', '屈服强度': '195 MPa', '抗拉强度': '230 MPa', '断口伸长率': '18%', '硬度': '60 HB', '疲劳强度': '110 MPa' },
    thermalProperties: { '热导率': '138 W/(m·K)', '比热容': '900 J/(kg·K)', '线膨胀系数': '23.8 µm/(m·K)', '熔点': '650°C' },
    corrosionResistance: '优良，特别是在海洋气氛中。',
    applicationParts: ['油箱', '液体容器'],
    imageUrl: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 'm15',
    name: '通用结构铝合金',
    grade: '6061-T6',
    standard: 'GB/T 3190-2008',
    category: '铝合金',
    shape: '型材',
    supplyCondition: '淬火+回火',
    process: '挤压',
    description: '热处理强化合金，具有良好的可成型性、可焊接性、可机加工性。',
    chemicalComposition: { Si: '0.60', Fe: '0.70', Cu: '0.25', Mn: '0.15', Mg: '1.00', Cr: '0.15', Zn: '0.25', Ti: '0.15', Al: '余量' },
    physicalProperties: { '密度': '2.70 g/cm³', '泊松比': '0.33' },
    mechanicalProperties: { '弹性模量': '68.9 GPa', '屈服强度': '276 MPa', '抗拉强度': '310 MPa', '断口伸长率': '12%', '硬度': '95 HB', '疲劳强度': '96 MPa' },
    thermalProperties: { '热导率': '167 W/(m·K)', '比热容': '896 J/(kg·K)', '线膨胀系数': '23.6 µm/(m·K)', '熔点': '652°C' },
    corrosionResistance: '良好，在大气中耐腐蚀性好。',
    applicationParts: ['框架', '结构支架'],
    imageUrl: 'https://picsum.photos/400/300?random=201'
  },
  {
    id: 'm16',
    name: '船用级防锈铝',
    grade: '5083-H116',
    standard: 'GB/T 3190-2008',
    category: '铝合金',
    shape: '板材',
    supplyCondition: '冷轧',
    process: '冷轧',
    description: '非热处理合金中强度最高，耐腐蚀性极佳，用于水田机械。',
    chemicalComposition: { Si: '0.40', Fe: '0.40', Cu: '0.10', Mn: '0.70', Mg: '4.50', Cr: '0.15', Zn: '0.25', Ti: '0.15', Al: '余量' },
    physicalProperties: { '密度': '2.66 g/cm³', '泊松比': '0.33' },
    mechanicalProperties: { '弹性模量': '70 GPa', '屈服强度': '230 MPa', '抗拉强度': '305 MPa', '断口伸长率': '16%', '硬度': '75 HB', '疲劳强度': '130 MPa' },
    thermalProperties: { '热导率': '117 W/(m·K)', '比热容': '900 J/(kg·K)', '线膨胀系数': '24.0 µm/(m·K)', '熔点': '640°C' },
    corrosionResistance: '极佳，耐海水腐蚀。',
    applicationParts: ['船体', '水田轮'],
    imageUrl: 'https://picsum.photos/400/300?random=202'
  },
  {
    id: 'm18',
    name: '压铸铝合金',
    grade: 'ADC12',
    standard: 'JIS H 5302',
    category: '铝合金',
    shape: '铸件',
    supplyCondition: '铸造',
    process: '压铸',
    description: '最常用的压铸铝合金，流动性好，适合制造复杂的铸件。',
    chemicalComposition: { Si: '10.5', Fe: '0.90', Cu: '2.50', Mn: '0.30', Mg: '0.20', Zn: '1.0', Ni: '0.5', Al: '余量' },
    physicalProperties: { '密度': '2.74 g/cm³', '泊松比': '0.33' },
    mechanicalProperties: { '弹性模量': '71 GPa', '屈服强度': '150 MPa', '抗拉强度': '310 MPa', '断口伸长率': '3%', '硬度': '80 HB' },
    thermalProperties: { '热导率': '96 W/(m·K)', '比热容': '960 J/(kg·K)', '线膨胀系数': '21.0 µm/(m·K)', '熔点': '580°C' },
    corrosionResistance: '一般。',
    applicationParts: ['发动机壳体', '变速箱壳'],
    imageUrl: 'https://picsum.photos/400/300?random=204'
  },
  {
    id: 'm22',
    name: '铸造铝合金',
    grade: 'A356.0',
    standard: 'ASTM B179',
    category: '铝合金',
    shape: '铸件',
    supplyCondition: '铸造',
    process: '重力铸造',
    description: '流动性好，气密性高，用于轮毂等受力件。',
    chemicalComposition: { Si: '7.0', Mg: '0.35', Fe: '0.20', Ti: '0.10', Al: '余量' },
    physicalProperties: { '密度': '2.67 g/cm³' },
    mechanicalProperties: { '屈服强度': '185 MPa', '抗拉强度': '230 MPa', '断口伸长率': '3.5%', '硬度': '75 HB' },
    applicationParts: ['轮毂', '泵体'],
    imageUrl: 'https://picsum.photos/400/300?random=222'
  },
  {
    id: 'm38',
    name: '硬铝合金',
    grade: '2A12',
    standard: 'GB/T 3190',
    category: '铝合金',
    shape: '棒材',
    supplyCondition: '正火',
    process: '锻造',
    description: '高强度硬铝，耐热性好。',
    chemicalComposition: { Cu: '4.2', Mg: '1.5', Mn: '0.6', Fe: '0.5', Si: '0.5', Al: '余量' },
    physicalProperties: { '密度': '2.78 g/cm³' },
    mechanicalProperties: { '屈服强度': '325 MPa', '抗拉强度': '470 MPa', '断口伸长率': '12%', '硬度': '120 HB' },
    applicationParts: ['连接销', '螺栓'],
    imageUrl: 'https://picsum.photos/400/300?random=238'
  },
  {
    id: 'm39',
    name: '耐磨铝合金',
    grade: '4032',
    standard: 'ASTM B221',
    category: '铝合金',
    shape: '锻件',
    supplyCondition: '淬火+回火',
    process: '锻造',
    description: '低膨胀系数，高耐磨性。',
    chemicalComposition: { Si: '12.0', Cu: '1.0', Mg: '1.0', Ni: '1.0', Al: '余量' },
    physicalProperties: { '密度': '2.68 g/cm³' },
    mechanicalProperties: { '屈服强度': '315 MPa', '抗拉强度': '380 MPa', '断口伸长率': '9%', '硬度': '120 HB' },
    thermalProperties: { '线膨胀系数': '19.4 µm/(m·K)' },
    applicationParts: ['活塞'],
    imageUrl: 'https://picsum.photos/400/300?random=239'
  },
  {
    id: 'm40',
    name: '防锈铝',
    grade: '5A06',
    standard: 'GB/T 3190',
    category: '铝合金',
    shape: '管材',
    supplyCondition: '退火',
    process: '冷拔',
    description: '高耐蚀性，焊接性好。',
    chemicalComposition: { Mg: '6.0', Mn: '0.6', Fe: '0.4', Si: '0.4', Al: '余量' },
    physicalProperties: { '密度': '2.64 g/cm³' },
    mechanicalProperties: { '屈服强度': '160 MPa', '抗拉强度': '315 MPa', '断口伸长率': '15%' },
    applicationParts: ['油管', '容器'],
    imageUrl: 'https://picsum.photos/400/300?random=240'
  },
  {
    id: 'm43',
    name: '超硬铝',
    grade: '7050',
    standard: 'AMS 4050',
    category: '铝合金',
    shape: '板材',
    supplyCondition: '淬火+回火',
    process: '轧制',
    description: '高强度，抗应力腐蚀性能优于7075。',
    chemicalComposition: { Zn: '6.2', Mg: '2.3', Cu: '2.3', Zr: '0.1', Al: '余量' },
    physicalProperties: { '密度': '2.83 g/cm³' },
    mechanicalProperties: { '屈服强度': '490 MPa', '抗拉强度': '560 MPa', '断口伸长率': '11%', '疲劳强度': '240 MPa' },
    applicationParts: ['结构件'],
    imageUrl: 'https://picsum.photos/400/300?random=243'
  },

  // ==========================================
  // 3. Coating (涂层材料)
  // ==========================================
  {
    id: 'm3',
    name: '耐磨陶瓷涂层',
    category: '涂层材料',
    materialSystem: '金属陶瓷',
    process: 'HVOF',
    shape: '粉末',
    description: '极高的硬度和耐磨性，用于延长犁铧等触土部件寿命。',
    chemicalComposition: { '主要成分': 'WC-12Co' },
    characteristicProperties: { '粒度分布': '15-45 µm', '颗粒形貌': '球形', '松装密度': '4.5 g/cm³', '流动性': '15 s/50g' },
    physicalProperties: { '密度': '14.5 g/cm³', '熔点': '2870°C (WC)', '显微硬度': '1150 HV' },
    mechanicalProperties: { '涂层耐磨性能': '极优', '硬度': '1150 HV', '摩擦系数': '0.25', '结合力': '70 MPa' },
    wearResistance: '极优，适合高磨损环境。',
    applicationParts: ['犁铧', '旋耕刀表面'],
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 'm6',
    name: '聚四氟乙烯涂层',
    category: '涂层材料',
    materialSystem: '有机复合',
    process: '静电喷涂',
    shape: '粉末',
    description: '具有极低的摩擦系数和优良的不粘性，减少土壤粘附。',
    chemicalComposition: { '主要成分': 'PTFE' },
    characteristicProperties: { '粒度分布': 'D50=30 µm', '颗粒形貌': '不规则', '松装密度': '0.6 g/cm³', '流动性': '一般' },
    physicalProperties: { '密度': '2.2 g/cm³', '熔点': '327°C', '显微硬度': '60 Shore D' },
    mechanicalProperties: { '涂层耐磨性能': '一般', '硬度': '60 Shore D', '摩擦系数': '0.05', '结合力': '30 MPa' },
    wearResistance: '一般，主要用于减摩防粘。',
    applicationParts: ['深松铲', '播种机开沟器'],
    imageUrl: 'https://picsum.photos/400/300?random=6'
  },
  {
    id: 'm23',
    name: '硬质合金涂层',
    category: '涂层材料',
    materialSystem: '金属陶瓷',
    process: 'HVOF',
    shape: '粉末',
    description: '在耐磨性的基础上增加了耐腐蚀性能，适合潮湿土壤环境。',
    chemicalComposition: { '主要成分': 'WC-10Co-4Cr' },
    characteristicProperties: { '粒度分布': '15-45 µm', '颗粒形貌': '球形聚团', '松装密度': '4.8 g/cm³', '直径': '-' },
    physicalProperties: { '密度': '13.8 g/cm³', '熔点': '2800°C', '显微硬度': '1050 HV' },
    mechanicalProperties: { '涂层耐磨性能': '优', '硬度': '1050 HV', '摩擦系数': '0.30', '结合力': '65 MPa' },
    wearResistance: '优良。',
    applicationParts: ['水田驱动轮', '泥浆泵叶轮'],
    imageUrl: 'https://picsum.photos/400/300?random=301'
  },
  {
    id: 'm24',
    name: '自熔性合金涂层',
    category: '涂层材料',
    materialSystem: '镍基',
    process: '等离子喷涂',
    shape: '粉末',
    description: '硬度高，耐磨耐蚀，重熔后致密无孔隙，结合强度高。',
    chemicalComposition: { '主要成分': 'NiCrBSi' },
    characteristicProperties: { '粒度分布': '45-106 µm', '颗粒形貌': '球形', '松装密度': '4.2 g/cm³' },
    physicalProperties: { '密度': '8.2 g/cm³', '熔点': '1050°C', '显微硬度': '60 HRC' },
    mechanicalProperties: { '涂层耐磨性能': '优', '硬度': '60 HRC', '摩擦系数': '0.40', '结合力': '300 MPa' },
    wearResistance: '优良，抗高温磨损。',
    applicationParts: ['轴套', '柱塞'],
    imageUrl: 'https://picsum.photos/400/300?random=302'
  },
  {
    id: 'm25',
    name: '纳米复合涂层',
    category: '涂层材料',
    materialSystem: '陶瓷',
    process: 'PVD', 
    shape: '其他',
    description: '具有极高的显微硬度和良好的抗氧化性，用于精密刀具。',
    chemicalComposition: { '主要成分': 'TiN' },
    characteristicProperties: { '粒度分布': 'Nano', '颗粒形貌': '-', '松装密度': '-' },
    physicalProperties: { '密度': '5.2 g/cm³', '熔点': '2930°C', '显微硬度': '2400 HV' },
    mechanicalProperties: { '涂层耐磨性能': '极优', '硬度': '2400 HV', '摩擦系数': '0.50', '结合力': '80 N' },
    wearResistance: '极优。',
    applicationParts: ['收割机动刀片', '剪枝剪'],
    imageUrl: 'https://picsum.photos/400/300?random=303'
  },
  {
    id: 'm28',
    name: '二硫化钼润滑涂层',
    category: '涂层材料',
    materialSystem: '有机复合',
    process: '喷涂固化',
    shape: '粉末',
    description: '干膜润滑剂，在高载荷低速条件下提供优良的减摩性能。',
    chemicalComposition: { '主要成分': 'MoS2 + Resin' },
    characteristicProperties: { '粒度分布': 'D50=2 µm', '颗粒形貌': '片状', '松装密度': '1.2 g/cm³' },
    physicalProperties: { '密度': '4.8 g/cm³', '熔点': '1185°C', '显微硬度': '2H' },
    mechanicalProperties: { '涂层耐磨性能': '中等', '硬度': '2H', '摩擦系数': '0.04', '结合力': '1级' },
    wearResistance: '主要用于减摩。',
    applicationParts: ['滑动轴承', '齿轮磨合面'],
    imageUrl: 'https://picsum.photos/400/300?random=306'
  },
  {
    id: 'm42',
    name: '电镀硬铬',
    category: '涂层材料',
    materialSystem: '金属',
    process: '电镀',
    shape: '其他',
    description: '传统的表面强化技术，硬度高，摩擦系数低，但存在环保问题。',
    chemicalComposition: { '主要成分': 'Cr' },
    characteristicProperties: { '粒度分布': '-', '颗粒形貌': '-', '松装密度': '-' },
    physicalProperties: { '密度': '7.19 g/cm³', '熔点': '1857°C', '显微硬度': '900 HV' },
    mechanicalProperties: { '涂层耐磨性能': '优', '硬度': '900 HV', '摩擦系数': '0.12', '结合力': '400 MPa' },
    wearResistance: '优良。',
    applicationParts: ['液压缸活塞杆', '减震器杆'],
    imageUrl: 'https://picsum.photos/400/300?random=42'
  },
  {
    id: 'm30',
    name: '非晶合金涂层',
    category: '涂层材料',
    materialSystem: '铁基',
    process: 'HVOF',
    shape: '粉末',
    description: '具有超高硬度和极好的耐蚀性，几乎无晶界腐蚀。',
    chemicalComposition: { '主要成分': 'Fe-Cr-Mo-B' },
    characteristicProperties: { '粒度分布': '15-53 µm', '颗粒形貌': '球形', '松装密度': '3.9 g/cm³' },
    physicalProperties: { '密度': '7.6 g/cm³', '熔点': '1200°C', '显微硬度': '1200 HV' },
    mechanicalProperties: { '涂层耐磨性能': '极优', '硬度': '1200 HV', '摩擦系数': '0.30', '结合力': '60 MPa' },
    wearResistance: '极优。',
    applicationParts: ['强腐蚀泵轴', '化工机械'],
    imageUrl: 'https://picsum.photos/400/300?random=308'
  },
  {
    id: 'm41',
    name: '铬碳化合物涂层',
    category: '涂层材料',
    materialSystem: '金属陶瓷',
    process: 'HVOF',
    shape: '粉末',
    description: '在高温下具有极好的耐磨性和抗氧化性，最高使用温度可达870℃。',
    chemicalComposition: { '主要成分': 'Cr3C2-NiCr' },
    characteristicProperties: { '粒度分布': '15-45 µm', '颗粒形貌': '球形', '松装密度': '3.5 g/cm³' },
    physicalProperties: { '密度': '6.8 g/cm³', '熔点': '1400°C', '显微硬度': '950 HV' },
    mechanicalProperties: { '涂层耐磨性能': '优', '硬度': '950 HV', '摩擦系数': '0.40', '结合力': '65 MPa' },
    wearResistance: '高温耐磨性好。',
    applicationParts: ['高温风机叶片', '排气阀'],
    imageUrl: 'https://picsum.photos/400/300?random=41'
  },
  {
    id: 'm50',
    name: '钴基合金涂层',
    category: '涂层材料',
    materialSystem: '钴基',
    process: '等离子喷涂',
    shape: '粉末',
    description: '耐高温、耐磨损、耐腐蚀。',
    chemicalComposition: { '主要成分': 'Co-Cr-W-C' },
    characteristicProperties: { '粒度分布': '45-106 µm', '松装密度': '4.5 g/cm³' },
    physicalProperties: { '密度': '8.5 g/cm³', '显微硬度': '45 HRC' },
    mechanicalProperties: { '涂层耐磨性能': '优', '摩擦系数': '0.35' },
    applicationParts: ['高温阀座'],
    imageUrl: 'https://picsum.photos/400/300?random=350'
  },
  {
    id: 'm51',
    name: '铝焊丝',
    category: '涂层材料',
    materialSystem: '金属',
    process: '电弧喷涂',
    shape: '焊丝',
    description: '用于防腐涂层。',
    chemicalComposition: { '主要成分': 'Al 99.5%' },
    characteristicProperties: { '直径': '2.0 mm' },
    physicalProperties: { '密度': '2.7 g/cm³' },
    mechanicalProperties: { '涂层耐磨性能': '低', '结合力': '25 MPa' },
    applicationParts: ['钢结构防腐'],
    imageUrl: 'https://picsum.photos/400/300?random=351'
  }
];

export const EQUIPMENT: Equipment[] = [
  // ... (Equipment data remains largely the same, kept for brevity in this output but included in real file)
  // 1. 农用动力机械
  {
    id: 'e1',
    name: '东方红LX1504',
    category: '农用动力机械',
    type: '拖拉机',
    model: 'LX1504',
    description: '大功率轮式拖拉机，配备高压共轨发动机，适用于大型农场耕作。',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    parts: [
      { id: 'p1', name: '发动机曲轴', category: '动力系', materialId: 'm1', materialName: '40Cr' },
      { id: 'p2', name: '变速箱齿轮', category: '传动系', materialId: 'm8', materialName: '20CrMnTi' },
      { id: 'p3', name: '后桥半轴', category: '行走系', materialId: 'm14', materialName: '42CrMo' } 
    ]
  },
  {
    id: 'e2',
    name: '雷沃欧豹M2004-5G',
    category: '农用动力机械',
    type: '拖拉机',
    model: 'M2004-5G',
    description: '智能拖拉机，集成北斗导航辅助驾驶系统，操作舒适，作业效率高。',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    parts: [
      { id: 'p4', name: '驾驶室框架', category: '车身', materialId: 'm15', materialName: '6061-T6' },
      { id: 'p5', name: '连接销', category: '悬挂系', materialId: 'm38', materialName: '2A12-T4' }
    ]
  },
  {
    id: 'e3',
    name: '玉柴YC4A系列柴油机',
    category: '农用动力机械',
    type: '农用内燃机',
    model: 'YC4A',
    description: '专为农机设计的柴油发动机，低速扭矩大，可靠性高。',
    imageUrl: 'https://picsum.photos/600/400?random=12',
    parts: [
      { id: 'p6', name: '活塞', category: '曲柄连杆', materialId: 'm39', materialName: '4032-T6' },
      { id: 'p7', name: '排气门', category: '配气机构', materialId: 'm58', materialName: '15CrMo' }
    ]
  },
  {
    id: 'e4',
    name: '便携式汽油发电机',
    category: '农用动力机械',
    type: '其他农用动力机械',
    model: 'GF-3000',
    description: '田间作业应急电源，轻便易携带，燃油经济性好。',
    imageUrl: 'https://picsum.photos/600/400?random=13',
    parts: [
      { id: 'p8', name: '机架', category: '结构', materialId: 'm33', materialName: 'Q235B' },
      { id: 'p9', name: '油箱', category: '附件', materialId: 'm5', materialName: '5052-H32' }
    ]
  },

  // 2. 农用搬运机械
  {
    id: 'e5',
    name: '农用自卸运输车',
    category: '农用搬运机械',
    type: '农用运输机械',
    model: '7YP-1450',
    description: '适用于农村道路和田间运输，具有自卸功能，载重能力强。',
    imageUrl: 'https://picsum.photos/600/400?random=14',
    parts: [
      { id: 'p10', name: '车厢底板', category: '车厢', materialId: 'm9', materialName: 'Q345B' },
      { id: 'p11', name: '板簧', category: '悬挂', materialId: 'm10', materialName: '60Si2Mn' }
    ]
  },
  {
    id: 'e6',
    name: '果园履带搬运车',
    category: '农用搬运机械',
    type: '农用运输机械',
    model: 'GY-500',
    description: '履带式行走机构，通过性好，适合丘陵山区果园运输作业。',
    imageUrl: 'https://picsum.photos/600/400?random=15',
    parts: [
      { id: 'p12', name: '履带板螺钉', category: '行走', materialId: 'm56', materialName: '20MnTiB' },
      { id: 'p13', name: '驱动轮', category: '传动', materialId: 'm18', materialName: 'ADC12' }
    ]
  },
  {
    id: 'e7',
    name: '伸缩臂叉装机',
    category: '农用搬运机械',
    type: '农用装卸机械',
    model: 'TH-735',
    description: '多功能装卸设备，可更换多种属具，用于草捆堆垛、粮食铲运。',
    imageUrl: 'https://picsum.photos/600/400?random=16',
    parts: [
      { id: 'p14', name: '伸缩臂', category: '工作装置', materialId: 'm49', materialName: 'Q460C' }, // Q460C assumed exists or fallback
      { id: 'p15', name: '液压缸活塞杆', category: '液压', materialId: 'm42', materialName: 'Hard Chrome' }
    ]
  },
  {
    id: 'e8',
    name: '螺旋输送机',
    category: '农用搬运机械',
    type: '其他农用搬运机械',
    model: 'LX-200',
    description: '用于散粮的输送和装车，结构简单，移动方便。',
    imageUrl: 'https://picsum.photos/600/400?random=17',
    parts: [
      { id: 'p16', name: '螺旋叶片', category: '工作部件', materialId: 'm4', materialName: '65Mn' },
      { id: 'p17', name: '输送管', category: '结构', materialId: 'm35', materialName: '20#' }
    ]
  },

  // 3. 农用基本建设机械
  {
    id: 'e9',
    name: '农用小型挖掘机',
    category: '农用基本建设机械',
    type: '挖掘机械',
    model: 'WE-18',
    description: '体积小巧，操作灵活，适用于农田水利沟渠挖掘、果园开沟。',
    imageUrl: 'https://picsum.photos/600/400?random=18',
    parts: [
      { id: 'p18', name: '斗齿', category: '工作装置', materialId: 'm1', materialName: '40Cr' },
      { id: 'p19', name: '动臂销轴', category: '结构', materialId: 'm14', materialName: '42CrMo' }
    ]
  },
  {
    id: 'e10',
    name: '激光平地机',
    category: '农用基本建设机械',
    type: '平地机械',
    model: 'JP-300',
    description: '利用激光控制平地铲升降，平整精度高，利于节水灌溉。',
    imageUrl: 'https://picsum.photos/600/400?random=19',
    parts: [
      { id: 'p20', name: '刮土板', category: '工作装置', materialId: 'm48', materialName: '60#' },
      { id: 'p21', name: '液压油管', category: '液压', materialId: 'm40', materialName: '5A06' }
    ]
  },
  {
    id: 'e11',
    name: '推土机',
    category: '农用基本建设机械',
    type: '平地机械',
    model: 'TY-160',
    description: '用于农田平整、推土作业，牵引力大。',
    imageUrl: 'https://picsum.photos/600/400?random=20',
    parts: [
      { id: 'p22', name: '刀角', category: '工作装置', materialId: 'm57', materialName: '40MnB' },
      { id: 'p23', name: '履带板', category: '行走', materialId: 'm22', materialName: 'A356' } 
    ]
  },
  {
    id: 'e12',
    name: '石块捡拾机',
    category: '农用基本建设机械',
    type: '清理机械',
    model: 'SJ-120',
    description: '用于清理农田中的石块，改善耕作条件，保护农机具。',
    imageUrl: 'https://picsum.photos/600/400?random=21',
    parts: [
      { id: 'p24', name: '捡拾齿', category: '工作装置', materialId: 'm36', materialName: 'T10A' },
      { id: 'p25', name: '筛网', category: '筛选', materialId: 'm7', materialName: '45#' }
    ]
  },
  {
    id: 'e13',
    name: '挖坑机',
    category: '农用基本建设机械',
    type: '其他农田基本建设机械',
    model: 'WK-40',
    description: '用于植树造林、立杆等挖坑作业，效率高。',
    imageUrl: 'https://picsum.photos/600/400?random=22',
    parts: [
      { id: 'p26', name: '钻头尖', category: '工作装置', materialId: 'm23', materialName: 'WC-10Co-4Cr' },
      { id: 'p27', name: '螺旋叶片', category: '结构', materialId: 'm4', materialName: '65Mn' }
    ]
  }
];

export const SIMULATIONS: SimulationModel[] = [
  {
    id: 's1',
    title: '深松铲土壤切削仿真',
    description: '基于SPH-FEM耦合算法，模拟不同深松铲结构在粘重土壤中的切削阻力与扰动范围，优化铲尖几何参数。该研究通过对比三种不同铲尖角度（25°、30°、35°）在不同作业速度下的牵引阻力，发现30°铲尖在保证土壤扰动量的同时能耗最低。仿真结果显示，土壤颗粒在切削过程中表现出明显的剪切破坏特征，高应力区域主要集中在铲尖与铲翼连接处。',
    thumbnail: 'https://picsum.photos/400/300?random=20',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    specs: { '求解器': 'LS-DYNA', '网格数': '25万', '计算时长': '12h', '时间步长': '1e-6 s', '本构模型': 'Drucker-Prager', '边界条件': 'Non-reflecting' },
    resultMetrics: {
        '最大切削阻力': { value: '5.2', unit: 'kN', trend: 'down' },
        '土壤扰动系数': { value: '45', unit: '%', trend: 'up' },
        '能耗比': { value: '12.8', unit: 'kJ/m³', trend: 'neutral' },
        '最大应力': { value: '180', unit: 'MPa', trend: 'up' }
    }
  },
  {
    id: 's2',
    title: '拖拉机驾驶室ROPS分析',
    description: '针对拖拉机翻滚保护结构(ROPS)进行非线性倒塌分析，验证其在侧翻事故中对驾驶员的保护能力。仿真模拟了按照OECD Code 4标准的后部推压、侧部推压和垂直压溃试验。结果表明，驾驶室立柱在塑性铰区域发生了较大的塑性变形，吸能效果显著，但乘员生存空间（DLV）未受到侵入，满足安全标准要求。',
    thumbnail: 'https://picsum.photos/400/300?random=21',
    videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    specs: { '求解器': 'Abaqus', '标准': 'OECD Code 4', '材料模型': '弹塑性', '网格类型': 'Shell S4R', '载荷步': 'Static Riks', '接触类型': 'General Contact' },
    resultMetrics: {
        '最大吸能量': { value: '15.6', unit: 'kJ', trend: 'up' },
        '最大变形量': { value: '125', unit: 'mm', trend: 'neutral' },
        '安全系数': { value: '1.5', unit: '', trend: 'up' },
        'DLV侵入量': { value: '0', unit: 'mm', trend: 'neutral' }
    }
  },
  {
    id: 's3',
    title: '收割机脱粒滚筒流场分析',
    description: '利用CFD技术分析脱粒滚筒内部气流场分布，优化导流板角度，降低谷物损失率。通过模拟不同转速（600-900rpm）下的气流速度矢量图与压力云图，识别出脱粒室内的涡流死区。改进后的导流板设计有效改善了气流均匀性，使得谷物与杂余的分离效率提高了8.5%。',
    thumbnail: 'https://picsum.photos/400/300?random=22',
    videoUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    specs: { '求解器': 'Fluent', '湍流模型': 'k-epsilon', '介质': '空气-谷物', '多相流模型': 'Eulerian', '动网格': 'Sliding Mesh', '收敛残差': '1e-4' },
    resultMetrics: {
        '平均风速': { value: '12.5', unit: 'm/s', trend: 'up' },
        '压力损失': { value: '350', unit: 'Pa', trend: 'down' },
        '分离效率': { value: '92.5', unit: '%', trend: 'up' },
        '含杂率': { value: '1.2', unit: '%', trend: 'down' }
    }
  }
];

export const CASES: CaseStudy[] = [
  {
    id: 'c1',
    title: '黑土区耐磨犁铧应用',
    summary: '针对东北黑土区土壤粘重、磨损快的问题，采用等离子喷涂陶瓷涂层技术强化犁铧表面，使用寿命提升3倍。',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/400/300?random=30',
    tags: ['表面强化', '犁铧', '黑土区'],
    content: `
      <h2>项目背景</h2>
      <p>东北黑土区是我国重要的粮食基地，但土壤粘重、石块多，对耕作部件的磨损极为严重。传统65Mn钢犁铧在一个作业季中往往需要更换多次，严重影响作业效率。</p>
      
      <h2>技术方案</h2>
      <p>本项目采用了超音速火焰喷涂(HVOF)技术，在犁铧表面制备了WC-10Co-4Cr金属陶瓷涂层。该涂层具有极高的硬度（>1200HV）和优异的结合强度。</p>
      
      <h2>应用效果</h2>
      <p>经过3000亩实地耕作试验，涂层犁铧的磨损量仅为未处理犁铧的1/4。平均使用寿命从原本的1500亩提升至4500亩以上，显著降低了农户的换件成本和停机时间。</p>
    `
  },
  {
    id: 'c2',
    title: '轻量化植保无人机机架',
    summary: '利用7075铝合金替代传统碳钢制造无人机机臂，在保证强度的前提下减重40%，续航时间显著延长。',
    date: '2023-09-20',
    imageUrl: 'https://picsum.photos/400/300?random=31',
    tags: ['轻量化', '铝合金', '无人机']
  },
  {
    id: 'c3',
    title: '采棉机摘锭国产化替代',
    summary: '通过优化基体材料热处理工艺与表面镀铬技术，攻克了采棉机摘锭易断裂、脱棉困难的技术难题。',
    date: '2023-08-05',
    imageUrl: 'https://picsum.photos/400/300?random=32',
    tags: ['关键部件', '热处理', '采棉机']
  },
  {
    id: 'c4',
    title: '大型青贮机刀片失效分析与改进',
    summary: '针对进口青贮机动刀片在收割玉米时频繁崩刃的问题，提出了变温贝氏体等温淬火新工艺。',
    date: '2023-11-10',
    imageUrl: 'https://picsum.photos/400/300?random=33',
    tags: ['失效分析', '热处理', '青贮机']
  },
  {
    id: 'c5',
    title: '水田拖拉机密封结构优化',
    summary: '针对南方水田作业泥水入侵导致车桥早期损坏的问题，设计了迷宫式油封与耐磨轴套组合密封系统。',
    date: '2023-07-22',
    imageUrl: 'https://picsum.photos/400/300?random=34',
    tags: ['密封技术', '水田机械', '可靠性']
  },
  {
    id: 'c6',
    title: '智能播种机排种器材料优选',
    summary: '通过离散元仿真与台架试验，筛选出适合高速播种的排种盘材料，解决了静电吸附与种子破碎问题。',
    date: '2023-06-15',
    imageUrl: 'https://picsum.photos/400/300?random=35',
    tags: ['仿真模拟', '高分子材料', '播种机']
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp1',
    testCode: 'EXP-2023-1024',
    title: '40Cr钢材高温拉伸性能测试',
    type: '力学测试',
    materialName: '40Cr',
    date: '2023-11-05',
    status: 'Completed',
    standard: 'GB/T 228.2-2015',
    operator: '李工',
    conditions: { '温度': '300°C', '拉伸速率': '1 mm/min', '试样形状': '圆形 (d=10mm)' },
    results: { '屈服强度 (ReH)': '720 MPa', '抗拉强度 (Rm)': '910 MPa', '断后伸长率 (A)': '14%', '断面收缩率 (Z)': '52%' },
    chartType: 'line',
    chartConfig: { xKey: 'strain', yKey: 'stress', xLabel: '应变 (%)', yLabel: '应力 (MPa)' },
    chartData: [
      { strain: 0, stress: 0 },
      { strain: 0.1, stress: 210 },
      { strain: 0.2, stress: 420 },
      { strain: 0.3, stress: 630 },
      { strain: 0.35, stress: 720 }, // Yield
      { strain: 0.5, stress: 750 },
      { strain: 1.0, stress: 820 },
      { strain: 2.0, stress: 880 },
      { strain: 5.0, stress: 910 }, // UTS
      { strain: 8.0, stress: 890 },
      { strain: 12.0, stress: 800 },
      { strain: 14.0, stress: 0 } // Fracture
    ],
    imageUrl: 'https://picsum.photos/seed/tensile/400/300'
  },
  {
    id: 'exp2',
    testCode: 'EXP-2023-1108',
    title: '7075铝合金旋转弯曲疲劳测试',
    type: '耐久性测试',
    materialName: '7075-T6',
    date: '2023-11-20',
    status: 'Completed',
    standard: 'GB/T 4337-2015',
    operator: '张工',
    conditions: { '温度': '25°C', '应力比 (R)': '-1', '频率': '50 Hz' },
    results: { '疲劳极限 (10^7)': '160 MPa', '拟合参数 m': '8.5', '拟合参数 C': '1.2e20' },
    chartType: 'line',
    chartConfig: { xKey: 'cycles', yKey: 'stress', xLabel: '循环次数 (N)', yLabel: '应力幅 (MPa)' },
    chartData: [
      { cycles: 10000, stress: 450 },
      { cycles: 50000, stress: 380 },
      { cycles: 100000, stress: 320 },
      { cycles: 500000, stress: 240 },
      { cycles: 1000000, stress: 200 },
      { cycles: 5000000, stress: 170 },
      { cycles: 10000000, stress: 160 }
    ],
    imageUrl: 'https://picsum.photos/seed/fatigue/400/300'
  },
  {
    id: 'exp3',
    testCode: 'EXP-2023-1215',
    title: 'WC-10Co-4Cr涂层中性盐雾腐蚀测试',
    type: '环境测试',
    materialName: 'WC-10Co-4Cr',
    date: '2023-12-30',
    status: 'Completed',
    standard: 'GB/T 10125-2021',
    operator: '王工',
    conditions: { '温度': '35°C', 'NaCl浓度': '50 g/L', 'pH值': '6.8', '周期': '480h' },
    results: { '腐蚀等级': 'RA 9', '失重率': '0.05 g/m²', '起泡面积': '0%' },
    chartType: 'bar',
    chartConfig: { xKey: 'hour', yKey: 'weightLoss', xLabel: '时间 (h)', yLabel: '失重 (mg)' },
    chartData: [
      { hour: '24', weightLoss: 2 },
      { hour: '48', weightLoss: 5 },
      { hour: '96', weightLoss: 12 },
      { hour: '240', weightLoss: 35 },
      { hour: '480', weightLoss: 80 }
    ],
    imageUrl: 'https://picsum.photos/seed/salt/400/300'
  }
];
