import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Material } from '../types';
import { ArrowLeft, AlertCircle } from 'lucide-react';

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

  // Helper to get all unique keys for a property group across all materials
  const getUniqueKeys = (propertyGroup: keyof Material) => {
    const keys = new Set<string>();
    materials.forEach(m => {
      const group = m[propertyGroup] as Record<string, string> | undefined;
      if (group) {
        Object.keys(group).forEach(k => keys.add(k));
      }
    });
    return Array.from(keys);
  };

  const chemicalKeys = getUniqueKeys('chemicalComposition');
  const mechanicalKeys = getUniqueKeys('mechanicalProperties');
  const physicalKeys = getUniqueKeys('physicalProperties');
  const thermalKeys = getUniqueKeys('thermalProperties');

  // Helper to render a table row
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

  // Helper to render a property section
  const renderPropertySection = (title: string, keys: string[], propertyGroup: keyof Material) => {
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
          const group = m[propertyGroup] as Record<string, string> | undefined;
          return group?.[key] || '-';
        }))}
      </>
    );
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-full mx-auto min-h-screen bg-white">
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
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
                      <span className="text-xs px-2 py-0.5 bg-agri-50 text-agri-700 border border-agri-100 rounded font-mono">{m.grade}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Info */}
            <tr className="bg-agri-50/50 border-b border-agri-100">
                <td className="p-2.5 border-r border-agri-200 sticky left-0 bg-agri-50 z-10 font-bold text-agri-800 text-sm" colSpan={1}>基本信息</td>
                <td colSpan={materials.length} className="bg-agri-50/50"></td>
            </tr>
            {renderRow('标准牌号', m => m.grade || '-')}
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

            {/* Properties */}
            {renderPropertySection('化学成分', chemicalKeys, 'chemicalComposition')}
            {renderPropertySection('力学性能', mechanicalKeys, 'mechanicalProperties')}
            {renderPropertySection('物理性能', physicalKeys, 'physicalProperties')}
            {renderPropertySection('热性能', thermalKeys, 'thermalProperties')}

             {/* Specifics */}
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