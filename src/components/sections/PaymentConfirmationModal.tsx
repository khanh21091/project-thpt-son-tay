"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  Building2,
  Copy,
  X,
  Wallet,
} from "lucide-react";

/** Mock dữ liệu thanh toán — thay bằng API khi tích hợp */
export const MOCK_PAYMENT = {
  bankName: "TPBank – TMCP Tiên Phong",
  accountNumber: "33639288888",
  accountNumberDisplay: "3363 9288 888",
  accountHolder: "CONG TY CO PHAN KHOA HOC VA GIAO DUC TRI THUC MOI",
  amountVnd: 240_000,
  transferContent: "090909090909_0909090909",
  qrLabel: "TRI THUC MOI",
} as const;

function formatVndComma(n: number) {
  return n.toLocaleString("en-US");
}

/** Logo VietQR kiểu màu (mock theo ảnh) */
function VietQrLogo() {
  return (
    <div className="flex items-baseline justify-center select-none" aria-hidden>
      <span style={{ color: "#E31837", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>Viet</span>
      <span style={{ color: "#004B8D", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>QR</span>
    </div>
  );
}

/** Placeholder QR (mock) — khi có API VietQR thay bằng ảnh/URL thật */
function QrPlaceholder({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    const out: boolean[] = [];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    for (let i = 0; i < 29 * 29; i++) {
      h = (h * 1103515245 + 12345) | 0;
      out.push((h >>> 0) % 3 !== 0);
    }
    return out;
  }, [seed]);

  return (
    <div className="relative w-full max-w-[260px] mx-auto">
      <svg
        viewBox="0 0 29 29"
        className="w-full aspect-square block"
        style={{ shapeRendering: "crispEdges" }}
        aria-hidden
      >
        {cells.map((on, i) => {
          const x = i % 29;
          const y = Math.floor(i / 29);
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={on ? "#0f172a" : "#fff"} />;
        })}
      </svg>
      {/* Logo chữ V đỏ giữa QR như VietQR thật */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-md shadow-sm pointer-events-none"
        style={{
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          backgroundColor: "#DC2626",
        }}
      >
        <span className="text-white font-black text-2xl leading-none" style={{ fontFamily: "system-ui, sans-serif" }}>
          V
        </span>
      </div>
    </div>
  );
}

export interface PaymentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Sau khi phụ huynh xác nhận đã chuyển khoản */
  onConfirmTransferred: () => void;
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  onConfirmTransferred,
}: PaymentConfirmationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_PAYMENT.transferContent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted) return null;

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Đóng"
            className="absolute inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            className="relative w-full max-w-[min(96vw,880px)] max-h-[min(92vh,900px)] overflow-hidden flex flex-col rounded-2xl shadow-2xl"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 25px 80px rgba(26,43,76,0.25)",
            }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — nền xanh đậm như ảnh */}
            <div
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 shrink-0"
              style={{ backgroundColor: "#1E293B" }}
            >
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#F97316",
                }}
              >
                <Wallet size={24} color="#fff" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="payment-modal-title" className="text-white font-bold text-[17px] sm:text-lg leading-snug tracking-tight">
                  Xác nhận chi phí dự thi
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 font-normal">
                  Thanh toán qua chuyển khoản ngân hàng
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="shrink-0 rounded-lg p-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Đóng hộp thoại"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            {/* Body — nền trắng, hai thẻ viền xám */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:items-stretch">
                {/* Cột QR */}
                <div
                  className="flex-1 min-w-0 rounded-xl border bg-white p-4 sm:p-5 flex flex-col items-center"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  <div className="w-full flex justify-center mb-4">
                    <VietQrLogo />
                  </div>
                  <div className="w-full flex justify-center px-1">
                    <QrPlaceholder seed={MOCK_PAYMENT.transferContent} />
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-5 text-[11px] sm:text-xs font-semibold tracking-tight">
                    <span style={{ color: "#475569" }}>napas 247</span>
                    <span className="text-slate-300">|</span>
                    <span style={{ color: "#0D9488" }}>TPBank</span>
                  </div>
                  <div className="mt-4 text-center space-y-1.5 text-sm" style={{ color: "#64748B" }}>
                    <p className="font-semibold tracking-wide text-[15px]">{MOCK_PAYMENT.qrLabel}</p>
                    <p className="font-mono text-sm tabular-nums">{MOCK_PAYMENT.accountNumber}</p>
                    <p className="font-semibold tabular-nums text-[15px]">
                      Số tiền: {formatVndComma(MOCK_PAYMENT.amountVnd)} VND
                    </p>
                  </div>
                </div>

                {/* Cột thông tin CK */}
                <div
                  className="flex-1 min-w-0 rounded-xl border bg-white overflow-hidden flex flex-col"
                  style={{ borderColor: "#D1D5DB" }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{ borderColor: "#E2E8F0", backgroundColor: "#FAFBFC" }}
                  >
                    <Building2 size={18} color="#64748B" strokeWidth={2} />
                    <span className="font-bold text-xs sm:text-sm tracking-wide" style={{ color: "#64748B" }}>
                      THÔNG TIN CHUYỂN KHOẢN
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: "#E2E8F0" }}>
                    <InfoRow label="Ngân hàng" value={MOCK_PAYMENT.bankName} />
                    <InfoRow label="Số tài khoản" value={MOCK_PAYMENT.accountNumberDisplay} mono />
                    <InfoRow label="Chủ tài khoản" value={MOCK_PAYMENT.accountHolder} multiline />
                    <InfoRow label="Số tiền" value={`${formatVndComma(MOCK_PAYMENT.amountVnd)} đ`} />
                  </div>
                  <div className="p-4 border-t" style={{ borderColor: "#E2E8F0" }}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold" style={{ color: "#64748B" }}>
                        Nội dung CK <span style={{ color: "#DC2626" }}>*</span>
                      </span>
                      <span className="text-xs font-medium" style={{ color: "#DC2626" }}>
                        Bắt buộc
                      </span>
                    </div>
                    <div
                      className="flex items-stretch rounded-lg border overflow-hidden min-h-[44px]"
                      style={{
                        backgroundColor: "#EFF6FF",
                        borderColor: "#93C5FD",
                      }}
                    >
                      <div
                        className="flex-1 min-w-0 px-3 py-2.5 font-mono text-xs sm:text-sm break-all flex items-center"
                        style={{ color: "#1E3A5F" }}
                      >
                        {MOCK_PAYMENT.transferContent}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3 sm:px-4 text-white font-semibold text-xs sm:text-sm border-l"
                        style={{ backgroundColor: "#2563EB", borderColor: "#93C5FD" }}
                      >
                        <Copy size={14} />
                        {copied ? "Đã chép" : "Sao chép"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cảnh báo — viền cam nhạt */}
              <div
                className="mt-4 flex gap-3 rounded-lg border px-4 py-3"
                style={{
                  backgroundColor: "#FFFBF5",
                  borderColor: "#FDBA74",
                }}
              >
                <AlertCircle className="shrink-0 mt-0.5" size={20} color="#EA580C" strokeWidth={2} />
                <p className="text-sm leading-relaxed" style={{ color: "#9A3412" }}>
                  Vui lòng chuyển khoản đúng <strong>nội dung</strong> để hệ thống tự động xác nhận đăng ký. Sau khi
                  chuyển khoản thành công, nhấn <strong>&quot;Xác nhận&quot;</strong> để hoàn tất.
                </p>
              </div>
            </div>

            {/* Footer — nút phải như ảnh */}
            <div
              className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-4 sm:px-6 py-4 border-t shrink-0"
              style={{ borderColor: "#E2E8F0", backgroundColor: "#fff" }}
            >
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-sm border transition-colors"
                style={{
                  borderColor: "#CBD5E1",
                  color: "#1A2B4C",
                  backgroundColor: "#fff",
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirmTransferred();
                  onOpenChange(false);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-sm text-white min-w-[180px]"
                style={{
                  backgroundColor: "#F97316",
                  boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
                }}
              >
                Đã chuyển khoản
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

function InfoRow({
  label,
  value,
  mono,
  multiline,
}: {
  label: string;
  value: string;
  mono?: boolean;
  /** Chủ TK: căn phải + xuống dòng như ảnh */
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-row items-start gap-3 sm:gap-4 px-4 py-3">
      <span className="shrink-0 text-sm font-medium pt-0.5 w-[118px] sm:w-[132px]" style={{ color: "#64748B" }}>
        {label}
      </span>
      <span
        className={`flex-1 min-w-0 font-bold text-sm text-right leading-snug text-[#1A2B4C] ${mono ? "font-mono tabular-nums" : ""} ${multiline ? "uppercase text-xs sm:text-[13px]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
