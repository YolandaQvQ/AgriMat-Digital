import React, { useState, useEffect } from 'react';
import { X, Layers, Box, ArrowRight, PenTool, ExternalLink } from 'lucide-react';
import { Equipment, Material } from '../types';
import { MATERIALS } from '../constants';

interface EquipmentDetailModalProps {
  equipment: Equipment;
  onClose: () => void;
  onViewMaterial: (material: Material) => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({ equipment, onClose, onViewMaterial }) => {
  const [activePartId, setActivePartId] = useState<string | null>(null);

  useEffect(() => {
    if (equipment && equipment.parts.length > 0) {
      setActivePartId(equipment.parts[0].id);
    } else {
      setActivePartId(null);
    }
  }, [equipment]);

  const activePart = equipment.parts.find(p => p.id === activePartId);
  const activeMaterial = activePart ? MATERIALS.find(m => m.id === activePart.materialId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
                    {equipment.name.charAt(0)}
                 </div>
                 <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{equipment.name}</h2>
                    <p className="text-xs text-slate-500 font-mono">{equipment.model} • {equipment.type}</p>
                 </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
            </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar: Parts List */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-3 border-b border-slate-200 bg-slate-100/50">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                        <Box size={12} className="mr-1.5" /> 组成部件 ({equipment.parts.length})
                    </h3>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                    {equipment.parts.map(part => (
                        <button 
                            key={part.id}
                            onClick={() => setActivePartId(part.id)}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all group relative ${
                                activePartId === part.id 
                                ? 'bg-white border-agri-500 shadow-sm z-10' 
                                : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200 text-slate-600'
                            }`}
                        >
                            <div className="font-bold text-slate-900 mb-0.5">{part.name}</div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>{part.category || '通用'}</span>
                                {activePartId === part.id && <ArrowRight size={12} className="text-agri-600"/>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* Visual / Description Area */}
                <div className="md:w-1/2 p-6 overflow-y-auto border-r border-slate-100">
                     <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden relative mb-6 border border-slate-800 shadow-sm group">
                         <img src={equipment.imageUrl} alt={equipment.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-3 left-3 flex items-center text-white/80 text-xs font-bold">
                             <Layers size={14} className="mr-1.5" /> 结构示意图
                         </div>
                     </div>
                     
                     <h3 className="text-sm font-bold text-slate-800 uppercase mb-2">装备简介</h3>
                     <p className="text-sm text-slate-600 leading-relaxed text-justify mb-6">
                         {equipment.description}
                     </p>

                     <div className="grid grid-cols-2 gap-3">
                         <div className="p-3 bg-slate-50 rounded border border-slate-100">
                             <span className="text-xs text-slate-500 block mb-1">所属分类</span>
                             <span className="text-sm font-bold text-slate-800">{equipment.category}</span>
                         </div>
                         <div className="p-3 bg-slate-50 rounded border border-slate-100">
                             <span className="text-xs text-slate-500 block mb-1">系统 ID</span>
                             <span className="text-sm font-bold text-slate-800 font-mono">{equipment.id}</span>
                         </div>
                     </div>
                </div>

                {/* Part Detail Area */}
                <div className="md:w-1/2 p-6 bg-white overflow-y-auto">
                    {activePart ? (
                        <div className="h-full flex flex-col">
                            <div className="flex items-center gap-2 mb-6 text-agri-600 bg-agri-50 px-3 py-1.5 rounded-lg w-fit border border-agri-100">
                                <PenTool size={16} /> 
                                <span className="text-sm font-bold">选定部件详情</span>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{activePart.name}</h3>
                            <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
                                部件编号: <span className="font-mono">{activePart.id}</span>
                            </p>

                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-6">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 block">材料规格</span>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-lg font-bold text-slate-900 mb-1">{activePart.materialName}</div>
                                        <div className="text-xs text-slate-500">
                                            {activeMaterial ? `${activeMaterial.category} • ${activeMaterial.grade || '标准等级'}` : '暂无详细材料数据'}
                                        </div>
                                    </div>
                                    {activeMaterial && (
                                        <button 
                                            onClick={() => onViewMaterial(activeMaterial)}
                                            className="text-xs flex items-center gap-1 text-agri-600 font-bold hover:underline mt-1"
                                        >
                                            查看数据表 <ExternalLink size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-auto bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-slate-600">
                                <span className="font-bold text-slate-800 block mb-1">设计说明:</span>
                                该部件采用高性能{activePart.materialName}制造，以确保在{equipment.type === '拖拉机' ? '高负荷牵引' : '恶劣作业'}环境下的可靠性与耐久性。
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-300">
                            <span className="text-sm">请选择左侧部件查看详情</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};