/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import genapexData from './data/genapex.json';
import RegistrationForm from './components/RegistrationForm';
import PDFViewer from './components/PDFViewer';

const SectionHeader = ({ title, icon: Icon, subtitle }: { title: string, icon: any, subtitle?: string }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-red-600 rounded-lg text-white">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-gray-600 ml-11">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recruitment' | 'training' | 'income' | 'register'>('overview');

  const { programInfo, recruitment, trainingRoadmap, incomePolicy, eventInfo } = genapexData;

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: Target },
    { id: 'recruitment', label: 'Tuyển dụng', icon: Users },
    { id: 'training', label: 'Đào tạo', icon: BookOpen },
    { id: 'income', label: 'Thu nhập', icon: DollarSign },
    { id: 'register', label: 'Đăng ký', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <nav className="hidden md:flex items-center gap-1">
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
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('register')}
                className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-100">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Hero Section */}
              <div className="relative rounded-3xl overflow-hidden bg-red-600 text-white p-10 lg:p-16">
                <div className="relative z-10 max-w-2xl">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    Generali Việt Nam
                  </motion.span>
                  <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                    {programInfo.name}
                  </h2>
                  <p className="text-lg text-red-50 mb-10 leading-relaxed font-medium">
                    {programInfo.objective}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-red-200 uppercase font-bold tracking-wider">Lộ trình</p>
                        <p className="font-bold text-lg">{programInfo.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-red-200 uppercase font-bold tracking-wider">Hỗ trợ</p>
                        <p className="font-bold text-lg">{eventInfo.totalSupport}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-500/20 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-50" />
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 border-l-4 border-l-red-600">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Thời gian phỏng vấn</h3>
                  <div className="flex items-start gap-4">
                    <Calendar className="text-red-600 shrink-0" size={24} />
                    <p className="font-bold text-lg leading-tight">{eventInfo.interviewSchedule}</p>
                  </div>
                </Card>
                <Card className="p-8 border-l-4 border-l-red-600">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Địa điểm</h3>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-red-600 shrink-0" size={24} />
                    <p className="font-bold text-lg leading-tight">{eventInfo.location}</p>
                  </div>
                </Card>
                <Card className="p-8 border-l-4 border-l-red-600">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quà tặng đồng hành</h3>
                  <div className="flex items-start gap-4">
                    <Gift className="text-red-600 shrink-0" size={24} />
                    <p className="font-bold text-lg leading-tight">Set quà tốt nghiệp & Welcome Kit</p>
                  </div>
                </Card>
              </div>

              {/* PDF Viewer */}
              <div className="flex justify-center">
                <PDFViewer file="/GenApax HCM.pdf" />
              </div>
            </motion.div>
          )}

          {activeTab === 'recruitment' && (
            <motion.div
              key="recruitment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              <div>
                <SectionHeader title="Yêu cầu tuyển dụng" icon={Users} subtitle="Chúng tôi tìm kiếm những ứng viên có tố chất và khát vọng." />
                <div className="space-y-4">
                  {recruitment.requirements.map((req, idx) => (
                    <Card key={idx} className="p-6 hover:border-red-200 transition-colors">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{req.label}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{req.value}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader title="Quy trình tuyển dụng" icon={TrendingUp} subtitle="Lộ trình minh bạch từ ứng tuyển đến khi nhận mã số." />
                <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {recruitment.process.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[25px] top-1 w-8 h-8 rounded-full bg-white border-2 border-red-600 flex items-center justify-center z-10">
                        <span className="text-red-600 font-bold text-xs">{idx + 1}</span>
                      </div>
                      <Card className="p-5 hover:shadow-md transition-shadow">
                        <p className="font-bold text-gray-900">{step}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {trainingRoadmap.stages.map((stage, idx) => (
                  <Card key={idx} className="flex flex-col">
                    <div className="bg-gray-900 p-6 text-white">
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{stage.id}</span>
                        <BookOpen size={20} className="text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{stage.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{stage.goal}</p>
                    </div>
                    <div className="p-8 flex-grow space-y-6">
                      {stage.details && (
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(stage.details).map(([key, val], i) => (
                            <div key={i}>
                              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">{key}</p>
                              <p className="text-sm font-bold text-gray-700">{val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {stage.pobModules && (
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-4">Chương trình POB</p>
                          <div className="grid grid-cols-1 gap-2">
                            {stage.pobModules.map((mod, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                                <ChevronRight size={14} className="text-red-600" />
                                {mod}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {stage.activities && (
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                          <p className="text-red-800 text-sm font-medium leading-relaxed italic">
                            "{stage.activities}"
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <SectionHeader title="Hoạt động kinh doanh" icon={Briefcase} subtitle="Duy trì nhịp độ làm việc chuyên nghiệp hàng ngày." />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {trainingRoadmap.saleActivities.map((act, idx) => (
                    <Card key={idx} className="p-6 text-center hover:bg-red-600 hover:text-white transition-all group cursor-default">
                      <p className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-red-200 tracking-widest mb-2">{act.frequency}</p>
                      <p className="font-bold text-sm leading-tight">{act.activity}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'income' && (
            <motion.div
              key="income"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Stage 1 Income */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp size={120} />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">{incomePolicy.stage1.period}</span>
                      <h3 className="text-xl font-bold">Thưởng đào tạo</h3>
                    </div>
                    <div className="mb-8">
                      <p className="text-sm text-gray-500 mb-1">Tổng quyền lợi tiềm năng</p>
                      <p className="text-4xl font-black text-red-600 tracking-tight">{incomePolicy.stage1.totalPotential}</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {incomePolicy.stage1.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-700">
                          <CheckCircle2 size={18} className="text-red-600 shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-gray-100">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-3">Điều kiện cần đạt</p>
                      <div className="space-y-2">
                        {incomePolicy.stage1.conditions.map((cond, i) => (
                          <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full" />
                            {cond}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stage 2 Income */}
                <Card className="bg-gray-900 text-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-white text-gray-900 rounded-full text-[10px] font-bold uppercase tracking-widest">{incomePolicy.stage2.period}</span>
                    <h3 className="text-xl font-bold">Thưởng duy trì</h3>
                  </div>
                  <div className="mb-10">
                    <p className="text-sm text-gray-400 mb-1">Tổng 15 tháng lên đến</p>
                    <p className="text-4xl font-black text-white tracking-tight">{incomePolicy.stage2.totalPotential}</p>
                  </div>
                  <div className="space-y-4 mb-10">
                    {incomePolicy.stage2.tiers.map((tier, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-sm font-medium text-gray-300">{tier.fyp}</span>
                        <span className="font-black text-red-500">{tier.bonus}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-red-600/20 border border-red-600/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Award className="text-red-500" size={20} />
                      <p className="text-xs font-bold leading-relaxed">{incomePolicy.stage2.maintenanceGoal}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Rewards & Recognition */}
              <div>
                <SectionHeader title="Quà tặng & Công nhận" icon={Gift} subtitle="Phần thưởng xứng đáng cho nỗ lực bền bỉ." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {incomePolicy.rewards.map((reward, idx) => (
                    <Card key={idx} className="p-8 text-center flex flex-col items-center justify-center gap-4 hover:border-red-600 transition-all group">
                      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                        {idx === 0 ? <Briefcase size={28} /> : idx === 1 ? <Award size={28} /> : <TrendingUp size={28} />}
                      </div>
                      <p className="font-bold text-gray-900 leading-tight">{reward}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

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

      {/* Footer CTA */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-6 tracking-tight">SẴN SÀNG XÂY DỰNG SỰ NGHIỆP?</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Cơ hội có hạn. Hãy gia nhập đội ngũ Tư vấn tài chính ưu tú GenApex ngay hôm nay để nhận được những chính sách hỗ trợ tốt nhất.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setActiveTab('register')}
              className="w-full sm:w-auto bg-red-600 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-3">
              Gia nhập ngay
              <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-900 px-10 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all">
              Tìm hiểu thêm
            </button>
          </div>
          <p className="mt-12 text-gray-400 text-sm font-medium uppercase tracking-widest">
            © 2026 Generali Việt Nam - Sống Như Ý
          </p>
        </div>
      </footer>
    </div>
  );
}
