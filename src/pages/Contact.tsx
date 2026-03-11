import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

type Purpose = "Website" | "App" | "Other";

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

  // ── GSAP scramble animation ──────────────────────────────────────────────
  useEffect(() => {
    if (!headingRef.current) return;

    // Cursor blink (runs forever)
    const cursorTl = gsap.timeline({ repeat: -1 });
    cursorTl
      .to("#contact-cursor", { opacity: 0, duration: 0.5 })
      .to("#contact-cursor", { opacity: 1, duration: 0.5 });

    // Main timeline, fires when heading scrolls into view
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    // Initial states
    gsap.set("#contact-line", { width: 0 });
    gsap.set("#contact-line-image", { scale: 0.6, opacity: 0 });
    gsap.set("#contact-miniheading", { opacity: 1 });
    gsap.set("#contact-scramble-1", { opacity: 1 });
    gsap.set("#contact-scramble-2", { opacity: 1 });
    gsap.set("#contact-scramble-italic", { opacity: 1 });

    tl
      // 1. Grow the decorative line
      .to("#contact-line", { width: 32, duration: 0.7 })

      // 2. Pop in the favicon at the line end
      .to("#contact-line-image", { opacity: 1, scale: 1, duration: 0.35 }, "-=0.15")

      // 3. Scramble the mini-heading label
      .to("#contact-miniheading", {
        scrambleText: {
          text: t("contact.miniheading"),
          chars: "upperCase",
          speed: 0.5,
        },
        duration: 0.9,
      }, "-=0.1")

      // 4. Scramble first title line
      .to("#contact-scramble-1", {
        scrambleText: {
          text: t("contact.title"),
          chars: "upperCase",
          speed: 0.35,
        },
        duration: 1.2,
      }, "-=0.3")

      // 5. Scramble second title line (plain part)
      .to("#contact-scramble-2", {
        scrambleText: {
          text: t("contact.title1"),
          chars: "upperCase",
          speed: 0.35,
        },
        duration: 1.0,
      }, "-=0.6")

      // 6. Scramble italic accent word (soft lowercase scramble)
      .to("#contact-scramble-italic", {
        scrambleText: {
          text: t("contact.title2"),
          chars: "lowerCase",
          speed: 0.4,
        },
        duration: 0.8,
      }, "-=0.5")

      // 7. Attach the blinking cursor
      .add(cursorTl);

    return () => {
      tl.kill();
      cursorTl.kill();
    };
  }, [t]);
  // ────────────────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (name: string) => {
    setFieldState((prev) => ({ ...prev, focused: name }));
  };

  const handleBlur = (name: string) => {
    setFieldState((prev) => ({
      focused: null,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "A valid email is required.";
    if (!form.message.trim()) return "Message is required.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setErrorMsg(err);
      setStatus("error");
      return;
    }

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
      "text-[15px] outline-none transition-all duration-300 font-sans",
      "text-[#1a1714] dark:text-[#f0ece4]",
      "placeholder-[#b0a89e] dark:placeholder-[#5a554d]",
      fieldState.focused === name
        ? "border-[#c8a96e]"
        : fieldState.touched[name]
        ? "border-[#c0b8b0] dark:border-[#3d3830]"
        : "border-[#ddd8d0] dark:border-[#2a2520]",
    ].join(" ");

  const getLabelClass = (name: string) =>
    [
      "block text-[11px] uppercase tracking-[0.15em] font-semibold mb-1.5 transition-colors duration-300 font-sans",
      fieldState.focused === name
        ? "text-[#c8a96e]"
        : "text-[#9a9088] dark:text-[#6b6560]",
    ].join(" ");

  return (
    <>
      <style>{`
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f0ece4;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .submit-btn:hover::before { transform: scaleX(1); }

        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
        .dot-1 { animation: dotPulse 1.2s infinite; }
        .dot-2 { animation: dotPulse 1.2s infinite 0.2s; }
        .dot-3 { animation: dotPulse 1.2s infinite 0.4s; }
      `}</style>

      <div className="bg-[#f7f4ef] dark:bg-[#0e0c09] text-[#1a1714] dark:text-[#f0ece4] transition-colors duration-300">
        <div
          className="w-full max-w-7xl mx-auto grid gap-16 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-1 lg:grid-cols-[44%_52%] lg:gap-12"
          ref={formRef}
        >

          {/* ── Left: animated heading block ── */}
          <section className="flex flex-col justify-center" ref={headingRef}>

            {/* Mini-heading row: growing line + icon + scrambled label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                id="contact-line"
                className="block h-px bg-[#c8a96e] w-0 shrink-0"
              />
              <img
                id="contact-line-image"
                src="dist/favicon.png"
                alt=""
                aria-hidden="true"
                className="w-4 h-4 opacity-0 shrink-0"
              />
              {/* Scrambled mini-heading — starts empty, filled by GSAP */}
              <span
                id="contact-miniheading"
                className="font-dm text-[11px] tracking-[0.2em] uppercase text-[#c8a96e] font-medium"
              />
            </div>

            {/* Main heading — three scramble targets */}
            <h1 className="font-cormorant text-[clamp(36px,6vw,56px)] font-light leading-[1.05] text-[#1a1714] dark:text-[#f0ece4] mb-4 tracking-tight">
              {/* Line 1 */}
              <span id="contact-scramble-1" className="block" />

              {/* Line 2: plain word + italic accent + cursor */}
              <span className="flex items-baseline gap-2 flex-wrap">
                <span id="contact-scramble-2" />
                <em
                  id="contact-scramble-italic"
                  className="text-[#c8a96e]"
                  style={{ fontStyle: "italic" }}
                />
                <span
                  id="contact-cursor"
                  className="inline-block w-[2px] h-[0.85em] bg-[#c8a96e] align-middle ml-0.5"
                />
              </span>
            </h1>

            <p className="font-dm text-sm text-[#7a7068] dark:text-[#5a554d] font-light tracking-wide leading-relaxed max-w-sm">
              {t("contact.description")}
            </p>
          </section>

          <section>
            <div className="grid grid-cols-2 gap-x-8">

            {/* Name */}
            <div className="mb-8">
              <label className={getLabelClass("name")}>Name *</label>
              <input
                className={getInputClass("name")}
                name="name"
                type="text"
                placeholder="John Doe"
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
                placeholder="john@company.com"
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
                placeholder="+1 (555) 000-0000"
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
                placeholder="Acme Inc."
                value={form.company}
                onChange={handleChange}
                onFocus={() => handleFocus("company")}
                onBlur={() => handleBlur("company")}
              />
            </div>

            {/* Purpose - full width */}
            <div className="col-span-2 mb-8">
              <label className="block text-[11px] uppercase tracking-[0.15em] font-semibold mb-1 text-[#6b6560] font-dm">
                Purpose
              </label>
              <div className="flex gap-2.5 mt-1">
                {(["Website", "App", "Other"] as Purpose[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, purpose: prev.purpose === p ? "" : p }))
                    }
                    className={[
                      "cursor-pointer px-5 py-2 rounded-full border text-[13px] bg-transparent transition-all duration-[250ms] tracking-wide font-dm",
                      form.purpose === p
                        ? "border-[#c8a96e] text-[#c8a96e] bg-[rgba(200,169,110,0.07)]"
                        : "border-[#2a2520] text-[#6b6560] hover:border-[#4a4540] hover:text-[#a09890]",
                    ].join(" ")}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Message - full width */}
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
              <div className="text-[11px] text-[#3d3830] text-right mt-1.5 tracking-[0.05em] font-dm">
                {form.message.length} / 1000
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="submit-btn w-full mt-2 px-8 py-[18px] bg-[#c8a96e] text-[#0e0c09] border-none cursor-pointer font-dm text-[13px] font-medium tracking-[0.15em] uppercase transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={status === "loading"}
            type="button"
          >
            <span className="relative z-10">
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
            <div className="mt-5 px-5 py-3.5 rounded-sm border-l-2 border-[#c8a96e] bg-[rgba(200,169,110,0.1)] text-[#c8a96e] font-dm text-[13px] tracking-wide">
              ✓ &nbsp; Your message has been sent. I'll be in touch soon.
            </div>
          )}

          {status === "error" && errorMsg && (
            <div className="mt-5 px-5 py-3.5 rounded-sm border-l-2 border-[#c85050] bg-[rgba(200,80,80,0.07)] text-[#c85050] font-dm text-[13px] tracking-wide">
              ✕ &nbsp; {errorMsg}
            </div>
          )}
          </section>

        </div>
      </div>
    </>
  );
}
