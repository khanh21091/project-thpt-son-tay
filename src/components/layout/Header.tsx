"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Hướng dẫn", href: "#quy-che" },
  { label: "Lịch khảo sát", href: "#lich-khao-sat" },
  { label: "Tra cứu điểm", href: "#tra-cuu" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#1A2B4C", boxShadow: "0 2px 12px rgba(26,43,76,0.18)" }}
    >
      <div className="mx-auto px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center shrink-0" aria-label="Trang chủ">
          <Image
            src="/assets/logo-trithucmoi.png"
            alt="Tri Thức Mới"
            width={180}
            height={24}
            priority
            style={{ height: 24, width: "auto", objectFit: "contain" }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                color: "#CBD5E1",
                fontWeight: 500,
                fontSize: 14,
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#CBD5E1";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick("#dang-ky")}
            style={{
              marginLeft: 8,
              backgroundColor: "#F97316",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              padding: "7px 18px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(249,115,22,0.4)",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#EA6C0A";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F97316";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Đăng ký ngay
          </button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "#fff", background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "#1A2B4C" }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  color: "#CBD5E1",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#dang-ky")}
              style={{
                marginTop: 8,
                backgroundColor: "#F97316",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "12px 18px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
              }}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

