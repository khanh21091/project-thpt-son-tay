"use client";

import { motion } from "motion/react";
import { Brain, CheckCircle } from "lucide-react";
import svgPaths from "../../lib/figma/svg-viq9qmjk35";

export function PartnerSection() {
  return (
    <section id="gioi-thieu" style={{ backgroundColor: "#F8FAFC" }} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
          >
            <span style={{ color: "#2563EB", fontWeight: 600, fontSize: 13 }}>ĐƠN VỊ TỔ CHỨC</span>
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
            Sức mạnh từ sự hợp tác
          </h2>
          <p style={{ color: "#64748B", fontWeight: 400, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
            Chương trình được điều phối bởi hai đơn vị uy tín, đảm bảo chất lượng và tính khách quan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 24px rgba(26,43,76,0.08)",
            }}
          >
            <div className="flex items-center justify-center rounded-2xl mb-6" style={{ width: 64, height: 64, backgroundColor: "rgba(37,99,235,0.1)" }}>
              <Brain size={32} color="#2563EB" />
            </div>

            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(37,99,235,0.06)" }}>
              <span style={{ color: "#2563EB", fontWeight: 600, fontSize: 12 }}>ĐƠN VỊ ĐIỀU PHỐI</span>
            </div>
            <h3 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Trung tâm Tri Thức Mới</h3>
            <p style={{ color: "#475569", fontWeight: 400, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              Đơn vị điều phối chương trình, ứng dụng công nghệ để phân tích kết quả toàn diện, định hướng lộ trình học tập cá nhân hoá cho từng học sinh.
            </p>

            <div className="flex flex-col gap-3">
              {["Báo cáo lộ trình học tập cá nhân", "Tra cứu kết quả trực tuyến tức thì"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} color="#2563EB" />
                  <span style={{ color: "#475569", fontWeight: 500, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              backgroundColor: "#1A2B4C",
              boxShadow: "0 4px 24px rgba(26,43,76,0.2)",
            }}
          >
            <div className="absolute rounded-full opacity-10" style={{ width: 180, height: 180, backgroundColor: "#2563EB", top: -40, right: 0 }} />

            <div
              className="relative flex items-center justify-center rounded-2xl mb-6"
              style={{ width: 64, height: 64, backgroundColor: "rgba(255,255,255,0.12)", flexShrink: 0 }}
            >
              <div style={{ width: 32, height: 32, position: "relative" }}>
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.1667 28.1667">
                  <path d={svgPaths.p19813800} stroke="#FBB03B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(251,176,59,0.15)" }}>
              <span style={{ color: "#FBB03B", fontWeight: 600, fontSize: 12 }}>CỐ VẤN CHUYÊN MÔN</span>
            </div>
            <h3 style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Trường THPT Chuyên Sơn Tây</h3>
            <p style={{ color: "#94A3B8", fontWeight: 400, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              Đơn vị bảo chứng chuyên môn với hơn{" "}
              <strong style={{ color: "#FBB03B", fontWeight: 700 }}>65 năm truyền thống giáo dục tinh hoa</strong>. Xây dựng đề thi chuẩn mực, định hướng chính xác năng lực học sinh.
            </p>

            <div className="flex flex-col gap-3">
              {["65 năm đào tạo nhân tài", "Đội ngũ giáo viên giỏi cấp quốc gia", "Đề thi chuẩn hệ chuyên Hà Nội"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div style={{ width: 16, height: 16, flexShrink: 0, position: "relative" }}>
                    <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g clipPath="url(#clip_amber)">
                        <path d={svgPaths.p34e03900} stroke="#FBB03B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p1f2c5400} stroke="#FBB03B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                      <defs>
                        <clipPath id="clip_amber">
                          <rect fill="white" height="16" width="16" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span style={{ color: "#CBD5E1", fontWeight: 500, fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

