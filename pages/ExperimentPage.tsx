
import React, { useState } from 'react';
import { EXPERIMENTS } from '../constants';
import { Experiment } from '../types';
import { Search, Filter, Beaker, CheckCircle, Clock, AlertCircle, FileText, ChevronRight, X, LineChart as IconLineChart, Printer, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const ExperimentPage: React.FC = () => {
  const [filterType, setFilterType] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);

  const filteredExperiments = EXPERIMENTS.filter(exp => {
    const matchesType = filterType === '全部' || exp.type === filterType;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.testCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.materialName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-[1440px] mx-auto min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">实验测试数据</h1>
          <p className="text-slate-600 text-base">
            实验室真实测试数据存档，包含力学、耐久性及环境适应性测试报告。
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 pr-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Beaker size={20} />
                </div>
                <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">总测试</div>
                    <div className="text-xl font-bold text-slate-900">{EXPERIMENTS.length}</div>
                </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 pr-6">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <CheckCircle size={20} />
                </div>
                <div>
                    <div className="text-xs text-slate-500 font-bold uppercase">已完成</div>
                    <div className="text-xl font-bold text-slate-900">{EXPERIMENTS.filter(e => e.status === 'Completed').length}</div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-24">
            <div className="mb-6 relative">
                <input 
                  type="text" 
                  placeholder="搜索实验编号、材料..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-agri-500 outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>

            <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">测试类型</h3>
                {['全部', '力学测试', '耐久性测试', '环境测试', '物理性能'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition flex justify-between items-center ${
                            filterType === type 
                            ? 'bg-agri-50 text-agri-700 border border-agri-100' 
                            : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                        {type}
                        {filterType === type && <ChevronRight size={16} />}
                    </button>
                ))}
            </div>
        </div>

        {/* List / Grid Area */}
        <div className="lg:col-span-3 space-y-4">
            {filteredExperiments.length > 0 ? (
                filteredExperiments.map(exp => (
                    <div 
                        key={exp.id} 
                        onClick={() => setSelectedExp(exp)}
                        className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-agri-300 transition cursor-pointer group flex flex-col md:flex-row gap-6 items-start md:items-center"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getStatusColor(exp.status)}`}>
                                    {exp.status}
                                </span>
                                <span className="text-xs font-mono text-slate-400">{exp.testCode}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-agri-600 transition">
                                {exp.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                    <Beaker size={14} className="text-slate-400"/> {exp.materialName}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                    <FileText size={14} className="text-slate-400"/> {exp.standard}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                    <Clock size={14} className="text-slate-400"/> {exp.date}
                                </span>
                            </div>
                        </div>
                        
                        {/* Mini Chart Preview (Fake visual indicator) */}
                        <div className="shrink-0 hidden md:flex flex-col items-end gap-2">
                             <div className="h-12 w-24 bg-slate-50 rounded border border-slate-100 flex items-end justify-center pb-1 gap-0.5">
                                 <div className="w-1 bg-agri-200 h-[40%]"></div>
                                 <div className="w-1 bg-agri-300 h-[70%]"></div>
                                 <div className="w-1 bg-agri-400 h-[50%]"></div>
                                 <div className="w-1 bg-agri-500 h-[80%]"></div>
                                 <div className="w-1 bg-agri-600 h-[60%]"></div>
                             </div>
                             <span className="text-xs font-bold text-agri-600 flex items-center group-hover:translate-x-1 transition-transform">
                                查看详情 <ChevronRight size={14} />
                             </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="bg-white rounded-xl p-16 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <Beaker size={48} className="opacity-20 mb-4" />
                    <p>未找到符合条件的实验数据</p>
                </div>
            )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-900/5">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-xl font-bold text-slate-900">{selectedExp.title}</h2>
                            <span className="px-2 py-0.5 bg-agri-100 text-agri-700 text-xs font-bold rounded border border-agri-200">
                                {selectedExp.type}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">ID: {selectedExp.testCode}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 hover:text-agri-600 transition" title="打印报告">
                            <Printer size={20} />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 hover:text-agri-600 transition" title="导出数据">
                            <Download size={20} />
                        </button>
                        <div className="w-px bg-slate-300 mx-1 h-6 self-center"></div>
                        <button onClick={() => setSelectedExp(null)} className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left: Metadata & Conditions */}
                        <div className="lg:col-span-1 space-y-8">
                             <div>
                                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-agri-500 pl-3 mb-4">基本信息</h3>
                                 <table className="w-full text-sm">
                                     <tbody className="divide-y divide-slate-100">
                                         <tr><td className="py-2 text-slate-500">测试对象</td><td className="py-2 font-bold text-slate-900 text-right">{selectedExp.materialName}</td></tr>
                                         <tr><td className="py-2 text-slate-500">执行标准</td><td className="py-2 font-mono text-slate-700 text-right">{selectedExp.standard}</td></tr>
                                         <tr><td className="py-2 text-slate-500">测试日期</td><td className="py-2 font-mono text-slate-700 text-right">{selectedExp.date}</td></tr>
                                         <tr><td className="py-2 text-slate-500">操作人员</td><td className="py-2 text-slate-700 text-right">{selectedExp.operator}</td></tr>
                                     </tbody>
                                 </table>
                             </div>

                             <div>
                                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-blue-500 pl-3 mb-4">实验条件</h3>
                                 <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                     {Object.entries(selectedExp.conditions).map(([key, value]) => (
                                         <div key={key} className="flex justify-between mb-2 last:mb-0 text-sm">
                                             <span className="text-slate-500">{key}</span>
                                             <span className="font-mono font-bold text-slate-800">{value}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>

                             <div>
                                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-green-500 pl-3 mb-4">关键结果</h3>
                                 <div className="grid grid-cols-1 gap-2">
                                     {Object.entries(selectedExp.results).map(([key, value]) => (
                                         <div key={key} className="bg-white border border-slate-200 p-3 rounded-lg flex justify-between items-center shadow-sm">
                                             <span className="text-xs font-bold text-slate-500 uppercase">{key}</span>
                                             <span className="text-base font-bold text-slate-900">{value}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>

                        {/* Right: Charts & Visualization */}
                        <div className="lg:col-span-2">
                             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 h-[400px] flex flex-col mb-6">
                                 <div className="flex justify-between items-center mb-4">
                                     <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                         <IconLineChart size={18} className="text-agri-600"/> 数据可视化
                                     </h4>
                                     <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Origin Data</span>
                                 </div>
                                 <div className="flex-1 w-full min-h-0">
                                     <ResponsiveContainer width="100%" height="100%">
                                         {selectedExp.chartType === 'bar' ? (
                                             <BarChart data={selectedExp.chartData}>
                                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                 <XAxis dataKey={selectedExp.chartConfig?.xKey} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} label={{ value: selectedExp.chartConfig?.xLabel, position: 'insideBottom', offset: -5, fontSize: 12 }} />
                                                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} label={{ value: selectedExp.chartConfig?.yLabel, angle: -90, position: 'insideLeft', fontSize: 12 }} />
                                                 <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                                 <Bar dataKey={selectedExp.chartConfig?.yKey || ''} fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                                             </BarChart>
                                         ) : (
                                             <LineChart data={selectedExp.chartData}>
                                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                 <XAxis dataKey={selectedExp.chartConfig?.xKey} type="number" domain={['dataMin', 'auto']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} label={{ value: selectedExp.chartConfig?.xLabel, position: 'insideBottom', offset: -5, fontSize: 12 }} />
                                                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} label={{ value: selectedExp.chartConfig?.yLabel, angle: -90, position: 'insideLeft', fontSize: 12 }} />
                                                 <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                                 <Line type="monotone" dataKey={selectedExp.chartConfig?.yKey || ''} stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 0}} activeDot={{r: 6}} />
                                             </LineChart>
                                         )}
                                     </ResponsiveContainer>
                                 </div>
                             </div>

                             {selectedExp.imageUrl && (
                                 <div>
                                     <h4 className="text-sm font-bold text-slate-800 mb-3">试样照片/显微组织</h4>
                                     <div className="h-48 w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                         <img src={selectedExp.imageUrl} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="Specimen" />
                                     </div>
                                 </div>
                             )}
                        </div>

                    </div>
                </div>

             </div>
        </div>
      )}

    </div>
  );
};
