import { useState, useRef } from "react";

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
      "w-full bg-transparent border-b-2 py-3 px-0 text-[#f0ece4] placeholder-[#5a554d]",
      "text-[15px] outline-none transition-all duration-300 font-sans",
      fieldState.focused === name
        ? "border-[#c8a96e]"
        : fieldState.touched[name]
        ? "border-[#3d3830]"
        : "border-[#2a2520]",
    ].join(" ");

  const getLabelClass = (name: string) =>
    [
      "block text-[11px] uppercase tracking-[0.15em] font-semibold mb-1 transition-colors duration-300 font-sans",
      fieldState.focused === name ? "text-[#c8a96e]" : "text-[#6b6560]",
    ].join(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }

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

      {/* Wrapper */}
      <div className="min-h-screen bg-[#0e0c09] flex items-center justify-center px-5 py-[60px] relative overflow-hidden">

        {/* Decorative gradients */}
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[150px] -left-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,169,110,0.03)_0%,transparent_70%)] pointer-events-none" />

        {/* Card */}
        <div className="w-full max-w-[600px] relative z-10" ref={formRef}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#c8a96e]" />
            <span className="font-dm text-[11px] tracking-[0.2em] uppercase text-[#c8a96e] font-medium">
              Get in Touch
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cormorant text-[clamp(42px,8vw,64px)] font-light leading-none text-[#f0ece4] mb-2 tracking-tight">
            Let's build<br />
            something{" "}
            <em className="italic text-[#c8a96e]">great</em>
          </h1>

          {/* Subheading */}
          <p className="font-dm text-sm text-[#5a554d] mb-12 font-light tracking-wide">
            Tell me about your project — I'll get back within 24 hours.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-[#2a2520] to-transparent mb-10" />

          {/* Form Grid */}
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
        </div>
      </div>
    </>
  );
}