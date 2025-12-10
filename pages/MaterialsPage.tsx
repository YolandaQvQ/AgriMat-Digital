
import React, { useState, useEffect, useMemo } from 'react';
import { Search, RotateCcw, ArrowUpDown, ChevronLeft, ChevronRight, Scale, X, ArrowRight, Filter, Share2 } from 'lucide-react';
import { MATERIALS } from '../constants';
import { Material } from '../types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MaterialDetailModal } from '../components/MaterialDetailModal';

type CategoryType = '钢材' | '铝合金' | '涂层材料';

interface CategoryConfig {
  filterGroups: {
    id: string;
    label: string;
    options: string[];
  }[];
  listHeaders: { key: string; label: string }[];
}

const CONFIG: Record<CategoryType, CategoryConfig> = {
  '钢材': {
    filterGroups: [
      { id: 'name', label: '材料名称', options: ['全部', '高强度合金钢', '优质碳素结构钢', '渗碳齿轮钢', '弹簧钢', '低合金高强度结构钢', '碳素工具钢', '硼钢', '耐热钢'] },
      { id: 'grade', label: '标准牌号', options: ['全部', '45#', '40Cr', '65Mn', '20CrMnTi', 'Q345B', 'Q235B', '35CrMo', 'GCr15', 'T10A', '20MnTiB'] },
      { id: 'shape', label: '产品形态', options: ['全部', '棒材', '板材', '管材', '型材', '锻件', '铸件'] },
      { id: 'supplyCondition', label: '供货状态', options: ['全部', '热轧', '冷轧', '退火', '正火', '淬火+回火'] },
    ],
    listHeaders: [
      { key: 'name', label: '名称' },
      { key: 'grade', label: '牌号' },
      { key: 'shape', label: '形态' },
      { key: 'supplyCondition', label: '状态' },
      { key: 'standard', label: '标准' },
    ]
  },
  '铝合金': {
    filterGroups: [
      { id: 'name', label: '材料名称', options: ['全部', '超硬铝合金', '防锈铝合金', '通用结构铝合金', '船用级防锈铝', '压铸铝合金', '铸造铝合金', '硬铝合金', '耐磨铝合金', '超硬铝'] },
      { id: 'grade', label: '标准牌号', options: ['全部', '7075', '5052', '6061', '5083', 'ADC12', 'A356', '2A12', '4032', '5A06', '7050'] },
      { id: 'shape', label: '产品形态', options: ['全部', '棒材', '板材', '管材', '型材', '锻件', '铸件'] },
      { id: 'supplyCondition', label: '供货状态', options: ['全部', '热轧', '冷轧', '退火', '正火', '淬火+回火', '铸造'] },
    ],
    listHeaders: [
      { key: 'name', label: '名称' },
      { key: 'grade', label: '牌号' },
      { key: 'shape', label: '形态' },
      { key: 'supplyCondition', label: '状态' },
      { key: 'standard', label: '标准' },
    ]
  },
  '涂层材料': {
    filterGroups: [
      { id: 'name', label: '材料名称', options: ['全部', '耐磨陶瓷涂层', '硬质合金涂层', '自熔性合金涂层', '纳米复合涂层', '电镀硬铬', '聚四氟乙烯涂层', '钴基合金涂层', '铝焊丝'] },
      { id: 'materialSystem', label: '材料体系', options: ['全部', '铁基', '镍基', '钴基', '陶瓷', '金属陶瓷', '有机复合', '金属'] },
      { id: 'process', label: '制备工艺', options: ['全部', 'HVOF', '等离子喷涂', '静电喷涂', '电镀', 'PVD', '喷涂固化', '电弧喷涂'] },
      { id: 'shape', label: '材料形态', options: ['全部', '焊丝', '粉末', '其他'] },
    ],
    listHeaders: [
      { key: 'name', label: '名称' },
      { key: 'materialSystem', label: '体系' },
      { key: 'process', label: '工艺' },
      { key: 'shape', label: '形态' },
      { key: 'description', label: '描述' },
    ]
  }
};

interface FilterState {
  [key: string]: string[];
}

export const MaterialsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('钢材');
  const [filters, setFilters] = useState<FilterState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Material[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // URL Params for Deep Linking
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMaterialId = searchParams.get('id');
  
  const selectedMaterial = useMemo(() => {
    return MATERIALS.find(m => m.id === selectedMaterialId) || null;
  }, [selectedMaterialId]);

  const [comparisonList, setComparisonList] = useState<Material[]>([]);
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Slightly reduced items per page due to larger size

  const navigate = useNavigate();

  // Initialize filters and handle deep linking initial state
  useEffect(() => {
    const initialFilters: FilterState = {};
    CONFIG[activeTab].filterGroups.forEach(group => {
      initialFilters[group.id] = [];
    });
    setFilters(initialFilters);
    setSortConfig(null);
    setCurrentPage(1);
    
    if (selectedMaterial) {
        if (['钢材', '铝合金', '涂层材料'].includes(selectedMaterial.category) && selectedMaterial.category !== activeTab) {
            setActiveTab(selectedMaterial.category as CategoryType);
        }
    }
  }, [activeTab]);

  // Handle opening modal
  const openDetail = (material: Material) => {
    setSearchParams(prev => {
        prev.set('id', material.id);
        return prev;
    });
  };

  // Handle closing modal
  const closeDetail = () => {
    setSearchParams(prev => {
        prev.delete('id');
        return prev;
    });
  };

  const handleFilterChange = (groupId: string, option: string) => {
    const groupConfig = CONFIG[activeTab].filterGroups.find(g => g.id === groupId);
    if (!groupConfig) return;

    const groupOptions = groupConfig.options.filter(o => o !== '全部');

    setFilters(prev => {
      const currentSelections = prev[groupId] || [];
      if (option === '全部') {
        if (currentSelections.length === groupOptions.length && groupOptions.length > 0) {
          return { ...prev, [groupId]: [] };
        } else {
          return { ...prev, [groupId]: [...groupOptions] };
        }
      } else {
        const isSelected = currentSelections.includes(option);
        const newSelections = isSelected
          ? currentSelections.filter(i => i !== option)
          : [...currentSelections, option];
        return { ...prev, [groupId]: newSelections };
      }
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(arr => (arr as string[]).length > 0);
  }, [filters]);

  // Auto-search logic
  useEffect(() => {
      if (selectedMaterial && !hasSearched) {
          handleSearch();
      }
  }, [selectedMaterial]);

  const canSearch = true;

  const handleSearch = () => {
    let filtered = MATERIALS.filter(m => m.category === activeTab);
    
    Object.keys(filters).forEach(key => {
        const selectedOptions = filters[key] as string[];
        if (selectedOptions && selectedOptions.length > 0) {
            filtered = filtered.filter(m => {
                const val = (m as any)[key];
                if (!val) return false;
                if (key === 'grade') {
                    return selectedOptions.some(opt => val.includes(opt));
                }
                return selectedOptions.some(opt => val.includes(opt)); 
            });
        }
    });

    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(m => 
            m.name.toLowerCase().includes(query) ||
            (m.grade && m.grade.toLowerCase().includes(query)) ||
            m.description.toLowerCase().includes(query)
        );
    }

    setResults(filtered);
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    const initialFilters: FilterState = {};
    CONFIG[activeTab].filterGroups.forEach(group => {
      initialFilters[group.id] = [];
    });
    setFilters(initialFilters);
    setSearchQuery('');
    setResults([]);
    setHasSearched(false);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = useMemo(() => {
    let sortableItems = [...results];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        const valA = (a as any)[sortConfig.key] || '';
        const valB = (b as any)[sortConfig.key] || '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [results, sortConfig]);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const displayedItems = sortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeConfig = CONFIG[activeTab];

  const SortIcon = ({ column }: { column: string }) => {
     if (sortConfig?.key !== column) return <ArrowUpDown size={14} className="ml-1 text-slate-300 inline" />;
     return (
         <ArrowUpDown 
            size={14} 
            className={`ml-1 inline ${sortConfig.direction === 'asc' ? 'text-agri-600 rotate-180' : 'text-agri-600'} transition-transform`} 
         />
     );
  };

  const toggleComparison = (material: Material, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparisonList(prev => {
      const exists = prev.find(m => m.id === material.id);
      if (exists) {
        return prev.filter(m => m.id !== material.id);
      } else {
        if (prev.length >= 6) {
          alert("最多只能选择6个材料进行对比");
          return prev;
        }
        return [...prev, material];
      }
    });
  };

  const startContrast = () => {
    navigate('/contrast', { state: { materials: comparisonList } });
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-[1440px] mx-auto min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">材料数据库</h1>
            <p className="text-slate-600 text-base">
            高性能农机专用材料参数检索与对比
            </p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {(['钢材', '铝合金', '涂层材料'] as CategoryType[]).map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                activeTab === tab
                    ? 'bg-agri-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
                {tab}
            </button>
            ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        {/* Compact Filters */}
        <div className="space-y-4 mb-6">
           {activeConfig.filterGroups.map((group) => {
             const specificOptions = group.options.filter(o => o !== '全部');
             const currentSelections = filters[group.id] || [];
             const isAllSelected = specificOptions.length > 0 && currentSelections.length === specificOptions.length;

             return (
               <div key={group.id} className="flex flex-wrap items-center gap-2">
                 <span className="font-bold text-slate-800 w-24 text-sm uppercase tracking-wide">{group.label}:</span>
                 <button
                    onClick={() => handleFilterChange(group.id, '全部')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                       (currentSelections.length === 0 || isAllSelected)
                       ? 'bg-slate-800 text-white' 
                       : 'text-slate-500 hover:bg-slate-100'
                    }`}
                 >
                   全部
                 </button>
                 {specificOptions.map(option => {
                    const isSelected = currentSelections.includes(option);
                    return (
                       <button
                          key={option}
                          onClick={() => handleFilterChange(group.id, option)}
                          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors border ${
                            isSelected
                            ? 'bg-agri-50 border-agri-200 text-agri-700 font-bold'
                            : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                          }`}
                       >
                         {option}
                       </button>
                    )
                 })}
               </div>
             )
           })}
        </div>

        {/* Search Input Line */}
        <div className="flex gap-3 pt-5 border-t border-slate-100">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="输入材料牌号、名称或标准..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-agri-500/20 focus:border-agri-500 outline-none transition text-base text-slate-900 font-medium placeholder:text-slate-400"
                    onKeyDown={(e) => e.key === 'Enter' && canSearch && handleSearch()}
                />
             </div>
             <button 
                onClick={handleSearch} 
                className="px-8 py-3 bg-agri-600 hover:bg-agri-500 text-white rounded-lg text-sm font-bold shadow-sm transition-all flex items-center"
             >
                查询
             </button>
             <button 
                onClick={handleReset} 
                className="px-5 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold transition-all"
                title="重置"
             >
                <RotateCcw size={18} />
             </button>
        </div>
      </div>

      {hasSearched ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider text-slate-600">
                    {activeConfig.listHeaders.map(header => (
                        <th key={header.key} className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort(header.key)}>
                            {header.label} <SortIcon column={header.key}/>
                        </th>
                    ))}
                    <th className="px-6 py-4 font-bold text-right">操作</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-base">
                {displayedItems.length > 0 ? (
                    displayedItems.map((material, index) => {
                      const isSelectedForContrast = comparisonList.some(c => c.id === material.id);
                      return (
                        <tr 
                            key={material.id} 
                            onClick={() => openDetail(material)}
                            className="hover:bg-agri-50/30 transition-colors cursor-pointer group"
                        >
                            {activeConfig.listHeaders.map(header => (
                                <td key={header.key} className="px-6 py-4 whitespace-nowrap">
                                    {header.key === 'description' 
                                        ? <span className="text-slate-500 truncate max-w-[400px] block font-normal text-sm">{material.description}</span> 
                                        : <span className={`${header.key === 'name' ? 'font-bold text-slate-800' : 'text-slate-600'} ${header.key === 'grade' ? 'font-mono text-slate-700 font-medium' : ''}`}>{(material as any)[header.key] || '-'}</span>
                                    }
                                </td>
                            ))}
                            <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={(e) => toggleComparison(material, e)}
                                  className={`text-sm font-bold px-4 py-2 border rounded-md transition inline-flex items-center ${
                                    isSelectedForContrast 
                                    ? 'bg-tech-100 border-tech-200 text-tech-800' 
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-agri-300 hover:text-agri-700 hover:bg-white'
                                  }`}
                                >
                                  <Scale size={14} className="mr-1.5" />
                                  {isSelectedForContrast ? '已选' : '对比'}
                                </button>
                            </td>
                        </tr>
                      );
                    })
                ) : (
                    <tr>
                    <td colSpan={activeConfig.listHeaders.length + 1} className="px-6 py-16 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center">
                           <Search size={48} className="opacity-20 mb-4" />
                           <p className="text-lg font-medium">未找到相关材料</p>
                           <p className="text-sm mt-1">请尝试调整筛选条件或搜索关键词</p>
                        </div>
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
            
            {displayedItems.length > 0 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-500 flex justify-between items-center font-medium">
                    <span>显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedResults.length)} 条，共 {results.length} 条</span>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded hover:bg-slate-200 disabled:opacity-30 transition">
                            <ChevronLeft size={18} />
                        </button>
                        <span className="mx-3 font-bold text-slate-700 text-base">{currentPage} / {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-slate-200 disabled:opacity-30 transition">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-16 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  <Search className="text-agri-400" size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">开始您的材料搜索</h3>
              <p className="text-slate-500 font-medium">请设置筛选条件或输入关键词进行查询</p>
        </div>
      )}

      {selectedMaterial && (
        <MaterialDetailModal material={selectedMaterial} onClose={closeDetail} />
      )}

      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-lg z-40 animate-fade-in max-w-3xl w-full mx-4 px-2 ring-1 ring-slate-900/5">
          <div className="px-4 py-3 flex items-center justify-between">
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 mr-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center mr-2">
                  <Scale size={16} className="mr-1.5"/>
                  对比栏
                </span>
                {comparisonList.map(item => (
                  <div key={item.id} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded border border-slate-200 shrink-0">
                     <span className="text-sm font-bold text-slate-700">{item.name}</span>
                     <button 
                       onClick={(e) => toggleComparison(item, e)}
                       className="text-slate-400 hover:text-red-600 transition"
                     >
                       <X size={14} />
                     </button>
                  </div>
                ))}
             </div>
             
             <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => setComparisonList([])}
                  className="text-sm text-slate-500 hover:text-slate-800 px-3 py-2 font-bold transition"
                >
                  清空
                </button>
                <button 
                  onClick={startContrast}
                  className="bg-agri-600 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-agri-700 transition flex items-center shadow-sm"
                >
                  开始对比 <ArrowRight size={16} className="ml-1" />
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};
