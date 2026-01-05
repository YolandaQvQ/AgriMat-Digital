import React, { useState } from 'react';
import { X, Share2, Download, FileText, Loader2, Database, ShieldCheck } from 'lucide-react';
import { Material } from '../types';

interface MaterialDetailModalProps {
  material: Material;
  onClose: () => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({ material, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);

  // 动态渲染数据组的辅助组件
  const SpecSection: React.FC<{ title: string, data?: Record<string, string> }> = ({ title, data }) => {
    if (!data || Object.keys(data).length === 0) return null;
    return (
      <div className="mb-10 break-inside-avoid">
        <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
          {title}
          <div className="flex gap-1">
             <span className="w-1 h-1 rounded-full bg-agri-300"></span>
             <span className="w-1 h-1 rounded-full bg-agri-500"></span>
          </div>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2.5 border-b border-slate-50 items-center group">
              <span className="text-slate-500 text-[14px] font-medium transition-colors group-hover:text-slate-900">{key}</span>
              <span className="text-slate-900 font-mono font-bold text-[15px] bg-slate-50 px-2.5 py-1 rounded tabular-nums tracking-tight">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-white/20">
        
        {/* 专业表头 */}
        <div className="bg-slate-900 text-white px-10 py-8 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-agri-400 border border-agri-400/30 px-3 py-1 rounded-full bg-agri-400/5">
                Technical Data Sheet
              </span>
              <span className="text-[10px] font-mono text-slate-500 tracking-wider">UID: {material.id}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {material.name} <span className="text-agri-400 ml-3 font-mono font-medium">{material.grade}</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button className="p-3 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white border border-transparent hover:border-white/10">
              <Share2 size={22} />
            </button>
            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white border border-transparent hover:border-white/10">
              <X size={28} />
            </button>
          </div>
        </div>

        {/* 内容滚动区 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* 左侧：基本面 */}
            <div className="lg:col-span-4 space-y-10">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
                <img src={material.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={material.name} />
              </div>
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Database size={64} />
                </div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                  <Database size={20} className="text-agri-500" /> 材料描述
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed text-justify">
                  {material.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-lg">
                  <ShieldCheck size={20} className="text-agri-500" /> 典型应用
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {material.applicationParts.map(part => (
                    <span key={part} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 shadow-sm hover:border-agri-300 transition-colors">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：技术参数表 (核心动态区) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl">
                {Object.entries(material.technicalSpecifications).map(([sectionTitle, data]) => (
                  <SpecSection key={sectionTitle} title={sectionTitle} data={data as Record<string, string>} />
                ))}
              </div>
              
              <div className="mt-16 pt-10 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 uppercase tracking-[0.3em] font-bold">
                <span className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   AgriMat Digital Certification
                </span>
                <span>Verification: Passed</span>
              </div>
            </div>

          </div>
        </div>

        {/* 底部操作条 */}
        <div className="bg-slate-50 border-t border-slate-100 px-10 py-6 flex justify-between items-center shrink-0">
          <div className="text-[13px] text-slate-400 font-medium">
            数据最后更新: {new Date().toLocaleDateString()}
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2.5 px-7 py-3 text-[15px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition shadow-sm">
              <Download size={18} /> 导出 CSV
            </button>
            <button className="flex items-center gap-2.5 px-7 py-3 text-[15px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition shadow-lg shadow-slate-900/10">
              <FileText size={18} /> 下载 PDF 报告
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};