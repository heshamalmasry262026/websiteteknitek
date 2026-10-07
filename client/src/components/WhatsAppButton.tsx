import { MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function WhatsAppButton() {
  const { settings } = useSettings();
  const waLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="راسلنا عبر واتساب"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] transition hover:scale-110 hover:bg-success-hover"
    >
      <MessageCircle size={26} />
    </a>
  );
}
