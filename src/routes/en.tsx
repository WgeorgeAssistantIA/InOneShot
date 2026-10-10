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
      { property: "og:image", content: "https://www.inoneshot.fr/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.inoneshot.fr/og-image.png" },
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
          operatingSystem: "Windows, Linux, Android",
          description:
            "PDF mail merge: generate one personalized PDF per row of an Excel file, in one click. 100% local.",
          url: "https://www.inoneshot.fr/en",
          image: "https://www.inoneshot.fr/og-image.png",
          screenshot: "https://www.inoneshot.fr/og-image.png",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "28",
            bestRating: "5",
            worstRating: "1",
          },
          sameAs: [
            "https://www.wikidata.org/wiki/Q141656926",
            "https://apps.microsoft.com/detail/9PPBQSM1MFZ2",
            "https://play.google.com/store/apps/details?id=com.lafabriknumerique.inoneshot_android",
            "https://snapcraft.io/inoneshot",
          ],
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
          "@type": "Organization",
          name: "La Fabrik Numérique",
          url: "https://www.lafabriknumerique.fr",
          founder: { "@type": "Person", name: "William GEORGE", jobTitle: "Founder", url: "https://www.lafabriknumerique.fr" },
          logo: "https://www.inoneshot.fr/inoneshot_logo.png",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "InOneShot",
          url: "https://www.inoneshot.fr/en",
          inLanguage: "en",
          description: "PDF mail merge: one personalised PDF per Excel row, 100% local.",
          publisher: { "@type": "Organization", name: "La Fabrik Numérique", url: "https://www.lafabriknumerique.fr" },
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
