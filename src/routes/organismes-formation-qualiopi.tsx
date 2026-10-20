import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import { getReassuranceVariant, REASSURANCE_COPY, type ReassuranceVariant } from "@/lib/abtest";
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
  Layers,
  GraduationCap,
} from "lucide-react";

declare function gtag(...args: unknown[]): void;
function trackStoreDownload() {
  track("store_download");
  if (typeof gtag !== "undefined")
    gtag("event", "store_download", { event_category: "engagement" });
}
function trackPlayStoreDownload() {
  track("play_store_download");
  if (typeof gtag !== "undefined")
    gtag("event", "play_store_download", { event_category: "engagement" });
}
function trackPortableDownload() {
  track("portable_download");
  if (typeof gtag !== "undefined")
    gtag("event", "file_download", { event_category: "engagement", event_label: "portable_zip" });
}
function trackLinuxDownload() {
  track("linux_download");
  if (typeof gtag !== "undefined")
    gtag("event", "file_download", { event_category: "engagement", event_label: "linux_appimage" });
}
function trackLinuxTarDownload() {
  track("linux_tar_download");
  if (typeof gtag !== "undefined")
    gtag("event", "file_download", { event_category: "engagement", event_label: "linux_tar_gz" });
}
function trackSnapDownload() {
  track("snap_download");
  if (typeof gtag !== "undefined")
    gtag("event", "file_download", { event_category: "engagement", event_label: "linux_snap" });
}
function trackCrossLink(target: string) {
  track("cross_link_click", { target });
}

type Lang = "en" | "fr";

const CHECKOUT_URL =
  "https://checkout.lafabriknumerique.fr/checkout/buy/d04203ba-2117-403a-9dfb-b903bfd04587?checkout[discount_code]=LANCEMENT";
const STORE_URL = "https://apps.microsoft.com/detail/9PPBQSM1MFZ2";
const STORE_INSTALLER = "https://get.microsoft.com/installer/download/9PPBQSM1MFZ2?referrer=appbadge";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.lafabriknumerique.inoneshot_android";
const WINDOWS_INSTALLER_URL =
  "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot-Setup-2.0.0.exe";
const LINUX_URL =
  "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot-x86_64.AppImage";
const LINUX_TAR_URL =
  "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot_2.0.0_linux_x86_64.tar.gz";
const SNAP_URL = "https://snapcraft.io/inoneshot";
const YOUTUBE_URL = "https://www.youtube.com/@InOneShot-PDFMailMerge";
const CONTACT_EMAIL = "contact@inoneshot.fr";

const META_TITLE_FR = "Attestations Formation Qualiopi Excel — InOneShot"; // 49 chars
const META_DESC_FR =
  "Générez vos attestations de formation Qualiopi et feuilles d'émargement PDF en masse depuis Excel, 100 % hors ligne sur PC et sans abonnement."; // 142 chars

const META_TITLE_EN = "Offline Training Certificate Generator — InOneShot"; // 50 chars
const META_DESC_EN =
  "Generate your training completion certificates and attendance sheets in bulk from Excel, 100% offline on PC without a subscription or Word."; // 139 chars

const t = {
  fr: {
    metaTitle: META_TITLE_FR,
    metaDesc: META_DESC_FR,
    nav: { features: "Cas d'usage Qualiopi", pricing: "Tarifs", faq: "FAQ", cta: "Télécharger" },
    announce: {
      text: "Offre de lancement : -30% pour les 20 premiers clients — code",
      code: "LANCEMENT",
    },
    hero: {
      badge: "Organismes de formation & Formateurs indépendants (Qualiopi)",
      title:
        "Générez vos attestations de formation Qualiopi depuis Excel, hors ligne, sans abonnement et sans Word.",
      subtitle:
        "Le logiciel de génération d'attestations de formation Qualiopi depuis Excel conçu pour les organismes de formation et formateurs indépendants : produisez certificats de réalisation, convocations et feuilles d'émargement PDF en masse hors ligne, sans abonnement mensuel et sans Word.",
      btnPrimary: "Télécharger gratuitement pour Windows",
      btnBuyLifetime: "Acheter la Licence à vie — 39 € (une fois)",
      smartscreenNote:
        "S'installe via le Microsoft Store : signé par Microsoft, donc aucun avertissement de sécurité Windows. L'installeur .exe classique est juste en dessous.",
      btnLinux: "Linux (.AppImage)",
      btnLinuxTar: "Linux (.tar.gz)",
      subText:
        "Essai gratuit (jusqu'à 5 PDF par lot) ou Licence Pro à vie à 39 € TTC — 0 € d'abonnement",
      badges: [
        "100 % hors ligne — RGPD Stagiaires",
        "Licence à vie 39 € — sans abonnement",
        "1 PDF individuel nommé par stagiaire",
      ],
      floating: { topLeft: "Signature & QR code Qualiopi", bottomRight: "100 % local — Zéro Cloud" },
      window: {
        title: "InOneShot — Session Formation Qualiopi",
        from: "Excel — 24 stagiaires",
        to: "Certificats & Attestations PDF",
        counter: "PDF",
        zip: "session_qualiopi_2026.zip",
      },
    },
    useCases: {
      eyebrow: "Référentiel National Qualité · Indicateur 11 & Financeurs OPCO",
      title: "3 cas d'usage Qualiopi générés depuis le même fichier Excel",
      subtitle:
        "En partant d'un seul tableau Excel par session, vous éliminez toute incohérence de dates, de durées ou d'orthographe entre vos pièces justificatives lors d'un audit Qualiopi.",
      cards: [
        {
          title: "1. Attestations de fin de formation",
          desc: "Générez une attestation nominative par stagiaire reprenant l'intitulé exact, les objectifs pédagogiques évalués (Indicateur 11 Qualiopi), la durée, la date et le tampon/signature du formateur.",
          badge: "Indicateur 11 Qualiopi",
        },
        {
          title: "2. Certificats de réalisation (OPCO, CPF, France Travail)",
          desc: "Remplissez votre modèle PDF officiel de certificat de réalisation en série depuis Excel : dates de session, modalité (présentiel/distanciel), heures réalisées et nommage automatique par stagiaire.",
          badge: "Justificatif Financeurs",
        },
        {
          title: "3. Convocations & conventions avec QR code de vérification",
          desc: "Produisez vos convocations et conventions pré-remplies en un clic et insérez un QR code unique par stagiaire pointant vers le questionnaire d'évaluation à chaud ou la vérification du diplôme.",
          badge: "QR Code & Signature",
        },
      ],
    },
    compare3Cols: {
      eyebrow: "Comparatif 3 approches · Organismes de Formation",
      title: "Pourquoi payer 1 200 €/an d'ERP juste pour éditer vos attestations PDF ?",
      subtitle:
        "Comparez les 3 solutions utilisées par les formateurs indépendants et organismes de formation certifiés Qualiopi.",
      cards: [
        {
          name: "SaaS ERP Formation (Digiforma, Dendreo…)",
          price: "80 € à 150 € / mois",
          highlight: false,
          verdict: "Surdimensionné pour le besoin documentaire",
          points: [
            "❌ Abonnement récurrent coûteux (1 000 €+ par an) même les mois sans session",
            "❌ Données personnelles des stagiaires hébergées sur des serveurs tiers",
            "⚠️ Usine à gaz complexe si vous gérez déjà vos sessions dans Excel",
          ],
        },
        {
          name: "Publipostage Word / Copier-coller Canva",
          price: "Chronophage & fragile",
          highlight: false,
          verdict: "Risque d'erreur lors d'un contrôle Qualiopi",
          points: [
            "❌ Casse la mise en page des PDF officiels et déforme les logos/cadres",
            "❌ Génère un seul fichier géant au lieu d'un PDF individuel par stagiaire",
            "❌ Renommage manuel de chaque fichier PDF et risque de décalage de ligne",
          ],
        },
        {
          name: "InOneShot Desktop (Windows, Linux, Android)",
          price: "39 € une seule fois (à vie)",
          highlight: true,
          verdict: "L'outil ciblé, 100 % hors ligne et sans abonnement",
          points: [
            "✅ Conserve 100 % de votre maquette PDF (Canva, Word, certificat officiel)",
            "✅ Génère 1 fichier PDF individuel nommé par stagiaire + archive ZIP en 1 clic",
            "✅ 100 % hors ligne sur votre PC : conformité RGPD immédiate, 0 € par mois",
          ],
        },
      ],
    },
    how: {
      title: "Comment générer une promotion entière en 30 secondes",
      subtitle: "Trois étapes simples à chaque fin de session de formation.",
      steps: [
        {
          title: "1. Importez votre modèle PDF & l'Excel des stagiaires",
          desc: "Chargez votre modèle d'attestation ou de certificat de réalisation PDF ainsi que votre liste d'inscrits Excel (.xlsx ou .csv).",
        },
        {
          title: "2. Glissez-déposez vos champs une seule fois",
          desc: "Positionnez Nom, Prénom, Intitulé, Durée, Dates, image de signature du formateur et QR code d'évaluation. Sauvegardez le gabarit.",
        },
        {
          title: "3. Générez 1 PDF nommé par stagiaire + ZIP",
          desc: "En un clic, InOneShot produit chaque attestation individuelle (ex: Attestation_Qualiopi_Dupont_Marie.pdf) prête à envoyer.",
        },
      ],
    },
    pricing: {
      title: "Un tarif unique pensé pour les formateurs",
      subtitle: "Testez gratuitement sur vos propres modèles d'attestations. Payez une seule fois.",
      free: {
        name: "Essai Gratuit",
        price: "0 €",
        features: [
          "Jusqu'à 5 PDF par lot (idéal petites sessions)",
          "Modèles Qualiopi illimités",
          "Champs colonnes Excel & date",
          "100 % hors ligne (Windows, Linux, Android)",
        ],
        cta: "Télécharger gratuitement",
      },
      pro: {
        name: "Licence Pro à vie",
        price: "39 €",
        priceNote: "paiement unique (sans abonnement)",
        tagline: "Rentabilisé dès la première session de formation.",
        features: [
          "Lots illimités (10, 50 ou 500 stagiaires en 1 clic)",
          "1 PDF individuel par stagiaire + export ZIP automatique",
          "Image de signature/tampon & QR code dynamique",
          "Nommage automatique des fichiers PDF par stagiaire",
          "Gabarits sauvegardables et réutilisables à chaque session",
          "Mises à jour incluses & support prioritaire",
        ],
        cta: "Obtenir InOneShot Pro (39 €) →",
        promo: {
          title: "Offre de lancement",
          detail: "-30% pour les 20 premiers clients",
          code: "LANCEMENT",
          applied: "appliqué au paiement",
          priceHint: "≈ 27,30 € en paiement unique au lieu de 39 €",
        },
      },
    },
    faq: {
      title: "Questions fréquentes — Organismes de Formation & Qualiopi",
      items: [
        {
          q: "InOneShot permet-il de générer à la fois les attestations de formation et les certificats de réalisation Qualiopi ?",
          a: "Oui. Vous pouvez créer un gabarit pour votre attestation de fin de formation, un second pour le certificat de réalisation (modèle ministère / OPCO) et un troisième pour la convocation. À chaque fin de session, vous utilisez le même fichier Excel des stagiaires pour générer les trois lots PDF sans ressaisie et avec une cohérence parfaite.",
        },
        {
          q: "Pourquoi utiliser InOneShot plutôt que le publipostage Microsoft Word ?",
          a: "Le publipostage Word déforme souvent les maquettes PDF officielles et fusionne tous les stagiaires dans un seul document géant qu'il faut découper et renommer à la main. InOneShot travaille directement sur votre PDF d'origine (sans Word) et génère nativement un fichier PDF individuel nommé au nom de chaque stagiaire.",
        },
        {
          q: "Un formateur indépendant a-t-il l'obligation d'avoir un logiciel SaaS à 100 €/mois pour être certifié Qualiopi ?",
          a: "Non. Le Référentiel National Qualité (Qualiopi) n'impose aucun logiciel payant par abonnement. L'auditeur vérifie uniquement que vos preuves documentaires (convocations, émargements, évaluations, certificats de réalisation) sont complètes et cohérentes entre elles.",
        },
        {
          q: "Peut-on apposer automatiquement le tampon de l'organisme, la signature du formateur et un QR code ?",
          a: "Oui. InOneShot permet de placer par glisser-déposer une image PNG transparente (votre signature et le cachet de l'organisme de formation) ainsi qu'un QR code dynamique (lien vers le questionnaire de satisfaction à chaud ou vérification du certificat) sur chaque PDF généré.",
        },
        {
          q: "Les données personnelles des stagiaires sont-elles envoyées dans le Cloud ?",
          a: "Non, jamais. InOneShot s'exécute 100 % hors ligne sur votre ordinateur (Windows ou Linux). Le fichier Excel contenant les noms, emails et employeurs de vos stagiaires ne quitte jamais votre poste, vous garantissant une conformité RGPD totale lors de vos audits.",
        },
      ],
    },
    email: {
      title: "Restez informé des nouveautés InOneShot",
      desc: "Recevez nos conseils d'automatisation documentaire et les mises à jour majeures.",
      placeholder: "votre@email.com",
      cta: "Me prévenir",
      sending: "Envoi…",
      thanks: "Merci ! Nous vous tiendrons au courant.",
      error: "Une erreur est survenue. Merci de réessayer plus tard.",
      consent:
        "En vous inscrivant, vous acceptez de recevoir les actualités InOneShot par email. Désinscription en 1 clic.",
      consentLink: "Politique de confidentialité",
    },
    footer: {
      links: {
        download: "Télécharger",
        pricing: "Tarifs",
        faq: "FAQ",
        youtube: "YouTube",
        privacy: "Confidentialité",
        legal: "Mentions légales",
        contact: "Contact",
      },
      copy: "© 2026 InOneShot — Publipostage PDF local et privé",
      madeBy: "Un produit La Fabrik Numérique",
      alsoCheck: "Découvrez aussi VoxCut",
      alsoCheckVectorPop: "Découvrez aussi VectorPop",
    },
  },
  en: {
    metaTitle: META_TITLE_EN,
    metaDesc: META_DESC_EN,
    nav: { features: "Training Use Cases", pricing: "Pricing", faq: "FAQ", cta: "Download" },
    announce: {
      text: "Launch offer: 30% off for the first 20 customers — code",
      code: "LANCEMENT",
    },
    hero: {
      badge: "Training Providers & Independent Trainers (Qualiopi / Continuing Education)",
      title:
        "Offline training certificate generator from Excel, without subscription and without Word.",
      subtitle:
        "Batch-generate your training completion certificates, official Qualiopi records and attendance sheets directly from Excel, 100% offline on your PC without a recurring monthly subscription and without Microsoft Word.",
      btnPrimary: "Download free for Windows",
      btnBuyLifetime: "Buy Lifetime Pro License — €39 (once)",
      smartscreenNote:
        "Installs through the Microsoft Store: signed by Microsoft, so Windows shows no security warning. The classic .exe installer is just below.",
      btnLinux: "Linux (.AppImage)",
      btnLinuxTar: "Linux (.tar.gz)",
      subText: "Free trial (up to 5 PDFs per batch) or €39 one-time Lifetime Pro License — €0/month",
      badges: [
        "100% offline — Trainee GDPR privacy",
        "€39 lifetime license — no subscription",
        "1 individually named PDF per trainee",
      ],
      floating: { topLeft: "Trainer Signature & QR Code", bottomRight: "100% local — Zero Cloud" },
      window: {
        title: "InOneShot — Training Session Batch",
        from: "Excel — 24 trainees",
        to: "Certificates & Attendance PDFs",
        counter: "PDFs",
        zip: "training_certificates_2026.zip",
      },
    },
    useCases: {
      eyebrow: "Training Compliance & Audit Readiness",
      title: "3 training document workflows generated from the same Excel sheet",
      subtitle:
        "By generating all session documents from one clean Excel spreadsheet, you eliminate date, duration and spelling discrepancies across your audit records.",
      cards: [
        {
          title: "1. Training Completion Certificates",
          desc: "Generate one personalized PDF certificate per trainee with the course title, assessed learning objectives, duration, completion date and trainer signature.",
          badge: "Course Completion",
        },
        {
          title: "2. Official Funding & Attendance Records",
          desc: "Batch-fill official completion forms and attendance sheets from Excel: session dates, delivery mode (in-person/remote), completed hours and automatic file naming.",
          badge: "Audit-Ready PDFs",
        },
        {
          title: "3. Session Invitations & Verification QR Codes",
          desc: "Produce pre-filled trainee invitations in one click and embed a unique QR code per participant linking to your feedback survey or certificate verification URL.",
          badge: "QR Code & Signature",
        },
      ],
    },
    compare3Cols: {
      eyebrow: "3-Way Comparison · Training Providers",
      title: "Why pay €1,200/year for an ERP just to generate PDF certificates?",
      subtitle:
        "Compare the 3 approaches used by independent trainers and training organizations.",
      cards: [
        {
          name: "SaaS Training ERP (Digiforma, Dendreo…)",
          price: "€80 to €150 / month",
          highlight: false,
          verdict: "Overkill for document generation",
          points: [
            "❌ Expensive recurring subscription (€1,000+/year) even during quiet months",
            "❌ Trainee personal data uploaded to external cloud servers",
            "⚠️ Heavy setup if you already track enrollments in Excel",
          ],
        },
        {
          name: "Word Mail Merge / Manual Canva Copy-Paste",
          price: "Slow & error-prone",
          highlight: false,
          verdict: "High risk of typos and layout distortion",
          points: [
            "❌ Breaks official PDF layouts, fonts and logos when imported into Word",
            "❌ Outputs one giant merged file instead of one individual PDF per trainee",
            "❌ Manual file renaming and risk of shifted spreadsheet rows",
          ],
        },
        {
          name: "InOneShot Desktop (Windows, Linux, Android)",
          price: "€39 one-time (lifetime)",
          highlight: true,
          verdict: "Focused, 100% offline & no subscription",
          points: [
            "✅ Preserves 100% of your original PDF design (Canva, Word, official forms)",
            "✅ Generates 1 individual named PDF per trainee + ZIP archive in 1 click",
            "✅ 100% offline on your PC: instant GDPR compliance, €0 per month",
          ],
        },
      ],
    },
    how: {
      title: "How to generate an entire cohort in 30 seconds",
      subtitle: "Three simple steps at the end of every training session.",
      steps: [
        {
          title: "1. Import your PDF template & trainee Excel sheet",
          desc: "Load your certificate PDF template along with your participant spreadsheet (.xlsx or .csv).",
        },
        {
          title: "2. Drag & drop fields once",
          desc: "Place Last Name, First Name, Course Title, Hours, Dates, trainer signature image and QR code. Save the reusable layout.",
        },
        {
          title: "3. Generate 1 named PDF per trainee + ZIP",
          desc: "In one click, InOneShot outputs every individual certificate (e.g., Certificate_Dupont_Marie.pdf) ready to email.",
        },
      ],
    },
    pricing: {
      title: "Simple one-time pricing built for trainers",
      subtitle: "Test free on your own certificate templates. Upgrade once, use forever.",
      free: {
        name: "Free Trial",
        price: "€0",
        features: [
          "Up to 5 PDFs per batch",
          "Unlimited certificate templates",
          "Excel columns & date fields",
          "100% offline (Windows, Linux, Android)",
        ],
        cta: "Download Free",
      },
      pro: {
        name: "Lifetime Pro License",
        price: "€39",
        priceNote: "one-time payment (no subscription)",
        tagline: "Pays for itself on your very first training session.",
        features: [
          "Unlimited batches (10, 50 or 500 trainees in 1 click)",
          "1 individual PDF per trainee + automatic ZIP export",
          "Trainer signature/stamp image & dynamic QR codes",
          "Automatic PDF file naming per trainee",
          "Reusable saved templates for future cohorts",
          "12 months of updates & priority support",
        ],
        cta: "Get InOneShot Pro (€39) →",
        promo: {
          title: "Launch offer",
          detail: "30% off for the first 20 customers",
          code: "LANCEMENT",
          applied: "applied at checkout",
          priceHint: "≈ €27.30 one-time instead of €39",
        },
      },
    },
    faq: {
      title: "Frequently Asked Questions — Training Certificates & Qualiopi",
      items: [
        {
          q: "Can InOneShot generate completion certificates, attendance sheets and invitations from the same Excel file?",
          a: "Yes. You can save separate templates for your completion certificate, official funding record and session invitation, then link the exact same participant Excel spreadsheet to generate all three batches with zero retyping.",
        },
        {
          q: "Why use InOneShot instead of Microsoft Word mail merge?",
          a: "Word mail merge often distorts existing PDF layouts and merges all participants into a single multi-page file that must be split and renamed manually. InOneShot works directly on top of your original PDF (without Word) and natively outputs one individually named PDF file per trainee.",
        },
        {
          q: "Do independent trainers need a €100/month SaaS platform to produce compliant training certificates?",
          a: "No. Quality frameworks like Qualiopi do not mandate expensive subscription software. Auditors verify that your documentary evidence (invitations, attendance records, certificates) is complete and consistent.",
        },
        {
          q: "Can I automatically add my trainer signature, organization stamp and a verification QR code?",
          a: "Yes. You can drag and drop a transparent PNG image (signature and stamp) as well as a dynamic QR code (linking to a feedback form or verification URL) onto every generated PDF.",
        },
        {
          q: "Is trainee personal data uploaded to the cloud?",
          a: "Never. InOneShot runs 100% offline on your computer (Windows or Linux). Your Excel list of trainees never leaves your workstation, ensuring straightforward GDPR compliance.",
        },
      ],
    },
    email: {
      title: "Stay in the loop",
      desc: "Get notified about major InOneShot updates and document automation tips.",
      placeholder: "your@email.com",
      cta: "Notify me",
      sending: "Sending…",
      thanks: "Thanks! We'll be in touch.",
      error: "Something went wrong. Please try again later.",
      consent:
        "By subscribing, you agree to receive InOneShot news by email. Unsubscribe anytime.",
      consentLink: "Privacy policy",
    },
    footer: {
      links: {
        download: "Download",
        pricing: "Pricing",
        faq: "FAQ",
        youtube: "YouTube",
        privacy: "Privacy",
        legal: "Legal notice",
        contact: "Contact",
      },
      copy: "© 2026 InOneShot — Local and private PDF mail merge",
      madeBy: "A La Fabrik Numérique product",
      alsoCheck: "Also check out VoxCut",
      alsoCheckVectorPop: "Also check out VectorPop",
    },
  },
} as const;

export const Route = createFileRoute("/organismes-formation-qualiopi")({
  head: () => ({
    meta: [
      { title: META_TITLE_FR },
      { name: "description", content: META_DESC_FR },
      { property: "og:title", content: META_TITLE_FR },
      { property: "og:description", content: META_DESC_FR },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.inoneshot.fr/organismes-formation-qualiopi" },
      { property: "og:image", content: "https://www.inoneshot.fr/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META_TITLE_FR },
      { name: "twitter:description", content: META_DESC_FR },
      { name: "twitter:image", content: "https://www.inoneshot.fr/og-image.png" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "canonical", href: "https://www.inoneshot.fr/organismes-formation-qualiopi" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "InOneShot",
              item: "https://www.inoneshot.fr/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Organismes de Formation & Qualiopi",
              item: "https://www.inoneshot.fr/organismes-formation-qualiopi",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.fr.faq.items.map((item) => ({
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
  component: QualiopiLandingPage,
});

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), {
      threshold: 0,
      rootMargin: "0px 0px -10% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
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
    <Link to="/" className="flex items-center gap-2">
      <img src="/inoneshot_logo.png" alt="InOneShot" className="h-9 w-9 rounded-lg" />
      <span className="text-lg font-semibold tracking-tight">InOneShot</span>
    </Link>
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
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

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
    { name: "Marie Durand", tag: "ATT-QUAL-01" },
    { name: "Léo Martin", tag: "ATT-QUAL-02" },
    { name: "Awa Diallo", tag: "ATT-QUAL-03" },
    { name: "Tom Bernard", tag: "ATT-QUAL-04" },
    { name: "Lina Petit", tag: "ATT-QUAL-05" },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6">
      <div className="flex w-full max-w-[320px] flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <FileSpreadsheet className="h-4 w-4 text-green-600" /> {c.from}
        </span>
        <div className="overflow-hidden rounded-lg border border-border">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3 text-sm transition-colors last:border-b-0 ${
                i === activeRow ? "bg-brand/10" : "bg-card"
              }`}
            >
              <span
                className={`font-medium ${i === activeRow ? "text-brand-deep" : "text-foreground/80"}`}
              >
                {r.name}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">{r.tag}</span>
            </div>
          ))}
        </div>
      </div>

      <ArrowRight className="h-7 w-7 shrink-0 rotate-90 text-muted-foreground/50" />

      <div className="flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand">
          <Files className="h-4 w-4" /> {c.to}
        </span>
        <div className="relative mt-4 h-[150px] w-[124px]">
          {[2, 1, 0].map((d) => (
            <div
              key={d}
              className="absolute inset-0 rounded-lg border border-border bg-card shadow-sm"
              style={{ transform: `translate(${d * 8}px, ${d * -8}px) rotate(${d * 3}deg)` }}
            >
              <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2">
                <FileText className="h-4 w-4 text-brand" />
                <span className="h-1.5 w-10 rounded bg-border" />
              </div>
              <div className="space-y-1.5 p-3">
                <span className="block h-1.5 w-full rounded bg-border" />
                <span className="block h-1.5 w-3/4 rounded bg-border" />
                <span className="block h-1.5 w-5/6 rounded bg-border" />
                <span className="mt-3 inline-block h-6 w-6 rounded-sm bg-brand/15 ring-1 ring-brand/30" />
              </div>
            </div>
          ))}
        </div>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-energy/10 px-3.5 py-1.5 text-sm font-bold text-energy tabular-nums">
          <Zap className="h-4 w-4" /> {count} / {total} {c.counter}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> {c.zip}
        </span>
      </div>
    </div>
  );
}

function QualiopiLandingPage() {
  const [lang, setLangState] = useState<Lang>("fr");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [reassuranceVariant, setReassuranceVariant] = useState<ReassuranceVariant>("a");

  useEffect(() => {
    const variant = getReassuranceVariant();
    setReassuranceVariant(variant);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("inoneshot-lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
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

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
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
              <span className="font-mono font-bold tracking-wider underline underline-offset-2">
                {c.announce.code}
              </span>
            </span>
          </div>
        </a>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#use-cases" className="transition-colors hover:text-foreground">
              {c.nav.features}
            </a>
            <Link to="/publipostage-notaires" className="transition-colors hover:text-foreground">
              Notaires & Avocats
            </Link>
            <Link to="/attestations-rh" className="transition-colors hover:text-foreground">
              RH
            </Link>
            <Link to="/inspecteur-champs-pdf" className="transition-colors hover:text-foreground">
              Inspecteur PDF
            </Link>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              {c.nav.pricing}
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              {c.nav.faq}
            </a>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-stretch gap-12 px-6 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-deep">
                <GraduationCap className="h-3.5 w-3.5" /> {c.hero.badge}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-balance text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl">
                {c.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-balance text-lg text-muted-foreground">
                {c.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="group/win relative col-span-2 inline-flex">
                  <a
                    href={STORE_INSTALLER}
                    onClick={trackStoreDownload}
                    className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    {c.hero.btnPrimary}
                  </a>
                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-72 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground opacity-0 shadow-lg transition-opacity duration-150 sm:block sm:group-hover/win:opacity-100">
                    {c.hero.smartscreenNote}
                  </div>
                </div>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-primary/50 bg-brand/10 px-6 py-3 text-sm font-semibold text-brand-deep transition hover:bg-brand/20"
                >
                  <CreditCard className="h-4 w-4" />
                  {c.hero.btnBuyLifetime}
                </a>
                <a
                  href={WINDOWS_INSTALLER_URL}
                  onClick={trackPortableDownload}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-deep"
                >
                  <Download className="h-4 w-4" />
                  {lang === "fr" ? "Installeur .exe" : ".exe installer"}
                </a>
                <a
                  href={LINUX_URL}
                  onClick={trackLinuxDownload}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand-deep"
                >
                  <Download className="h-4 w-4" />
                  {c.hero.btnLinux}
                </a>
                <a
                  href={SNAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackSnapDownload}
                  className="inline-flex items-center justify-center rounded-lg border border-border p-1 transition-opacity hover:opacity-90"
                >
                  <img
                    src="https://snapcraft.io/en/light/install.svg"
                    width={180}
                    height={52}
                    alt="Snap Store"
                    className="h-[44px] w-auto"
                  />
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackPlayStoreDownload}
                  className="inline-flex items-center justify-center rounded-lg border border-border p-1 transition-opacity hover:opacity-90"
                >
                  <img
                    src={`https://play.google.com/intl/en_us/badges/static/images/badges/${lang === "fr" ? "fr" : "en"}_badge_web_generic.png`}
                    width={180}
                    height={52}
                    alt="Google Play"
                    className="h-[44px] w-auto"
                  />
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{c.hero.subText}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {c.hero.badges.map((badge, i) => {
                  const Icon = [ShieldCheck, CreditCard, Zap][i] ?? ShieldCheck;
                  return (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand-deep"
                    >
                      <Icon className="h-3.5 w-3.5 text-brand" /> {badge}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="h-full">
            <div className="relative h-full">
              <div className="pointer-events-none absolute -left-3 -top-3 z-20 hidden items-center gap-1.5 rounded-full border border-brand/30 bg-card px-3 py-1.5 text-xs font-medium text-brand-deep shadow-sm sm:inline-flex">
                <QrCode className="h-3.5 w-3.5" /> {c.hero.floating.topLeft}
              </div>
              <div className="pointer-events-none absolute -bottom-3 -right-3 z-20 hidden items-center gap-1.5 rounded-full border border-energy/30 bg-card px-3 py-1.5 text-xs font-medium text-energy shadow-sm sm:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5" /> {c.hero.floating.bottomRight}
              </div>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-xl shadow-slate-900/5">
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs font-medium text-muted-foreground">
                    {c.hero.window.title}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <MergeDemo lang={lang} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 COLUMNS COMPARISON: SaaS ERP vs Word vs InOneShot */}
      <section className="border-t border-border bg-muted py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-deep">
                {c.compare3Cols.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {c.compare3Cols.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                {c.compare3Cols.subtitle}
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {c.compare3Cols.cards.map((col, idx) => (
              <Reveal key={col.name} delay={idx * 100}>
                <div
                  className={`flex h-full flex-col justify-between rounded-2xl border p-8 shadow-sm ${
                    col.highlight
                      ? "border-2 border-primary bg-gradient-to-br from-brand/10 via-card to-card shadow-xl shadow-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold">{col.name}</h3>
                    </div>
                    <p
                      className={`mt-2 text-2xl font-bold ${
                        col.highlight ? "text-brand-deep" : "text-muted-foreground"
                      }`}
                    >
                      {col.price}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{col.verdict}</p>
                    <ul className="mt-6 space-y-3 text-sm leading-relaxed">
                      {col.points.map((pt) => (
                        <li key={pt} className="text-foreground/90">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {col.highlight && (
                    <a
                      href={STORE_INSTALLER}
                      onClick={trackStoreDownload}
                      className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-brand-deep"
                    >
                      <Download className="h-4 w-4" /> {c.hero.btnPrimary}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 QUALIOPI USE CASES */}
      <section id="use-cases" className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-deep">
                {c.useCases.eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.useCases.title}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{c.useCases.subtitle}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {c.useCases.cards.map((card, i) => {
              const Icon = [GraduationCap, FileText, QrCode][i] ?? FileText;
              return (
                <Reveal key={card.title} delay={i * 100}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                        <Icon className="h-6 w-6 text-brand" />
                      </div>
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-energy/10 px-3 py-1 text-xs font-medium text-energy">
                      <Sparkles className="h-3 w-3" /> {card.badge}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border bg-muted py-24">
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
                <Reveal key={s.title} delay={i * 100}>
                  <div className="group relative h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <div className="absolute right-6 top-6 text-5xl font-bold text-brand/10">
                      {num}
                    </div>
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
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold">{c.pricing.free.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight">
                      {c.pricing.free.price}
                    </span>
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
                    <CheckCircle2 className="h-3 w-3" /> {REASSURANCE_COPY[lang][reassuranceVariant]}
                  </div>
                </div>
                <div className="mt-5 rounded-xl border border-dashed border-energy/50 bg-energy/5 p-4 text-center">
                  <p className="text-sm font-bold text-energy">
                    {c.pricing.pro.promo.title} — {c.pricing.pro.promo.detail}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                    <span className="rounded-md bg-energy/15 px-2 py-0.5 font-mono text-sm font-bold tracking-wider text-energy">
                      {c.pricing.pro.promo.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {c.pricing.pro.promo.applied}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-foreground/80">
                    {c.pricing.pro.promo.priceHint}
                  </p>
                </div>
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
                  onClick={() => {
                    track("begin_checkout", { variant: reassuranceVariant });
                  }}
                  className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep"
                >
                  {c.pricing.pro.cta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
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
              <Reveal key={item.q} delay={i * 60}>
                <details className="group rounded-xl border border-border bg-card shadow-sm transition hover:border-brand/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium">
                    {item.q}
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
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
            {subscribeStatus === "done" && (
              <p className="mt-4 text-sm text-brand-deep">{c.email.thanks}</p>
            )}
            {subscribeStatus === "error" && (
              <p className="mt-4 text-sm text-destructive">{c.email.error}</p>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Logo />
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              {c.footer.links.download}
            </Link>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackPlayStoreDownload}
              className="transition-colors hover:text-foreground"
            >
              Android
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              {c.footer.links.pricing}
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              {c.footer.links.faq}
            </a>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link to="/publipostage-notaires" className="transition-colors hover:text-foreground">
              Cas d'usage : Notaires
            </Link>
            <Link to="/attestations-rh" className="transition-colors hover:text-foreground">
              Cas d'usage : RH
            </Link>
            <Link
              to="/organismes-formation-qualiopi"
              className="font-medium text-foreground transition-colors"
            >
              Cas d'usage : Formation Qualiopi
            </Link>
            <Link to="/inspecteur-champs-pdf" className="transition-colors hover:text-foreground">
              Outil gratuit : Inspecteur de champs PDF
            </Link>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCrossLink("youtube")}
              className="transition-colors hover:text-foreground"
            >
              {c.footer.links.youtube}
            </a>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              {c.footer.links.privacy}
            </Link>
            <Link to="/legal" className="transition-colors hover:text-foreground">
              {c.footer.links.legal}
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foreground">
              {c.footer.links.contact}
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">{c.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}
