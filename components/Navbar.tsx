
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';

interface NavItem {
  name: string;
  id: string;
  path: string;
  subLinks?: { name: string; path: string }[];
}

const SECTIONS: NavItem[] = [
  { name: '首页', id: 'showcase', path: '/#showcase' },
  { name: '农机材料', id: 'materials', path: '/materials' },
  { 
    name: '农机装备', 
    id: 'equipment', 
    path: '/#equipment',
    subLinks: [
      { name: '装备图谱', path: '/equipment' },
      { name: '关键零件', path: '/parts' }
    ]
  },
  { name: '实验测试', id: 'experiments', path: '/experiments' },
  { name: '仿真模拟', id: 'simulation', path: '/simulation' },
  { name: '性能评价', id: 'performance', path: '/performance' },
  { name: '案例库', id: 'cases', path: '/cases' },
  { name: '关于我们', id: 'about', path: '/#about' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAuthPage = location.pathname === '/auth';
  const isRegisterPage = location.pathname === '/register';

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'materials' && location.pathname === '/materials') return;
    if (item.id === 'equipment' && (location.pathname === '/equipment' || location.pathname === '/parts')) return;
    if (item.id === 'experiments' && location.pathname === '/experiments') return;
    if (item.id === 'simulation' && location.pathname === '/simulation') return;
    if (item.id === 'performance' && location.pathname === '/performance') return;
    if (item.id === 'cases' && location.pathname === '/cases') return;

    if (window.innerWidth < 768) {
        setIsOpen(false);
    }
    
    // Check if it's an anchor link or a page route
    if (item.path.startsWith('/#')) {
        navigate({ pathname: '/', hash: item.id });
    } else {
        navigate(item.path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/auth');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'py-4 bg-white/80 backdrop-blur-md border-slate-200/60 shadow-sm' 
        : 'py-5 bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/')}>
             <div className="w-10 h-10 rounded-xl mr-3 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] bg-gradient-to-br from-agri-50 to-white backdrop-blur-sm border border-agri-100 transition-all group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                <span className="font-bold text-xl text-agri-500">A</span>
             </div>
             <span className="font-bold text-2xl tracking-wide flex items-center text-slate-800">
               AgriMat<span className="text-agri-500 ml-0.5 font-light">Digital</span>
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center bg-slate-100/60 rounded-full px-4 py-2 backdrop-blur-sm border border-slate-200/50">
            {SECTIONS.map((item) => (
              <div key={item.name} className="relative group px-3 py-1">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`text-[15px] font-medium transition-colors flex items-center gap-1.5 ${
                    location.pathname === item.path 
                    ? 'text-agri-600 font-bold' 
                    : 'text-slate-600 hover:text-agri-600'
                  }`}
                >
                  {item.name}
                  {item.subLinks && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </button>
                
                {/* Dropdown */}
                {item.subLinks && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-48 rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl ring-1 ring-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 overflow-hidden">
                    <div className="py-2">
                      {item.subLinks.map((sub) => (
                        <Link 
                          key={sub.name} 
                          to={sub.path} 
                          className="block px-6 py-3 text-[15px] text-slate-600 hover:bg-agri-50 hover:text-agri-600 transition-colors border-l-4 border-transparent hover:border-agri-400"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-agri-500 to-agri-400 flex items-center justify-center text-white shadow-lg shadow-agri-500/30 border border-white">
                    <User size={20} />
                  </div>
                </div>
                <button onClick={handleLogout} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              !isAuthPage && !isRegisterPage && (
                <Link to="/auth" className="px-7 py-2.5 rounded-full text-[15px] font-bold transition-all border border-slate-200 bg-white text-slate-700 hover:bg-agri-500 hover:border-agri-500 hover:text-white hover:shadow-lg hover:shadow-agri-500/20 backdrop-blur-md">
                  登录平台
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition">
               {isOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-2xl absolute top-full w-full border-t border-slate-100 max-h-[80vh] overflow-y-auto">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {SECTIONS.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="block px-4 py-4 rounded-xl text-lg font-medium text-slate-700 hover:text-agri-600 hover:bg-slate-50 w-full text-left transition-colors"
                >
                  {item.name}
                </button>
                {item.subLinks && (
                  <div className="pl-8 space-y-1 mt-1 mb-2 border-l-2 border-slate-100 ml-4">
                    {item.subLinks.map(sub => (
                      <Link 
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-base text-slate-500 hover:text-agri-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-slate-100 mt-4 pt-4 px-2">
               {isLoggedIn ? (
                 <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-4 text-red-500 font-medium bg-red-50 rounded-xl hover:bg-red-100 text-lg">
                   <LogOut size={20} className="mr-2" /> 退出登录
                 </button>
               ) : (
                 !isAuthPage && !isRegisterPage && (
                   <Link to="/auth" className="block w-full text-center px-4 py-4 bg-agri-500 text-white font-bold rounded-xl shadow-lg hover:bg-agri-400 text-lg">
                     立即登录
                   </Link>
                 )
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
