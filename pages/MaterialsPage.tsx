
import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, ChevronLeft, ChevronRight, ArrowRight, Filter, FileSpreadsheet, Layers, Info } from 'lucide-react';
import { MATERIALS } from '../constants';
import { Material } from '../types';
import { useSearchParams } from 'react-router-dom';
import { MaterialDetailModal } from '../components/MaterialDetailModal';

type CategoryType = '钢材' | '铝合金' | '涂层材料';

export const MaterialsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('铝合金');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMaterialId = searchParams.get('id');
  
  const selectedMaterial = useMemo(() => {
    return MATERIALS.find(m => m.id === selectedMaterialId) || null;
  }, [selectedMaterialId]);

  const filteredResults = useMemo(() => {
    let list = MATERIALS.filter(m => m.category === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.grade.toLowerCase().includes(q) || 
        m.process.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const displayedItems = filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 获取该分类下化学成分的所有唯一键（列名）
  const compositionKeys = useMemo(() => {
    const keys = new Set<string>();
    filteredResults.forEach(m => Object.keys(m.composition).forEach(k => keys.add(k)));
    return Array.from(keys);
  }, [filteredResults]);

  // 获取该分类下力学性能的所有唯一键
  const propertyKeys = useMemo(() => {
    const keys = new Set<string>();
    filteredResults.forEach(m => Object.keys(m.mechanicalProperties).forEach(k => keys.add(k)));
    return Array.from(keys);
  }, [filteredResults]);

  return (
    <div className="pt-24 pb-20 px-4 max-w-[1600px] mx-auto min-h-screen bg-white font-sans">
      
      {/* 数字化表头 */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
               <FileSpreadsheet size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">数字化材料实验数据库</h1>
              <p className="text-slate-500 font-medium mt-1">
                已同步图片全量数据：<span className="text-agri-600 font-mono font-bold">{MATERIALS.length}</span> 条实验行实例
              </p>
            </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            {(['铝合金', '涂层材料', '钢材'] as CategoryType[]).map(tab => (
            <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-8 py-3 rounded-xl text-[14px] font-bold transition-all duration-300 ${
                activeTab === tab
                    ? 'bg-white text-agri-600 shadow-lg scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
            >
                {tab}
            </button>
            ))}
        </div>
      </div>

      {/* 搜索与过滤 */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索名称、牌号或热处理工艺..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-agri-500/10 focus:border-agri-500 transition-all text-sm"
            />
        </div>
        <button 
            onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
            className="px-4 py-3 bg-white border border-slate-200 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
        >
            <RotateCcw size={16} /> 重置视图
        </button>
      </div>

      {/* 核心数字化大表 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="overflow-x-auto custom-scrollbar no-scrollbar lg:scrollbar-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              {/* 第一层：分组表头 */}
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <th colSpan={4} className="px-6 py-3 border-r border-slate-200 text-center bg-slate-100/50">基本信息 (Basic Info)</th>
                <th colSpan={compositionKeys.length} className="px-6 py-3 border-r border-slate-200 text-center bg-agri-50/30">化学成分 (Chemistry wt.%)</th>
                <th colSpan={propertyKeys.length} className="px-6 py-3 text-center bg-tech-50/50">性能指标 (Properties)</th>
                <th className="w-20"></th>
              </tr>
              {/* 第二层：字段表头 */}
              <tr className="bg-white border-b border-slate-200 text-[12px] font-bold text-slate-700 whitespace-nowrap">
                <th className="px-6 py-4 border-r border-slate-100 w-12 text-center">序号</th>
                <th className="px-6 py-4 border-r border-slate-100 min-w-[200px]">材料名称</th>
                <th className="px-6 py-4 border-r border-slate-100 min-w-[160px]">材料牌号</th>
                <th className="px-6 py-4 border-r border-slate-200">热处理/制备工艺</th>
                
                {compositionKeys.map(key => (
                  <th key={key} className="px-4 py-4 border-r border-slate-100 text-center min-w-[60px]">{key}</th>
                ))}
                
                {propertyKeys.map(key => (
                  <th key={key} className="px-6 py-4 border-r border-slate-100 text-center">{key}</th>
                ))}
                <th className="px-4 py-4 text-center">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedItems.length > 0 ? displayedItems.map((item, idx) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-agri-50/10 transition-all group cursor-pointer"
                  onClick={() => setSearchParams({ id: item.id })}
                >
                  <td className="px-6 py-5 border-r border-slate-50 text-center text-slate-400 font-mono text-sm">
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="px-6 py-5 border-r border-slate-50 font-bold text-slate-900 text-sm">
                    {item.name}
                  </td>
                  <td className="px-6 py-5 border-r border-slate-50">
                    <span className="inline-block whitespace-nowrap font-mono text-agri-600 font-bold bg-agri-50 px-2.5 py-1 rounded text-xs border border-agri-100/50">
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-6 py-5 border-r border-slate-50 text-slate-500 text-xs font-medium">
                    {item.process}
                  </td>

                  {/* 动态化学成分列 */}
                  {compositionKeys.map(key => (
                    <td key={key} className="px-4 py-5 border-r border-slate-50 text-center font-mono text-[13px] text-slate-700 tabular-nums">
                      {item.composition[key] || '-'}
                    </td>
                  ))}

                  {/* 动态性能列 */}
                  {propertyKeys.map(key => (
                    <td key={key} className="px-4 py-5 border-r border-slate-50 text-center font-mono font-bold text-[14px] text-slate-900 tabular-nums tracking-tighter">
                      {item.mechanicalProperties[key] || item.specialProperties[key] || '-'}
                    </td>
                  ))}

                  <td className="px-4 py-5 text-center">
                    <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-300 group-hover:bg-agri-600 group-hover:text-white transition-all flex items-center justify-center">
                      <Info size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={20} className="px-10 py-48 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-4">
                     <Layers size={48} className="opacity-20" />
                     <p className="text-lg font-bold">在该分类下未检索到匹配的实验行</p>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页控制 */}
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[13px] text-slate-500 mt-auto">
          <div className="font-medium">
            显示结果：<span className="text-slate-900 font-bold">{(currentPage-1)*itemsPerPage+1} - {Math.min(currentPage*itemsPerPage, filteredResults.length)}</span> / 共 <span className="text-slate-900 font-bold">{filteredResults.length}</span> 行实验数据
          </div>
          <div className="flex items-center gap-6">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              className={`p-2 rounded-xl transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:shadow-md text-slate-900'}`}
            >
              <ChevronLeft size={24}/>
            </button>
            <div className="flex items-center gap-2 font-mono font-bold">
               <span className="w-8 h-8 flex items-center justify-center bg-agri-600 text-white rounded-lg shadow-lg shadow-agri-600/30">{currentPage}</span>
               <span className="text-slate-300">/</span>
               <span className="text-slate-600">{totalPages || 1}</span>
            </div>
            <button 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)} 
              className={`p-2 rounded-xl transition-all ${currentPage >= totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:shadow-md text-slate-900'}`}
            >
              <ChevronRight size={24}/>
            </button>
          </div>
        </div>
      </div>

      {selectedMaterial && (
        <MaterialDetailModal material={selectedMaterial} onClose={() => setSearchParams({})} />
      )}
    </div>
  );
};
