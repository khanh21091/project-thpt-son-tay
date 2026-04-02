"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, Search, TrendingUp, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Modal, ModalContent } from "../ui/modal";

const mockData: Record<
  string,
  { name: string; sbd: string; scores: { toan: number; van: number; anh: number; chuyen: string; chuyenScore: number } }
> = {
  "0912345678": {
    name: "Nguyễn Minh Khoa",
    sbd: "SBD001",
    scores: { toan: 8.5, van: 7.0, anh: 9.0, chuyen: "Toán", chuyenScore: 8.75 },
  },
  "0987654321": {
    name: "Trần Thị Lan Anh",
    sbd: "SBD002",
    scores: { toan: 9.0, van: 8.5, anh: 8.0, chuyen: "Tiếng Anh", chuyenScore: 9.25 },
  },
  SBD001: {
    name: "Nguyễn Minh Khoa",
    sbd: "SBD001",
    scores: { toan: 8.5, van: 7.0, anh: 9.0, chuyen: "Toán", chuyenScore: 8.75 },
  },
  SBD002: {
    name: "Trần Thị Lan Anh",
    sbd: "SBD002",
    scores: { toan: 9.0, van: 8.5, anh: 8.0, chuyen: "Tiếng Anh", chuyenScore: 9.25 },
  },
};

const averageScores = { toan: 7.2, van: 6.8, anh: 7.5, chuyen: 7.0 };

export function LookupSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof mockData)[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = () => {
    const key = query.trim();
    if (!key) return;
    const found = mockData[key];
    if (found) {
      setResult(found);
      setNotFound(false);
      setModalOpen(true);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setNotFound(false);
  };

  const chartData = result
    ? [
        { subject: "Toán", "Thí sinh": result.scores.toan, "Trung bình": averageScores.toan },
        { subject: "Ngữ Văn", "Thí sinh": result.scores.van, "Trung bình": averageScores.van },
        { subject: "Tiếng Anh", "Thí sinh": result.scores.anh, "Trung bình": averageScores.anh },
        { subject: `Môn chuyên\n(${result.scores.chuyen})`, "Thí sinh": result.scores.chuyenScore, "Trung bình": averageScores.chuyen },
      ]
    : [];

  const totalAvg = result ? ((result.scores.toan + result.scores.van + result.scores.anh + result.scores.chuyenScore) / 4).toFixed(2) : "0";

  return (
    <section id="tra-cuu" style={{ backgroundColor: "#1A2B4C" }} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 rounded-full opacity-10" style={{ width: 400, height: 400, backgroundColor: "#2563EB", filter: "blur(80px)", transform: "translateY(-50%)" }} />
      <div className="absolute bottom-0 right-1/4 rounded-full opacity-10" style={{ width: 300, height: 300, backgroundColor: "#F97316", filter: "blur(80px)", transform: "translateY(50%)" }} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
          <span style={{ color: "#94A3B8", fontWeight: 600, fontSize: 13 }}>TRA CỨU KẾT QUẢ</span>
        </div>
        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(22px, 4vw, 36px)", lineHeight: 1.25, marginBottom: 10 }}>Xem kết quả khảo sát</h2>
        <p style={{ color: "#94A3B8", fontWeight: 400, fontSize: 15, marginBottom: 36 }}>
          Nhập <strong style={{ color: "#CBD5E1" }}>Số điện thoại phụ huynh</strong> hoặc <strong style={{ color: "#CBD5E1" }}>Số báo danh</strong> để xem Phiếu phân tích kết quả
        </p>

        <div className="flex gap-3 items-stretch">
          <div className="relative flex-1">
            <Search size={18} color="#6B7280" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" , zIndex: 10}} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setNotFound(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="VD: 0912345678 hoặc SBD001"
              style={{
                width: "100%",
                padding: "16px 16px 16px 46px",
                borderRadius: 14,
                border: "1.5px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(255,255,255,0.08)",
                fontWeight: 400,
                fontSize: 15,
                color: "#fff",
                outline: "none",
                backdropFilter: "blur(8px)",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2563EB";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#F97316",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "0 28px",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
              transition: "transform 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)")}
          >
            Tra cứu
          </button>
        </div>

        <AnimatePresence>
          {notFound && (
            <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: "#FCA5A5", fontSize: 14, marginTop: 12 }}>
              Không tìm thấy kết quả. Vui lòng kiểm tra lại thông tin.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Modal
        open={modalOpen && !!result}
        onOpenChange={(open: boolean) => {
          setModalOpen(open);
          if (!open) setNotFound(false);
        }}
      >
        <ModalContent className="p-0">
          {result && (
            <>
              <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #E2E8F0" }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={20} color="#F97316" />
                    <h3 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 18 }}>Phiếu kết quả khảo sát</h3>
                  </div>
                  <p style={{ color: "#64748B", fontSize: 13 }}>
                    {result.name} — SBD: <strong>{result.sbd}</strong>
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: "#F1F5F9",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  aria-label="Đóng"
                >
                  <X size={18} color="#64748B" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 1, label: "Toán", score: result.scores.toan, color: "#2563EB" },
                    { id: 2, label: "Ngữ Văn", score: result.scores.van, color: "#7C3AED" },
                    { id: 3, label: "Tiếng Anh", score: result.scores.anh, color: "#059669" },
                    { id: 4, label: result.scores.chuyen, score: result.scores.chuyenScore, color: "#F97316" },
                  ].map((item) => (
                    <div key={item.id} className="flex flex-col items-center rounded-2xl p-4" style={{ backgroundColor: `${item.color}10`, border: `1.5px solid ${item.color}30` }}>
                      <span style={{ color: item.color, fontWeight: 700, fontSize: 28, lineHeight: 1 }}>{item.score}</span>
                      <span style={{ color: "#64748B", fontWeight: 500, fontSize: 12, marginTop: 4, textAlign: "center" }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ backgroundColor: "rgba(26,43,76,0.04)", border: "1px solid rgba(26,43,76,0.1)" }}>
                  <TrendingUp size={20} color="#1A2B4C" />
                  <div>
                    <p style={{ color: "#64748B", fontSize: 13 }}>Điểm trung bình 4 môn</p>
                    <p style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 20 }}>{totalAvg} / 10</p>
                  </div>
                </div>

                <h4 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>So sánh với điểm trung bình</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: "'Be Vietnam Pro', sans-serif", fill: "#64748B" }} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11, fontFamily: "'Be Vietnam Pro', sans-serif", fill: "#64748B" }} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13 }} />
                    <Legend wrapperStyle={{ fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: 13 }} />
                    <Bar dataKey="Thí sinh" fill="#1A2B4C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Trung bình" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <button
                  onClick={closeModal}
                  style={{
                    width: "100%",
                    marginTop: 16,
                    backgroundColor: "#1A2B4C",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "14px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Đóng
                </button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}

