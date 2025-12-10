import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100/50 text-slate-500 py-16 mt-auto border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                <span className="text-agri-500 font-bold text-xl">A</span>
             </div>
             <span className="font-bold text-2xl text-slate-800 tracking-wide">
               AgriMat<span className="text-agri-500">Digital</span>
             </span>
          </div>
          <p className="text-base leading-relaxed max-w-sm text-slate-500">
            致力于提升农业机械装备材料数字化水平，推动农业现代化发展。构建农机领域的"数据-知识-智能"全链路服务体系。
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-900 font-bold text-lg mb-8">平台服务</h4>
          <ul className="space-y-4 text-base">
            <li><Link to="/materials" className="hover:text-agri-500 transition-colors">农机材料库</Link></li>
            <li><Link to="/equipment" className="hover:text-agri-500 transition-colors">装备图谱</Link></li>
            <li><Link to="/simulation" className="hover:text-agri-500 transition-colors">数字孪生仿真</Link></li>
            <li><Link to="/performance" className="hover:text-agri-500 transition-colors">性能AI评价</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-slate-900 font-bold text-lg mb-8">联系我们</h4>
          <ul className="space-y-4 text-base">
            <li className="flex items-start">
               <span className="block">地址：某某省某某市高新技术开发区创新大道88号</span>
            </li>
            <li>电话：010-88888888</li>
            <li>邮箱：contact@agrimat.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <span>© 2024 AgriMat Digital. All rights reserved.</span>
           <div className="flex gap-8">
             <a href="#" className="hover:text-agri-500 transition-colors">隐私政策</a>
             <a href="#" className="hover:text-agri-500 transition-colors">服务条款</a>
             <a href="#" className="hover:text-agri-500 transition-colors">使用帮助</a>
           </div>
        </div>
      </div>
    </footer>
  );
};