import React, { useState } from 'react';
import { SIMULATIONS } from '../constants';
import { Play, Info, Settings, FileText, BarChart3, TrendingUp, TrendingDown, Minus, Pause, RefreshCw, X } from 'lucide-react';

export const SimulationPage: React.FC = () => {
  const [activeSim, setActiveSim] = useState(SIMULATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset playing state when switching simulations
  React.useEffect(() => {
      setIsPlaying(false);
  }, [activeSim]);

  const renderTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch(trend) {
        case 'up': return <TrendingUp size={16} className="text-red-500" />;
        case 'down': return <TrendingDown size={16} className="text-green-500" />;
        default: return <Minus size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen bg-white">
      {/* 
        Layout Change: 
        Instead of a fixed height container with overflow-hidden, 
        we use a standard grid where the sidebar is Sticky and the content flows naturally.
      */}
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar List (Sticky) */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
            <h2 className="font-bold text-slate-800 flex items-center text-sm">
                <BarChart3 size={18} className="mr-2 text-agri-600"/>
                数字孪生仿真案例
            </h2>
          </div>
          <div className="p-2 space-y-2">
            {SIMULATIONS.map(sim => (
              <button
                key={sim.id}
                onClick={() => {
                    setActiveSim(sim);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left p-3 rounded-lg transition flex items-start gap-3 group ${
                  activeSim.id === sim.id 
                    ? 'bg-agri-50 border border-agri-200 shadow-sm' 
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="relative shrink-0 w-16 h-12">
                    <img src={sim.thumbnail} className="w-full h-full object-cover rounded-md bg-slate-200" alt="" />
                    {activeSim.id === sim.id && <div className="absolute inset-0 bg-agri-600/10 rounded-md ring-2 ring-agri-500 ring-offset-1"></div>}
                </div>
                <div>
                  <h3 className={`font-bold text-sm line-clamp-2 leading-tight ${activeSim.id === sim.id ? 'text-agri-800' : 'text-slate-700'}`}>
                    {sim.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 group-hover:text-agri-500/70">{sim.id}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Natural Document Flow */}
        <div className="lg:col-span-3 min-h-screen">
          
          {/* Header */}
          <div className="mb-6 border-b border-slate-100 pb-4">
             <div className="flex items-center gap-2 mb-2">
                 <span className="px-2 py-0.5 bg-tech-100 text-tech-700 text-xs font-bold rounded border border-tech-200">Simulation Case</span>
                 <span className="text-xs text-slate-400 font-mono">ID: {activeSim.id}</span>
             </div>
             <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{activeSim.title}</h1>
          </div>

          {/* 1. Visual Player (Video/Image) */}
          <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden relative group aspect-video w-full mb-8 border border-slate-800 ring-1 ring-slate-900/5">
             {isPlaying && activeSim.videoUrl ? (
                <div className="w-full h-full bg-black relative">
                    <video 
                        src={activeSim.videoUrl} 
                        className="w-full h-full object-contain" 
                        controls 
                        autoPlay 
                        onEnded={() => setIsPlaying(false)}
                    />
                    <button 
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                    >
                        <X size={20} />
                    </button>
                </div>
             ) : (
                <>
                    <img src={activeSim.thumbnail} alt={activeSim.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                            onClick={() => setIsPlaying(true)}
                            className="flex items-center gap-2 px-8 py-3 bg-agri-600/90 text-white rounded-full font-bold shadow-lg hover:bg-agri-500 hover:scale-105 transition transform backdrop-blur-sm border border-white/20 group/btn"
                        >
                            <Play size={24} fill="currentColor" className="text-white group-hover/btn:ml-1 transition-all" /> 
                            {activeSim.videoUrl ? '运行仿真演示' : '查看演示图'}
                        </button>
                    </div>
                    {/* Overlay UI */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start pointer-events-none">
                        <span className="text-white/90 font-mono text-xs bg-black/40 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">LIVE PREVIEW</span>
                    </div>
                </>
             )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column: Text & Metrics */}
              <div className="md:col-span-2 space-y-8">
                  
                  {/* 2. Analysis Text */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase mb-3 flex items-center">
                        <FileText size={18} className="mr-2 text-agri-600" /> 案例背景与分析
                    </h3>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <p className="text-slate-600 leading-relaxed text-sm text-justify">
                            {activeSim.description}
                        </p>
                    </div>
                  </div>

                  {/* 3. Key Metrics */}
                  {activeSim.resultMetrics && (
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase mb-3 flex items-center">
                            <BarChart3 size={18} className="mr-2 text-agri-600" /> 关键仿真指标
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.entries(activeSim.resultMetrics).map(([key, data]: [string, { value: string; unit: string; trend?: 'up' | 'down' | 'neutral' }]) => (
                                <div key={key} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-agri-200 transition group">
                                    <div className="text-xs text-slate-500 font-bold mb-2 flex items-center justify-between">
                                        {key}
                                        {renderTrendIcon(data.trend)}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-slate-900 group-hover:text-agri-600 transition-colors">{data.value}</span>
                                        <span className="text-xs text-slate-400 font-medium">{data.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  )}
              </div>

              {/* Right Column: Specs */}
              <div className="md:col-span-1">
                   {/* 4. Specification Table */}
                   <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center">
                                <Settings size={16} className="mr-2 text-agri-600" /> 求解参数表
                            </h3>
                        </div>
                        <table className="w-full text-xs">
                            <tbody className="divide-y divide-slate-100">
                                {Object.entries(activeSim.specs).map(([key, value]) => (
                                    <tr key={key} className="hover:bg-slate-50/50">
                                        <td className="p-3 text-slate-500 font-medium bg-slate-50/30 w-1/3 border-r border-slate-50 pl-4">{key}</td>
                                        <td className="p-3 text-slate-800 font-mono pl-4">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   </div>
              </div>
          </div>

        </div>

      </div>
    </div>
  );
};