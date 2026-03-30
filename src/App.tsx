import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Target,
  Clock,
  Briefcase,
  Gift,
  DollarSign,
  FileText,
  Menu,
  X,
  Home
} from 'lucide-react';
import genapexData from './data/genapex.json';
import RegistrationForm from './components/RegistrationForm';
import PDFViewer from './components/PDFViewer';

const SectionHeader = ({ title, icon: Icon, subtitle }: { title: string, icon: any, subtitle?: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-red-600 rounded-lg text-white">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-gray-600 ml-11 text-sm">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recruitment' | 'training' | 'income' | 'register'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { programInfo, recruitment, trainingRoadmap, incomePolicy, eventInfo } = genapexData;

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Home },
    { id: 'recruitment', label: 'Tuyển dụng', icon: Users },
    { id: 'training', label: 'Đào tạo', icon: BookOpen },
    { id: 'income', label: 'Thu nhập', icon: DollarSign },
    { id: 'register', label: 'Đăng ký', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 pb-20 lg:pb-0">
      {/* Header Mobile */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 lg:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-lg shadow-lg shadow-red-200">
              <span className="text-white font-black text-lg">G</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tighter text-gray-900">GENAPEX</h1>
              <p className="text-[10px] font-medium text-red-600 uppercase tracking-widest">Elite Advisor</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Header Desktop */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-xl shadow-lg shadow-red-200">
                <span className="text-white font-black text-xl">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tighter text-gray-900 leading-none">GENAPEX</h1>
                <p className="text-xs font-medium text-red-600 uppercase tracking-widest mt-1">Elite Advisor Program</p>
              </div>
            </div>
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
            <button 
              onClick={() => setActiveTab('register')}
              className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-100">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-bold text-lg">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-left font-medium flex items-center gap-3 transition-all ${
                      activeTab === tab.id 
                        ? 'bg-red-50 text-red-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-4 py-6 lg:max-w-7xl lg:mx-auto lg:px-6 lg:py-10">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Hero Section - Mobile Optimized */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-red-600 text-white p-6 lg:p-16">
                <div className="relative z-10">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  >
                    Generali Việt Nam
                  </motion.span>
                  <h2 className="text-2xl lg:text-6xl font-black leading-[1.2] mb-4 tracking-tight">
                    GENAPEX
                  </h2>
                  <h3 className="text-lg lg:text-xl font-bold mb-4">THE ELITE ADVISOR PROGRAM</h3>
                  <p className="text-sm lg:text-lg text-red-50 mb-6 leading-relaxed">
                    Dự án chiến lược nhằm tuyển chọn, đào tạo và phát triển thế hệ Tư vấn tài chính chuyên nghiệp
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-red-200 uppercase font-bold tracking-wider">Lộ trình</p>
                        <p className="font-bold">{programInfo.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-red-200 uppercase font-bold tracking-wider">Hỗ trợ</p>
                        <p className="font-bold">{eventInfo.totalSupport}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 lg:w-96 lg:h-96 bg-red-500 rounded-full blur-3xl opacity-50" />
              </div>

              {/* Quick Info Grid - Mobile */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="p-4 border-l-4 border-l-red-600">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-red-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Thời gian phỏng vấn</p>
                      <p className="font-bold text-sm">{eventInfo.interviewSchedule}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-red-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-red-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Địa điểm</p>
                      <p className="font-bold text-sm">{eventInfo.location}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-red-600">
                  <div className="flex items-start gap-3">
                    <Gift className="text-red-600 shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Quà tặng</p>
                      <p className="font-bold text-sm">Set quà tốt nghiệp & Welcome Kit</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* PDF Viewer */}
              <div className="flex justify-center">
                <PDFViewer file="/GenApax HCM.pdf" />
              </div>
            </motion.div>
          )}

          {/* RECRUITMENT TAB */}
          {activeTab === 'recruitment' && (
            <motion.div
              key="recruitment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <SectionHeader title="Yêu cầu tuyển dụng" icon={Users} subtitle="Chúng tôi tìm kiếm những ứng viên có tố chất và khát vọng." />
              <div className="space-y-3">
                {recruitment.requirements.map((req, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{req.label}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{req.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <SectionHeader title="Quy trình tuyển dụng" icon={TrendingUp} subtitle="Lộ trình minh bạch từ ứng tuyển đến khi nhận mã số." />
              <div className="relative pl-8 space-y-4 before:absolute before:left-[12px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                {recruitment.process.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-0 w-6 h-6 rounded-full bg-white border-2 border-red-600 flex items-center justify-center z-10">
                      <span className="text-red-600 font-bold text-[10px]">{idx + 1}</span>
                    </div>
                    <Card className="p-3">
                      <p className="font-bold text-sm text-gray-900">{step}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRAINING TAB */}
          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {trainingRoadmap.stages.map((stage, idx) => (
                  <Card key={idx} className="flex flex-col overflow-hidden">
                    <div className="bg-gray-900 p-4 text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-0.5 bg-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{stage.id}</span>
                        <BookOpen size={16} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{stage.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{stage.goal}</p>
                    </div>
                    <div className="p-4 space-y-4">
                      {stage.details && (
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(stage.details).map(([key, val], i) => (
                            <div key={i}>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{key}</p>
                              <p className="text-xs font-bold text-gray-700">{val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {stage.pobModules && (
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Chương trình POB</p>
                          <div className="space-y-1">
                            {stage.pobModules.map((mod, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                                <ChevronRight size={12} className="text-red-600 shrink-0" />
                                <span className="line-clamp-1">{mod}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {stage.activities && (
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                          <p className="text-red-800 text-xs font-medium leading-relaxed italic">
                            "{stage.activities}"
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <SectionHeader title="Hoạt động kinh doanh" icon={Briefcase} subtitle="Duy trì nhịp độ làm việc chuyên nghiệp." />
              <div className="grid grid-cols-2 gap-3">
                {trainingRoadmap.saleActivities.map((act, idx) => (
                  <Card key={idx} className="p-4 text-center hover:bg-red-600 hover:text-white transition-all group cursor-default">
                    <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-red-200 tracking-widest mb-1">{act.frequency}</p>
                    <p className="font-bold text-sm leading-tight">{act.activity}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* INCOME TAB */}
          {activeTab === 'income' && (
            <motion.div
              key="income"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Stage 1 */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 lg:p-8 opacity-10">
                  <TrendingUp size={60} className="lg:w-24 lg:h-24" />
                </div>
                <div className="p-4 lg:p-8">
                  <div className="flex items-center gap-2 mb-4 lg:mb-6">
                    <span className="px-2 py-1 bg-red-600 text-white rounded-full text-[10px] font-bold uppercase">{incomePolicy.stage1.period}</span>
                    <h3 className="text-lg font-bold">Thưởng đào tạo</h3>
                  </div>
                  <div className="mb-4 lg:mb-8">
                    <p className="text-xs text-gray-500 mb-1">Tổng quyền lợi tiềm năng</p>
                    <p className="text-2xl lg:text-4xl font-black text-red-600 tracking-tight">{incomePolicy.stage1.totalPotential}</p>
                  </div>
                  <ul className="space-y-2 mb-4 lg:mb-8">
                    {incomePolicy.stage1.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-bold text-gray-700">
                        <CheckCircle2 size={14} className="text-red-600 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Điều kiện cần đạt</p>
                    <div className="space-y-1">
                      {incomePolicy.stage1.conditions.map((cond, i) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-600 rounded-full shrink-0" />
                          {cond}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stage 2 */}
              <Card className="bg-gray-900 text-white p-4 lg:p-8">
                <div className="flex items-center gap-2 mb-4 lg:mb-6">
                  <span className="px-2 py-1 bg-white text-gray-900 rounded-full text-[10px] font-bold uppercase">{incomePolicy.stage2.period}</span>
                  <h3 className="text-lg font-bold">Thưởng duy trì</h3>
                </div>
                <div className="mb-6 lg:mb-10">
                  <p className="text-xs text-gray-400 mb-1">Tổng 15 tháng lên đến</p>
                  <p className="text-2xl lg:text-4xl font-black text-white tracking-tight">{incomePolicy.stage2.totalPotential}</p>
                </div>
                <div className="space-y-2 mb-6 lg:mb-10">
                  {incomePolicy.stage2.tiers.map((tier, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-medium text-gray-300">{tier.fyp}</span>
                      <span className="font-black text-red-500 text-sm">{tier.bonus}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-red-600/20 border border-red-600/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Award className="text-red-500 shrink-0" size={16} />
                    <p className="text-[10px] font-bold leading-relaxed">{incomePolicy.stage2.maintenanceGoal}</p>
                  </div>
                </div>
              </Card>

              {/* Rewards */}
              <SectionHeader title="Quà tặng & Công nhận" icon={Gift} subtitle="Phần thưởng xứng đáng cho nỗ lực bền bỉ." />
              <div className="grid grid-cols-1 gap-4">
                {incomePolicy.rewards.map((reward, idx) => (
                  <Card key={idx} className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                      {idx === 0 ? <Briefcase size={24} /> : idx === 1 ? <Award size={24} /> : <TrendingUp size={24} />}
                    </div>
                    <p className="font-bold text-gray-900">{reward}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* REGISTER TAB */}
          {activeTab === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RegistrationForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer CTA - Desktop Only */}
      <footer className="hidden lg:block bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-6 tracking-tight">SẴN SÀNG XÂY DỰNG SỰ NGHIỆP?</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Cơ hội có hạn. Hãy gia nhập đội ngũ Tư vấn tài chính ưu tú GenApex ngay hôm nay
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setActiveTab('register')}
              className="bg-red-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center gap-3">
              Gia nhập ngay
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="mt-12 text-gray-400 text-sm font-medium uppercase tracking-widest">
            © 2026 Generali Việt Nam - Sống Như Ý
          </p>
        </div>
      </footer>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
        <div className="flex justify-around items-center h-16">
          {tabs.slice(0, 4).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-1 transition-all ${
                activeTab === tab.id 
                  ? 'text-red-600' 
                  : 'text-gray-400'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('register')}
            className={`flex flex-col items-center justify-center gap-1 px-2 py-1 transition-all ${
              activeTab === 'register' 
                ? 'text-red-600' 
                : 'text-gray-400'
            }`}
          >
            <FileText size={20} />
            <span className="text-[10px] font-medium">Đăng ký</span>
          </button>
        </div>
      </nav>
    </div>
  );
}