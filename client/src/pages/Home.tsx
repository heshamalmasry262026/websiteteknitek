import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { ProductCard, ServiceCard, ArticleCard } from "@/components/Cards";
import { api } from "@/lib/api";
import type { Product, Service, Article } from "../../../drizzle/schema";
import { Loader2 } from "lucide-react";

function EmptyState({ text }: { text: string }) {
  return <p className="col-span-full py-8 text-center text-sm text-muted">{text}</p>;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [maintenance, setMaintenance] = useState<Service[]>([]);
  const [otherServices, setOtherServices] = useState<Service[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [prods, maint, other, arts] = await Promise.all([
          api.get<Product[]>("/products?category=accessories"),
          api.get<Service[]>("/services?category=maintenance"),
          api.get<Service[]>("/services?category=other"),
          api.get<Article[]>("/articles"),
        ]);
        setProducts(prods);
        setMaintenance(maint);
        setOtherServices(other);
        setArticles(arts);
      } catch {
        // API/DB might not be configured yet - sections render empty states
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Hero />

      <Section id="maintenance" title="خدمات الصيانة" subtitle="فريق فني متخصص لصيانة أجهزتك بجودة واحترافية">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Loader2 className="col-span-full mx-auto animate-spin text-accent" />
          ) : maintenance.length ? (
            maintenance.map((s) => <ServiceCard key={s.id} service={s} />)
          ) : (
            <EmptyState text="لا توجد خدمات صيانة حالياً" />
          )}
        </div>
      </Section>

      <Section id="accessories" title="الأكسسوارات" subtitle="أكسسوارات أصلية بأفضل الأسعار">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <Loader2 className="col-span-full mx-auto animate-spin text-accent" />
          ) : products.length ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <EmptyState text="لا توجد منتجات حالياً" />
          )}
        </div>
      </Section>

      <Section id="other-services" title="خدمات أخرى" subtitle="خدمات تقنية متنوعة تلبي احتياجاتك">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Loader2 className="col-span-full mx-auto animate-spin text-accent" />
          ) : otherServices.length ? (
            otherServices.map((s) => <ServiceCard key={s.id} service={s} />)
          ) : (
            <EmptyState text="لا توجد خدمات أخرى حالياً" />
          )}
        </div>
      </Section>

      <Section id="blog" title="المدونة" subtitle="نصائح ومقالات تقنية من فريقنا">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <Loader2 className="col-span-full mx-auto animate-spin text-accent" />
          ) : articles.length ? (
            articles.map((a) => <ArticleCard key={a.id} article={a} />)
          ) : (
            <EmptyState text="لا توجد مقالات حالياً" />
          )}
        </div>
      </Section>
    </div>
  );
}
