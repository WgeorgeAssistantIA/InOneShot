import { createFileRoute } from "@tanstack/react-router";
import { Index, t } from "./index";

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: [
      { title: t.en.metaTitle },
      { name: "description", content: t.en.metaDesc },
      { property: "og:title", content: "InOneShot — PDF mail merge in one click" },
      { property: "og:description", content: t.en.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.inoneshot.fr/en" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "canonical", href: "https://www.inoneshot.fr/en" },
      { rel: "alternate", hrefLang: "en", href: "https://www.inoneshot.fr/en" },
      { rel: "alternate", hrefLang: "fr", href: "https://www.inoneshot.fr/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://www.inoneshot.fr/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "InOneShot",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Windows, Android",
          description:
            "PDF mail merge: generate one personalized PDF per row of an Excel file, in one click. 100% local.",
          url: "https://www.inoneshot.fr/en",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: "0",
            highPrice: "39",
            offerCount: "2",
            offers: [
              { "@type": "Offer", name: "InOneShot Free", price: "0", priceCurrency: "EUR" },
              { "@type": "Offer", name: "InOneShot Pro", price: "39", priceCurrency: "EUR" },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.en.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }),
      },
    ],
  }),
  component: EnglishHome,
});

function EnglishHome() {
  return <Index forcedLang="en" />;
}
