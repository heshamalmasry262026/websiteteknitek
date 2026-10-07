import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-surface-border bg-background-deep">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-accent">{settings.storeNameAr}</h3>
          <p className="text-sm leading-relaxed text-muted">
            منصتك الموثوقة للصيانة والأكسسوارات والخدمات التقنية المتخصصة.
          </p>
          <div className="mt-4 flex gap-3">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-surface-border p-2 text-muted hover:border-accent hover:text-accent">
                <Facebook size={16} />
              </a>
            )}
            {settings.twitterUrl && (
              <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-surface-border p-2 text-muted hover:border-accent hover:text-accent">
                <Twitter size={16} />
              </a>
            )}
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-surface-border p-2 text-muted hover:border-accent hover:text-accent">
                <Instagram size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-accent" /> {settings.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-accent" /> {settings.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-accent" /> {settings.address}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-accent" /> {settings.workingHours}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#maintenance" className="hover:text-accent">خدمات الصيانة</a></li>
            <li><a href="#accessories" className="hover:text-accent">الأكسسوارات</a></li>
            <li><a href="#other-services" className="hover:text-accent">خدمات أخرى</a></li>
            <li><a href="#blog" className="hover:text-accent">المدونة</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {settings.storeNameAr}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
