"use client";

import { motion } from "motion/react";
import { BookMarked, BookOpen, Calendar, Calculator, ChevronRight, Info, Languages, MapPin } from "lucide-react";

const subjects = [
  {
    num: 1,
    icon: <Calculator size={28} color="#2563EB" />,
    name: "Toán học",
    format: "Trắc nghiệm & Tự luận",
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.15)",
  },
  {
    num: 2,
    icon: <BookOpen size={28} color="#7C3AED" />,
    name: "Ngữ Văn",
    format: "Tự luận",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.15)",
  },
  {
    num: 3,
    icon: <Languages size={28} color="#059669" />,
    name: "Tiếng Anh",
    format: "Trắc nghiệm & Tự luận",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.15)",
  },
  {
    num: 4,
    icon: <BookMarked size={28} color="#F97316" />,
    name: "Môn chuyên",
    format: "01 môn tự chọn (9 môn)",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    highlight: true,
  },
];

const locations = [
  { area: "Khu vực Sơn Tây", slots: "400 chỗ", color: "#2563EB" },
  { area: "Khu vực Huyện Phúc Thọ", slots: "1000 chỗ", color: "#7C3AED" },
  { area: "Khu vực Huyện Ba Vì", slots: "1000 chỗ", color: "#F97316" },
];

const schedule = [
  { date: "03/04/2026", event: "Mở cổng đăng ký", color: "#2563EB" },
  { date: "20/04/2026", event: "Kết thúc đăng ký", color: "#7C3AED" },
  { date: "02 và 03/05/2026", event: "Ngày thi khảo sát", color: "#F97316" },
  { date: "Thông báo sau", event: "Công bố kết quả", color: "#059669" },
];

export function ExamRules() {
  return (
    <section id="quy-che" style={{ backgroundColor: "#fff" }} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
          >
            <span style={{ color: "#F97316", fontWeight: 600, fontSize: 13 }}>QUY CHẾ THI</span>
          </div>
          <h2
            style={{
              color: "#1A2B4C",
              fontWeight: 700,
              fontSize: "clamp(22px, 4vw, 36px)",
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            Cấu trúc 4 bài thi bắt buộc
          </h2>
          <p style={{ color: "#64748B", fontWeight: 400, fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
            Tất cả thí sinh tham gia khảo sát đều phải dự thi đủ 4 bài. Kết quả được tổng hợp để xây dựng hồ sơ năng lực toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-6 flex flex-col items-start"
              style={{ backgroundColor: subject.bg, border: `1.5px solid ${subject.border}`, minHeight: 194 }}
            >
              {subject.highlight && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F97316", color: "#fff", fontWeight: 600, fontSize: 11 }}>
                  Tự chọn
                </div>
              )}

              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{ width: 36, height: 36, backgroundColor: "#1A2B4C", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}
              >
                {subject.num}
              </div>
              <div className="mb-3">{subject.icon}</div>
              <h3 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{subject.name}</h3>
              <p style={{ color: "#64748B", fontWeight: 500, fontSize: 13 }}>{subject.format}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <h3
            style={{
              color: "#1A2B4C",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MapPin size={20} color="#1A2B4C" />
            Địa điểm thi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.area}
                className="flex items-center gap-3 rounded-2xl px-4 py-5 relative"
                style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <MapPin size={24} color={loc.color} style={{ flexShrink: 0 }} />
                <div className="flex-1">
                  <p style={{ color: loc.color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{loc.area}</p>
                  <p style={{ color: "#475569", fontWeight: 500, fontSize: 14 }}>{loc.slots}</p>
                </div>
                <ChevronRight size={20} color="#9CA3AF" style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl mb-10" style={{ backgroundColor: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
          <Info size={18} color="#2563EB" className="shrink-0 mt-0.5" />
          <p style={{ color: "#1E40AF", fontWeight: 500, fontSize: 14, lineHeight: 1.6 }}>
            <strong>Lưu ý:</strong> Số lượng thí sinh có hạn theo từng khu vực. Hãy đăng ký sớm để được sắp xếp địa điểm gần và thuận tiện nhất.
          </p>
        </div>

        <div id="lich-khao-sat">
          <h3
            style={{
              color: "#1A2B4C",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Calendar size={20} color="#1A2B4C" />
            Lịch trình quan trọng
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schedule.map((item, i) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl p-5"
                style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <div className="w-8 h-1 rounded-full mb-3" style={{ backgroundColor: item.color }} />
                <p style={{ color: item.color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.date}</p>
                <p style={{ color: "#475569", fontWeight: 500, fontSize: 14 }}>{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

