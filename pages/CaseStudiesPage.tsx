import React, { useState } from 'react';
import { CASES } from '../constants';
import { CaseStudy } from '../types';
import { Calendar, ArrowUpRight, X, Tag, Clock } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
       <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">工程应用案例库</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">记录从实验室到田间地头的每一次技术革新。</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASES.map(item => (
          <div 
            key={item.id} 
            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedCase(item)}
          >
            <div className="relative h-56 overflow-hidden">
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {item.tags[0]}
               </div>
            </div>
            <div className="p-6">
               <div className="flex items-center text-xs text-slate-400 mb-3">
                 <Calendar size={12} className="mr-1" /> {item.date}
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-agri-700 transition line-clamp-2 h-14">{item.title}</h3>
               <p className="text-slate-600 text-sm line-clamp-3 mb-6 h-16 leading-relaxed">{item.summary}</p>
               
               <button className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-agri-50 flex items-center justify-center group-hover:border-agri-200 group-hover:text-agri-700 transition-colors">
                 阅读详情 <ArrowUpRight size={14} className="ml-1" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
           <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setSelectedCase(null)}></div>
           
           <div className="relative bg-white w-full h-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
              
              {/* Header / Toolbar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex justify-end items-center p-4 pointer-events-none">
                 {/* Close Button moved to right */}
                 <button 
                   onClick={() => setSelectedCase(null)}
                   className="pointer-events-auto p-2 bg-white/20 hover:bg-white text-white rounded-full backdrop-blur-md transition shadow-lg hover:text-slate-900"
                 >
                   <X size={24} />
                 </button>
              </div>

              {/* Content Container - Scrollable */}
              <div className="overflow-y-auto h-full bg-white custom-scrollbar">
                 
                 {/* Hero Image Area */}
                 <div className="relative h-[40vh] md:h-[50vh]">
                    <img 
                      src={selectedCase.imageUrl} 
                      className="w-full h-full object-cover" 
                      alt={selectedCase.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-4xl">
                       <div className="flex flex-wrap gap-2 mb-4">
                          {selectedCase.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-agri-600 text-white text-xs font-bold rounded shadow-sm">
                                {tag}
                             </span>
                          ))}
                       </div>
                       <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-sm">
                          {selectedCase.title}
                       </h1>
                       <div className="flex items-center text-slate-300 text-sm gap-6">
                          <span className="flex items-center"><Calendar size={16} className="mr-2"/> {selectedCase.date}</span>
                          <span className="flex items-center"><Clock size={16} className="mr-2"/> 预计阅读 5 分钟</span>
                       </div>
                    </div>
                 </div>

                 {/* Article Body */}
                 <div className="max-w-3xl mx-auto px-6 py-12">
                    <div className="prose prose-lg prose-slate max-w-none">
                       <p className="lead text-xl text-slate-600 mb-8 font-medium border-l-4 border-agri-500 pl-4 italic">
                          {selectedCase.summary}
                       </p>
                       
                       {/* HTML Content Rendering */}
                       <div 
                         dangerouslySetInnerHTML={{ __html: selectedCase.content || '<p>暂无详细内容。</p>' }} 
                         className="space-y-6 text-slate-700 leading-relaxed"
                       />

                       {/* Example Footer for Article */}
                       <div className="mt-12 pt-8 border-t border-slate-100">
                          <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                             <Tag size={18} className="mr-2 text-agri-600"/> 相关技术标签
                          </h4>
                          <div className="flex flex-wrap gap-2">
                             {selectedCase.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm hover:bg-slate-100 cursor-pointer transition">
                                   #{tag}
                                </span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      )}
    </div>
  );
};