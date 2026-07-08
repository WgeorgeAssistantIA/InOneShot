export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: number; // minutes
  // Content as array of blocks for simple rendering
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
  >;
};

const wordsOf = (post: Omit<BlogPost, "readingTime">): number => {
  let n = 0;
  for (const b of post.content) {
    if (b.type === "p" || b.type === "h2") n += b.text.split(/\s+/).length;
    else n += b.items.join(" ").split(/\s+/).length;
  }
  return n;
};

const make = (p: Omit<BlogPost, "readingTime">): BlogPost => ({
  ...p,
  readingTime: Math.max(1, Math.round(wordsOf(p) / 220)),
});

export const posts: BlogPost[] = [
  make({
    slug: "publipostage-pdf-depuis-excel",
    title: "Comment générer des centaines de PDF personnalisés depuis un Excel (sans copier-coller)",
    description:
      "Attestations, factures, courriers, diplômes : voici comment produire un PDF par ligne de votre tableur, automatiquement, sans recommencer cent fois.",
    date: "2026-06-28",
    author: "Équipe InOneShot",
    content: [
      {
        type: "p",
        text: "Vous avez un beau modèle de document — une attestation, une facture, un courrier — et un fichier Excel avec une centaine de lignes. Le but : produire un PDF pour chaque ligne, avec les bonnes informations au bon endroit. Fait à la main, c'est l'une des tâches les plus longues et les plus ingrates qui soient.",
      },
      {
        type: "p",
        text: "La bonne nouvelle : c'est exactement le genre de travail répétitif qu'un ordinateur fait mieux que vous. On parle de publipostage PDF, et voici comment l'automatiser de bout en bout.",
      },
      { type: "h2", text: "Le principe du publipostage PDF" },
      {
        type: "p",
        text: "Le publipostage consiste à fusionner un modèle (la mise en page, fixe) avec une source de données (votre Excel, variable). Chaque ligne du tableur devient un document : la colonne « Nom » remplit le champ nom, la colonne « Montant » remplit le champ montant, et ainsi de suite. Le tout se répète automatiquement pour toutes les lignes.",
      },
      { type: "h2", text: "La méthode manuelle (et pourquoi elle vous coûte cher)" },
      {
        type: "ul",
        items: [
          "Ouvrir le modèle, copier-coller chaque valeur depuis Excel",
          "Exporter en PDF, puis renommer le fichier correctement",
          "Recommencer ligne par ligne — et tout reprendre à la moindre faute de frappe",
        ],
      },
      {
        type: "p",
        text: "Sur cent documents, c'est facilement une demi-journée perdue, avec un vrai risque d'erreur (un mauvais nom, un montant décalé).",
      },
      { type: "h2", text: "La méthode automatique avec InOneShot" },
      {
        type: "p",
        text: "InOneShot est une application Windows dédiée au publipostage PDF. Vous importez un modèle PDF et un fichier Excel, vous placez vos champs par glisser-déposer (colonnes, date du jour, image de signature, QR code), puis vous cliquez une fois : l'application génère un PDF par ligne, les nomme automatiquement et vous livre un ZIP prêt à envoyer. Tout se passe en local, sur votre ordinateur.",
      },
      { type: "h2", text: "Quelques conseils pour un bon résultat" },
      {
        type: "ul",
        items: [
          "Nettoyez votre Excel avant : une ligne d'en-têtes claire, pas de cellules fusionnées",
          "Choisissez une colonne unique (numéro de facture, nom) pour le nommage automatique des fichiers",
          "Vérifiez toujours le premier PDF généré avant de lancer tout le lot",
        ],
      },
      {
        type: "p",
        text: "Une fois le modèle prêt, refaire le même lot le mois suivant ne prend plus que quelques secondes. C'est le genre d'automatisation qui se rentabilise dès la première utilisation.",
      },
    ],
  }),
  make({
    slug: "publipostage-pdf-local-vs-en-ligne",
    title: "Publipostage PDF : pourquoi le faire en local plutôt qu'en ligne",
    description:
      "Les outils de publipostage en ligne demandent d'envoyer vos données dans le cloud. Pour des documents sensibles (RH, factures, juridique), traiter en local change tout.",
    date: "2026-06-25",
    author: "Équipe InOneShot",
    content: [
      {
        type: "p",
        text: "Beaucoup d'outils de fusion PDF fonctionnent en ligne : vous téléversez votre modèle et votre fichier de données sur un serveur, le traitement se fait dans le cloud, puis vous récupérez les fichiers. Pratique — mais loin d'être anodin quand vos documents contiennent des données personnelles.",
      },
      { type: "h2", text: "Ce que « en ligne » implique vraiment" },
      {
        type: "ul",
        items: [
          "Vos données (noms, adresses, montants, numéros) quittent votre ordinateur et transitent vers un tiers",
          "Vous dépendez d'une connexion internet et de la disponibilité du service",
          "Beaucoup de ces services fonctionnent par abonnement, avec des plafonds de volume",
        ],
      },
      { type: "h2", text: "Pourquoi le local est souvent le bon choix" },
      {
        type: "p",
        text: "Pour les RH, les professions juridiques, la comptabilité ou toute structure qui manipule des données sensibles, le traitement local est un argument de conformité (RGPD) autant que de tranquillité : vos fichiers ne quittent jamais votre machine. Pas de serveur, pas de cloud, pas de question à se poser sur l'endroit où finissent vos données.",
      },
      {
        type: "p",
        text: "InOneShot a été conçu sur ce principe : tout le publipostage se fait sur votre ordinateur, hors ligne. Et comme il n'y a pas de coûts d'infrastructure cloud à amortir, le modèle est un paiement unique plutôt qu'un abonnement.",
      },
      { type: "h2", text: "Quand le cloud reste pertinent" },
      {
        type: "p",
        text: "Si vous avez besoin que plusieurs personnes collaborent en temps réel sur les mêmes modèles depuis des sites différents, une solution en ligne peut avoir du sens. Mais pour le cas le plus courant — produire un lot de documents à partir d'un tableur, vite et bien — le local est plus simple, plus rapide et plus sûr.",
      },
    ],
  }),
  make({
    slug: "publipostage-word-vs-inoneshot",
    title: "Word ou InOneShot : quelle solution pour fusionner Excel et PDF ?",
    description:
      "Le publipostage de Word existe depuis toujours. Voici ce qu'il fait bien, ses limites pour le PDF, et quand un outil dédié vous fera gagner du temps.",
    date: "2026-06-20",
    author: "Équipe InOneShot",
    content: [
      {
        type: "p",
        text: "Si vous avez déjà fait du publipostage, c'était probablement dans Word, à partir d'une source Excel. C'est un outil éprouvé — mais dès qu'on veut produire de vrais PDF, un par destinataire, avec un nommage propre, ça se complique.",
      },
      { type: "h2", text: "Ce que Word fait bien" },
      {
        type: "ul",
        items: [
          "Fusionner un document type avec des champs issus d'un Excel",
          "Imprimer ou envoyer en masse depuis un modèle texte",
          "Gratuit si vous avez déjà la suite Office",
        ],
      },
      { type: "h2", text: "Là où ça coince pour le PDF" },
      {
        type: "ul",
        items: [
          "Pas d'export d'un PDF par destinataire en natif : il faut des manipulations ou des macros",
          "Le nommage automatique des fichiers générés n'est pas prévu",
          "Difficile de partir d'un PDF existant comme modèle (formulaire, mise en page verrouillée)",
          "Champs avancés (QR code, image de signature) compliqués à intégrer proprement",
        ],
      },
      { type: "h2", text: "Ce qu'apporte un outil dédié comme InOneShot" },
      {
        type: "p",
        text: "InOneShot part directement d'un modèle PDF, place les champs par glisser-déposer (colonnes Excel, date, QR code, signature), génère un PDF par ligne, les nomme automatiquement et les réunit dans un ZIP — en un clic, en local. C'est précisément le maillon que Word ne couvre pas bien.",
      },
      { type: "h2", text: "Comment choisir" },
      {
        type: "ul",
        items: [
          "Quelques lettres à imprimer depuis un modèle texte ? Le publipostage de Word suffit.",
          "Un lot de PDF personnalisés, bien nommés, avec QR/signature, à partir d'un PDF modèle ? Un outil dédié comme InOneShot vous fera gagner un temps réel.",
        ],
      },
      {
        type: "p",
        text: "Les deux ne s'opposent pas vraiment : Word reste parfait pour le courrier texte, et InOneShot prend le relais dès qu'il s'agit de produire des PDF en série, proprement et sans y passer la journée.",
      },
    ],
  }),
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
