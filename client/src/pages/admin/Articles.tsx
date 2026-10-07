import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";
import type { Article } from "../../../../drizzle/schema";

const emptyForm = { title: "", excerpt: "", content: "", imageUrl: "", isPublished: true };

export default function AdminArticles() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setItems(await api.get<Article[]>("/articles"));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (a: Article) => {
    setEditing(a);
    setForm({ ...a });
    setShowForm(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editing) await api.put(`/articles/${editing.id}`, form);
      else await api.post("/articles", form);
      setShowForm(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("هل تريد حذف هذا المقال؟")) return;
    await api.delete(`/articles/${id}`);
    await load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">المقالات</h1>
        <button onClick={openNew} className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">
          <Plus size={16} /> إضافة مقال
        </button>
      </div>

      {loading ? (
        <Loader2 className="mx-auto animate-spin text-accent" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <div key={a.id} className="rounded-xl2 border border-surface-border bg-surface p-4">
              {a.imageUrl && <img src={a.imageUrl} className="mb-3 h-32 w-full rounded-lg object-cover" />}
              <h3 className="font-bold">{a.title}</h3>
              <p className="line-clamp-2 text-xs text-muted">{a.excerpt}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openEdit(a)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-surface-border py-1.5 text-sm hover:border-accent">
                  <Pencil size={14} /> تعديل
                </button>
                <button onClick={() => remove(a.id)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-400/40 py-1.5 text-sm text-red-400 hover:bg-red-400/10">
                  <Trash2 size={14} /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl2 border border-surface-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing ? "تعديل المقال" : "إضافة مقال"}</h2>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="عنوان المقال" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
              <input placeholder="مقتطف قصير" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
              <textarea placeholder="محتوى المقال" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border border-surface-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" rows={5} />
              <ImageUploader value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} folder="articles" label="صورة المقال" />
              <button onClick={save} disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-accent-foreground hover:bg-accent-hover disabled:opacity-60">
                {saving && <Loader2 size={16} className="animate-spin" />} حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
