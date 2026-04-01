"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function HeroBanner() {
  const scrollToRegister = () => {
    const el = document.querySelector("#dang-ky");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" style={{ height: 680 }}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          width={2201}
          height={815}
          priority
          className="absolute object-cover pointer-events-none"
          style={{ left: "-400px", top: "-136px", width: "2201px", height: "815px", maxWidth: "none" }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(146.9deg, rgba(26,43,76,0.92) 0%, rgba(26,43,76,0.78) 50%, rgba(37,99,235,0.7) 100%)",
        }}
      />

      <div
        className="absolute rounded-full opacity-10"
        style={{ width: 300, height: 300, background: "#2563EB", filter: "blur(60px)", top: 80, right: "calc(50% - 532px)" }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{ width: 200, height: 200, background: "#F97316", filter: "blur(50px)", top: 635, left: 40 }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4" style={{ paddingTop: 84 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ backgroundColor: "rgba(37,99,235,0.25)", border: "1px solid rgba(96,165,250,0.4)" }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#60A5FA", display: "inline-block", flexShrink: 0 }} />
          <span style={{ color: "#93C5FD", fontWeight: 600, fontSize: 13, letterSpacing: "0.05em" }}>NĂM HỌC 2025 – 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          CHƯƠNG TRÌNH <span style={{ color: "#FBB03B" }}>KHẢO SÁT KIẾN THỨC</span>
          <br />
          VÀO LỚP 10 – NĂM 2026
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-10"
        >
          <p
            style={{
              color: "#CBD5E1",
              fontWeight: 400,
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.6,
            }}
          >
            Đánh giá năng lực toàn diện cho học sinh lớp 9 — Hệ chuyên
          </p>
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span style={{ color: "#E2E8F0", fontWeight: 500, fontSize: 13 }}>Cố vấn chuyên môn: Trường THPT Chuyên Sơn Tây</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToRegister}
            style={{
              backgroundColor: "#F97316",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 40px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(249,115,22,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(249,115,22,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.5)";
            }}
          >
            ĐĂNG KÝ NGAY
          </button>

          <button
            onClick={() => document.querySelector("#tra-cuu")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "15px 32px",
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
          >
            Tra cứu kết quả
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
      </motion.div>
    </section>
  );
}

