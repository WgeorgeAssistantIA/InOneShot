import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Mentions légales — InOneShot" },
      {
        name: "description",
        content: "Mentions légales du site inoneshot.fr : éditeur, hébergeur et propriété intellectuelle.",
      },
      { property: "og:title", content: "Mentions légales — InOneShot" },
    ],
  }),
  component: Legal,
});

type Lang = "en" | "fr";

type Section = { h: string; lines: string[] };

const CONTACT = "contact@inoneshot.fr";

const ln: Record<Lang, { title: string; updated: string; back: string; sections: Section[] }> = {
  fr: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : 30 juin 2026",
    back: "Retour à l'accueil",
    sections: [
      {
        h: "Éditeur du site",
        lines: [
          "Le site inoneshot.fr et le logiciel InOneShot sont édités par William GEORGE, entrepreneur individuel exerçant sous le nom commercial « InOneShot ».",
          "SIRET : 518 251 897 00048",
          "Adresse : 18 rue de l'Oiseau Blanc, 42155 Saint-Léger-sur-Roanne, France",
          `Contact : ${CONTACT}`,
        ],
      },
      {
        h: "Directeur de la publication",
        lines: ["William GEORGE"],
      },
      {
        h: "Hébergement",
        lines: [
          "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — https://vercel.com",
          "Le nom de domaine est géré par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — https://www.ovhcloud.com",
        ],
      },
      {
        h: "Propriété intellectuelle",
        lines: [
          "L'ensemble des contenus du site (textes, visuels, logo, logiciel InOneShot) est la propriété de William GEORGE, sauf mention contraire. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable est interdite.",
        ],
      },
      {
        h: "Données personnelles",
        lines: [
          "Les informations relatives au traitement de vos données personnelles figurent dans notre politique de confidentialité, accessible depuis le lien en bas de cette page.",
        ],
      },
    ],
  },
  en: {
    title: "Legal Notice",
    updated: "Last updated: June 30, 2026",
    back: "Back to home",
    sections: [
      {
        h: "Site publisher",
        lines: [
          "The inoneshot.fr website and the InOneShot software are published by William GEORGE, a sole trader operating under the commercial name “InOneShot”.",
          "Business registration (SIRET): 518 251 897 00048",
          "Address: 18 rue de l'Oiseau Blanc, 42155 Saint-Léger-sur-Roanne, France",
          `Contact: ${CONTACT}`,
        ],
      },
      {
        h: "Publication director",
        lines: ["William GEORGE"],
      },
      {
        h: "Hosting",
        lines: [
          "The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States — https://vercel.com",
          "The domain name is managed by OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — https://www.ovhcloud.com",
        ],
      },
      {
        h: "Intellectual property",
        lines: [
          "All content on this website (text, visuals, logo, the InOneShot software) is the property of William GEORGE unless otherwise stated. Any reproduction, representation or use, in whole or in part, without prior authorization is prohibited.",
        ],
      },
      {
        h: "Personal data",
        lines: [
          "Information about how your personal data is processed can be found in our privacy policy, available from the link at the bottom of this page.",
        ],
      },
    ],
  },
};

function Legal() {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("inoneshot-lang")) as Lang | null;
    if (saved === "en" || saved === "fr") setLang(saved);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("inoneshot-lang", l);
    } catch {
      // ignore
    }
  };

  const c = ln[lang];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/inoneshot_logo.png" alt="InOneShot" className="h-9 w-9 rounded-lg" />
            <span className="text-lg font-semibold tracking-tight">InOneShot</span>
          </Link>
          <div className="inline-flex items-center rounded-full border border-border bg-secondary p-0.5 text-xs font-medium">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`cursor-pointer rounded-full px-3 py-1 transition ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {c.back}
        </Link>

        <header className="mt-8 mb-10 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{c.updated}</p>
        </header>

        <div className="space-y-10">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-semibold tracking-tight">{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.lines.map((line, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-border pt-8 text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {c.back}
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            {lang === "fr" ? "Politique de confidentialité" : "Privacy policy"}
          </Link>
        </div>
      </div>
    </main>
  );
}
