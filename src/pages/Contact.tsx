import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

type Purpose = "Wordpress" | "Shopify" | "React & Next" | "Website" | "App" | "Other";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: Purpose | "";
  message: string;
}

interface FieldState {
  focused: string | null;
  touched: Record<string, boolean>;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const headingRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    message: "",
  });

  const [fieldState, setFieldState] = useState<FieldState>({
    focused: null,
    touched: {},
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const cursorTl = gsap.timeline({ repeat: -1 });
    cursorTl
      .to("#contact-cursor", { opacity: 0, duration: 0.5 })
      .to("#contact-cursor", { opacity: 1, duration: 0.5 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    gsap.set("#contact-line", { width: 0 });
    gsap.set("#contact-line-image", { scale: 0.6, opacity: 0 });
    gsap.set("#contact-miniheading", { opacity: 1 });
    gsap.set("#contact-scramble-1", { opacity: 1 });
    gsap.set("#contact-scramble-2", { opacity: 1 });
    gsap.set("#contact-scramble-italic", { opacity: 1 });

    tl
      .to("#contact-line", { width: 32, duration: 0.7 })
      .to("#contact-line-image", { opacity: 1, scale: 1, duration: 0.35 }, "-=0.15")
      .to("#contact-miniheading", {
        scrambleText: { text: t("contact.miniheading"), chars: "upperCase", speed: 0.5 },
        duration: 0.9,
      }, "-=0.1")
      .to("#contact-scramble-1", {
        scrambleText: { text: t("contact.title"), chars: "upperCase", speed: 0.35 },
        duration: 1.2,
      }, "-=0.3")
      .to("#contact-scramble-2", {
        scrambleText: { text: t("contact.title1"), chars: "upperCase", speed: 0.35 },
        duration: 1.0,
      }, "-=0.6")
      .to("#contact-scramble-italic", {
        scrambleText: { text: t("contact.title2"), chars: "lowerCase", speed: 0.4 },
        duration: 0.8,
      }, "-=0.5")
      .add(cursorTl);

    return () => {
      tl.kill();
      cursorTl.kill();
    };
  }, [t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (name: string) => setFieldState((prev) => ({ ...prev, focused: name }));

  const handleBlur = (name: string) =>
    setFieldState((prev) => ({
      focused: null,
      touched: { ...prev.touched, [name]: true },
    }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "A valid email is required.";
    if (!form.message.trim()) return "Message is required.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setErrorMsg(err); setStatus("error"); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://ggv-bg.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", purpose: "", message: "" });
      setFieldState({ focused: null, touched: {} });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send. Please try again.");
      setStatus("error");
    }
  };

const getInputClass = (name: string) =>
  [
    "w-full bg-transparent border-b-2 py-3 px-0",
    "text-[15px] outline-none transition-all duration-300",
    "text-black dark:text-white",
    "placeholder:text-black/50 dark:placeholder:text-white/60",
    fieldState.focused === name
      ? "border-[#c8a96e]"
      : fieldState.touched[name]
        ? "border-black/50 dark:border-white/60"
        : "border-black/50 dark:border-white/60",
  ].join(" ");

const getLabelClass = (name: string) =>
  [
    "block text-[13px] uppercase tracking-[0.15em] font-bold mb-1.5 transition-colors duration-300 font-sans",
    fieldState.focused === name
      ? "text-[#c8a96e]"
      : "text-black dark:text-white",
  ].join(" ");

  return (
    <>
      <style>{`
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #2c1f0e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .submit-btn:hover::before { transform: scaleX(1); }
        .submit-btn:hover span { color: #f5f0e8; }

        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        .dot-1 { animation: dotPulse 1.2s infinite; }
        .dot-2 { animation: dotPulse 1.2s infinite 0.2s; }
        .dot-3 { animation: dotPulse 1.2s infinite 0.4s; }
      `}</style>

      <div
        id="contact-me"
        className="relative text-black dark:text-white border-t border-gray-200 dark:border-slate-700 transition-colors bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            theme === "dark"
              ? `url('${import.meta.env.BASE_URL}ggvfooter-bg-image-black.jpg')`
              : `url('${import.meta.env.BASE_URL}ggvfooter-bg-image-white.jpg')`,
        }}
      >
        {/* Subtle overlay to ensure text legibility over bg image */}
        <div className="absolute inset-0 bg-white/30 dark:bg-black/40 pointer-events-none" />

        <div
          className="relative z-10 w-full max-w-7xl mx-auto grid gap-16 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-1 lg:grid-cols-[44%_52%] lg:gap-12"
          ref={formRef}
        >
          {/* ── Left: animated heading block ── */}
          <section className="flex text-2xl sm:text-6xl flex-col justify-center" ref={headingRef}>
            <div className="flex items-center gap-3 mb-5">
              <span id="contact-line" className="block h-px bg-[#c8a96e] w-0 shrink-0" />
              <img
                id="contact-line-image"
                src={import.meta.env.BASE_URL + "favicon.png"}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 opacity-0 shrink-0"
              />
              {/* Light: warm brown-gray | Dark: warm stone */}
              <span
                id="contact-miniheading"
                className="text-[12px] tracking-[0.2em] uppercase text-[#6b5a42] dark:text-[#a8a29e] font-medium"
              />
            </div>

            {/* Light: deep brown-black | Dark: warm off-white */}
            <h1 className="font-cormorant text-[clamp(36px,6vw,56px)] font-light leading-[1.05] text-black dark:text-white mb-4 tracking-tight">
              <span id="contact-scramble-1" className="block" />
              <span className="flex items-baseline gap-2 flex-wrap">
                <span id="contact-scramble-2" />
                <em id="contact-scramble-italic" className="text-[#c8a96e]" style={{ fontStyle: "italic" }} />
                <span id="contact-cursor" className="inline-block w-[2px] h-[0.85em] bg-[#c8a96e] align-middle ml-0.5" />
              </span>
            </h1>

            {/* Light: medium warm brown | Dark: muted warm gray */}
            <p className="text-sm text-black dark:text-white font-light tracking-wide leading-relaxed max-w-sm">
              {t("contact.description")}
            </p>
          </section>

          {/* ── Right: form ── */}
          <section>
            <div className="grid grid-cols-2 gap-x-8">

              {/* Name */}
              <div className="mb-8">
                <label className={getLabelClass("name")}>Name *</label>
                <input
                  className={getInputClass("name")}
                  name="name"
                  type="text"
                  placeholder="Greese Gilbert"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                />
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className={getLabelClass("email")}>Email *</label>
                <input
                  className={getInputClass("email")}
                  name="email"
                  type="email"
                  placeholder="gilbert@company.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                />
              </div>

              {/* Phone */}
              <div className="mb-8">
                <label className={getLabelClass("phone")}>Phone</label>
                <input
                  className={getInputClass("phone")}
                  name="phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                />
              </div>

              {/* Company */}
              <div className="mb-8">
                <label className={getLabelClass("company")}>Company</label>
                <input
                  className={getInputClass("company")}
                  name="company"
                  type="text"
                  placeholder="Yaali Corp."
                  value={form.company}
                  onChange={handleChange}
                  onFocus={() => handleFocus("company")}
                  onBlur={() => handleBlur("company")}
                />
              </div>

              {/* Purpose */}
              <div className="col-span-2 mb-8">
                <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold mb-1 text-[#6b5a42] dark:text-[#8a8278]">
                  Purpose
                </label>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {(["Wordpress", "Shopify", "React & Next", "Website", "App", "Other"] as Purpose[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, purpose: prev.purpose === p ? "" : p }))
                      }
                      className={[
                        "cursor-pointer px-5 py-2 rounded-full border text-[13px] bg-transparent transition-all duration-[250ms] tracking-wide",
                        form.purpose === p
                          ? "border-[#c8a96e] text-[#c8a96e] bg-[rgba(200,169,110,0.12)]"
                          // Light: tan border + warm brown text | Dark: dark charcoal border + gray text
                          : "border-[#b89e7e] dark:border-[#3e3830] text-[#5a4a32] dark:text-[#7a7268] hover:border-[#c8a96e] dark:hover:border-[#5e5248] hover:text-[#2c1f0e] dark:hover:text-[#c8a96e]",
                      ].join(" ")}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="col-span-2 mb-8">
                <label className={getLabelClass("message")}>Message *</label>
                <textarea
                  className={`${getInputClass("message")} resize-none pt-3`}
                  name="message"
                  rows={4}
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                />
                {/* Light: warm brown-gray | Dark: muted dark */}
                <div className="text-[11px] text-[#8c7355] dark:text-[#5a5248] text-right mt-1.5 tracking-[0.05em]">
                  {form.message.length} / 1000
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="submit-btn w-full mt-2 px-8 py-[18px] bg-[#c8a96e] text-[#1e1208] border-none cursor-pointer text-[13px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={status === "loading"}
              type="button"
            >
              <span className="relative z-10 transition-colors duration-300">
                {status === "loading" ? (
                  <span>
                    Sending
                    <span className="dot-1 inline-block">.</span>
                    <span className="dot-2 inline-block">.</span>
                    <span className="dot-3 inline-block">.</span>
                  </span>
                ) : (
                  "Send Message →"
                )}
              </span>
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mt-5 px-5 py-3.5 rounded-sm border-l-2 border-[#c8a96e] bg-[rgba(200,169,110,0.12)] text-[#7a5a20] dark:text-[#c8a96e] text-[13px] tracking-wide">
                ✓ &nbsp; Your message has been sent. I'll be in touch soon.
              </div>
            )}

            {status === "error" && errorMsg && (
              <div className="mt-5 px-5 py-3.5 rounded-sm border-l-2 border-[#c85050] bg-[rgba(200,80,80,0.08)] text-[#8a2020] dark:text-[#c85050] text-[13px] tracking-wide">
                ✕ &nbsp; {errorMsg}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}