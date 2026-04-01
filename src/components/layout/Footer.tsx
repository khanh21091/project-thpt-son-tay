"use client";

import Image from "next/image";
import { Facebook, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0F1B30" }} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/logo-trithucmoi.png"
                alt="Tri Thức Mới"
                width={180}
                height={24}
                style={{ height: 24, width: "auto", objectFit: "contain" }}
              />
            </div>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              Đồng hành cùng học sinh trên con đường chinh phục ước mơ, ứng dụng công nghệ vào giáo dục.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#94A3B8",
                    transition: "background 0.2s, color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2563EB";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8";
                  }}
                  aria-label="Mạng xã hội"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Liên kết nhanh</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Giới thiệu chương trình", href: "#gioi-thieu" },
                { label: "Lịch khảo sát", href: "#lich-khao-sat" },
                { label: "Quy chế thi", href: "#quy-che" },
                { label: "Đăng ký tham dự", href: "#dang-ky" },
                { label: "Tra cứu kết quả", href: "#tra-cuu" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    color: "#64748B",
                    fontSize: 14,
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#60A5FA";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#64748B";
                  }}
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Liên hệ</h4>
            <div className="flex flex-col gap-4">
              {[
                { Icon: Phone, text: "096 143 13 69", sub: "Hotline hỗ trợ" },
                { Icon: Mail, text: "trithucmoi@gmail.com", sub: "Email hỗ trợ" },
                { Icon: MapPin, text: "Căn 04, LKV19A, KĐT HUD, Sơn Tây, Hà Nội", sub: "Địa chỉ" },
              ].map(({ Icon, text, sub }) => (
                <div key={sub} className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg shrink-0"
                    style={{ width: 36, height: 36, backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <Icon size={16} color="#60A5FA" />
                  </div>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>{text}</p>
                    <p style={{ color: "#64748B", fontSize: 12 }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p style={{ color: "#475569", fontSize: 13 }}>
            © 2026 Trung tâm Tri Thức Mới. Phối hợp với Trường THPT Chuyên Sơn Tây.
          </p>
          <p style={{ color: "#475569", fontSize: 13 }}>Chương trình Khảo sát Kiến thức Vào Lớp 10 – Năm 2026</p>
        </div>
      </div>
    </footer>
  );
}

