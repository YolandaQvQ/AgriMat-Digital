
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Material } from '../types';
import { ArrowLeft, AlertCircle, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

export const ContrastPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const materials: Material[] = location.state?.materials || [];

  if (!materials || materials.length === 0) {
    return (
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle size={48} className="text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">无对比数据</h2>
        <p className="text-slate-500 mb-6">请先返回材料库选择需要对比的材料。</p>
        <button 
          onClick={() => navigate('/materials')} 
          className="px-6 py-2.5 bg-agri-600 text-white rounded-lg hover:bg-agri-500 transition"
        >
          返回材料库
        </button>
      </div>
    );
  }

  // Helper to extract numeric values from strings like "980 MPa", "210 GPa"
  const parseValue = (val: string | undefined) => {
    if (!val) return 0;
    const match = val.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Prepare data for Radar Chart
  const radarData = useMemo(() => {
    const properties = [
      { key: '屈服强度', label: '屈服强度', path: '力学性能' as const },
      { key: '抗拉强度', label: '抗拉强度', path: '力学性能' as const },
      { key: '断后伸长率', label: '塑性(伸长率)', path: '力学性能' as const },
      { key: '冲击功', label: '韧性(冲击功)', path: '力学性能' as const },
      { key: '密度', label: '密度(轻量化)', path: '物理性能' as const, inverse: true }
    ];

    const maxValues: Record<string, number> = {};
    properties.forEach(prop => {
      let max = 0;
      materials.forEach(m => {
        const group = m.technicalSpecifications[prop.path];
        const val = parseValue(group?.[prop.key]);
        if (val > max) max = val;
      });
      maxValues[prop.key] = max || 1; 
    });

    return properties.map(prop => {
      const dataPoint: any = { subject: prop.label, fullMark: 100 };
      materials.forEach(m => {
        const group = m.technicalSpecifications[prop.path];
        const rawVal = parseValue(group?.[prop.key]);
        let normalizedVal = (rawVal / maxValues[prop.key]) * 100;
        
        if (!rawVal) normalizedVal = 0;

        dataPoint[m.id] = Math.round(normalizedVal);
        dataPoint[`${m.id}_raw`] = rawVal; 
      });
      return dataPoint;
    });
  }, [materials]);

  const colors = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#6366f1'];

  const getUniqueKeys = (propertyGroup: keyof Material['technicalSpecifications']) => {
    const keys = new Set<string>();
    materials.forEach(m => {
      const group = m.technicalSpecifications[propertyGroup];
      if (group) {
        Object.keys(group).forEach(k => keys.add(k));
      }
    });
    return Array.from(keys);
  };

  const chemicalKeys = getUniqueKeys('化学成分');
  const mechanicalKeys = getUniqueKeys('力学性能');
  const physicalKeys = getUniqueKeys('物理性能');
  const thermalKeys = getUniqueKeys('热性能');

  const renderRow = (label: string, accessor: (m: Material) => string | React.ReactNode, isHeader = false) => (
    <tr className={`border-b border-slate-100 ${isHeader ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
      <td className={`p-3 border-r border-slate-200 sticky left-0 bg-white z-10 w-40 shrink-0 ${isHeader ? 'font-bold text-slate-800' : 'text-slate-500 font-medium'}`}>
        {label}
      </td>
      {materials.map(m => (
        <td key={m.id} className="p-3 text-slate-700 border-r border-slate-100 min-w-[180px] text-sm">
          {accessor(m)}
        </td>
      ))}
    </tr>
  );

  const renderPropertySection = (title: string, keys: string[], propertyGroup: keyof Material['technicalSpecifications']) => {
    if (keys.length === 0) return null;
    return (
      <>
        <tr className="bg-agri-50/50 border-b border-agri-100">
          <td className="p-2.5 border-r border-agri-200 sticky left-0 bg-agri-50 z-10 font-bold text-agri-800 text-sm" colSpan={1}>
            {title}
          </td>
           <td colSpan={materials.length} className="bg-agri-50/50"></td>
        </tr>
        {keys.map(key => renderRow(key, (m) => {
          const group = m.technicalSpecifications[propertyGroup];
          return group?.[key] || '-';
        }))}
      </>
    );
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-full mx-auto min-h-screen bg-white">
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/materials')} 
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">材料性能对比</h1>
                <p className="text-slate-500 text-sm">已选择 {materials.length} 种材料进行详细对比</p>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto mb-10 grid md:grid-cols-3 gap-8">
         <div className="md:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <BarChart2 size={18} className="text-agri-600"/> 性能图谱分析
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
               雷达图展示了各材料在关键力学性能上的相对强弱。
            </p>
            <div className="space-y-3">
               {materials.map((m, idx) => (
                  <div key={m.id} className="flex items-center gap-2 text-sm">
                     <span className="w-3 h-3 rounded-full" style={{backgroundColor: colors[idx % colors.length]}}></span>
                     <span className="font-bold text-slate-700">{m.name}</span>
                     <span className="inline-block whitespace-nowrap text-[10px] px-1.5 py-0.5 bg-agri-50 text-agri-700 border border-agri-100 rounded font-mono ml-auto">{m.grade}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="md:col-span-2 h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm p-4 relative">
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false}/>
                  {materials.map((m, idx) => (
                    <Radar
                      key={m.id}
                      name={m.name}
                      dataKey={m.id}
                      stroke={colors[idx % colors.length]}
                      fill={colors[idx % colors.length]}
                      fillOpacity={0.1}
                    />
                  ))}
                  <Tooltip 
                     contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </RadarChart>
             </ResponsiveContainer>
         </div>
      </div>

      <div className="max-w-full overflow-x-auto shadow-sm border border-slate-200 rounded-xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="p-3 border-r border-slate-200 sticky left-0 bg-slate-100 z-20 w-40 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                <span className="text-slate-500 font-medium uppercase text-xs">对比项目</span>
              </th>
              {materials.map(m => (
                <th key={m.id} className="p-3 border-r border-slate-200 min-w-[180px]">
                  <div className="font-bold text-base text-slate-900">{m.name}</div>
                  <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600">{m.category}</span>
                      <span className="inline-block whitespace-nowrap text-xs px-2 py-0.5 bg-agri-50 text-agri-700 border border-agri-100 rounded font-mono">{m.grade}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-agri-50/50 border-b border-agri-100">
                <td className="p-2.5 border-r border-agri-200 sticky left-0 bg-agri-50 z-10 font-bold text-agri-800 text-sm" colSpan={1}>基本信息</td>
                <td colSpan={materials.length} className="bg-agri-50/50"></td>
            </tr>
            {renderRow('标准牌号', m => <span className="inline-block whitespace-nowrap px-2 py-0.5 bg-agri-50 text-agri-700 border border-agri-100 rounded font-mono text-xs">{m.grade}</span>)}
            {renderRow('适用标准', m => m.standard || '-')}
            {renderRow('产品形态', m => m.shape || '-')}
            {renderRow('供货状态', m => m.supplyCondition || '-')}
            {renderRow('加工工艺', m => m.process || '-')}
            {renderRow('典型应用', m => (
                 <div className="flex flex-wrap gap-1 max-w-[200px] whitespace-normal">
                    {m.applicationParts.map((p,i) => <span key={i} className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{p}</span>)}
                 </div>
            ))}
            {renderRow('描述', m => <span className="whitespace-normal block min-w-[180px] max-w-[250px] leading-relaxed text-slate-600 text-xs">{m.description}</span>)}

            {renderPropertySection('化学成分', chemicalKeys, '化学成分')}
            {renderPropertySection('力学性能', mechanicalKeys, '力学性能')}
            {renderPropertySection('物理性能', physicalKeys, '物理性能')}
            {renderPropertySection('热性能', thermalKeys, '热性能')}

             <tr className="bg-agri-50/50 border-b border-agri-100">
                <td className="p-2.5 border-r border-agri-200 sticky left-0 bg-agri-50 z-10 font-bold text-agri-800 text-sm" colSpan={1}>其他特性</td>
                <td colSpan={materials.length} className="bg-agri-50/50"></td>
            </tr>
             {renderRow('耐磨性能', m => <span className="whitespace-normal block min-w-[180px] max-w-[250px] leading-relaxed text-xs">{m.wearResistance || '-'}</span>)}
             {renderRow('耐腐蚀性', m => <span className="whitespace-normal block min-w-[180px] max-w-[250px] leading-relaxed text-xs">{m.corrosionResistance || '-'}</span>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
