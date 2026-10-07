import { MessageCircle, Wrench } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Hero() {
  const { settings } = useSettings();
  const waLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      className="relative overflow-hidden border-b border-surface-border"
      style={{
        backgroundImage: settings.bannerUrl
          ? `linear-gradient(180deg, rgba(7,13,26,0.75), rgba(7,13,26,0.95)), url(${settings.bannerUrl})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(0,180,216,0.18),transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold text-accent">
          {settings.storeNameAr} · صيانة · أكسسوارات · خدمات تقنية
        </span>
        <h1 className="mx-auto max-w-3xl animate-fade-up text-3xl font-extrabold leading-tight sm:text-5xl">
          {settings.heroTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          نوفر لك حلولاً تقنية متكاملة بجودة عالية وسرعة استجابة، من الصيانة إلى الأكسسوارات
          الأصلية وخدمات الدعم الفني.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#maintenance"
            className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-glow transition hover:bg-accent-hover"
          >
            <Wrench size={18} />
            استكشف خدماتنا
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-success px-6 py-3 font-semibold text-white transition hover:bg-success-hover"
          >
            <MessageCircle size={18} />
            راسلنا واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
