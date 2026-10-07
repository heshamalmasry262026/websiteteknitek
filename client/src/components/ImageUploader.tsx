import { useRef, useState } from "react";
import { Upload, Loader2, ImageOff } from "lucide-react";
import { api } from "@/lib/api";

export default function ImageUploader({
  value,
  onChange,
  folder = "teknitek",
  label = "الصورة",
}: {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const { url } = await api.upload(file, folder);
      onChange(url);
    } catch (err: any) {
      setError(err.message || "فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-muted">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-surface-border bg-background p-3 transition hover:border-accent"
      >
        {value ? (
          <img src={value} alt={label} className="h-16 w-16 rounded-lg object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-surface text-muted">
            <ImageOff size={20} />
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "جارِ الرفع..." : "اضغط لاختيار صورة"}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
