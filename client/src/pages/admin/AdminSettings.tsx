import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { api } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";
import { useSettings } from "@/context/SettingsContext";

const fields: { key: string; label: string; type?: string }[] = [
  { key: "storeNameAr", label: "اسم المتجر (عربي)" },
  { key: "storeName", label: "اسم المتجر (إنجليزي)" },
  { key: "phone", label: "رقم الهاتف" },
  { key: "whatsapp", label: "رقم الواتساب" },
  { key: "email", label: "البريد الإلكتروني", type: "email" },
  { key: "address", label: "العنوان" },
  { key: "workingHours", label: "ساعات العمل" },
  { key: "facebookUrl", label: "رابط فيسبوك" },
  { key: "twitterUrl", label: "رابط تويتر" },
  { key: "instagramUrl", label: "رابط انستغرام" },
];

export default function AdminSettings() {
  const { refresh } = useSettings();
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then(setForm);
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.put("/settings", form);
      await refresh();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <Loader2 className="mx-auto animate-spin text-accent" />;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold">إعدادات المتجر</h1>
      <p className="mb-6 text-sm text-muted">
        هذه الإعدادات تنعكس فوراً على الهيدر والفوتر وزر الواتساب في الموقع العام.
      </p>

      <div className="space-y-4 rounded-xl2 border border-surface-border bg-surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm text-muted">{label}</label>
              <input
                type={type || "text"}
                value={form[key] || ""}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-muted">نص البانر الرئيسي</label>
          <textarea
            value={form.heroTitle || ""}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageUploader value={form.logoUrl} onChange={(url) => setForm({ ...form, logoUrl: url })} folder="branding" label="شعار المتجر" />
          <ImageUploader value={form.bannerUrl} onChange={(url) => setForm({ ...form, bannerUrl: url })} folder="branding" label="صورة البانر الرئيسي" />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-semibold text-accent-foreground hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : null}
          {saved ? "تم الحفظ" : "حفظ الإعدادات"}
        </button>
      </div>
    </div>
  );
}
