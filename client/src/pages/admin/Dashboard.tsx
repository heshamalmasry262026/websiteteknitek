import { useEffect, useState } from "react";
import { Package, Wrench, Newspaper } from "lucide-react";
import { api } from "@/lib/api";

export default function Dashboard() {
  const [counts, setCounts] = useState({ products: 0, services: 0, articles: 0 });

  useEffect(() => {
    (async () => {
      const [products, services, articles] = await Promise.all([
        api.get<any[]>("/products"),
        api.get<any[]>("/services"),
        api.get<any[]>("/articles"),
      ]);
      setCounts({ products: products.length, services: services.length, articles: articles.length });
    })();
  }, []);

  const stats = [
    { label: "المنتجات", value: counts.products, icon: Package },
    { label: "الخدمات", value: counts.services, icon: Wrench },
    { label: "المقالات", value: counts.articles, icon: Newspaper },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">نظرة عامة</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl2 border border-surface-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted">{label}</span>
              <Icon className="text-accent" size={22} />
            </div>
            <p className="mt-3 text-3xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
