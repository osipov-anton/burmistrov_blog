import type { Metadata } from "next";
import { AdsScreen } from "@/screens/ads/ads-screen";

export const metadata: Metadata = {
  title: "Генератор объявлений для РСЯ",
  description:
    "Создавайте и скачивайте PNG-креативы для рекламы статьи в стандартных форматах Яндекс.Директа.",
  robots: { index: false, follow: false },
};

export default function AdsPage() {
  return <AdsScreen />;
}
