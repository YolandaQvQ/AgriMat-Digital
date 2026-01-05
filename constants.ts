
import { Material, Equipment, SimulationModel, CaseStudy, Experiment } from './types';

/**
 * 数字化平台全量原始数据：完全还原图片中的每一行实验记录
 */
export const MATERIALS: Material[] = [
  // --- 表1：铝基复合材料 (10行) ---
  ...[
    { id: 'AL-01', name: '超高强韧抗疲劳可焊接铝基复合材料', grade: 'TiB2/Al-Zn-Mg-Cu', process: '固溶: 475℃/1h, 时效: 120℃/20h', comp: { Al: 'Bal.', Mg: '2.35', Zn: '5.8', Cu: '1.25', Si: '-', TiB2: '3.5' }, mech: { '抗拉强度': '682', '屈服强度': '636', '断后伸长率': '8.2', '弹性模量': '80', '疲劳强度': '270' }, spec: {} },
    { id: 'AL-02', name: '超高强韧抗疲劳可焊接铝基复合材料', grade: 'TiB2/Al-Zn-Mg-Cu', process: '固溶: 475℃/1h, 时效: 120℃/20h', comp: { Al: 'Bal.', Mg: '2.35', Zn: '5.8', Cu: '1.25', Si: '-', TiB2: '1.0' }, mech: { '抗拉强度': '647', '屈服强度': '602', '断后伸长率': '10.5', '弹性模量': '74', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-03', name: '超高强韧抗疲劳可焊接铝基复合材料', grade: 'TiB2/Al-Zn-Mg-Cu', process: '固溶: 475℃/1h, 时效: 120℃/20h', comp: { Al: 'Bal.', Mg: '2.35', Zn: '5.8', Cu: '1.25', Si: '-', TiB2: '3.0' }, mech: { '抗拉强度': '676', '屈服强度': '628', '断后伸长率': '8.3', '弹性模量': '79', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-04', name: '超高强韧抗疲劳可焊接铝基复合材料', grade: 'TiB2/Al-Zn-Mg-Cu', process: '固溶: 475℃/1h, 时效: 120℃/20h', comp: { Al: 'Bal.', Mg: '2.35', Zn: '5.8', Cu: '1.25', Si: '-', TiB2: '5.0' }, mech: { '抗拉强度': '662', '屈服强度': '648', '断后伸长率': '3.4', '弹性模量': '87', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-05', name: '超高强韧抗疲劳可焊接铝基复合材料', grade: 'TiB2/Al-Zn-Mg-Cu', process: '固溶: 475℃/1h, 时效: 120℃/20h', comp: { Al: 'Bal.', Mg: '2.1', Zn: '5.2', Cu: '1.05', Si: '-', TiB2: '3.5' }, mech: { '抗拉强度': '635', '屈服强度': '587', '断后伸长率': '9.6', '弹性模量': '81', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-06', name: '高强韧耐腐蚀易成形铝基复合材料', grade: 'TiB2/Al-Mg-Si', process: '固溶: 540℃/1.5h, 时效: 175℃/10h', comp: { Al: 'Bal.', Mg: '1.2', Zn: '-', Cu: '1.0', Si: '1.4', TiB2: '3.5' }, mech: { '抗拉强度': '329', '屈服强度': '279', '断后伸长率': '9.4', '弹性模量': '94', '疲劳强度': '200' }, spec: {} },
    { id: 'AL-07', name: '高强韧耐腐蚀易成形铝基复合材料', grade: 'TiB2/Al-Mg-Si', process: '固溶: 540℃/1.5h, 时效: 175℃/10h', comp: { Al: 'Bal.', Mg: '1.2', Zn: '-', Cu: '1.0', Si: '1.4', TiB2: '1.0' }, mech: { '抗拉强度': '305', '屈服强度': '264', '断后伸长率': '12.6', '弹性模量': '75', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-08', name: '高强韧耐腐蚀易成形铝基复合材料', grade: 'TiB2/Al-Mg-Si', process: '固溶: 540℃/1.5h, 时效: 175℃/10h', comp: { Al: 'Bal.', Mg: '1.2', Zn: '-', Cu: '1.0', Si: '1.4', TiB2: '3.0' }, mech: { '抗拉强度': '325', '屈服强度': '274', '断后伸长率': '9.8', '弹性模量': '83', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-09', name: '高强韧耐腐蚀易成形铝基复合材料', grade: 'TiB2/Al-Mg-Si', process: '固溶: 540℃/1.5h, 时效: 175℃/10h', comp: { Al: 'Bal.', Mg: '1.2', Zn: '-', Cu: '1.0', Si: '1.4', TiB2: '5.0' }, mech: { '抗拉强度': '311', '屈服强度': '296', '断后伸长率': '3.8', '弹性模量': '95', '疲劳强度': '-' }, spec: {} },
    { id: 'AL-10', name: '高强韧耐腐蚀易成形铝基复合材料', grade: 'TiB2/Al-Mg-Si', process: '固溶: 540℃/1.5h, 时效: 175℃/10h', comp: { Al: 'Bal.', Mg: '1.2', Zn: '-', Cu: '-', Si: '1.4', TiB2: '3.5' }, mech: { '抗拉强度': '310', '屈服强度': '263', '断后伸长率': '9.7', '弹性模量': '89', '疲劳强度': '-' }, spec: {} },
  ].map(row => ({
    id: row.id,
    name: row.name,
    grade: row.grade,
    process: row.process,
    category: '铝合金' as const,
    composition: row.comp,
    mechanicalProperties: row.mech,
    specialProperties: row.spec,
    description: `${row.name} 实验数据行。牌号: ${row.grade}。`,
    imageUrl: 'https://picsum.photos/seed/' + row.id + '/400/300',
    applicationParts: ['结构支撑件', '轻量化机架'],
    technicalSpecifications: {
      '基本信息': { '材料名称': row.name, '牌号': row.grade, '工艺': row.process },
      '化学成分': row.comp,
      '力学性能': row.mech,
      '专项性能': row.spec
    }
  })),

  // --- 表2：镍基/金刚石涂层 (9行) ---
  ...[
    { id: 'NI-01', name: '镍基钎料;单晶金刚石破碎料', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1010℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '25.23', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-02', name: '镍基钎料;单晶金刚石破碎料', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1030℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '58.57', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-03', name: '镍基钎料;单晶金刚石破碎料', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1050℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '68.17', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-04', name: '镍基钎料;金刚石颗粒', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1070℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '73', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-05', name: '镍基钎料;单晶金刚石破碎料', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1090℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '66.95', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-06', name: '镍基钎料;单晶金刚石破碎料', grade: 'Ni60AA; MD-S', process: '真空钎焊: 1110℃', comp: { Ni: '63', Cr: '15.46', B: '2.9', Si: '3.9', Fe: '3.9', O: '0.009', C: '0.765', 金刚石: '10' }, mech: { '硬度(HRC)': '65.42', '厚度(μm)': '800' }, spec: { '磨损失重': '/' } },
    { id: 'NI-07', name: '金刚石复合涂层', grade: '基体: 60Si2Mn; 钎料: Ni基', process: '大气环境感应钎焊', comp: { Ni: '69.6', Cr: '5.95', B: '2.55', Si: '3.83', Fe: '2.55', O: '0.009', C: '0.553', 金刚石: '15' }, mech: { '硬度(HRC)': '38-92', '厚度(μm)': '1000' }, spec: { '磨损失重(g)': '0.0356', '金刚石占比': '29%' } },
    { id: 'NI-08', name: '金刚石复合涂层', grade: '基体: 60Si2Mn; 钎料: Ni基', process: '大气环境感应钎焊', comp: { Ni: '65.5', Cr: '5.6', B: '2.4', Si: '3.6', Fe: '2.4', O: '0.008', C: '0.52', 金刚石: '20' }, mech: { '硬度(HRC)': '49-87', '厚度(μm)': '1000' }, spec: { '磨损失重(g)': '0.0724', '金刚石占比': '37%' } },
    { id: 'NI-09', name: '金刚石复合涂层', grade: '基体: 60Si2Mn; 钎料: Ni基', process: '大气环境感应钎焊', comp: { Ni: '61.4', Cr: '5.25', B: '2.25', Si: '3.38', Fe: '2.25', O: '0.008', C: '0.488', 金刚石: '25' }, mech: { '硬度(HRC)': '40-89', '厚度(μm)': '1000' }, spec: { '磨损失重(g)': '0.0253', '金刚石占比': '44%' } },
  ].map(row => ({
    id: row.id,
    name: row.name,
    grade: row.grade,
    process: row.process,
    category: '涂层材料' as const,
    composition: row.comp,
    mechanicalProperties: row.mech,
    specialProperties: row.spec,
    description: `耐磨涂层实验数据. 钎焊工艺: ${row.process}.`,
    imageUrl: 'https://picsum.photos/seed/' + row.id + '/400/300',
    applicationParts: ['采棉机摘锭', '旋耕刀表面'],
    technicalSpecifications: {
      '基本信息': { '名称': row.name, '牌号': row.grade, '工艺': row.process },
      '化学成分': row.comp,
      '力学性能': row.mech,
      '专项性能': row.spec
    }
  })),

  // --- 表3：MnB钢 (14行) ---
  ...[
    { id: 'MNB-01', grade: 'MnB钢', process: '870淬火+200回火', comp: { C: '0.34', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1507', '屈服(MPa)': '1841', '伸长率(%)': '12.3', '冲击功(J)': '75' } },
    { id: 'MNB-02', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.34', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1526', '屈服(MPa)': '1938', '伸长率(%)': '8.9', '冲击功(J)': '65' } },
    { id: 'MNB-03', grade: 'MnB钢', process: '870淬火+230回火', comp: { C: '0.34', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1442', '屈服(MPa)': '1764', '伸长率(%)': '11.5', '冲击功(J)': '77' } },
    { id: 'MNB-04', grade: 'MnB钢', process: '870淬火+200回火', comp: { C: '0.37', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1620', '屈服(MPa)': '1965', '伸长率(%)': '11.3', '冲击功(J)': '67' } },
    { id: 'MNB-05', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.37', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1580', '屈服(MPa)': '2026', '伸长率(%)': '7.2', '冲击功(J)': '64' } },
    { id: 'MNB-06', grade: 'MnB钢', process: '870淬火+230回火', comp: { C: '0.37', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1547', '屈服(MPa)': '1881', '伸长率(%)': '10.9', '冲击功(J)': '67' } },
    { id: 'MNB-07', grade: 'MnB钢', process: '870淬火+200回火', comp: { C: '0.40', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1648', '屈服(MPa)': '2035', '伸长率(%)': '12.9', '冲击功(J)': '59' } },
    { id: 'MNB-08', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.40', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1673', '屈服(MPa)': '2152', '伸长率(%)': '9.7', '冲击功(J)': '56' } },
    { id: 'MNB-09', grade: 'MnB钢', process: '870淬火+230回火', comp: { C: '0.40', Si: '0.25', Mn: '0.65', Ti: '0.03', Nb: '0.01', B: '0.0025' }, mech: { '抗拉(MPa)': '1594', '屈服(MPa)': '1930', '伸长率(%)': '12.6', '冲击功(J)': '58' } },
    { id: 'MNB-10', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.30', Si: '0.25', Mn: '1.0', Ti: '0.03', B: '0.0025' }, mech: { '抗拉(MPa)': '1522', '屈服(MPa)': '2015', '伸长率(%)': '12.4', '冲击功(J)': '100' } },
    { id: 'MNB-11', grade: 'MnB钢', process: '870淬火+230回火', comp: { C: '0.30', Si: '0.25', Mn: '1.0', Ti: '0.03', B: '0.0025' }, mech: { '抗拉(MPa)': '1403', '屈服(MPa)': '1819', '伸长率(%)': '14.2', '冲击功(J)': '106' } },
    { id: 'MNB-12', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.33', Si: '0.25', Mn: '1.0', Ti: '0.03', B: '0.0025' }, mech: { '抗拉(MPa)': '1528', '屈服(MPa)': '1852', '伸长率(%)': '10.1', '冲击功(J)': '93' } },
    { id: 'MNB-13', grade: 'MnB钢', process: '870淬火+230回火', comp: { C: '0.33', Si: '0.25', Mn: '1.0', Ti: '0.03', B: '0.0025' }, mech: { '抗拉(MPa)': '1404', '屈服(MPa)': '1706', '伸长率(%)': '12.8', '冲击功(J)': '92' } },
    { id: 'MNB-14', grade: 'MnB钢', process: '870淬火+170回火', comp: { C: '0.36', Si: '0.25', Mn: '1.0', Ti: '0.03', B: '0.0025' }, mech: { '抗拉(MPa)': '1592', '屈服(MPa)': '2147', '伸长率(%)': '12.4', '冲击功(J)': '69' } },
  ].map(row => ({
    id: row.id,
    name: 'MnB钢',
    grade: row.grade,
    process: row.process,
    category: '钢材' as const,
    composition: row.comp,
    mechanicalProperties: row.mech,
    specialProperties: {},
    description: `MnB硼钢实验。淬火/回火工艺: ${row.process}。`,
    imageUrl: 'https://picsum.photos/seed/' + row.id + '/400/300',
    applicationParts: ['犁铧', '深松铲本体'],
    technicalSpecifications: {
      '基本信息': { '材料名称': 'MnB钢', '工艺': row.process },
      '化学成分': row.comp,
      '力学性能': row.mech,
      '专项性能': {}
    }
  }))
];

export const EQUIPMENT: Equipment[] = [
  {
    id: 'EQ-001',
    name: '重型旋耕机',
    category: '农用动力机械',
    type: '旋耕机',
    model: 'RT-2024-PRO',
    description: '采用 MnB 钢 T200 制造的关键部件。',
    imageUrl: 'https://picsum.photos/seed/tiller/600/400',
    parts: [
      { id: 'P-001', name: '旋耕刀', materialId: 'MNB-04', materialName: 'MnB钢 (200回火)' }
    ]
  }
];

export const SIMULATIONS: SimulationModel[] = [
  {
    id: 'SIM-01',
    title: 'MnB钢断裂模拟',
    description: '不同温度回火下的应力分布对比。',
    thumbnail: 'https://picsum.photos/seed/sim1/400/300',
    specs: { '核心数': '64' },
    resultMetrics: { '最大应力': { value: '1900', unit: 'MPa' } }
  }
];

export const CASES: CaseStudy[] = [
  {
    id: 'CASE-01',
    title: '高强铝基复材应用',
    summary: '植保机机臂减重效果显著。',
    date: '2024-05',
    imageUrl: 'https://picsum.photos/seed/case1/400/300',
    tags: ['轻量化']
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-1',
    testCode: 'EXP-2024-001',
    title: '硼钢拉伸实验',
    type: '力学测试',
    materialName: 'MnB全系',
    date: '2024-01',
    status: 'Completed',
    standard: 'GB/T 228',
    operator: '张工',
    conditions: { '温度': '25℃' },
    results: { '屈服强度': '1900MPa' }
  }
];
