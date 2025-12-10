
import React, { useState, useMemo } from 'react';
import { PenTool, Truck, X, ArrowRight } from 'lucide-react';
import { EQUIPMENT, MATERIALS } from '../constants';
import { Equipment, Material } from '../types';
import { MaterialDetailModal } from '../components/MaterialDetailModal';
import { EquipmentDetailModal } from '../components/EquipmentDetailModal';

export const PartsPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<any | null>(null);
  const [filterCategory, setFilterCategory] = useState('全部');
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [viewingEquipment, setViewingEquipment] = useState<Equipment | null>(null);

  const allParts = useMemo(() => {
    const partsList: any[] = [];
    EQUIPMENT.forEach(eq => {
      eq.parts.forEach(part => {
        const material = MATERIALS.find(m => m.id === part.materialId);
        partsList.push({
          ...part,
          equipment: eq,
          materialDetail: material,
          category: part.category || '其他'
        });
      });
    });
    return partsList;
  }, []);

  const partCategories = useMemo(() => {
    const categories = new Set(allParts.map(p => p.category));
    return ['全部', ...Array.from(categories)];
  }, [allParts]);

  const filteredParts = filterCategory === '全部' 
    ? allParts 
    : allParts.filter(p => p.category === filterCategory);

  return (
    <div className="pt-24 pb-16 px-4 max-w-[1440px] mx-auto min-h-screen">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">关键零件库</h1>
        <p className="text-slate-600 text-base font-light">展示关键零部件、主要材料构成及应用装备。</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {partCategories.map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition shadow-sm ${
              filterCategory === category
                ? 'bg-agri-600 text-white shadow-md transform scale-105'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-agri-500 hover:text-agri-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredParts.map((item, index) => (
          <div 
            key={item.id + index} 
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 cursor-pointer group"
            onClick={() => setSelectedPart(item)}
          >
            <div className="aspect-square bg-slate-50 relative overflow-hidden p-6 flex items-center justify-center">
                <img 
                  src={`https://picsum.photos/seed/${item.id}/400/400`} 
                  className="w-full h-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition duration-700" 
                  alt={item.name} 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm border border-white/50">
                  {item.category}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-agri-600 transition">{item.name}</h3>
                <p className="text-xs text-slate-400 mb-3 font-mono">ID: {item.id}</p>
                <div className="flex items-center text-xs text-agri-700 font-bold bg-agri-50 px-3 py-1.5 rounded-lg w-fit border border-agri-100">
                   <PenTool size={12} className="mr-1.5" /> {item.materialName}
                </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedPart(null)}></div>
           
           <div className="relative bg-slate-50 w-full h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-[1200px] max-h-[85vh] mx-auto z-10">
              
              <div className="absolute top-4 right-4 z-30">
                <button 
                  onClick={() => setSelectedPart(null)} 
                  className="p-2 bg-white/90 hover:bg-white text-slate-600 rounded-full shadow-md transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="w-full md:w-5/12 bg-slate-200 relative h-64 md:h-full shrink-0 group">
                 <img 
                   src={`https://picsum.photos/seed/${selectedPart.id}/800/1200`} 
                   alt={selectedPart.name} 
                   className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <span className="inline-block px-3 py-1 rounded-lg bg-agri-500 text-white text-sm font-bold mb-2 shadow-sm">{selectedPart.category}</span>
                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{selectedPart.name}</h2>
                    <p className="text-white/80 text-sm font-mono">部件编号: {selectedPart.id}</p>
                 </div>
              </div>

              <div className="w-full md:w-7/12 bg-white flex flex-col h-full overflow-y-auto">
                 <div className="p-8 space-y-8 flex-1">
                    
                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center tracking-widest">
                         <PenTool size={16} className="mr-2" /> 材料组成
                       </h3>
                       {selectedPart.materialDetail ? (
                         <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group/card cursor-pointer" onClick={() => setViewingMaterial(selectedPart.materialDetail)}>
                            <div className="flex gap-5 items-start">
                                <img 
                                  src={selectedPart.materialDetail.imageUrl} 
                                  className="w-20 h-20 rounded-xl object-cover shadow-sm border border-slate-100" 
                                  alt={selectedPart.materialName} 
                                />
                                <div className="flex-1">
                                   <div className="flex justify-between items-start mb-2">
                                      <h4 className="text-xl font-bold text-slate-900 group-hover/card:text-agri-600 transition">{selectedPart.materialDetail.name}</h4>
                                      <div className="flex gap-2">
                                          <span className="px-3 py-1 bg-agri-50 text-agri-700 text-xs rounded-lg border border-agri-100 font-bold">
                                            {selectedPart.materialDetail.category}
                                          </span>
                                      </div>
                                   </div>
                                   <div className="text-sm text-slate-500 mb-3 font-mono">
                                       牌号: {selectedPart.materialDetail.grade || '-'}
                                   </div>
                                   <div 
                                      className="text-sm font-bold text-agri-600 flex items-center group-hover/card:translate-x-1 transition-transform"
                                   >
                                      查看详细参数 <ArrowRight size={16} className="ml-1"/>
                                   </div>
                                </div>
                            </div>
                         </div>
                       ) : (
                         <div className="p-5 bg-slate-50 rounded-2xl text-slate-500 text-sm">暂无详细材料数据</div>
                       )}
                    </div>

                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center tracking-widest">
                         <Truck size={16} className="mr-2" /> 所属装备
                       </h3>
                       <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group/card cursor-pointer" onClick={() => setViewingEquipment(selectedPart.equipment)}>
                          <div className="flex gap-5 items-start">
                              <img 
                                src={selectedPart.equipment.imageUrl} 
                                className="w-20 h-20 rounded-xl object-cover shadow-sm border border-slate-100" 
                                alt={selectedPart.equipment.name} 
                              />
                              <div className="flex-1">
                                 <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover/card:text-tech-600 transition">{selectedPart.equipment.name}</h4>
                                 <p className="text-sm text-slate-500 mb-3">{selectedPart.equipment.model}</p>
                                 <div 
                                    className="text-sm font-bold text-tech-600 flex items-center group-hover/card:translate-x-1 transition-transform"
                                 >
                                    查看装备图谱 <ArrowRight size={16} className="ml-1"/>
                                 </div>
                              </div>
                          </div>
                       </div>
                    </div>

                 </div>
                 
                 <div className="mt-auto border-t border-slate-100 p-6 flex justify-end bg-slate-50 sticky bottom-0 z-20">
                    <button 
                      onClick={() => setSelectedPart(null)}
                      className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 font-bold transition shadow-sm text-sm"
                    >
                      关闭窗口
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {viewingEquipment && (
        <EquipmentDetailModal 
            equipment={viewingEquipment} 
            onClose={() => setViewingEquipment(null)} 
            onViewMaterial={(m) => setViewingMaterial(m)}
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
