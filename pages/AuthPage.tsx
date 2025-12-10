import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Leaf, Smartphone, MessageSquare, CheckCircle } from 'lucide-react';

type LoginMethod = 'password' | 'phone';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    code: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePhone = (): boolean => {
    const { phone } = formData;
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: "请输入手机号码" }));
      return false;
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setErrors(prev => ({ ...prev, phone: "请输入有效的11位手机号码" }));
      return false;
    }
    return true;
  };

  const handleSendCode = () => {
    if (countdown > 0) return; 
    if (!validatePhone()) return;
    setCountdown(60);
    setToastMessage(`验证码已发送至 ${formData.phone}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (loginMethod === 'password') {
       if (!formData.email) {
         newErrors.email = "请输入电子邮箱";
         isValid = false;
       }
       if (!formData.password) {
         newErrors.password = "请输入密码";
         isValid = false;
       }
    } else {
       if (!formData.phone) {
         newErrors.phone = "请输入手机号码";
         isValid = false;
       } else {
          const phoneRegex = /^1[3-9]\d{9}$/;
          if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "手机号格式不正确";
            isValid = false;
          }
       }

       if (!formData.code) {
         newErrors.code = "请输入验证码";
         isValid = false;
       }
    }

    setErrors(newErrors);
    if (!isValid) return;

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/performance');
  };

  const toggleMethod = (method: LoginMethod) => {
      setLoginMethod(method);
      setErrors({}); 
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white relative">
      
      {toastMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-fade-in">
           <div className="bg-white px-8 py-5 rounded-2xl shadow-2xl border border-agri-100 flex flex-col items-center gap-3 min-w-[240px]">
              <div className="w-12 h-12 bg-agri-50 rounded-full flex items-center justify-center">
                 <CheckCircle size={28} className="text-agri-500 fill-agri-50" />
              </div>
              <span className="text-slate-700 font-bold text-lg">{toastMessage}</span>
           </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-1/2 relative bg-sky-500 h-full">
        <img 
          src="https://picsum.photos/seed/agritech/1200/1600" 
          alt="Agriculture Technology" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-600 via-agri-500 to-sky-300 opacity-90"></div>
        
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 text-white">
           <div className="mb-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-sm font-bold mb-6 backdrop-blur-md">
                <Leaf size={14} className="mr-2" /> 智慧农业 · 数据驱动
              </div>
              <h1 className="text-6xl font-bold leading-tight mb-6 tracking-tight">
                AgriMat <span className="text-sky-100">Digital</span>
              </h1>
              <p className="text-2xl text-sky-50 max-w-lg leading-relaxed font-light">
                构建下一代农机装备材料数字化生态系统，连接数据、仿真与性能评价。
              </p>
           </div>
           <div className="flex gap-2">
              <div className="h-1.5 w-12 bg-white rounded-full"></div>
              <div className="h-1.5 w-3 bg-white/50 rounded-full"></div>
              <div className="h-1.5 w-3 bg-white/50 rounded-full"></div>
           </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white relative">
        <div className="min-h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-24 lg:pt-20">
            <div className="w-full max-w-md">
            
            <div className="lg:hidden mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900">AgriMat Digital</h1>
                <p className="text-slate-500 text-base mt-2">农机装备材料数字化平台</p>
            </div>

            <div className="mb-10">
                <h2 className="text-4xl font-bold text-slate-900 mb-3">欢迎回来</h2>
                <p className="text-slate-500 text-lg mb-8">请输入您的凭证以访问平台。</p>
                
                <div className="flex gap-8 border-b border-slate-100">
                    <button 
                        onClick={() => toggleMethod('password')}
                        className={`pb-4 text-base font-bold transition-all border-b-2 ${
                            loginMethod === 'password' 
                            ? 'text-agri-600 border-agri-600' 
                            : 'text-slate-400 border-transparent hover:text-slate-600'
                        }`}
                    >
                        密码登录
                    </button>
                    <button 
                        onClick={() => toggleMethod('phone')}
                        className={`pb-4 text-base font-bold transition-all border-b-2 ${
                            loginMethod === 'phone' 
                            ? 'text-agri-600 border-agri-600' 
                            : 'text-slate-400 border-transparent hover:text-slate-600'
                        }`}
                    >
                        验证码登录
                    </button>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                
                {loginMethod === 'password' ? (
                    <>
                        <div>
                            <div className={`relative group animate-fade-in ${errors.email ? 'text-red-500' : ''}`}>
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.email ? 'text-red-500' : 'text-slate-400'}`}>
                                    <Mail size={22} />
                                </div>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-14 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 text-base ${
                                        errors.email 
                                        ? 'border-red-300 focus:ring-red-200' 
                                        : 'border-slate-200 focus:ring-agri-500'
                                    }`} 
                                    placeholder="电子邮箱" 
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className={`relative group animate-fade-in ${errors.password ? 'text-red-500' : ''}`}>
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.password ? 'text-red-500' : 'text-slate-400'}`}>
                                    <Lock size={22} />
                                </div>
                                <input 
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-14 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 text-base ${
                                        errors.password
                                        ? 'border-red-300 focus:ring-red-200' 
                                        : 'border-slate-200 focus:ring-agri-500'
                                    }`} 
                                    placeholder="密码" 
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.password}</p>}
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <div className={`relative group animate-fade-in ${errors.phone ? 'text-red-500' : ''}`}>
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.phone ? 'text-red-500' : 'text-slate-400'}`}>
                                    <Smartphone size={22} />
                                </div>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full pl-14 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 text-base ${
                                        errors.phone
                                        ? 'border-red-300 focus:ring-red-200' 
                                        : 'border-slate-200 focus:ring-agri-500'
                                    }`} 
                                    placeholder="手机号码" 
                                    maxLength={11}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <div className="relative group animate-fade-in flex gap-3">
                                <div className="relative flex-1">
                                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.code ? 'text-red-500' : 'text-slate-400'}`}>
                                        <MessageSquare size={22} />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className={`w-full pl-14 pr-4 py-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 text-base ${
                                            errors.code
                                            ? 'border-red-300 focus:ring-red-200' 
                                            : 'border-slate-200 focus:ring-agri-500'
                                        }`} 
                                        placeholder="验证码" 
                                    />
                                </div>
                                <button 
                                    type="button"
                                    onClick={handleSendCode}
                                    disabled={countdown > 0}
                                    className={`px-6 py-4 font-bold rounded-2xl transition text-base whitespace-nowrap border border-slate-200 w-32 flex items-center justify-center ${
                                        countdown > 0 
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-100 hover:bg-slate-200 text-agri-600'
                                    }`}
                                >
                                    {countdown > 0 ? `${countdown}s` : '获取'}
                                </button>
                            </div>
                            {errors.code && <p className="text-red-500 text-sm mt-1.5 ml-1">{errors.code}</p>}
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center text-sm">
                    <a href="#" className="font-bold text-slate-400 hover:text-slate-600 hover:underline">忘记密码?</a>
                    <Link to="/register" className="font-bold text-agri-600 hover:text-agri-700 hover:underline">新用户注册</Link>
                </div>
                
                <button 
                    type="submit" 
                    className="w-full py-4 bg-agri-500 hover:bg-agri-400 text-white rounded-2xl font-bold text-lg shadow-lg shadow-agri-500/20 hover:shadow-agri-500/30 transition-all flex items-center justify-center group"
                >
                    {loginMethod === 'password' ? '立即登录' : '验证登录'}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-sm mb-6">或者使用以下方式继续</p>
                <div className="flex justify-center gap-6">
                    <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition">
                        <span className="font-bold text-xl">G</span>
                    </button>
                    <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition">
                        <span className="font-bold text-xl">We</span>
                    </button>
                </div>
            </div>

            </div>
            
            <div className="mt-10 text-center w-full">
                <p className="text-sm text-slate-400">© 2024 AgriMat Digital. All rights reserved.</p>
            </div>
        </div>
      </div>
    </div>
  );
};