import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import {
  Download,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  TriangleAlert,
  ChevronDown,
  ShieldCheck,
  Lock,
  CreditCard,
  Zap,
  UploadCloud,
  Search,
  Sparkles,
  FileCheck2,
  Trash2,
} from "lucide-react";

declare function gtag(...args: unknown[]): void;

function trackStoreDownload() {
  track("store_download");
  if (typeof gtag !== "undefined")
    gtag("event", "store_download", { event_category: "engagement" });
}
function trackPortableDownload() {
  track("portable_download");
  if (typeof gtag !== "undefined")
    gtag("event", "file_download", { event_category: "engagement", event_label: "portable_zip" });
}
function trackCrossLink(target: string) {
  track("cross_link_click", { target });
}

type Lang = "fr" | "en";

const STORE_URL = "https://apps.microsoft.com/detail/9PPBQSM1MFZ2";
const STORE_INSTALLER =
  "https://get.microsoft.com/installer/download/9PPBQSM1MFZ2?referrer=appbadge";
const WINDOWS_INSTALLER_URL =
  "https://github.com/WgeorgeAssistantIA/InOneShot/releases/latest/download/InOneShot-Setup-2.0.0.exe";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.lafabriknumerique.inoneshot_android";
const CHECKOUT_URL =
  "https://checkout.lafabriknumerique.fr/checkout/buy/d04203ba-2117-403a-9dfb-b903bfd04587?checkout[discount_code]=LANCEMENT";
const YOUTUBE_URL = "https://www.youtube.com/@InOneShot-PDFMailMerge";
const CONTACT_EMAIL = "contact@inoneshot.fr";

const META_TITLE_FR = "Inspecteur de Champs PDF Remplissable — InOneShot"; // 50 chars
const META_DESC_FR =
  "Outil gratuit 100 % local : vérifiez si votre PDF contient des champs remplissables AcroForm et téléchargez le modèle Excel correspondant sans upload."; // 150 chars

const META_TITLE_EN = "Fillable PDF Field Inspector Offline — InOneShot"; // 48 chars
const META_DESC_EN =
  "Free 100% local tool: inspect whether your PDF contains fillable AcroForm fields and download the matching Excel CSV template with zero file upload."; // 148 chars

export type DetectedFieldType = "Tx" | "Btn" | "Ch" | "Sig" | "Unknown";

export interface DetectedPdfField {
  name: string;
  rawType: DetectedFieldType;
}

export interface PdfInspectionResult {
  fileName: string;
  fileSize: number;
  hasAcroForm: boolean;
  hasXfa: boolean;
  isEncrypted: boolean;
  pageCountEstimate: number;
  fields: DetectedPdfField[];
}

function decodePdfString(raw: string): string {
  // Handle basic PDF escape sequences (\(, \), \n, \r, \t, and octal \ddd)
  const unescaped = raw
    .replace(/\\([()\\])/g, "$1")
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));

  // Handle UTF-16BE BOM (\xFE\xFF)
  if (unescaped.length >= 2 && unescaped.charCodeAt(0) === 0xfe && unescaped.charCodeAt(1) === 0xff) {
    let out = "";
    for (let i = 2; i + 1 < unescaped.length; i += 2) {
      out += String.fromCharCode((unescaped.charCodeAt(i) << 8) | unescaped.charCodeAt(i + 1));
    }
    return out.trim();
  }
  return unescaped.trim();
}

export function inspectPdfBinaryText(
  latin1Text: string,
  fileName: string,
  fileSize: number,
): PdfInspectionResult {
  const hasAcroForm = /\/AcroForm\b/.test(latin1Text);
  const hasXfa = /\/XFA\b/.test(latin1Text);
  const isEncrypted = /\/Encrypt\b/.test(latin1Text);
  const pageMatches = latin1Text.match(/\/Type\s*\/Page\b/g);
  const pageCountEstimate = pageMatches ? pageMatches.length : 1;

  const fieldsMap = new Map<string, DetectedFieldType>();

  // Scan object dictionaries and blocks containing /T (...)
  const fieldRegex = /\/T\s*\(([^)\\]*(?:\\.[^)\\]*)*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = fieldRegex.exec(latin1Text)) !== null) {
    const rawName = decodePdfString(match[1]);
    if (!rawName || rawName.length > 140) continue;

    // Look around the match window (400 chars before and after) for /FT /(Tx|Btn|Ch|Sig)
    const start = Math.max(0, match.index - 400);
    const end = Math.min(latin1Text.length, match.index + match[0].length + 400);
    const windowSlice = latin1Text.slice(start, end);
    const ftMatch = windowSlice.match(/\/FT\s*\/(Tx|Btn|Ch|Sig)\b/);
    const detectedType: DetectedFieldType = ftMatch
      ? (ftMatch[1] as DetectedFieldType)
      : "Tx";

    if (!fieldsMap.has(rawName) || fieldsMap.get(rawName) === "Unknown") {
      fieldsMap.set(rawName, detectedType);
    }
  }

  const fields: DetectedPdfField[] = Array.from(fieldsMap.entries()).map(([name, rawType]) => ({
    name,
    rawType,
  }));

  return {
    fileName,
    fileSize,
    hasAcroForm: hasAcroForm || fields.length > 0,
    hasXfa,
    isEncrypted,
    pageCountEstimate,
    fields,
  };
}

function buildDemoPdfLatin1(): string {
  return `%PDF-1.7
1 0 obj << /Type /Catalog /AcroForm << /Fields [2 0 R 3 0 R 4 0 R 5 0 R 6 0 R] >> /Pages 7 0 R >> endobj
2 0 obj << /FT /Tx /T (Nom_Stagiaire) >> endobj
3 0 obj << /FT /Tx /T (Prenom_Stagiaire) >> endobj
4 0 obj << /FT /Tx /T (Intitule_Formation) >> endobj
5 0 obj << /FT /Tx /T (Date_Session) >> endobj
6 0 obj << /FT /Btn /T (Validation_Acquis_Qualiopi) >> endobj
7 0 obj << /Type /Pages /Count 1 /Kids [8 0 R] >> endobj
8 0 obj << /Type /Page >> endobj
%%EOF`;
}

const copy = {
  fr: {
    metaTitle: META_TITLE_FR,
    metaDesc: META_DESC_FR,
    nav: {
      home: "Accueil",
      notaires: "Notaires & Avocats",
      rh: "RH",
      blog: "Blog",
      cta: "Télécharger InOneShot",
    },
    badge: "Outil Gratuit · 100 % Local dans votre navigateur · Zéro Upload",
    h1: "Vérifier et lister les champs d'un PDF remplissable gratuitement sans envoyer le fichier en ligne",
    intro:
      "Utilisez cet inspecteur gratuit et 100 % local sans inscription pour vérifier et lister les champs d'un PDF remplissable directement dans votre navigateur sans envoyer le fichier en ligne : détectez instantanément les formulaires AcroForm ou XFA et téléchargez le modèle Excel (CSV) prêt à remplir.",
    privacyPills: [
      "100 % local (lecture ArrayBuffer navigateur)",
      "Sans envoyer le fichier sur un serveur",
      "Gratuit & sans inscription",
    ],
    dropzone: {
      title: "Glissez-déposez votre fichier PDF ici",
      subtitle:
        "Ou cliquez pour sélectionner un PDF sur votre ordinateur. Aucune donnée ne quitte votre navigateur.",
      btnSelect: "Sélectionner un fichier .PDF",
      btnDemo: "Tester avec un PDF d'exemple (5 champs)",
      analyzing: "Analyse locale du PDF en cours…",
      errorNotPdf: "Veuillez sélectionner un fichier au format .pdf.",
    },
    result: {
      resetBtn: "Analyser un autre PDF",
      verdictSuccess: (n: number) =>
        `✅ Ce PDF contient ${n} champ${n > 1 ? "s" : ""} remplissable${n > 1 ? "s" : ""} standard${n > 1 ? "s" : ""} (AcroForm)`,
      verdictEmpty: "⚠️ Aucun champ AcroForm détecté (PDF plat ou XFA)",
      verdictSuccessSub:
        "Ce document possède des champs de formulaire interactifs. Vous pouvez télécharger la trame Excel/CSV correspondante ci-dessous ou le remplir en masse avec InOneShot.",
      verdictEmptySub:
        "Ce PDF ne contient pas de champs AcroForm standards (il s'agit d'un PDF plat exporté depuis Word/Canva ou d'un formulaire XFA). Bonne nouvelle : InOneShot n'a PAS besoin de champs AcroForm pour générer 1 PDF rempli par ligne Excel !",
      metaFile: "Fichier analysé",
      metaPages: "Pages détectées",
      metaAcroForm: "Formulaire AcroForm",
      metaXfa: "Formulaire Adobe XFA",
      metaEncrypt: "Chiffrement / Mot de passe",
      yes: "Oui",
      no: "Non",
      xfaWarning:
        "⚠️ Attention : Ce PDF contient une couche XFA propriétaire Adobe. Les outils standards ne peuvent pas la remplir sans l'aplatir au préalable. Avec InOneShot Desktop, vous pouvez poser vos champs directement sur le rendu visuel du PDF.",
      encryptWarning:
        "🔒 Ce PDF comporte un dictionnaire de chiffrement (/Encrypt). S'il est protégé par mot de passe à l'ouverture, déverrouillez-le avant le publipostage.",
      tableTitle: "Liste des champs remplissables détectés",
      colIndex: "#",
      colName: "Nom exact du champ PDF (/T)",
      colType: "Type de champ (/FT)",
      typeLabels: {
        Tx: "Texte (Tx)",
        Btn: "Case à cocher / Bouton (Btn)",
        Ch: "Liste déroulante (Ch)",
        Sig: "Signature (Sig)",
        Unknown: "Champ standard",
      },
      csvBtn: (n: number) =>
        `Télécharger le fichier CSV/Excel pré-formaté avec ces ${n} colonne${n > 1 ? "s" : ""}`,
      csvDefaultBtn:
        "Télécharger un modèle CSV/Excel type (Nom, Prénom, Date, Référence)",
      ctaBoxTitle:
        "Vous avez le fichier Excel et le PDF ? Générer 1 PDF rempli par ligne automatiquement sur votre PC avec InOneShot",
      ctaBoxDesc:
        "Que votre PDF possède des champs AcroForm ou qu'il soit totalement plat (export Canva, Word, InDesign), InOneShot génère des centaines de PDF individuels nommés automatiquement en 1 clic, 100 % hors ligne et sans abonnement.",
      ctaWin: "Télécharger gratuitement pour Windows",
      ctaExe: "Installeur .exe direct",
      ctaPro: "Licence Pro à vie (39 € une fois) →",
    },
    whySection: {
      title: "Pourquoi inspecter un PDF remplissable en local avant un publipostage Excel ?",
      cards: [
        {
          title: "Différencier PDF plat, AcroForm et XFA",
          desc: "Un PDF d'apparence remplissable peut être un simple PDF plat, un formulaire standard AcroForm ou un formulaire dynamique XFA verrouillé par Adobe. Notre inspecteur lit la structure interne du fichier en quelques millisecondes.",
        },
        {
          title: "Zéro envoi réseau (Conformité RGPD)",
          desc: "Vos modèles d'attestations RH, d'actes notariés ou de contrats contiennent souvent des mentions confidentielles. L'analyse s'exécute via l'API Web ArrayBuffer locale de votre navigateur : aucun octet n'est envoyé sur Internet.",
        },
        {
          title: "Pas de champs AcroForm ? Aucun problème avec InOneShot",
          desc: "Contrairement à Adobe Acrobat qui oblige à créer et nommer chaque champ AcroForm un par un, l'application InOneShot vous permet de glisser-déposer vos colonnes Excel, dates, signatures et QR codes sur n'importe quel PDF plat.",
        },
      ],
    },
    faq: {
      title: "Questions fréquentes sur l'inspecteur de champs PDF",
      items: [
        {
          q: "Mon fichier PDF est-il envoyé sur un serveur pendant l'analyse ?",
          a: "Non, jamais. L'outil utilise exclusivement les API JavaScript natives de votre navigateur (FileReader / ArrayBuffer et TextDecoder) pour inspecter la structure du PDF sur votre propre machine. Vous pouvez même couper votre connexion Internet avant de glisser votre fichier.",
        },
        {
          q: "Que signifie « Aucun champ AcroForm détecté (PDF plat ou XFA) » ?",
          a: "Cela signifie que votre PDF est soit un document visuel classique sans zones de saisie interactives (PDF plat issu de Word, Canva ou LibreOffice), soit un formulaire XFA propriétaire. Dans les deux cas, vous n'avez pas besoin d'Adobe Acrobat : InOneShot permet de superposer vos colonnes Excel directement sur n'importe quel PDF plat.",
        },
        {
          q: "Comment fonctionne le téléchargement du modèle Excel / CSV ?",
          a: "Lorsqu'un formulaire AcroForm est détecté, l'outil extrait le nom technique exact de chaque champ (/T) et génère un fichier CSV encodé en UTF-8 avec BOM (directement lisible dans Microsoft Excel sans problème d'accents) dont la première ligne contient exactement ces colonnes.",
        },
        {
          q: "Comment remplir automatiquement 100 PDF à partir de ce fichier Excel ?",
          a: "Téléchargez l'application de bureau InOneShot (Windows, Linux ou Android). Importez votre PDF et votre fichier Excel rempli, vérifiez l'aperçu ligne par ligne, puis cliquez sur Générer : vous obtiendrez un fichier PDF individuel nommé automatiquement pour chaque ligne Excel.",
        },
      ],
    },
  },
  en: {
    metaTitle: META_TITLE_EN,
    metaDesc: META_DESC_EN,
    nav: {
      home: "Home",
      notaires: "Legal & Notaries",
      rh: "HR",
      blog: "Blog",
      cta: "Download InOneShot",
    },
    badge: "Free Tool · 100% Local in Your Browser · Zero File Upload",
    h1: "Inspect fillable PDF form field names offline in browser with no upload",
    intro:
      "Use this free 100% local tool with no signup to inspect fillable PDF form field names offline in your browser with no file upload: instantly detect standard AcroForm or XFA structures and download a pre-formatted Excel CSV template.",
    privacyPills: [
      "100% local (browser ArrayBuffer inspection)",
      "Zero server upload — GDPR safe",
      "Free & no registration required",
    ],
    dropzone: {
      title: "Drag & drop your PDF file here",
      subtitle:
        "Or click to select a PDF from your computer. Your file never leaves your browser.",
      btnSelect: "Select a .PDF file",
      btnDemo: "Test with a sample AcroForm PDF (5 fields)",
      analyzing: "Analyzing PDF locally…",
      errorNotPdf: "Please select a valid .pdf file.",
    },
    result: {
      resetBtn: "Inspect another PDF",
      verdictSuccess: (n: number) =>
        `✅ This PDF contains ${n} standard fillable field${n > 1 ? "s" : ""} (AcroForm)`,
      verdictEmpty: "⚠️ No AcroForm fields detected (Flat PDF or XFA)",
      verdictSuccessSub:
        "This document contains interactive form fields. You can download the matching Excel/CSV header template below or batch-fill it offline with InOneShot.",
      verdictEmptySub:
        "This PDF does not contain standard AcroForm fields (it is either a flat PDF exported from Word/Canva or an XFA form). Good news: InOneShot does NOT require AcroForm fields to generate 1 filled PDF per Excel row!",
      metaFile: "Analyzed file",
      metaPages: "Estimated pages",
      metaAcroForm: "AcroForm dictionary",
      metaXfa: "Adobe XFA form",
      metaEncrypt: "Encryption / Password",
      yes: "Yes",
      no: "No",
      xfaWarning:
        "⚠️ Note: This PDF contains a proprietary Adobe XFA layer. Standard tools cannot fill it without flattening first. With InOneShot Desktop, you can place fields directly onto the visual page.",
      encryptWarning:
        "🔒 This PDF contains an /Encrypt dictionary. If it requires a password to open, unlock it before running a mail merge.",
      tableTitle: "Detected fillable PDF fields",
      colIndex: "#",
      colName: "Exact PDF Field Name (/T)",
      colType: "Field Type (/FT)",
      typeLabels: {
        Tx: "Text field (Tx)",
        Btn: "Checkbox / Button (Btn)",
        Ch: "Dropdown / Choice (Ch)",
        Sig: "Signature (Sig)",
        Unknown: "Standard field",
      },
      csvBtn: (n: number) =>
        `Download pre-formatted CSV/Excel template with these ${n} column${n > 1 ? "s" : ""}`,
      csvDefaultBtn:
        "Download sample CSV/Excel template (LastName, FirstName, Date, Reference)",
      ctaBoxTitle:
        "Have your Excel file and PDF ready? Generate 1 filled PDF per row automatically on your PC with InOneShot",
      ctaBoxDesc:
        "Whether your PDF has interactive AcroForm fields or is completely flat (Canva, Word, InDesign export), InOneShot generates hundreds of individually named PDFs in one click, 100% offline with no subscription.",
      ctaWin: "Download free for Windows",
      ctaExe: "Direct .exe installer",
      ctaPro: "Lifetime Pro License (€39 once) →",
    },
    whySection: {
      title: "Why inspect fillable PDF fields locally before an Excel mail merge?",
      cards: [
        {
          title: "Distinguish Flat PDFs, AcroForms and XFA",
          desc: "A PDF that looks fillable might actually be a flat document, a standard AcroForm, or a locked Adobe XFA form. Our inspector checks the binary dictionaries in milliseconds.",
        },
        {
          title: "Zero network upload (100% private)",
          desc: "HR certificates, legal contracts and financial templates should never be uploaded to random online converters. Everything runs inside your browser's local memory.",
        },
        {
          title: "No AcroForm fields? InOneShot works on flat PDFs too",
          desc: "Unlike Adobe Acrobat which forces you to manually draw and name AcroForm text boxes first, InOneShot lets you drag and drop Excel columns, dates, signatures and QR codes onto any flat PDF.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions — Fillable PDF Field Inspector",
      items: [
        {
          q: "Is my PDF uploaded to a server when I inspect it here?",
          a: "No, never. This tool uses native browser JavaScript APIs (ArrayBuffer and TextDecoder) to read the file structure locally on your device. You can even disconnect from the internet before dropping your PDF.",
        },
        {
          q: "What does 'No AcroForm fields detected (Flat PDF or XFA)' mean?",
          a: "It means your PDF is a standard visual document without interactive input boxes (such as a PDF exported from Word, Canva or LibreOffice). Good news: InOneShot does not need AcroForm fields — you can place Excel columns visually anywhere on a flat PDF.",
        },
        {
          q: "How does the CSV / Excel template download work?",
          a: "When AcroForm fields are found, the tool extracts every field's exact name (/T) and generates a UTF-8 BOM CSV file whose header row matches those exact field names, ready to open in Microsoft Excel.",
        },
        {
          q: "How can I automatically generate one filled PDF per Excel row offline?",
          a: "Download the InOneShot desktop app (Windows, Linux or Android). Load your PDF template and your Excel sheet, preview your rows on screen, and click Generate to get one individually named PDF per row plus a ZIP archive.",
        },
      ],
    },
  },
} as const;

export const Route = createFileRoute("/inspecteur-champs-pdf")({
  head: () => ({
    meta: [
      { title: META_TITLE_FR },
      { name: "description", content: META_DESC_FR },
      { property: "og:title", content: META_TITLE_FR },
      { property: "og:description", content: META_DESC_FR },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.inoneshot.fr/inspecteur-champs-pdf" },
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
      { rel: "canonical", href: "https://www.inoneshot.fr/inspecteur-champs-pdf" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Inspecteur de Champs PDF Remplissable — InOneShot",
          url: "https://www.inoneshot.fr/inspecteur-champs-pdf",
          applicationCategory: "BusinessApplication",
          operatingSystem: "All (Browser Client-Side)",
          description: META_DESC_FR,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
        }),
      },
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
              name: "Inspecteur de Champs PDF Remplissable",
              item: "https://www.inoneshot.fr/inspecteur-champs-pdf",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: copy.fr.faq.items.map((item) => ({
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
  component: PdfFieldInspectorPage,
});

function PdfFieldInspectorPage() {
  const [lang, setLangState] = useState<Lang>("fr");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<PdfInspectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("inoneshot-lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copy[lang].metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", copy[lang].metaDesc);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("inoneshot-lang", l);
    } catch {
      // ignore
    }
  };

  const c = copy[lang];

  async function handleFile(file: File) {
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setErrorMsg(c.dropzone.errorNotPdf);
      return;
    }
    setIsAnalyzing(true);
    try {
      const buffer = await file.arrayBuffer();
      const decoder = new TextDecoder("latin1");
      const latin1Text = decoder.decode(buffer);
      const inspection = inspectPdfBinaryText(latin1Text, file.name, file.size);
      setResult(inspection);
      track("pdf_inspector_analyzed", {
        hasAcroForm: inspection.hasAcroForm,
        fieldCount: inspection.fields.length,
      });
    } catch {
      setErrorMsg(c.dropzone.errorNotPdf);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleLoadDemo() {
    setErrorMsg(null);
    const demoText = buildDemoPdfLatin1();
    const inspection = inspectPdfBinaryText(
      demoText,
      "exemple-attestation-qualiopi-acroform.pdf",
      48200,
    );
    setResult(inspection);
    track("pdf_inspector_demo");
  }

  function handleDownloadCsv() {
    const columns =
      result && result.fields.length > 0
        ? result.fields.map((f) => f.name)
        : lang === "fr"
          ? ["Nom", "Prenom", "Date_Session", "Reference_Document"]
          : ["LastName", "FirstName", "SessionDate", "Document_Reference"];

    const separator = lang === "fr" ? ";" : ",";
    const escapedHeaders = columns.map((col) => {
      const clean = col.replace(/"/g, '""');
      return clean.includes(separator) || clean.includes('"') || clean.includes(" ")
        ? `"${clean}"`
        : clean;
    });
    const exampleRow = columns.map((col, idx) =>
      lang === "fr" ? `Exemple_${idx + 1}_${col}` : `Sample_${idx + 1}_${col}`,
    );

    const csvContent = "\uFEFF" + escapedHeaders.join(separator) + "\r\n" + exampleRow.join(separator) + "\r\n";
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const baseName = result?.fileName
      ? result.fileName.replace(/\.pdf$/i, "")
      : "modele-inoneshot";
    link.href = url;
    link.setAttribute("download", `${baseName}-modele-excel.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    track("pdf_inspector_csv_download", { columns: columns.length });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/inoneshot_logo.png" alt="InOneShot" className="h-9 w-9 rounded-lg" />
            <span className="text-lg font-semibold tracking-tight">InOneShot</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link to="/" className="transition-colors hover:text-foreground">
              {c.nav.home}
            </Link>
            <Link to="/publipostage-notaires" className="transition-colors hover:text-foreground">
              {c.nav.notaires}
            </Link>
            <Link to="/attestations-rh" className="transition-colors hover:text-foreground">
              {c.nav.rh}
            </Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              {c.nav.blog}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
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

      {/* HERO + INTERACTIVE INSPECTOR */}
      <section className="mx-auto max-w-5xl px-6 pt-12 pb-20 md:pt-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-medium text-brand-deep">
            <Search className="h-3.5 w-3.5" /> {c.badge}
          </span>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {c.h1}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-balance text-base text-muted-foreground md:text-lg">
            {c.intro}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {c.privacyPills.map((pill, i) => {
              const Icon = [Lock, ShieldCheck, Sparkles][i] ?? ShieldCheck;
              return (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs"
                >
                  <Icon className="h-3.5 w-3.5 text-brand" /> {pill}
                </span>
              );
            })}
          </div>
        </div>

        {/* TOOL CARD */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-xl shadow-slate-900/5 md:p-10">
          {!result ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) void handleFile(f);
              }}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition ${
                isDragging
                  ? "border-primary bg-brand/10"
                  : "border-border bg-muted/40 hover:border-brand/50"
              }`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20">
                <UploadCloud className="h-8 w-8 text-brand" />
              </div>
              <h2 className="text-xl font-semibold">{c.dropzone.title}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.dropzone.subtitle}</p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFile(f);
                }}
              />

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep"
                >
                  <FileText className="h-4 w-4" />
                  {isAnalyzing ? c.dropzone.analyzing : c.dropzone.btnSelect}
                </button>
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-brand/40 hover:bg-muted"
                >
                  <FileCheck2 className="h-4 w-4 text-brand" />
                  {c.dropzone.btnDemo}
                </button>
              </div>

              {errorMsg && (
                <p className="mt-4 text-sm font-medium text-destructive">{errorMsg}</p>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Top bar with file info + reset */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                    <FileText className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.result.metaFile}</p>
                    <p className="font-mono text-sm font-semibold">{result.fileName}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition hover:border-brand/40 hover:text-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" /> {c.result.resetBtn}
                </button>
              </div>

              {/* Verdict banner */}
              <div
                className={`rounded-xl border p-5 ${
                  result.fields.length > 0
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-amber-500/30 bg-amber-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.fields.length > 0 ? (
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  ) : (
                    <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                  )}
                  <div>
                    <h2 className="text-lg font-bold">
                      {result.fields.length > 0
                        ? c.result.verdictSuccess(result.fields.length)
                        : c.result.verdictEmpty}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.fields.length > 0
                        ? c.result.verdictSuccessSub
                        : c.result.verdictEmptySub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical metadata badges */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{c.result.metaPages}</p>
                  <p className="mt-1 font-mono text-base font-bold">{result.pageCountEstimate}</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{c.result.metaAcroForm}</p>
                  <p className="mt-1 text-sm font-semibold">
                    {result.hasAcroForm ? `✅ ${c.result.yes}` : `— ${c.result.no}`}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{c.result.metaXfa}</p>
                  <p className="mt-1 text-sm font-semibold">
                    {result.hasXfa ? `⚠️ ${c.result.yes}` : `✅ ${c.result.no}`}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{c.result.metaEncrypt}</p>
                  <p className="mt-1 text-sm font-semibold">
                    {result.isEncrypted ? `🔒 ${c.result.yes}` : `✅ ${c.result.no}`}
                  </p>
                </div>
              </div>

              {result.hasXfa && (
                <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300">
                  {c.result.xfaWarning}
                </p>
              )}
              {result.isEncrypted && (
                <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-amber-800 dark:text-amber-300">
                  {c.result.encryptWarning}
                </p>
              )}

              {/* Fields Table */}
              {result.fields.length > 0 && (
                <div>
                  <h3 className="mb-3 text-base font-semibold">{c.result.tableTitle}</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 w-14">{c.result.colIndex}</th>
                          <th className="px-4 py-3">{c.result.colName}</th>
                          <th className="px-4 py-3">{c.result.colType}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.fields.map((field, idx) => (
                          <tr
                            key={field.name}
                            className="border-b border-border/70 last:border-b-0 odd:bg-card even:bg-muted/30"
                          >
                            <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-2.5 font-mono font-medium text-foreground">
                              {field.name}
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground">
                              <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-0.5 font-medium text-brand-deep">
                                {c.result.typeLabels[field.rawType]}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Utility Button: Download CSV/Excel */}
              <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-brand/30 bg-brand/5 p-5 sm:flex-row">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold">
                      {lang === "fr"
                        ? "Générer votre trame Excel (.csv) prête à remplir"
                        : "Generate your ready-to-fill Excel (.csv) template"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "fr"
                        ? "Encodage UTF-8 avec BOM compatible Microsoft Excel & LibreOffice Calc."
                        : "UTF-8 BOM encoded for direct opening in Microsoft Excel & LibreOffice Calc."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  {result.fields.length > 0
                    ? c.result.csvBtn(result.fields.length)
                    : c.result.csvDefaultBtn}
                </button>
              </div>

              {/* Direct Conversion CTA */}
              <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-brand/10 via-card to-card p-6 md:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Zap className="h-3.5 w-3.5" /> InOneShot Desktop (Windows, Linux, Android)
                </span>
                <h3 className="mt-3 text-xl font-bold md:text-2xl">{c.result.ctaBoxTitle}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.result.ctaBoxDesc}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={STORE_INSTALLER}
                    onClick={trackStoreDownload}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-brand-deep"
                  >
                    <Download className="h-4 w-4" /> {c.result.ctaWin}
                  </a>
                  <a
                    href={WINDOWS_INSTALLER_URL}
                    onClick={trackPortableDownload}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-brand"
                  >
                    <Download className="h-4 w-4" /> {c.result.ctaExe}
                  </a>
                  <a
                    href={CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm font-semibold text-brand-deep transition hover:bg-brand/20"
                  >
                    <CreditCard className="h-4 w-4" /> {c.result.ctaPro}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="border-t border-border bg-muted py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            {c.whySection.title}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.whySection.cards.map((card, i) => {
              const Icon = [FileCheck2, Lock, Zap][i] ?? FileCheck2;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-card p-7 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl">
            {c.faq.title}
          </h2>
          <div className="space-y-3">
            {c.faq.items.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card shadow-sm transition hover:border-brand/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col flex-wrap items-center justify-between gap-6 px-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2">
            <img src="/inoneshot_logo.png" alt="InOneShot" className="h-8 w-8 rounded-lg" />
            <span className="text-base font-semibold tracking-tight">InOneShot</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              {c.nav.home}
            </Link>
            <Link to="/publipostage-notaires" className="transition-colors hover:text-foreground">
              Cas d'usage : Notaires
            </Link>
            <Link to="/attestations-rh" className="transition-colors hover:text-foreground">
              Cas d'usage : RH
            </Link>
            <Link
              to="/organismes-formation-qualiopi"
              className="transition-colors hover:text-foreground"
            >
              Cas d'usage : Formation Qualiopi
            </Link>
            <Link to="/inspecteur-champs-pdf" className="font-medium text-foreground">
              Outil gratuit : Inspecteur PDF
            </Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Android
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCrossLink("youtube")}
              className="transition-colors hover:text-foreground"
            >
              YouTube
            </a>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Confidentialité
            </Link>
            <Link to="/legal" className="transition-colors hover:text-foreground">
              Mentions légales
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <p className="text-xs text-muted-foreground">
            © 2026 InOneShot — Publipostage PDF local et privé
          </p>
        </div>
      </footer>
    </div>
  );
}
