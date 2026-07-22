import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";

declare function gtag(...args: unknown[]): void;
function trackDownload() {
  track("download");
  if (typeof gtag !== "undefined") gtag("event", "download", { event_category: "engagement" });
}
function trackStoreDownload() {
  track("store_download");
  if (typeof gtag !== "undefined") gtag("event", "store_download", { event_category: "engagement" });
}
function trackPortableDownload() {
  track("portable_download");
  if (typeof gtag !== "undefined") gtag("event", "file_download", { event_category: "engagement", event_label: "portable_zip" });
}
function trackLinuxDownload() {
  track("linux_download");
  if (typeof gtag !== "undefined") gtag("event", "file_download", { event_category: "engagement", event_label: "linux_appimage" });
}
function trackLinuxTarDownload() {
  track("linux_tar_download");
  if (typeof gtag !== "undefined") gtag("event", "file_download", { event_category: "engagement", event_label: "linux_tar_gz" });
}
function trackSnapDownload() {
  track("snap_download");
  if (typeof gtag !== "undefined") gtag("event", "file_download", { event_category: "engagement", event_label: "linux_snap" });
}
function trackCrossLink(target: string) {
  track("cross_link_click", { target });
}

import {
  Download,
  FileText,
  FileSpreadsheet,
  Files,
  MousePointerClick,
  QrCode,
  CheckCircle2,
  Check,
  X,
  TriangleAlert,
  ChevronDown,
  ShieldCheck,
  Lock,
  CreditCard,
  Zap,
  ArrowRight,
  Sparkles,
  UploadCloud,
  Layers,
} from "lucide-react";

type Lang = "en" | "fr";

const CHECKOUT_URL = "https://voxcut-pro.lemonsqueezy.com/checkout/buy/d04203ba-2117-403a-9dfb-b903bfd04587?checkout[discount_code]=LANCEMENT";
const STORE_URL = "https://apps.microsoft.com/detail/9PPBQSM1MFZ2";
const PORTABLE_URL = "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot_1.1.0_win64_portable.zip";
const LINUX_URL = "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot-x86_64.AppImage";
const LINUX_TAR_URL = "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot_1.1.0_linux_x86_64.tar.gz";
const SNAP_URL = "https://snapcraft.io/inoneshot";
const YOUTUBE_URL = "https://www.youtube.com/@InOneShot-PDFMailMerge";
const CONTACT_EMAIL = "contact@inoneshot.fr";

const t = {
  en: {
    metaTitle: "InOneShot — Generate hundreds of personalized PDFs from your Excel, in one click",
    metaDesc:
      "PDF mail merge for Windows. From one PDF template + an Excel file, generate one PDF per row + a ZIP. 100% local. Free version available.",
    nav: { features: "Features", pricing: "Pricing", faq: "FAQ", cta: "Download" },
    announce: {
      text: "Launch offer: 30% off for the first 20 customers — code",
      code: "LANCEMENT",
    },
    hero: {
      title: "Generate hundreds of personalized PDFs in one click, from your Excel. 100% local.",
      subtitle:
        "From a single PDF template and an Excel file, place your fields by drag & drop, then generate one PDF per row plus a ready-to-send ZIP. No cloud, no subscription.",
      btnPrimary: "Download free for Windows",
      btnPortable: "Portable version (.zip)",
      btnLinux: "Linux (.AppImage)",
      btnLinuxTar: "Linux (.tar.gz)",
      btnSnap: "Linux (Snap Store)",
      subText: "Free — no credit card required",
      badges: [
        "Your files never leave your computer",
        "One-time purchase — no subscription",
        "QR codes & signatures included",
      ],
      floating: { topLeft: "QR code & signature", bottomRight: "100% local — GDPR" },
      window: { title: "InOneShot", from: "Excel — 24 rows", to: "Generated PDFs", counter: "PDFs", zip: "merged.zip" },
    },
    video: { caption: "InOneShot in action — 1-minute demo", soon: "Demo video coming soon" },
    pain: {
      title: "Is PDF mail merge eating your time?",
      text: "Copy-pasting each name into a template, exporting a PDF, renaming the file, doing it again a hundred times — it is the most thankless task there is, and a single typo means starting over.",
      solutionTitle: "Let InOneShot do the busywork in 3 steps:",
      steps: [
        "Import your PDF template and your Excel file",
        "Place your fields by drag & drop (columns, date, signature, QR code)",
        "Generate one PDF per row plus a ZIP — in a single click",
      ],
    },
    how: {
      title: "How it works",
      subtitle: "Three steps, zero hassle.",
      steps: [
        { title: "Import your files", desc: "One PDF template + one Excel sheet (.xlsx) as your data source." },
        { title: "Place your fields", desc: "Drag & drop columns, today's date, a signature image or a QR code." },
        { title: "Generate in one shot", desc: "One PDF per row, auto-named, bundled into a ready-to-send ZIP." },
      ],
    },
    pricing: {
      title: "Simple, honest pricing",
      subtitle: "Start free. Upgrade when you need volume.",
      free: {
        name: "Free",
        price: "€0",
        features: ["Up to 5 PDFs per batch", "Unlimited templates", "Basic fields (columns, date)", "Windows"],
        cta: "Download Free",
      },
      pro: {
        name: "Pro",
        price: "€39",
        priceNote: "one-time",
        tagline: "Pay once. Use forever.",
        features: [
          "Unlimited batches (hundreds of PDFs)",
          "Automatic ZIP export",
          "QR codes & signature images",
          "Automatic current date",
          "Automatic file naming",
          "Updates included for 12 months",
          "Priority support",
        ],
        cta: "Get InOneShot Pro →",
        guarantee: "30-day money-back guarantee",
        promo: {
          title: "Launch offer",
          detail: "30% off for the first 20 customers",
          code: "LANCEMENT",
          applied: "applied at checkout",
          priceHint: "≈ €27.30 instead of €39",
        },
      },
      comparison: "⭐ One-time payment: €39 once — instead of a recurring subscription.",
    },
    pillars: {
      title: "Why InOneShot?",
      cards: [
        {
          icon: "lock",
          title: "100% local, private & GDPR-compliant",
          desc: "Your PDFs and your data never leave your computer. No server, no cloud. Ideal for HR, notaries, invoices and any sensitive document.",
          badge: "Ideal for sensitive data",
        },
        {
          icon: "payment",
          title: "One-time payment, lifetime access",
          desc: "Tired of subscriptions for a tool you use now and then? Buy InOneShot once, use it forever.",
          badge: null,
        },
        {
          icon: "speed",
          title: "Everything in one shot",
          desc: "Hundreds of PDFs generated in seconds, automatically named and bundled into a ZIP — ready to send.",
          badge: "From batch to ZIP in 1 click",
        },
      ],
    },
    compare: {
      eyebrow: "Comparison · July 2026",
      title: "PDF mail merge, done right and kept local",
      subtitle:
        "Classic Word/Excel mail merge does not output native PDFs. Online tools upload your data to the cloud. InOneShot keeps everything on your machine — with advanced fields and a one-click batch.",
      cols: { local: "100% local", advanced: "Advanced fields (QR / signature)", batch: "Batch in 1 click", price: "Price" },
      rows: [
        { name: "InOneShot", badge: "Our app", sub: "PDF + ZIP, named automatically", highlight: true, local: "yes", localNote: "", advanced: "yes", advancedNote: "QR, signature, date", batch: "yes", batchNote: "PDF + ZIP", price: "€39 one-time" },
        { name: "Word/Excel mail merge", badge: "", sub: "classic merge", highlight: false, local: "yes", localNote: "", advanced: "warn", advancedNote: "no native PDF", batch: "warn", batchNote: "manual PDF export", price: "Office included" },
        { name: "Adobe Acrobat (+ plugin)", badge: "", sub: "", highlight: false, local: "yes", localNote: "", advanced: "yes", advancedNote: "", batch: "warn", batchNote: "paid plugin", price: "~€24/mo" },
        { name: "Online PDF tools", badge: "", sub: "", highlight: false, local: "no", localNote: "cloud upload", advanced: "warn", advancedNote: "plan-dependent", batch: "yes", batchNote: "", price: "subscription" },
      ],
      footnote:
        "Indicative comparison compiled in July 2026. Competitors' features, limits and prices may vary.",
      quote:
        "I used to spend hours merging my PDFs one by one and renaming each file by hand. InOneShot does the whole batch in one shot — exactly the tool I wanted.",
      quoteAuthor: "William — creator of InOneShot",
    },
    big: {
      tag: "Desktop optimized",
      title: "Hundreds of letters, certificates or invoices to produce?",
      desc: "InOneShot generates one PDF per row of your Excel and hands you a ready-to-send ZIP — in a single click, 100% on your computer.",
      cta: "Download InOneShot",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Is the free version really free?",
          a: "Yes. There is no time limit. You can generate up to 5 PDFs per batch, forever, at no cost.",
        },
        { q: "What files do I need?", a: "A PDF template and an Excel file (.xlsx) as your data source." },
        {
          q: "Are my files uploaded to the internet?",
          a: "No. Everything is processed locally on your computer. Your template and your data never leave your machine.",
        },
        {
          q: "Which fields can I place on the template?",
          a: "Any Excel column, the current date, a signature image and a QR code — all placed by drag & drop.",
        },
        {
          q: "How are the generated PDFs named?",
          a: "Automatically, based on a column of your choice (for example a name or an invoice number).",
        },
        {
          q: "Is there a Mac or Linux version?",
          a: "Windows is available now. A Linux version is on the way.",
        },
      ],
    },
    email: {
      title: "Stay in the loop",
      desc: "Be the first to know about new features and updates.",
      placeholder: "your@email.com",
      cta: "Notify me",
      sending: "Sending…",
      thanks: "Thanks! We'll be in touch.",
      error: "Something went wrong. Please try again later.",
      consent:
        "By subscribing, you agree to receive InOneShot news by email. You can unsubscribe at any time via the link in each email.",
      consentLink: "Privacy policy",
    },
    footer: {
      links: { download: "Download", pricing: "Pricing", faq: "FAQ", youtube: "YouTube", privacy: "Privacy", legal: "Legal notice", contact: "Contact" },
      copy: "© 2026 InOneShot — Local and private PDF mail merge",
      madeBy: "A La Fabrik Numérique product",
      alsoCheck: "Also check out VoxCut",
      alsoCheckVectorPop: "Also check out VectorPop",
    },
  },
  fr: {
    metaTitle: "InOneShot — Générez des centaines de PDF personnalisés depuis votre Excel, en un clic",
    metaDesc:
      "Publipostage PDF pour Windows. À partir d'un modèle PDF + un fichier Excel, générez un PDF par ligne + un ZIP. 100% local. Version gratuite disponible.",
    nav: { features: "Fonctionnalités", pricing: "Tarifs", faq: "FAQ", cta: "Télécharger" },
    announce: {
      text: "Offre de lancement : -30% pour les 20 premiers clients — code",
      code: "LANCEMENT",
    },
    hero: {
      title: "Générez des centaines de PDF personnalisés en un clic, depuis votre Excel. 100% local.",
      subtitle:
        "À partir d'un seul modèle PDF et d'un fichier Excel, placez vos champs par glisser-déposer, puis générez un PDF par ligne et un ZIP prêt à envoyer. Pas de cloud, pas d'abonnement.",
      btnPrimary: "Télécharger gratuitement pour Windows",
      btnPortable: "Version portable (.zip)",
      btnLinux: "Linux (.AppImage)",
      btnLinuxTar: "Linux (.tar.gz)",
      btnSnap: "Linux (Snap Store)",
      subText: "Gratuit — aucune carte bancaire requise",
      badges: [
        "Vos fichiers ne quittent jamais votre ordinateur",
        "Achat unique — aucun abonnement",
        "QR code & signature inclus",
      ],
      floating: { topLeft: "QR code & signature", bottomRight: "100% local — RGPD" },
      window: { title: "InOneShot", from: "Excel — 24 lignes", to: "PDF générés", counter: "PDF", zip: "publipostage.zip" },
    },
    video: { caption: "InOneShot en action — démo d'une minute", soon: "Démo vidéo bientôt disponible" },
    pain: {
      title: "Le publipostage PDF vous prend des heures ?",
      text: "Copier-coller chaque nom dans un modèle, exporter un PDF, renommer le fichier, et recommencer cent fois — c'est la tâche la plus ingrate qui soit, et une seule faute de frappe oblige à tout reprendre.",
      solutionTitle: "Laissez InOneShot faire le travail répétitif en 3 étapes :",
      steps: [
        "Importez votre modèle PDF et votre fichier Excel",
        "Placez vos champs par glisser-déposer (colonnes, date, signature, QR code)",
        "Générez un PDF par ligne et un ZIP — en un seul clic",
      ],
    },
    how: {
      title: "Comment ça marche",
      subtitle: "Trois étapes, zéro complication.",
      steps: [
        { title: "Importez vos fichiers", desc: "Un modèle PDF + un fichier Excel (.xlsx) comme source de données." },
        { title: "Placez vos champs", desc: "Glissez-déposez les colonnes, la date du jour, une image de signature ou un QR code." },
        { title: "Générez d'un seul tir", desc: "Un PDF par ligne, nommé automatiquement, réuni dans un ZIP prêt à envoyer." },
      ],
    },
    pricing: {
      title: "Tarifs simples et transparents",
      subtitle: "Commencez gratuitement. Passez à Pro quand vous montez en volume.",
      free: {
        name: "Gratuit",
        price: "0 €",
        features: ["Jusqu'à 5 PDF par lot", "Modèles illimités", "Champs de base (colonnes, date)", "Windows"],
        cta: "Télécharger",
      },
      pro: {
        name: "Pro",
        price: "39 €",
        priceNote: "paiement unique",
        tagline: "Payez une fois. Utilisez à vie.",
        features: [
          "Lots illimités (des centaines de PDF)",
          "Export ZIP automatique",
          "QR code & image de signature",
          "Date du jour automatique",
          "Nommage automatique des fichiers",
          "Mises à jour incluses pendant 12 mois",
          "Support prioritaire",
        ],
        cta: "Obtenir InOneShot Pro →",
        guarantee: "30 jours satisfait ou remboursé",
        promo: {
          title: "Offre de lancement",
          detail: "-30% pour les 20 premiers clients",
          code: "LANCEMENT",
          applied: "appliqué au paiement",
          priceHint: "≈ 27,30 € au lieu de 39 €",
        },
      },
      comparison: "⭐ Paiement unique : 39 € une seule fois — au lieu d'un abonnement récurrent.",
    },
    pillars: {
      title: "Pourquoi InOneShot ?",
      cards: [
        {
          icon: "lock",
          title: "100% local, privé & RGPD",
          desc: "Vos PDF et vos données ne quittent jamais votre ordinateur. Pas de serveur, pas de cloud. Idéal pour les RH, les notaires, les factures et tout document sensible.",
          badge: "Idéal pour données sensibles",
        },
        {
          icon: "payment",
          title: "Paiement unique, à vie",
          desc: "Marre des abonnements pour un outil que vous utilisez ponctuellement ? Achetez InOneShot une fois, utilisez-le pour toujours.",
          badge: null,
        },
        {
          icon: "speed",
          title: "Tout en un seul tir",
          desc: "Des centaines de PDF générés en quelques secondes, nommés automatiquement et réunis dans un ZIP — prêt à envoyer.",
          badge: "Du lot au ZIP en 1 clic",
        },
      ],
    },
    compare: {
      eyebrow: "Comparatif · juillet 2026",
      title: "Le publipostage PDF, bien fait et 100% local",
      subtitle:
        "Le publipostage Word/Excel classique ne produit pas de vrais PDF. Les outils en ligne envoient vos données dans le cloud. InOneShot garde tout sur votre machine — avec des champs avancés et un lot en un clic.",
      cols: { local: "100% local", advanced: "Champs avancés (QR / signature)", batch: "Lot en 1 clic", price: "Prix" },
      rows: [
        { name: "InOneShot", badge: "Notre app", sub: "PDF + ZIP, nommés automatiquement", highlight: true, local: "yes", localNote: "", advanced: "yes", advancedNote: "QR, signature, date", batch: "yes", batchNote: "PDF + ZIP", price: "39 € une fois" },
        { name: "Publipostage Word/Excel", badge: "", sub: "fusion classique", highlight: false, local: "yes", localNote: "", advanced: "warn", advancedNote: "pas de PDF natif", batch: "warn", batchNote: "export PDF manuel", price: "inclus Office" },
        { name: "Adobe Acrobat (+ plugin)", badge: "", sub: "", highlight: false, local: "yes", localNote: "", advanced: "yes", advancedNote: "", batch: "warn", batchNote: "plugin payant", price: "~24 €/mois" },
        { name: "Outils PDF en ligne", badge: "", sub: "", highlight: false, local: "no", localNote: "upload cloud", advanced: "warn", advancedNote: "selon l'offre", batch: "yes", batchNote: "", price: "abonnement" },
      ],
      footnote:
        "Comparatif indicatif établi en juillet 2026. Les fonctionnalités, limites et tarifs des autres solutions sont susceptibles d'évoluer.",
      quote:
        "Je passais des heures à fusionner mes PDF un par un et à renommer chaque fichier à la main. InOneShot fait tout le lot d'un seul coup — c'est exactement l'outil que je voulais.",
      quoteAuthor: "William — créateur d'InOneShot",
    },
    big: {
      tag: "Optimisé desktop",
      title: "Des centaines de courriers, attestations ou factures à produire ?",
      desc: "InOneShot génère un PDF par ligne de votre Excel et vous livre un ZIP prêt à envoyer — en un seul clic, 100% sur votre ordinateur.",
      cta: "Télécharger InOneShot",
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "La version gratuite est-elle vraiment gratuite ?",
          a: "Oui. Il n'y a aucune limite dans le temps. Vous pouvez générer jusqu'à 5 PDF par lot, sans limite, gratuitement.",
        },
        { q: "Quels fichiers faut-il en entrée ?", a: "Un modèle PDF et un fichier Excel (.xlsx) comme source de données." },
        {
          q: "Mes fichiers sont-ils envoyés sur internet ?",
          a: "Non. Tout est traité localement sur votre ordinateur. Votre modèle et vos données ne quittent jamais votre machine.",
        },
        {
          q: "Quels champs puis-je placer sur le modèle ?",
          a: "N'importe quelle colonne Excel, la date du jour, une image de signature et un QR code — le tout par glisser-déposer.",
        },
        {
          q: "Comment sont nommés les PDF générés ?",
          a: "Automatiquement, selon une colonne de votre choix (par exemple un nom ou un numéro de facture).",
        },
        {
          q: "Existe-t-il une version Mac ou Linux ?",
          a: "Windows est disponible dès maintenant. Une version Linux est en préparation.",
        },
      ],
    },
    email: {
      title: "Restez informé",
      desc: "Soyez le premier informé des nouveautés et des mises à jour.",
      placeholder: "votre@email.com",
      cta: "Me prévenir",
      sending: "Envoi…",
      thanks: "Merci ! Nous vous tiendrons au courant.",
      error: "Une erreur est survenue. Merci de réessayer plus tard.",
      consent:
        "En vous inscrivant, vous acceptez de recevoir les actualités InOneShot par email. Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque email.",
      consentLink: "Politique de confidentialité",
    },
    footer: {
      links: { download: "Télécharger", pricing: "Tarifs", faq: "FAQ", youtube: "YouTube", privacy: "Confidentialité", legal: "Mentions légales", contact: "Contact" },
      copy: "© 2026 InOneShot — Publipostage PDF local et privé",
      madeBy: "Un produit La Fabrik Numérique",
      alsoCheck: "Découvrez aussi VoxCut",
      alsoCheckVectorPop: "Découvrez aussi VectorPop",
    },
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InOneShot — Générez des centaines de PDF personnalisés depuis votre Excel" },
      {
        name: "description",
        content:
          "Publipostage PDF pour Windows. À partir d'un modèle PDF + un Excel, générez un PDF par ligne + un ZIP. 100% local.",
      },
      { property: "og:title", content: "InOneShot — Publipostage PDF en un clic" },
      {
        property: "og:description",
        content:
          "Générez des centaines de PDF personnalisés depuis votre Excel, en un clic. 100% local, sans abonnement.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.inoneshot.fr/" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "canonical", href: "https://www.inoneshot.fr/" },
    ],
  }),
  component: Index,
});

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src="/inoneshot_logo.png" alt="InOneShot" className="h-9 w-9 rounded-lg" />
      <span className="text-lg font-semibold tracking-tight">InOneShot</span>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-secondary p-0.5 text-xs font-medium">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`cursor-pointer rounded-full px-3 py-1 transition ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function StatusIcon({ s }: { s: string }) {
  if (s === "yes") return <Check className="mx-auto h-5 w-5 text-green-600" aria-label="oui" />;
  if (s === "no") return <X className="mx-auto h-5 w-5 text-red-500" aria-label="non" />;
  return <TriangleAlert className="mx-auto h-5 w-5 text-amber-500" aria-label="partiel" />;
}

function CompareCell({ status, note }: { status: string; note: string }) {
  return (
    <td className="px-3 py-4 text-center align-middle">
      <StatusIcon s={status} />
      {note && <span className="mt-1 block text-xs text-muted-foreground">{note}</span>}
    </td>
  );
}

/** Démo animée : lignes Excel → PDF générés (équivalent InOneShot du WaveformDemo). */
function MergeDemo({ lang }: { lang: Lang }) {
  const c = t[lang].hero.window;
  const total = 24;
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReduced(true);
      setCount(total);
      return;
    }
    const id = setInterval(() => setCount((n) => (n >= total ? 0 : n + 1)), 240);
    return () => clearInterval(id);
  }, []);

  const activeRow = reduced ? -1 : count % 5;
  const rows = [
    { name: "Marie Durand", tag: "FAC-001" },
    { name: "Léo Martin", tag: "FAC-002" },
    { name: "Awa Diallo", tag: "FAC-003" },
    { name: "Tom Bernard", tag: "FAC-004" },
    { name: "Lina Petit", tag: "FAC-005" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {/* Source Excel */}
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <FileSpreadsheet className="h-3.5 w-3.5 text-green-600" /> {c.from}
        </span>
        <div className="overflow-hidden rounded-lg border border-border">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-3 border-b border-border/70 px-3 py-1.5 text-xs transition-colors last:border-b-0 ${
                i === activeRow ? "bg-brand/10" : "bg-card"
              }`}
            >
              <span className={`font-medium ${i === activeRow ? "text-brand-deep" : "text-foreground/80"}`}>{r.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{r.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground/50" />

      {/* PDF générés */}
      <div className="flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-brand">
          <Files className="h-3.5 w-3.5" /> {c.to}
        </span>
        <div className="relative mt-3 h-[104px] w-[88px]">
          {[2, 1, 0].map((d) => (
            <div
              key={d}
              className="absolute inset-0 rounded-lg border border-border bg-card shadow-sm"
              style={{ transform: `translate(${d * 6}px, ${d * -6}px) rotate(${d * 3}deg)` }}
            >
              <div className="flex items-center gap-1 border-b border-border/70 px-2 py-1.5">
                <FileText className="h-3 w-3 text-brand" />
                <span className="h-1 w-8 rounded bg-border" />
              </div>
              <div className="space-y-1 p-2">
                <span className="block h-1 w-full rounded bg-border" />
                <span className="block h-1 w-3/4 rounded bg-border" />
                <span className="block h-1 w-5/6 rounded bg-border" />
                <span className="mt-2 inline-block h-4 w-4 rounded-sm bg-brand/15 ring-1 ring-brand/30" />
              </div>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-energy/10 px-3 py-1 text-xs font-bold text-energy tabular-nums">
          <Zap className="h-3.5 w-3.5" /> {count} / {total} {c.counter}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          <Layers className="h-3 w-3" /> {c.zip}
        </span>
      </div>
    </div>
  );
}

function Index() {
  const [lang, setLangState] = useState<Lang>("fr");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("inoneshot-lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    } else {
      const browserLang = navigator.language?.toLowerCase() ?? "";
      if (!browserLang.startsWith("fr")) setLangState("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t[lang].metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t[lang].metaDesc);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("inoneshot-lang", l);
    } catch {
      // ignore
    }
  };

  const c = t[lang];

  const pillarIcons: Record<string, React.ElementType> = {
    lock: Lock,
    payment: CreditCard,
    speed: Zap,
  };

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        {c.announce && (
          <a
            href="#pricing"
            aria-label={`${c.announce.text} ${c.announce.code}`}
            className="group relative block overflow-hidden bg-primary text-primary-foreground"
          >
            <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-6 py-2 text-center text-xs font-semibold sm:text-sm">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-foreground" />
              </span>
              <span>
                {c.announce.text}{" "}
                <span className="font-mono font-bold tracking-wider underline underline-offset-2">{c.announce.code}</span>
              </span>
              <span aria-hidden="true" className="hidden transition-transform group-hover:translate-x-0.5 sm:inline">
                →
              </span>
            </div>
          </a>
        )}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">{c.nav.features}</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">{c.nav.pricing}</a>
            <a href="#faq" className="transition-colors hover:text-foreground">{c.nav.faq}</a>
            <Link to="/blog" className="transition-colors hover:text-foreground">Blog</Link>
          </nav>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackStoreDownload}
              className="hidden cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-brand-deep sm:inline-flex"
            >
              <Download className="h-4 w-4" /> {c.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* HERO (split) */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
          {/* Left — copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-deep">
                <FileText className="h-3.5 w-3.5" /> {lang === "fr" ? "Publipostage PDF · Windows" : "PDF mail merge · Windows"}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                {c.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-balance text-lg text-muted-foreground">{c.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={PORTABLE_URL}
                  onClick={trackPortableDownload}
                  className="group inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep hover:shadow-lg hover:shadow-primary/25"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  {c.hero.btnPrimary}
                </a>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackStoreDownload}
                  aria-label={lang === "fr" ? "Télécharger InOneShot sur le Microsoft Store" : "Get InOneShot from the Microsoft Store"}
                  className="inline-flex items-center transition-opacity hover:opacity-90"
                >
                  <img
                    src={`https://get.microsoft.com/images/${lang === "fr" ? "fr" : "en-us"}%20light.svg`}
                    width={200}
                    height={58}
                    alt={lang === "fr" ? "Disponible sur le Microsoft Store" : "Get it from Microsoft Store"}
                    className="h-[52px] w-auto"
                  />
                </a>
                <a
                  href={LINUX_URL}
                  onClick={trackLinuxDownload}
                  className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-deep"
                >
                  <Download className="h-4 w-4" />
                  {c.hero.btnLinux}
                </a>
                <a
                  href={LINUX_TAR_URL}
                  onClick={trackLinuxTarDownload}
                  className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-deep"
                >
                  <Download className="h-4 w-4" />
                  {c.hero.btnLinuxTar}
                </a>
                <a
                  href={SNAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackSnapDownload}
                  aria-label={lang === "fr" ? "Télécharger InOneShot sur le Snap Store" : "Get InOneShot from the Snap Store"}
                  className="inline-flex items-center transition-opacity hover:opacity-90"
                >
                  <img
                    src="https://snapcraft.io/en/light/install.svg"
                    width={204}
                    height={60}
                    alt={lang === "fr" ? "Disponible sur le Snap Store" : "Get it from the Snap Store"}
                    className="h-[52px] w-auto"
                  />
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{c.hero.subText}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                {c.hero.badges.map((badge, i) => {
                  const Icon = [Lock, CreditCard, QrCode][i] ?? Lock;
                  return (
                    <span key={badge} className="inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-brand" /> {badge}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right — app window with merge demo */}
          <Reveal delay={160}>
            <div className="relative">
              <div className="pointer-events-none absolute -left-3 -top-3 z-20 hidden items-center gap-1.5 rounded-full border border-brand/30 bg-card px-3 py-1.5 text-xs font-medium text-brand-deep shadow-sm sm:inline-flex">
                <QrCode className="h-3.5 w-3.5" /> {c.hero.floating.topLeft}
              </div>
              <div className="pointer-events-none absolute -bottom-3 -right-3 z-20 hidden items-center gap-1.5 rounded-full border border-energy/30 bg-card px-3 py-1.5 text-xs font-medium text-energy shadow-sm sm:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5" /> {c.hero.floating.bottomRight}
              </div>
              <div className="rounded-2xl border border-border bg-card shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-medium text-muted-foreground">{c.hero.window.title}</span>
                </div>
                <div className="p-6">
                  <MergeDemo lang={lang} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEMO VIDEO (placeholder) */}
      <section className="border-t border-border bg-muted py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{c.video.caption}</p>
            <div className="mx-auto aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
              <iframe
                className="h-full w-full"
                src={lang === "fr" ? "/video_promo_fr.html" : "/video_promo_en.html"}
                title={c.video.caption}
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAIN & SOLUTION */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.pain.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{c.pain.text}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="mb-12 text-center">
              <h3 className="text-xl font-semibold tracking-tight">{c.pain.solutionTitle}</h3>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[UploadCloud, MousePointerClick, Files].map((Icon, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20">
                    <Icon className="h-7 w-7 text-brand" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{c.pain.steps[i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-border bg-muted py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.how.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.how.subtitle}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[FileSpreadsheet, MousePointerClick, Download].map((Icon, i) => {
              const s = c.how.steps[i];
              const num = String(i + 1).padStart(2, "0");
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                    <div className="absolute right-6 top-6 text-5xl font-bold text-brand/10">{num}</div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <Icon className="h-6 w-6 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.pricing.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.pricing.subtitle}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {/* FREE */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold">{c.pricing.free.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight">{c.pricing.free.price}</span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {c.pricing.free.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackStoreDownload}
                  className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-brand/40 hover:bg-muted"
                >
                  <Download className="h-4 w-4" /> {c.pricing.free.cta}
                </a>
              </div>
            </Reveal>

            {/* PRO */}
            <Reveal delay={100}>
              <div className="relative flex h-full flex-col rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-brand/5 via-card to-card p-8 shadow-xl shadow-primary/10">
                <div>
                  <h3 className="text-lg font-semibold">{c.pricing.pro.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight">{c.pricing.pro.price}</span>
                    <span className="text-sm text-muted-foreground">{c.pricing.pro.priceNote}</span>
                  </div>
                  <p className="mt-2 text-sm text-brand-deep">{c.pricing.pro.tagline}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand-deep">
                    <CheckCircle2 className="h-3 w-3" /> {c.pricing.pro.guarantee}
                  </div>
                </div>
                {c.pricing.pro.promo && (
                  <div className="mt-5 rounded-xl border border-dashed border-energy/50 bg-energy/5 p-4 text-center">
                    <p className="text-sm font-bold text-energy">
                      {c.pricing.pro.promo.title} — {c.pricing.pro.promo.detail}
                    </p>
                    <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                      <span className="rounded-md bg-energy/15 px-2 py-0.5 font-mono text-sm font-bold tracking-wider text-energy">
                        {c.pricing.pro.promo.code}
                      </span>
                      <span className="text-xs text-muted-foreground">{c.pricing.pro.promo.applied}</span>
                    </p>
                    <p className="mt-1 text-xs font-medium text-foreground/80">{c.pricing.pro.promo.priceHint}</p>
                  </div>
                )}
                <ul className="mt-8 space-y-3 text-sm">
                  {c.pricing.pro.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep"
                >
                  {c.pricing.pro.cta}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-8 text-center text-sm text-muted-foreground">{c.pricing.comparison}</p>
          </Reveal>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section id="pillars" className="border-t border-border bg-muted py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.pillars.title}</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {c.pillars.cards.map((card, i) => {
              const Icon = pillarIcons[card.icon];
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                      <Icon className="h-6 w-6 text-brand" />
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                    {card.badge && (
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-energy/10 px-3 py-1 text-xs font-medium text-energy">
                        <Sparkles className="h-3 w-3" /> {card.badge}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-deep">{c.compare.eyebrow}</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.compare.title}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{c.compare.subtitle}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-4 py-4 text-left font-semibold"></th>
                    <th className="px-3 py-4 text-center font-semibold text-muted-foreground">{c.compare.cols.local}</th>
                    <th className="px-3 py-4 text-center font-semibold text-muted-foreground">{c.compare.cols.advanced}</th>
                    <th className="px-3 py-4 text-center font-semibold text-muted-foreground">{c.compare.cols.batch}</th>
                    <th className="px-3 py-4 text-center font-semibold text-muted-foreground">{c.compare.cols.price}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.compare.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-border/70 last:border-b-0 ${row.highlight ? "bg-brand/5" : i % 2 === 0 ? "bg-background" : "bg-muted/40"}`}
                    >
                      <td className={`px-4 py-4 ${row.highlight ? "border-l-2 border-primary" : ""}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold" translate="no">{row.name}</span>
                          {row.badge && (
                            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                              {row.badge}
                            </span>
                          )}
                        </div>
                        {row.sub && (
                          <span className={`mt-1 block text-xs ${row.highlight ? "text-brand-deep" : "text-muted-foreground"}`}>
                            {row.sub}
                          </span>
                        )}
                      </td>
                      <CompareCell status={row.local} note={row.localNote} />
                      <CompareCell status={row.advanced} note={row.advancedNote} />
                      <CompareCell status={row.batch} note={row.batchNote} />
                      <td className="px-3 py-4 text-center align-middle">
                        <span className={row.highlight ? "font-semibold text-brand-deep" : "text-muted-foreground"}>{row.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">{c.compare.footnote}</p>
            <figure className="mx-auto mt-10 max-w-2xl border-l-2 border-primary pl-5">
              <blockquote className="text-base italic text-foreground/90">“{c.compare.quote}”</blockquote>
              <figcaption className="mt-2 text-sm text-muted-foreground">{c.compare.quoteAuthor}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/8 via-card to-card p-10 shadow-sm md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand-deep">
                  <ShieldCheck className="h-3.5 w-3.5" /> {c.big.tag}
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.big.title}</h2>
                <p className="mt-4 max-w-xl text-muted-foreground">{c.big.desc}</p>
              </div>
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackStoreDownload}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep"
              >
                <Download className="h-4 w-4" /> {c.big.cta}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-muted py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.faq.title}</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {c.faq.items.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group rounded-xl border border-border bg-card shadow-sm transition hover:border-brand/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium">
                    {item.q}
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section id="newsletter" className="border-t border-border py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{c.email.title}</h2>
            <p className="mt-3 text-muted-foreground">{c.email.desc}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email || subscribeStatus === "sending") return;
                setSubscribeStatus("sending");
                subscribeNewsletter({ data: { email } })
                  .then((res) => setSubscribeStatus(res.ok ? "done" : "error"))
                  .catch(() => setSubscribeStatus("error"));
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {c.email.placeholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.email.placeholder}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                disabled={subscribeStatus === "sending"}
                className="cursor-pointer rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand-deep disabled:opacity-60"
              >
                {subscribeStatus === "sending" ? c.email.sending : c.email.cta}
              </button>
            </form>
            <p className="mx-auto mt-4 max-w-md text-xs text-muted-foreground">
              {c.email.consent}{" "}
              <Link to="/privacy" className="underline transition-colors hover:text-foreground">
                {c.email.consentLink}
              </Link>
            </p>
            {subscribeStatus === "done" && <p className="mt-4 text-sm text-brand-deep">{c.email.thanks}</p>}
            {subscribeStatus === "error" && <p className="mt-4 text-sm text-destructive">{c.email.error}</p>}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <Logo />
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" onClick={trackStoreDownload} className="transition-colors hover:text-foreground">{c.footer.links.download}</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">{c.footer.links.pricing}</a>
            <a href="#faq" className="transition-colors hover:text-foreground">{c.footer.links.faq}</a>
            <Link to="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCrossLink("youtube")} className="transition-colors hover:text-foreground">{c.footer.links.youtube}</a>
            <Link to="/privacy" className="transition-colors hover:text-foreground">{c.footer.links.privacy}</Link>
            <Link to="/legal" className="transition-colors hover:text-foreground">{c.footer.links.legal}</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foreground">{c.footer.links.contact}</a>
          </nav>
          <p className="text-xs text-muted-foreground">{c.footer.copy}</p>
          <p className="text-xs text-muted-foreground">
            <a
              href="https://www.lafabriknumerique.fr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCrossLink("lafabriknumerique")}
              className="underline transition-colors hover:text-foreground"
            >
              {c.footer.madeBy}
            </a>
            {" · "}
            <a
              href="https://voxcutpro.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCrossLink("voxcut")}
              className="underline transition-colors hover:text-foreground"
            >
              {c.footer.alsoCheck}
            </a>
            {" · "}
            <a
              href="https://vectorpop.fr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCrossLink("vectorpop")}
              className="underline transition-colors hover:text-foreground"
            >
              {c.footer.alsoCheckVectorPop}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
