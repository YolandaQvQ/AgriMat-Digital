
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Layers, Settings, MonitorPlay, Database, Cpu, Zap, ChevronRight, PlayCircle, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CASES } from '../constants';
import { Footer } from '../components/Footer';

const SlideSection = ({ children, className = "", id }: { children?: React.ReactNode, className?: string, id?: string }) => {
  return (
    <section id={id} className={`h-screen w-full snap-start shrink-0 flex flex-col pt-20 relative overflow-hidden ${className}`}>
      <div className="w-full h-full flex flex-col justify-center overflow-y-auto no-scrollbar">
         {children}
      </div>
    </section>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update active dot based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Hash changes to scroll to section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const buttonClassBase = "px-10 py-4 bg-agri-600 hover:bg-agri-500 text-white text-lg font-bold rounded-lg transition-all duration-300 shadow-lg shadow-agri-500/30 flex items-center justify-center w-fit";
  const buttonClassCenter = `${buttonClassBase} mx-auto`;

  return (
    <div className="fixed inset-0 overflow-hidden bg-white font-sans text-slate-700">
      {/* Scroll Snap Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        
        {/* 1. Hero */}
        <SlideSection id="showcase" className="bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Subtle breathing blobs */}
             <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-sky-50/80 rounded-full blur-[100px] animate-breathe opacity-60"></div>
             <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[80px] animate-breathe-slow opacity-60"></div>
             {/* Grid pattern */}
             <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
          </div>

          <motion.div 
            className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-5vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-agri-700 text-sm font-bold mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-agri-500 mr-2 animate-pulse"></span>
              AgriMat Digital v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              赋能智慧农业 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-600 to-sky-500">全链路材料数字化</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto font-normal leading-relaxed">
              集成高性能农机材料数据库、部件关联图谱、仿真模拟与 AI 寿命预测。
              为工程师打造的<span className="text-slate-900 font-medium">精准研发引擎</span>。
            </p>
            
            <div className="flex justify-center gap-5">
              <button onClick={() => scrollToSection(1)} className={buttonClassCenter}>
                开始探索 <ChevronRight className="ml-2" size={20}/>
              </button>
              <button onClick={() => navigate('/auth')} className="px-10 py-4 bg-white border border-slate-200 text-slate-700 text-lg font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                注册账号
              </button>
            </div>
          </motion.div>
        </SlideSection>

        {/* 2. Materials */}
        <SlideSection id="materials" className="bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
               <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 text-agri-600 shadow-sm border border-slate-100">
                 <Database size={32} />
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">工程材料<br/>参数图谱</h2>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                 收录 5000+ 种农机专用钢材、铝合金及涂层数据。提供化学成分、力学性能、热物理参数的深度查询与对比。
               </p>
               <ul className="space-y-4 mb-10">
                 {['GB/ASTM/JIS 多标准对照', '工况环境适应性筛选', '多材料性能雷达图对比'].map((item, i) => (
                   <li key={i} className="flex items-center text-lg text-slate-700 font-medium">
                     <div className="w-1.5 h-1.5 rounded-full bg-agri-500 mr-3"></div>
                     {item}
                   </li>
                 ))}
               </ul>
               <button onClick={() => navigate('/materials')} className={buttonClassBase}>
                 进入材料库 <ArrowRight className="ml-2" size={20} />
               </button>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="relative"
            >
               <div className="bg-white rounded-2xl p-1 shadow-xl border border-slate-200/60 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                      {/* Mock UI for Data Table */}
                      <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
                          <span className="font-bold text-slate-700">材料参数表</span>
                          <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400/20"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400/20"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400/20"></div>
                          </div>
                      </div>
                      <div className="p-6 space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                  <div className="flex flex-col">
                                      <div className="h-2 w-16 bg-slate-800 rounded mb-2 opacity-10"></div>
                                      <div className="h-2 w-24 bg-agri-500 rounded opacity-20"></div>
                                  </div>
                                  <div className="h-6 w-12 bg-slate-100 rounded"></div>
                              </div>
                          ))}
                      </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </SlideSection>

        {/* 3. Equipment */}
        <SlideSection id="equipment" className="bg-white">
           <div className="max-w-7xl mx-auto px-6 w-full text-center">
             <span className="text-agri-600 font-bold tracking-widest uppercase mb-4 block text-sm">Digital Twin</span>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">装备与零部件关联</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Layers size={32}/>, title: "整机解构", desc: "从拖拉机到收割机，可视化的多层级 BOM 结构展示。" },
                  { icon: <Settings size={32}/>, title: "关键零部件", desc: "发动机、变速箱等核心总成的详细材料工艺解析。" },
                  { icon: <MonitorPlay size={32}/>, title: "数字孪生", desc: "3D 模型与实时工况数据的深度融合与映射。" }
                ].map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-agri-200 hover:shadow-lg transition-all group text-left"
                  >
                     <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-700 mb-6 shadow-sm border border-slate-100 group-hover:text-agri-600 group-hover:scale-110 transition-transform">
                        {card.icon}
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                     <p className="text-slate-500 leading-relaxed text-sm">
                        {card.desc}
                     </p>
                  </motion.div>
                ))}
             </div>
             
             <div className="mt-16">
                <button onClick={() => navigate('/equipment')} className="px-10 py-3 border border-slate-300 text-slate-700 text-base font-bold rounded-lg hover:border-agri-500 hover:text-agri-600 transition-all bg-white">
                   浏览装备图谱
                </button>
             </div>
           </div>
        </SlideSection>

        {/* 4. Simulation (Updated Style: Light Theme) */}
        <SlideSection id="simulation" className="bg-slate-50">
           <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[100px] -translate-y-1/2"></div>
           </div>

           <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6 }}
              >
                  <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 bg-white aspect-video relative group cursor-pointer" onClick={() => navigate('/simulation')}>
                     <img src="https://picsum.photos/seed/sim_tech/800/600" alt="Simulation" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                           <PlayCircle size={40} className="text-white ml-1" />
                        </div>
                     </div>
                     <div className="absolute bottom-6 left-6">
                        <span className="text-xs font-bold text-white/90 bg-sky-500/80 px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-widest mb-2 block w-fit">CAE Visualization</span>
                        <div className="text-white font-bold text-xl text-shadow-sm">深松铲土壤切削流场分析</div>
                     </div>
                  </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 text-sky-600 shadow-sm border border-slate-200">
                   <MonitorPlay size={32} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">数字孪生 <br/>与物理场仿真</h2>
                 <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                   基于 LS-DYNA 与 Fluent 的高精度求解器展示。
                   通过视频流媒体技术，直观呈现农机触土部件在复杂工况下的应力分布与流场变化。
                 </p>
                 <button onClick={() => navigate('/simulation')} className={buttonClassBase}>
                   浏览仿真案例 <ArrowRight className="ml-2" size={20} />
                 </button>
              </motion.div>
           </div>
        </SlideSection>

        {/* 5. Performance Evaluation (Updated Style: Consistent Light Theme - REMOVED PURPLE) */}
        <SlideSection id="performance" className="bg-white">
           <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                 <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 text-agri-600 shadow-sm border border-slate-100">
                   <Cpu size={32} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">AI 驱动 <br/>智能性能预测</h2>
                 <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                   融合 Gemini 2.5 大模型与材料本构方程。
                   输入工况参数（载荷、温度、环境），毫秒级生成材料寿命预测、失效风险评估及维护建议。
                 </p>
                 <div className="flex gap-4">
                    <button onClick={() => navigate('/performance')} className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold rounded-lg transition-all duration-300 shadow-lg shadow-slate-900/30 flex items-center justify-center w-fit">
                        体验 AI 评估 <Zap className="ml-2" size={20} />
                    </button>
                    {/* Secondary button for consistency */}
                    <div className="flex items-center text-sm text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                        模型在线
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                 className="order-1 md:order-2"
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6 }}
              >
                  <div className="relative">
                      {/* Decorative Background - Changed from purple to sky/indigo */}
                      <div className="absolute -inset-4 bg-gradient-to-tr from-sky-100 to-indigo-100 rounded-3xl opacity-60 blur-2xl"></div>
                      
                      {/* Main Card */}
                      <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 relative">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-agri-50 rounded-lg text-agri-600">
                                     <Cpu size={20}/>
                                  </div>
                                  <div>
                                     <div className="font-bold text-slate-800 text-sm">Prediction Model</div>
                                     <div className="text-xs text-slate-400">Gemini-2.5 Pro</div>
                                  </div>
                              </div>
                              <div className="flex gap-1">
                                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                              </div>
                          </div>

                          {/* Content Simulation */}
                          <div className="space-y-6">
                              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <span className="text-sm font-bold text-slate-600">预计使用寿命</span>
                                  <span className="text-xl font-bold text-slate-900">4,250 <span className="text-xs font-normal text-slate-400">Hours</span></span>
                              </div>
                              
                              <div>
                                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                      <span>置信度</span>
                                      <span>98.5%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                      {/* Updated Gradient */}
                                      <div className="bg-gradient-to-r from-agri-500 to-sky-400 h-full w-[98.5%]"></div>
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                      <BarChart3 size={20} className="text-sky-500 mb-2"/>
                                      <span className="text-xs text-slate-400 font-bold">效率分析</span>
                                  </div>
                                  <div className="p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                      <TrendingUp size={20} className="text-green-500 mb-2"/>
                                      <span className="text-xs text-slate-400 font-bold">成本优化</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </motion.div>
           </div>
        </SlideSection>

        {/* 6. Cases */}
        <SlideSection id="cases" className="bg-slate-50">
           <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center">
             <div className="flex justify-between items-end mb-12">
                <div>
                   <span className="text-agri-600 font-bold tracking-widest uppercase mb-4 block text-sm">Success Stories</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-slate-900">工程应用案例</h2>
                </div>
                <button onClick={() => navigate('/cases')} className="hidden md:flex items-center text-lg font-bold text-agri-600 hover:text-agri-700 transition">
                   查看全部 <ArrowRight className="ml-2" size={20} />
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {CASES.slice(0, 3).map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-agri-200 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                    onClick={() => navigate('/cases')}
                  >
                     <div className="h-56 overflow-hidden relative shrink-0">
                        <img src={item.imageUrl} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" alt={item.title} />
                        <div className="absolute top-4 left-4">
                           <span className="bg-white/95 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded shadow-sm">
                              {item.tags[0]}
                           </span>
                        </div>
                     </div>
                     <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-agri-600 transition leading-snug">{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-1">
                           {item.summary}
                        </p>
                        <div className="text-xs text-slate-400 font-bold pt-4 border-t border-slate-100 mt-auto">
                            {item.date}
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
           </div>
        </SlideSection>

        {/* 7. Footer Section */}
        <section id="about" className="h-auto min-h-[50vh] w-full snap-start flex flex-col justify-end bg-white border-t border-slate-200">
             <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">准备好开启数字化研发了吗？</h2>
                  <p className="text-lg text-slate-500 mb-10 max-w-2xl">
                     加入 AgriMat Digital，与行业顶尖的农机工程师一起，用数据驱动每一次创新。
                  </p>
                  <div className="flex gap-4">
                     <button onClick={() => navigate('/auth')} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition shadow-lg">
                        立即注册
                     </button>
                     <button onClick={() => navigate('/materials')} className="px-8 py-3 bg-white text-slate-700 border border-slate-300 font-bold rounded-lg hover:border-slate-400 transition">
                        浏览材料库
                     </button>
                  </div>
             </div>
             <Footer />
        </section>

      </div>

      {/* Pagination Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-x-1/2 z-40 hidden md:flex flex-col gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-agri-600 scale-125' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
