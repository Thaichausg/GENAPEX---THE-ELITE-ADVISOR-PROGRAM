import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  experience: string;
  source: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  age?: string;
  experience?: string;
  agreeTerms?: string;
}

const sources = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Giới thiệu' },
  { value: 'event', label: 'Sự kiện' },
  { value: 'other', label: 'Khác' },
];

const ageRanges = [
  { value: '25-30', label: '25-30 tuổi' },
  { value: '31-35', label: '31-35 tuổi' },
  { value: '36-40', label: '36-40 tuổi' },
  { value: '41-45', label: '41-45 tuổi' },
  { value: '46-50', label: '46-50 tuổi' },
  { value: '51-60', label: '51-60 tuổi' },
];

const experienceLevels = [
  { value: 'under1', label: 'Dưới 1 năm' },
  { value: '1-2', label: '1-2 năm' },
  { value: '2-3', label: '2-3 năm' },
  { value: '3-5', label: '3-5 năm' },
  { value: '5-10', label: '5-10 năm' },
  { value: 'over10', label: 'Trên 10 năm' },
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    source: 'website',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
    }

    if (!formData.age) {
      newErrors.age = 'Vui lòng chọn độ tuổi';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Vui lòng nhập kinh nghiệm làm việc';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn cần đồng ý với điều khoản';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          experience: formData.experience,
          source: formData.source,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4 text-gray-900">Đăng ký thành công!</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Cảm ơn bạn đã quan tâm chương trình GenApex Elite Advisor. 
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận lịch phỏng vấn.
          </p>
          <div className="bg-red-50 rounded-2xl p-6 mb-8">
            <p className="text-red-800 font-medium">
              <strong>Thời gian phỏng vấn:</strong> 09H00 - 11H00 Ngày 31/03/2026
            </p>
            <p className="text-red-800 font-medium mt-2">
              <strong>Địa điểm:</strong> GEN PLAZA, 43-45 Tú Xương, P. Xuân Hòa, TP. HCM
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                email: '',
                phone: '',
                age: '',
                experience: '',
                source: 'website',
                agreeTerms: false,
              });
            }}
            className="text-red-600 font-bold hover:underline"
          >
            Đăng ký cho ứng viên khác
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-red-600 p-8 text-white">
          <h2 className="text-2xl font-black mb-2">Đăng ký ngay</h2>
          <p className="text-red-100">Tham gia chương trình GenApex Elite Advisor</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Họ và tên <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                    errors.fullName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Số điện thoại <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Độ tuổi <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors appearance-none bg-white ${
                    errors.age 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                >
                  <option value="">Chọn độ tuổi</option>
                  {ageRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              {errors.age && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.age}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nguồn thông tin
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors appearance-none bg-white"
              >
                {sources.map(source => (
                  <option key={source.value} value={source.value}>{source.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kinh nghiệm làm việc <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-4 text-gray-400" size={20} />
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Mô tả kinh nghiệm làm việc của bạn..."
                  rows={4}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-colors resize-none ${
                    errors.experience 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.experience}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-red-600 focus:ring-red-500 focus:ring-offset-2"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600 leading-relaxed">
              Tôi đồng ý rằng thông tin cá nhân được cung cấp sẽ được sử dụng cho mục đích 
              xét tuyển và liên lạc liên quan đến chương trình GenApex Elite Advisor.
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.agreeTerms}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Đang xử lý...
              </>
            ) : (
              <>
                <Send size={20} />
                Gửi đăng ký
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 bg-gray-50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Lưu ý quan trọng</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Vui lòng điền đầy đủ thông tin để được xử lý nhanh nhất
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Thời gian phỏng vấn: 09H00 - 11H00 Ngày 31/03/2026
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Địa điểm: GEN PLAZA, 43-45 Tú Xương, P. Xuân Hòa, TP. HCM
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Mang theo CMND/CCCD khi đến phỏng vấn
          </li>
        </ul>
      </div>
    </motion.div>
  );
}