"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, CheckCircle, ChevronDown, CreditCard, MapPin, Phone, School, Sparkles, User } from "lucide-react";

import { PaymentConfirmationModal } from "./PaymentConfirmationModal";

const specialSubjects = ["Toán", "Vật Lý", "Hóa Học", "Sinh Học", "Tin Học", "Ngữ Văn", "Lịch Sử", "Địa Lý", "Tiếng Anh"];

const mockExamLocations = [
  { id: "ba-vi", name: "Khu vực Ba Vì", remaining: 356, total: 400 },
  { id: "son-tay", name: "Khu vực Sơn Tây", remaining: 356, total: 400 },
  { id: "huyen-ba-vi", name: "Khu vực Huyện Ba Vì", remaining: 999, total: 1000 },
  { id: "huyen-phuc-tho", name: "Khu vực Huyện Phúc Thọ", remaining: 999, total: 1000 },
] as const;

interface FormData {
  fullName: string;
  cccd: string;
  dob: string;
  address: string;
  school: string;
  phone: string;
  subject: string;
  examLocationId: string;
}

function FieldWrapper({
  children,
  icon,
  error,
  errorStyle,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  error?: string;
  errorStyle: React.CSSProperties;
}) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 1, pointerEvents: "none" }}>{icon}</div>
        {children}
      </div>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export function RegistrationForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    cccd: "",
    dob: "",
    address: "",
    school: "",
    phone: "",
    subject: "",
    examLocationId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [locationOpen, setLocationOpen] = useState(false);
  const locationWrapRef = useRef<HTMLDivElement | null>(null);

  const selectedLocation = useMemo(
    () => mockExamLocations.find((l) => l.id === form.examLocationId),
    [form.examLocationId],
  );

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên";
    const cccdDigits = form.cccd.replace(/\s/g, "");
    if (!cccdDigits) newErrors.cccd = "Vui lòng nhập số CCCD";
    else if (!/^\d{12}$/.test(cccdDigits)) newErrors.cccd = "CCCD phải gồm đúng 12 chữ số";
    if (!form.dob) newErrors.dob = "Vui lòng nhập ngày sinh";
    if (!form.school.trim()) newErrors.school = "Vui lòng nhập tên trường";
    if (!form.phone.trim()) newErrors.phone = "Số điện thoại phụ huynh là bắt buộc";
    else if (!/^(0|\+84)\d{8,9}$/.test(form.phone.replace(/\s/g, ""))) newErrors.phone = "Số điện thoại không hợp lệ";
    if (!form.subject) newErrors.subject = "Vui lòng chọn môn chuyên";
    if (!form.examLocationId) newErrors.examLocationId = "Vui lòng chọn địa điểm thi";
    return newErrors;
  };

  useEffect(() => {
    if (!locationOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!locationWrapRef.current) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!locationWrapRef.current.contains(target)) setLocationOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [locationOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setPaymentModalOpen(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px 12px 42px",
    borderRadius: 10,
    border: "1.5px solid #E2E8F0",
    backgroundColor: "#F8FAFC",
    fontWeight: 400,
    fontSize: 15,
    color: "#1A2B4C",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    color: "#374151",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 6,
  };

  const errorStyle: React.CSSProperties = {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 4,
  };

  if (submitted) {
    return (
      <section id="dang-ky" className="py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center" style={{ backgroundColor: "#F0F7FF", minHeight: 400 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-white rounded-3xl p-12 text-center max-w-md"
          style={{ boxShadow: "0 8px 40px rgba(26,43,76,0.12)" }}
        >
          <div className="flex items-center justify-center mx-auto mb-6 rounded-full" style={{ width: 80, height: 80, backgroundColor: "rgba(5,150,105,0.1)" }}>
            <CheckCircle size={44} color="#059669" />
          </div>
          <h3 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Đăng ký thành công!</h3>
          <p style={{ color: "#64748B", fontWeight: 400, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
            Cảm ơn <strong>{form.fullName}</strong> đã đăng ký. Thông tin thanh toán đã được gửi đến <strong>{form.phone} </strong>. Vui lòng thực hiện thanh toán để hoàn tất đăng ký thi.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setPaymentModalOpen(false);
              setForm({ fullName: "", cccd: "", dob: "", address: "", school: "", phone: "", subject: "", examLocationId: "" });
            }}
            style={{
              marginTop: 20,
              backgroundColor: "#1A2B4C",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 24px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
            }}
          >
            Đăng ký thêm
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="dang-ky" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F0F7FF" }}>
      <PaymentConfirmationModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onConfirmTransferred={() => setSubmitted(true)}
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <span style={{ color: "#F97316", fontWeight: 600, fontSize: 13 }}>ĐĂNG KÝ THAM DỰ</span>
          </div>
          <h2 style={{ color: "#1A2B4C", fontWeight: 700, fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.25, marginBottom: 10 }}>Điền thông tin đăng ký</h2>
          <p style={{ color: "#64748B", fontWeight: 400, fontSize: 15 }}>Thông tin phụ huynh sẽ được dùng để tra cứu kết quả</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 sm:p-8"
          style={{ boxShadow: "0 8px 40px rgba(26,43,76,0.1)", border: "1px solid #E2E8F0" }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>
                  Họ và tên thí sinh <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <FieldWrapper icon={<User size={16} color="#9CA3AF" />} error={errors.fullName} errorStyle={errorStyle}>
                  <input
                    type="text"
                    style={{ ...inputStyle, borderColor: errors.fullName ? "#DC2626" : "#E2E8F0" }}
                    placeholder="Nguyễn Văn A"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({ ...form, fullName: e.target.value });
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.fullName ? "#DC2626" : "#E2E8F0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </FieldWrapper>
              </div>
              <div>
                <label style={labelStyle}>
                  Số CCCD <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <FieldWrapper icon={<CreditCard size={16} color="#9CA3AF" />} error={errors.cccd} errorStyle={errorStyle}>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={12}
                    style={{ ...inputStyle, borderColor: errors.cccd ? "#DC2626" : "#E2E8F0" }}
                    placeholder="12 chữ số trên CCCD"
                    value={form.cccd}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 12);
                      setForm({ ...form, cccd: v });
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.cccd ? "#DC2626" : "#E2E8F0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </FieldWrapper>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>
                  Ngày sinh <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <FieldWrapper icon={<Calendar size={16} color="#9CA3AF" />} error={errors.dob} errorStyle={errorStyle}>
                  <input
                    type="date"
                    style={{ ...inputStyle, borderColor: errors.dob ? "#DC2626" : "#E2E8F0" }}
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.dob ? "#DC2626" : "#E2E8F0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </FieldWrapper>
              </div>

              <div>
                <label style={labelStyle}>
                  SĐT Phụ huynh <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <FieldWrapper icon={<Phone size={16} color="#9CA3AF" />} error={errors.phone} errorStyle={errorStyle}>
                  <input
                    type="tel"
                    style={{ ...inputStyle, borderColor: errors.phone ? "#DC2626" : "#E2E8F0" }}
                    placeholder="0912 345 678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#2563EB";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.phone ? "#DC2626" : "#E2E8F0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </FieldWrapper>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Địa chỉ</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 12, top: 13, zIndex: 1, pointerEvents: "none" }}>
                  <MapPin size={16} color="#9CA3AF" />
                </div>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Trường THCS đang học <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <FieldWrapper icon={<School size={16} color="#9CA3AF" />} error={errors.school} errorStyle={errorStyle}>
                <input
                  type="text"
                  style={{ ...inputStyle, borderColor: errors.school ? "#DC2626" : "#E2E8F0" }}
                  placeholder="Trường THCS ..."
                  value={form.school}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.school ? "#DC2626" : "#E2E8F0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </FieldWrapper>
            </div>

            <div ref={locationWrapRef} style={{ position: "relative", zIndex: 20 }}>
              <label style={labelStyle}>
                Chọn địa điểm thi <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <FieldWrapper icon={<MapPin size={16} color="#9CA3AF" />} error={errors.examLocationId} errorStyle={errorStyle}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={locationOpen}
                  onClick={() => setLocationOpen((v) => !v)}
                  style={{
                    ...inputStyle,
                    textAlign: "left",
                    cursor: "pointer",
                    borderColor: errors.examLocationId ? "#DC2626" : "#E2E8F0",
                    paddingRight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#2563EB";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = errors.examLocationId ? "#DC2626" : "#E2E8F0";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ color: selectedLocation ? "#1A2B4C" : "#94A3B8", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {selectedLocation ? selectedLocation.name : "Chọn khu vực thi"}
                  </span>
                  {selectedLocation && (
                    <span style={{ color: "#F97316", fontWeight: 700, fontSize: 13, flex: "0 0 auto" }}>
                      (Còn {selectedLocation.remaining}/{selectedLocation.total} chỗ)
                    </span>
                  )}
                  <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <ChevronDown size={16} color="#94A3B8" />
                  </span>
                </button>
              </FieldWrapper>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    role="listbox"
                    className="rounded-2xl overflow-hidden"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "calc(100% + 8px)",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 18px 48px rgba(26,43,76,0.18)",
                      backgroundColor: "#fff",
                    }}
                  >
                    {mockExamLocations.map((loc) => {
                      const active = loc.id === form.examLocationId;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setForm({ ...form, examLocationId: loc.id });
                            setErrors((prev) => ({ ...prev, examLocationId: undefined }));
                            setLocationOpen(false);
                          }}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: active ? "rgba(37,99,235,0.06)" : "#fff",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = active ? "rgba(37,99,235,0.06)" : "#F8FAFC";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = active ? "rgba(37,99,235,0.06)" : "#fff";
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                            <span style={{ width: 26, height: 26, borderRadius: 10, backgroundColor: "rgba(148,163,184,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                              <MapPin size={14} color="#64748B" />
                            </span>
                            <span style={{ color: "#1A2B4C", fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {loc.name}
                            </span>
                          </span>
                          <span style={{ color: "#F97316", fontWeight: 700, fontSize: 13, flex: "0 0 auto" }}>
                            (Còn {loc.remaining}/{loc.total} chỗ)
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label style={labelStyle}>
                Môn chuyên đăng ký <span style={{ color: "#DC2626" }}>*</span>
                <span style={{ fontWeight: 400, color: "#9CA3AF", fontSize: 12, marginLeft: 6 }}>(Chọn 1 môn)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {specialSubjects.map((s) => {
                  const selected = form.subject === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, subject: s })}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 20,
                        border: selected ? "2px solid #2563EB" : "1.5px solid #E2E8F0",
                        backgroundColor: selected ? "#2563EB" : "#F8FAFC",
                        color: selected ? "#fff" : "#374151",
                        fontWeight: selected ? 700 : 500,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {selected && <CheckCircle size={14} />}
                      {s}
                    </button>
                  );
                })}
              </div>
              {errors.subject && <p style={errorStyle}>{errors.subject}</p>}

              <AnimatePresence>
                {form.subject && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                    style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
                  >
                    <Sparkles size={16} color="#F97316" />
                    <span style={{ color: "#C2410C", fontWeight: 600, fontSize: 13 }}>
                      Bạn đã sẵn sàng cho thử thách môn <span style={{ color: "#F97316" }}>{form.subject}</span>!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span style={{ ...labelStyle, marginBottom: 0 }}>Lệ phí dự thi:</span>
              <div className="flex items-baseline justify-end gap-1 shrink-0 text-right">
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 2 }}>
                  <span
                    style={{
                      color: "#F97316",
                      fontWeight: 700,
                      fontSize: 22,
                      lineHeight: 1.1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    240.000
                  </span>
                  <span style={{ color: "#F97316", fontWeight: 700, fontSize: 13, lineHeight: 1 }}>đ</span>
                </span>
                <span style={{ color: "#6B7280", fontWeight: 400, fontSize: 13 }}>/ thí sinh</span>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#F97316",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "16px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 24px rgba(249,115,22,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px rgba(249,115,22,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(249,115,22,0.35)";
              }}
            >
              XÁC NHẬN ĐĂNG KÝ
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

