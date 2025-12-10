
import React, { useState, useEffect, useMemo } from 'react';
import { Box, ChevronRight, ArrowRight, Filter } from 'lucide-react';
import { EQUIPMENT } from '../constants';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Equipment, Material } from '../types';
import { EquipmentDetailModal } from '../components/EquipmentDetailModal';
import { MaterialDetailModal } from '../components/MaterialDetailModal';

const CATEGORY_HIERARCHY: Record<string, string[]> = {
  '农用动力机械': ['全部', '拖拉机', '农用内燃机', '其他农用动力机械'],
  '农用搬运机械': ['全部', '农用运输机械', '农用装卸机械', '其他农用搬运机械'],
  '农用基本建设机械': ['全部', '挖掘机械', '平地机械', '清理机械', '其他农田基本建设机械']
};

const MAJOR_CATEGORIES = Object.keys(CATEGORY_HIERARCHY);

export const EquipmentPage: React.FC = () => {
  const [majorCategory, setMajorCategory] = useState<string>(MAJOR_CATEGORIES[0]);
  const [subCategory, setSubCategory] = useState<string>('全部');

  // URL Params for Deep Linking
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedEquipmentId = searchParams.get('id');
  
  const selectedItem = useMemo(() => {
    return EQUIPMENT.find(e => e.id === selectedEquipmentId) || null;
  }, [selectedEquipmentId]);

  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    // If we have an ID from URL (deep link), ensure the filters match it so it's visible in background (optional but good UX)
    if (selectedItem) {
        setMajorCategory(selectedItem.category);
        const subs = CATEGORY_HIERARCHY[selectedItem.category];
        if (subs && subs.includes(selectedItem.type)) {
             setSubCategory(selectedItem.type);
        }
    } else if (location.state && location.state.openEquipmentId) {
       // Legacy support for route state if any
      const target = EQUIPMENT.find(e => e.id === location.state.openEquipmentId);
      if (target) {
        setSearchParams({ id: target.id });
      }
    }
  }, [selectedItem, location.state, setSearchParams]);

  const handleMajorCategoryChange = (category: string) => {
    if (category !== majorCategory) {
      setMajorCategory(category);
      setSubCategory('全部');
    }
  };

  const handleOpenDetail = (equipment: Equipment) => {
      setSearchParams({ id: equipment.id });
  };

  const handleCloseDetail = () => {
      setSearchParams(prev => {
          prev.delete('id');
          return prev;
      });
  };

  const filteredEquipment = useMemo(() => {
    return EQUIPMENT.filter(item => {
      if (item.category !== majorCategory) return false;
      if (subCategory !== '全部' && item.type !== subCategory) return false;
      return true;
    });
  }, [majorCategory, subCategory]);

  return (
    <div className="pt-24 pb-16 px-6 max-w-[1440px] mx-auto min-h-screen">
       <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">农机装备图谱</h1>
        <p className="text-slate-500 text-sm">探索农机结构，关联关键零部件与材料数据</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-5">
        
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
             <Filter size={12} className="mr-1.5" /> 大类筛选
          </h3>
          <div className="flex flex-wrap gap-2">
            {MAJOR_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleMajorCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  majorCategory === cat
                    ? 'bg-agri-600 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 border-t border-slate-50">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center">
              <ChevronRight size={12} className="mr-1.5" /> 品目细分
           </h3>
           <div className="flex flex-wrap gap-2">
              {CATEGORY_HIERARCHY[majorCategory]?.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSubCategory(sub)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    subCategory === sub
                      ? 'bg-agri-50 text-agri-700 border border-agri-200 font-bold'
                      : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
           </div>
        </div>

      </div>

      {filteredEquipment.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {filteredEquipment.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-agri-200 cursor-pointer group flex flex-col"
              onClick={() => handleOpenDetail(item)}
            >
              <div className="h-48 overflow-hidden relative shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-3 left-3">
                    <span className="text-slate-800 text-[10px] font-bold bg-white/90 backdrop-blur px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">{item.type}</span>
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2">
                   <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-agri-600 transition">{item.name}</h3>
                   <span className="text-xs text-slate-400 font-mono">Model: {item.model}</span>
                </div>
                
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">{item.description}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                    <span className="flex items-center font-bold text-slate-400 text-xs group-hover:text-slate-600 transition-colors">
                        <Box size={12} className="mr-1.5"/> 
                        {item.parts.length} 部件
                    </span>
                    <span className="text-agri-600 font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform">
                        详情 <ArrowRight size={12} className="ml-1"/>
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center text-center text-slate-400 min-h-[300px]">
           <Box size={32} className="mb-3 opacity-30" />
           <p className="text-sm">该分类下暂无装备数据</p>
        </div>
      )}

      {selectedItem && (
        <EquipmentDetailModal 
          equipment={selectedItem} 
          onClose={handleCloseDetail} 
          onViewMaterial={(material) => setViewingMaterial(material)}
        />
      )}

      {viewingMaterial && (
        <MaterialDetailModal 
          material={viewingMaterial} 
          onClose={() => setViewingMaterial(null)} 
        />
      )}
    </div>
  );
};
