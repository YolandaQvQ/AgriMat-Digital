import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Leaf, Smartphone, MessageSquare, CheckCircle, Home } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }
  };

  const handleSendCode = () => {
    if (countdown > 0) return;
    
    if (!formData.phone) {
        setErrors(prev => ({...prev, phone: "请输入手机号码"}));
        return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        setErrors(prev => ({...prev, phone: "请输入有效的11位手机号码"}));
        return;
    }

    setCountdown(60);
    setToastMessage(`验证码已发送至 ${formData.phone}`);
  };

  const validate = () => {
      const newErrors: Record<string, string> = {};
      if (formData.username.length < 2) newErrors.username = "用户名至少2个字符";
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "请输入有效的电子邮箱";
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) newErrors.phone = "请输入有效的11位手机号码";
      if (formData.code.length < 4) newErrors.code = "请输入验证码";
      if (formData.password.length < 6) newErrors.password = "密码至少6位";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "两次输入的密码不一致";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        alert("注册成功！请登录");
        navigate('/auth');
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white relative">
      
      {toastMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] animate-fade-in">
           <div className="bg-white px-6 py-4 rounded-xl shadow-2xl border border-agri-100 flex flex-col items-center gap-3 min-w-[200px]">
              <div className="w-10 h-10 bg-agri-50 rounded-full flex items-center justify-center">
                 <CheckCircle size={24} className="text-agri-500 fill-agri-50" />
              </div>
              <span className="text-slate-700 font-bold text-base">{toastMessage}</span>
           </div>
        </div>
      )}

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-sky-500 h-full">
        <img 
          src="https://picsum.photos/seed/agritech_reg/1200/1600" 
          alt="Agriculture Technology" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-600 via-agri-500 to-sky-300 opacity-90"></div>
        
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 text-white">
           <div className="mb-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-sm font-bold mb-4 backdrop-blur-md">
                <Leaf size={14} className="mr-2" /> 加入平台
              </div>
              <h1 className="text-5xl font-bold leading-tight mb-4 tracking-tight">
                开启您的 <br/><span className="text-sky-100">数字化之旅</span>
              </h1>
              <p className="text-xl text-sky-50 max-w-lg leading-relaxed font-light">
                注册 AgriMat Digital 账户，获取完整的材料数据访问权限与AI性能评估服务。
              </p>
           </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white relative">
        {/* Return to Home Button */}
        <div className="absolute top-6 right-6 z-20">
             <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors py-2 px-4 rounded-full hover:bg-slate-50 font-medium text-sm">
                <Home size={18} />
                <span className="hidden sm:inline">返回首页</span>
             </Link>
        </div>

        <div className="min-h-full flex flex-col items-center justify-center p-8 lg:p-12 pt-24 lg:pt-20">
            <div className="w-full max-w-md">
            
            <div className="lg:hidden mb-10 text-center">
                <h1 className="text-3xl font-bold text-slate-900">AgriMat Digital</h1>
                <p className="text-slate-500 text-sm mt-2">新用户注册</p>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">创建新账户</h2>
                <p className="text-slate-500">填写以下信息加入我们的平台。</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                
                <div>
                    <div className={`relative group animate-fade-in ${errors.username ? 'text-red-500' : ''}`}>
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.username ? 'text-red-500' : 'text-slate-400'}`}>
                            <User size={20} />
                        </div>
                        <input 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text" 
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                                errors.username 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-slate-200 focus:ring-agri-500'
                            }`}
                            placeholder="用户名" 
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.username}</p>}
                </div>
                
                <div>
                    <div className={`relative group ${errors.email ? 'text-red-500' : ''}`}>
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.email ? 'text-red-500' : 'text-slate-400'}`}>
                            <Mail size={20} />
                        </div>
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                                errors.email 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-slate-200 focus:ring-agri-500'
                            }`} 
                            placeholder="电子邮箱" 
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>

                <div>
                    <div className={`relative group animate-fade-in ${errors.phone ? 'text-red-500' : ''}`}>
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.phone ? 'text-red-500' : 'text-slate-400'}`}>
                            <Smartphone size={20} />
                        </div>
                        <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel" 
                            maxLength={11}
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                                errors.phone 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-slate-200 focus:ring-agri-500'
                            }`}
                            placeholder="手机号码" 
                        />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>}
                </div>

                <div>
                    <div className="relative group animate-fade-in flex gap-3">
                        <div className="relative flex-1">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.code ? 'text-red-500' : 'text-slate-400'}`}>
                                <MessageSquare size={20} />
                            </div>
                            <input 
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                type="text" 
                                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
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
                            className={`px-4 py-3.5 font-bold rounded-xl transition text-sm whitespace-nowrap border border-slate-200 w-28 flex items-center justify-center ${
                                countdown > 0 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-100 hover:bg-slate-200 text-agri-600'
                            }`}
                        >
                            {countdown > 0 ? `${countdown}s` : '获取验证码'}
                        </button>
                    </div>
                    {errors.code && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.code}</p>}
                </div>

                <div>
                    <div className={`relative group ${errors.password ? 'text-red-500' : ''}`}>
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.password ? 'text-red-500' : 'text-slate-400'}`}>
                            <Lock size={20} />
                        </div>
                        <input 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password" 
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                                errors.password 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-slate-200 focus:ring-agri-500'
                            }`}
                            placeholder="密码" 
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
                </div>

                <div>
                    <div className={`relative group animate-fade-in ${errors.confirmPassword ? 'text-red-500' : ''}`}>
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-agri-600 transition ${errors.confirmPassword ? 'text-red-500' : 'text-slate-400'}`}>
                            <Lock size={20} />
                        </div>
                        <input 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password" 
                            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 ${
                                errors.confirmPassword 
                                ? 'border-red-300 focus:ring-red-200' 
                                : 'border-slate-200 focus:ring-agri-500'
                            }`}
                            placeholder="确认密码" 
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>}
                </div>
                
                <button 
                    type="submit" 
                    className="w-full py-4 bg-agri-600 hover:bg-agri-500 text-white rounded-xl font-bold shadow-lg shadow-agri-900/20 hover:shadow-agri-900/30 transition-all flex items-center justify-center group"
                >
                    立即注册
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-sm">
                    已有账户? <Link to="/auth" className="font-bold text-agri-600 hover:text-agri-700 hover:underline">立即登录</Link>
                </p>
            </div>

            </div>
            
            <div className="mt-8 text-center w-full">
                <p className="text-xs text-slate-400">© 2024 AgriMat Digital. All rights reserved.</p>
            </div>
        </div>
      </div>
    </div>
  );
};