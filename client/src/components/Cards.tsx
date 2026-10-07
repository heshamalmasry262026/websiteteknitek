import { ImageOff, ArrowLeft } from "lucide-react";
import type { Product } from "../../../drizzle/schema";
import type { Service } from "../../../drizzle/schema";
import type { Article } from "../../../drizzle/schema";

function CardImage({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg bg-background text-muted">
        <ImageOff size={28} />
      </div>
    );
  }
  return <img src={src} alt={alt} className="h-40 w-full rounded-lg object-cover" />;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="animate-fade-up rounded-xl2 border border-surface-border bg-surface p-4 shadow-card transition hover:-translate-y-1 hover:border-accent/60">
      <CardImage src={product.imageUrl} alt={product.name} />
      <h3 className="mt-3 font-bold">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold text-accent">{Number(product.price).toLocaleString("ar")} ل.س</span>
        <span className={`text-xs ${product.stock > 0 ? "text-success" : "text-red-400"}`}>
          {product.stock > 0 ? "متوفر" : "غير متوفر"}
        </span>
      </div>
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="animate-fade-up rounded-xl2 border border-surface-border bg-surface p-4 shadow-card transition hover:-translate-y-1 hover:border-accent/60">
      <CardImage src={service.imageUrl} alt={service.name} />
      <h3 className="mt-3 font-bold">{service.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{service.description}</p>
      {service.price && Number(service.price) > 0 && (
        <div className="mt-3 font-bold text-accent">{Number(service.price).toLocaleString("ar")} ل.س</div>
      )}
    </div>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="animate-fade-up rounded-xl2 border border-surface-border bg-surface p-4 shadow-card transition hover:-translate-y-1 hover:border-accent/60">
      <CardImage src={article.imageUrl} alt={article.title} />
      <h3 className="mt-3 font-bold">{article.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
      <div className="mt-3 flex items-center gap-1 text-sm text-accent">
        اقرأ المزيد <ArrowLeft size={14} />
      </div>
    </div>
  );
}
