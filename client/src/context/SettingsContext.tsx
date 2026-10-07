import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "@/lib/api";

export interface StoreSettings {
  id: number;
  storeName: string;
  storeNameAr: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  logoUrl: string;
  bannerUrl: string;
  heroTitle: string;
}

const defaultSettings: StoreSettings = {
  id: 1,
  storeName: "Teknitek",
  storeNameAr: "تكنيتك",
  phone: "+963984342337",
  whatsapp: "+963984342337",
  email: "info@teknitek.com",
  address: "دمشق، سوريا",
  workingHours: "يومياً من 9 صباحاً حتى 9 مساءً",
  facebookUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  logoUrl: "",
  bannerUrl: "",
  heroTitle: "منصتك الموثوقة للصيانة والأكسسوارات والخدمات التقنية المتخصصة",
};

interface SettingsContextValue {
  settings: StoreSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  loading: true,
  refresh: async () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await api.get<StoreSettings>("/settings");
      setSettings(data);
    } catch {
      // Keep defaults if the API/DB isn't reachable yet
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
