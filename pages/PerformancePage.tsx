
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Loader2, AlertTriangle, CheckCircle, Activity, Lock, ArrowRight, User } from 'lucide-react';
import { predictPerformance, PredictionResult } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

export const PerformancePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const [formData, setFormData] = useState({
    materialType: '高强度合金钢',
    environment: '潮湿腐蚀环境',
    temperature: 25,
    load: 5000
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Soft Gate: If not logged in, show prompt instead of running real AI
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setLoading(true);
    try {
      const data = await predictPerformance(formData);
      setResult(data);
    } catch (err) {
      alert('评估失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setLoading(true);
    setShowLoginPrompt(false);
    // Simulate API delay for realism
    setTimeout(() => {
        setResult({
            lifespan: 3800,
            efficiency: 82,
            riskAnalysis: "演示数据：在当前高湿环境下，未处理表面可能在2000小时后出现点蚀。",
            maintenanceAdvice: "演示数据：建议定期进行喷丸处理以提高表面压应力。"
        });
        setLoading(false);
    }, 1500);
  };

  // Chart data preparation
  const chartData = result ? [
    { name: '预期寿命 (h)', value: result.lifespan, fullMark: 5000 },
    { name: '效率保持 (%)', value: result.efficiency, fullMark: 100 },
  ] : [];

  const radarData = result ? [
     { subject: '耐磨性', A: 80, fullMark: 100 },
     { subject: '抗腐蚀', A: result.efficiency, fullMark: 100 },
     { subject: '承载力', A: 90, fullMark: 100 },
     { subject: '热稳性', A: 70, fullMark: 100 },
     { subject: '寿命', A: Math.min(result.lifespan / 50, 100), fullMark: 100 },
  ] : [];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">性能评价系统 <span className="text-sm font-normal text-agri-600 bg-agri-50 px-2 py-1 rounded-md ml-2 border border-agri-100">AI Powered</span></h1>
            <p className="text-slate-600">基于机器学习算法预测农机材料在特定工况下的服役表现。</p>
        </div>
        {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <User size={16} />
                <span>访客模式</span>
            </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
            <h2 className="font-bold text-lg mb-6 flex items-center">
                工况参数设置
                {!isLoggedIn && <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">预览</span>}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">材料类型</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-agri-500/20 focus:border-agri-500 outline-none transition"
                  value={formData.materialType}
                  onChange={e => setFormData({...formData, materialType: e.target.value})}
                >
                  <option>高强度合金钢</option>
                  <option>耐磨铝合金</option>
                  <option>工程塑料</option>
                  <option>陶瓷涂层</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">环境条件</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-agri-500/20 focus:border-agri-500 outline-none transition"
                  value={formData.environment}
                  onChange={e => setFormData({...formData, environment: e.target.value})}
                >
                  <option>干燥常温环境</option>
                  <option>潮湿腐蚀环境</option>
                  <option>高粉尘磨粒环境</option>
                  <option>交变载荷环境</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">工作温度 (°C)</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-agri-500/20 focus:border-agri-500 outline-none transition"
                  value={formData.temperature}
                  onChange={e => setFormData({...formData, temperature: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">工作负载 (N)</label>
                <input 
                  type="number" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-agri-500/20 focus:border-agri-500 outline-none transition"
                  value={formData.load}
                  onChange={e => setFormData({...formData, load: Number(e.target.value)})}
                />
              </div>

              <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-agri-600 text-white py-3.5 rounded-lg font-bold hover:bg-agri-500 transition shadow-lg shadow-agri-500/20 flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? <><Loader2 className="animate-spin mr-2" size={20}/> 正在推理...</> : '开始智能评估'}
                  </button>
                  {!isLoggedIn && (
                      <p className="text-center text-xs text-slate-400 mt-3">需登录以使用 AI 实时预测</p>
                  )}
              </div>
            </form>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="lg:col-span-8 relative">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Text Analysis Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-100 p-5 rounded-xl shadow-sm">
                  <h3 className="text-red-800 font-bold flex items-center mb-2"><AlertTriangle size={18} className="mr-2"/> 风险分析</h3>
                  <p className="text-red-700 text-sm leading-relaxed">{result.riskAnalysis}</p>
                </div>
                <div className="bg-green-50 border border-green-100 p-5 rounded-xl shadow-sm">
                  <h3 className="text-green-800 font-bold flex items-center mb-2"><CheckCircle size={18} className="mr-2"/> 维护建议</h3>
                  <p className="text-green-700 text-sm leading-relaxed">{result.maintenanceAdvice}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 h-80">
                   <h4 className="text-sm font-bold text-slate-500 mb-4 text-center">综合性能雷达图</h4>
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{fontSize: 12, fill: '#64748b'}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Performance" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.5} />
                      </RadarChart>
                   </ResponsiveContainer>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 h-80">
                  <h4 className="text-sm font-bold text-slate-500 mb-4 text-center">核心指标预测</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{top: 5, right: 30, left: 40, bottom: 5}}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} style={{fontSize: '12px', fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={32}>
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
               {/* Background decoration */}
               <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px]"></div>
               
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6 z-10">
                  <Activity size={40} className="text-agri-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-700 mb-2 z-10">等待输入</h3>
               <p className="text-sm max-w-xs text-center z-10">在左侧面板配置工况参数，点击"开始智能评估"获取 AI 预测报告。</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Prompt Modal for Guest Users */}
      {showLoginPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-white/50 relative">
                  <div className="w-16 h-16 bg-agri-50 rounded-full flex items-center justify-center mx-auto mb-6 text-agri-600">
                      <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">需要登录</h2>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                      您正在使用高级 AI 预测功能。请登录以访问实时大模型推理、保存历史记录并导出详细报告。
                  </p>
                  
                  <div className="space-y-3">
                      <button 
                          onClick={() => navigate('/auth')}
                          className="w-full py-3.5 bg-agri-600 text-white rounded-xl font-bold hover:bg-agri-500 transition shadow-lg shadow-agri-500/20 flex items-center justify-center"
                      >
                          立即登录 / 注册 <ArrowRight size={18} className="ml-2"/>
                      </button>
                      
                      <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-slate-100"></div>
                          <span className="flex-shrink-0 mx-4 text-slate-300 text-xs">或者</span>
                          <div className="flex-grow border-t border-slate-100"></div>
                      </div>

                      <button 
                          onClick={handleDemo}
                          className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition"
                      >
                          先加载演示数据看看
                      </button>
                  </div>

                  <button 
                      onClick={() => setShowLoginPrompt(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
                  >
                      ✕
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};
