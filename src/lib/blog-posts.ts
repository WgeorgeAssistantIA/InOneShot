export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  lang: "fr" | "en";
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
    lang: "fr",
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
    lang: "fr",
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
    lang: "fr",
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
  make({
    slug: "5-cas-usage-publipostage-pdf",
    title: "5 cas d'usage concrets du publipostage PDF (au-delà du courrier)",
    description:
      "Attestations RH, diplômes de formation, factures, convocations, badges avec QR code : cinq situations où générer des PDF en série fait gagner des heures.",
    date: "2026-07-10",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Quand on parle de publipostage, on pense d'abord aux lettres types. Pourtant, dès qu'une structure doit produire le même document pour plusieurs personnes, le publipostage PDF s'applique — et le gain de temps est souvent spectaculaire. Voici cinq cas d'usage que nous voyons revenir chez les utilisateurs d'InOneShot.",
      },
      { type: "h2", text: "1. Les attestations RH" },
      {
        type: "p",
        text: "Attestations de travail, certificats de présence, attestations de télétravail pour les impôts : chaque salarié attend le même document, avec son nom, son poste et ses dates. À partir du fichier du personnel exporté en Excel, un modèle PDF suffit pour générer tout le lot d'un coup — un fichier par salarié, correctement nommé.",
      },
      { type: "h2", text: "2. Les diplômes et certificats de formation" },
      {
        type: "p",
        text: "Un organisme de formation qui clôture une session doit remettre un certificat à chaque participant. Le modèle est soigné (logo, mise en page verrouillée en PDF), seuls changent le nom, la formation et la date. C'est le cas d'école du publipostage PDF : on place trois champs sur le modèle, et la promotion entière est traitée en quelques secondes.",
      },
      { type: "h2", text: "3. Les factures et reçus" },
      {
        type: "p",
        text: "Si votre facturation vit dans un tableur (associations, indépendants, petites structures), chaque ligne — client, montant, numéro de facture — peut devenir une facture PDF prête à envoyer. Le nommage automatique par numéro de facture garde vos archives propres sans effort.",
      },
      { type: "h2", text: "4. Les convocations et invitations" },
      {
        type: "p",
        text: "Assemblée générale, réunion de parents d'élèves, événement associatif : la convocation est identique pour tous, mais elle doit être nominative pour faire foi. Une colonne « Nom » et une colonne « Adresse » suffisent pour produire toutes les convocations personnalisées d'un lot.",
      },
      { type: "h2", text: "5. Les badges et étiquettes avec QR code" },
      {
        type: "p",
        text: "Pour un salon ou une conférence, chaque badge peut embarquer un QR code propre au participant (lien d'inscription, identifiant, vCard). InOneShot génère le QR code à partir d'une colonne de votre Excel et le place sur le modèle, comme n'importe quel autre champ.",
      },
      { type: "h2", text: "Le point commun : un modèle, un tableur, un clic" },
      {
        type: "ul",
        items: [
          "Un modèle PDF avec la mise en page définitive",
          "Un fichier Excel avec une ligne par destinataire",
          "Des champs placés une seule fois par glisser-déposer",
          "Un lot complet généré en local, sans que vos données quittent votre machine",
        ],
      },
      {
        type: "p",
        text: "Si l'une de ces situations vous parle, le calcul est vite fait : le temps de préparer le modèle une première fois, et tous les lots suivants ne coûtent plus que quelques secondes.",
      },
    ],
  }),
  make({
    slug: "preparer-fichier-excel-publipostage",
    title: "Préparer son fichier Excel pour un publipostage sans erreur",
    description:
      "Cellules fusionnées, en-têtes ambigus, dates qui changent de format : la plupart des ratés de publipostage viennent du tableur. Voici la checklist pour partir sur de bonnes bases.",
    date: "2026-07-14",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Dans un publipostage PDF, le modèle est rarement le problème : c'est le fichier Excel qui cause l'essentiel des mauvaises surprises. Une colonne mal nommée, une cellule fusionnée, un format de date incohérent — et c'est tout le lot qui est à refaire. Bonne nouvelle : quelques réflexes simples éliminent la quasi-totalité des erreurs.",
      },
      { type: "h2", text: "Une ligne d'en-têtes, une seule" },
      {
        type: "p",
        text: "La première ligne de votre feuille doit contenir les noms de colonnes, et rien d'autre : pas de titre de document au-dessus, pas de ligne vide, pas de double en-tête. Des noms courts et explicites (« Nom », « Prénom », « Montant ») rendent le placement des champs beaucoup plus lisible au moment de préparer le modèle.",
      },
      { type: "h2", text: "Pas de cellules fusionnées" },
      {
        type: "p",
        text: "Les cellules fusionnées sont l'ennemi numéro un : elles cassent la logique « une ligne = un document ». Si votre fichier en contient, défusionnez-les et recopiez la valeur dans chaque ligne concernée. Chaque ligne doit être complète et autonome.",
      },
      { type: "h2", text: "Des données propres dans chaque colonne" },
      {
        type: "ul",
        items: [
          "Uniformisez les formats de date sur toute la colonne (évitez de mélanger 01/02/2026 et 1 février 2026)",
          "Supprimez les espaces parasites en début ou fin de cellule",
          "Vérifiez les lignes vides au milieu du tableau : elles produiraient des documents vides",
          "Harmonisez majuscules et minuscules si le champ apparaît en clair sur le document",
        ],
      },
      { type: "h2", text: "Prévoyez une colonne pour le nommage des fichiers" },
      {
        type: "p",
        text: "Cent PDF nommés « document (1) », « document (2) »… sont inutilisables. Prévoyez une colonne dont les valeurs sont uniques — numéro de facture, matricule, ou une colonne « NomPrenom » construite avec une formule — et utilisez-la pour le nommage automatique des fichiers générés.",
      },
      { type: "h2", text: "Testez sur la première ligne avant de lancer le lot" },
      {
        type: "p",
        text: "Quelle que soit la qualité de votre préparation, générez d'abord un seul document et relisez-le entièrement : bon champ au bon endroit, format de date correct, pas de texte tronqué. Ce contrôle prend trente secondes et vous évite de refaire un lot de deux cents fichiers.",
      },
      {
        type: "p",
        text: "Avec un tableur propre, le publipostage devient une opération sans surprise : dans InOneShot, vous importez le modèle et l'Excel, vous placez vos champs par glisser-déposer, et le premier aperçu vous confirme que tout est en place avant de générer l'ensemble.",
      },
    ],
  }),
  make({
    slug: "generate-pdfs-from-excel",
    title: "How to Generate Hundreds of Personalized PDFs from an Excel File",
    description:
      "Certificates, invoices, letters, diplomas: here's how to turn every row of your spreadsheet into its own PDF — automatically, without copy-pasting a single value.",
    date: "2026-07-12",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "You have a polished document template — a certificate, an invoice, a letter — and an Excel file with a hundred rows. The goal: one PDF per row, with the right information in the right place. Done by hand, it's one of the most tedious and error-prone tasks there is.",
      },
      {
        type: "p",
        text: "The good news: this is exactly the kind of repetitive work a computer does better than you. It's called PDF mail merge, and here's how to automate it end to end.",
      },
      { type: "h2", text: "How PDF mail merge works" },
      {
        type: "p",
        text: "A mail merge combines a template (the fixed layout) with a data source (your spreadsheet, which varies). Each row of the spreadsheet becomes one document: the “Name” column fills the name field, the “Amount” column fills the amount field, and so on — repeated automatically for every row.",
      },
      { type: "h2", text: "The manual way (and what it really costs)" },
      {
        type: "ul",
        items: [
          "Open the template, copy-paste each value from Excel",
          "Export to PDF, then rename the file by hand",
          "Repeat row after row — and start over at the first typo",
        ],
      },
      {
        type: "p",
        text: "Across a hundred documents, that's easily half a day lost, with a real risk of mistakes: a wrong name, a shifted amount, a mislabeled file.",
      },
      { type: "h2", text: "The automatic way with InOneShot" },
      {
        type: "p",
        text: "InOneShot is a Windows app built for PDF mail merge. You import a PDF template and an Excel file, place your fields by drag and drop (spreadsheet columns, today's date, a signature image, a QR code), then click once: the app generates one PDF per row, names each file automatically, and delivers a ZIP ready to send. Everything runs locally on your computer — your data never leaves your machine.",
      },
      { type: "h2", text: "Tips for a clean result" },
      {
        type: "ul",
        items: [
          "Clean up your Excel first: one clear header row, no merged cells",
          "Pick a unique column (invoice number, full name) for automatic file naming",
          "Always review the first generated PDF before running the whole batch",
        ],
      },
      {
        type: "p",
        text: "Once the template is set up, running the same batch next month takes seconds. It's the kind of automation that pays for itself the very first time you use it.",
      },
    ],
  }),
  make({
    slug: "local-pdf-mail-merge-vs-online",
    title: "PDF Mail Merge: Why Local Processing Beats Online Tools",
    description:
      "Online mail merge tools require uploading your data to the cloud. For sensitive documents — HR, invoices, legal — processing everything locally changes the game.",
    date: "2026-07-13",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "Most PDF merge tools work online: you upload your template and your data file to a server, processing happens in the cloud, and you download the results. Convenient — but far from trivial when your documents contain personal data.",
      },
      { type: "h2", text: "What “online” actually means" },
      {
        type: "ul",
        items: [
          "Your data (names, addresses, amounts, ID numbers) leaves your computer and passes through a third party",
          "You depend on an internet connection and on the service staying up",
          "Many of these services are subscription-based, with volume caps",
        ],
      },
      { type: "h2", text: "Why local is usually the right call" },
      {
        type: "p",
        text: "For HR teams, legal professionals, accountants, or any organization handling sensitive data, local processing is as much a compliance argument (GDPR) as a peace-of-mind one: your files never leave your machine. No server, no cloud, no wondering where your data ends up.",
      },
      {
        type: "p",
        text: "InOneShot was designed around this principle: the entire mail merge runs on your computer, offline. And since there's no cloud infrastructure to pay for, the pricing is a one-time purchase instead of a subscription.",
      },
      { type: "h2", text: "When the cloud still makes sense" },
      {
        type: "p",
        text: "If several people need to collaborate on the same templates in real time from different locations, an online solution can be worth it. But for the most common case — producing a batch of documents from a spreadsheet, quickly and reliably — local is simpler, faster, and safer.",
      },
    ],
  }),
  make({
    slug: "word-mail-merge-vs-pdf-tool",
    title: "Word Mail Merge vs. a Dedicated PDF Tool: Which One Do You Need?",
    description:
      "Word's mail merge has been around forever. Here's what it does well, where it falls short for PDF output, and when a dedicated tool will save you real time.",
    date: "2026-07-14",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "If you've ever run a mail merge, it was probably in Microsoft Word with an Excel data source. It's a proven tool — but the moment you need real PDFs, one per recipient, with clean file names, things get complicated.",
      },
      { type: "h2", text: "What Word does well" },
      {
        type: "ul",
        items: [
          "Merging a text document with fields from an Excel sheet",
          "Printing or sending letters in bulk from a text template",
          "Free if you already own the Office suite",
        ],
      },
      { type: "h2", text: "Where it falls short for PDF" },
      {
        type: "ul",
        items: [
          "No native way to export one PDF per recipient: you need workarounds or macros",
          "Automatic naming of generated files simply isn't built in",
          "Hard to start from an existing PDF as the template (forms, locked layouts)",
          "Advanced fields like QR codes or signature images are painful to integrate",
        ],
      },
      { type: "h2", text: "What a dedicated tool like InOneShot adds" },
      {
        type: "p",
        text: "InOneShot starts directly from a PDF template, lets you place fields by drag and drop (Excel columns, date, QR code, signature), generates one PDF per row, names every file automatically, and bundles the batch into a ZIP — in one click, entirely on your machine. That's precisely the link in the chain Word doesn't cover well.",
      },
      { type: "h2", text: "How to choose" },
      {
        type: "ul",
        items: [
          "A few letters to print from a text template? Word's mail merge is enough.",
          "A batch of personalized, properly named PDFs with QR codes or signatures, built from a PDF template? A dedicated tool like InOneShot will save you real time.",
        ],
      },
      {
        type: "p",
        text: "The two aren't really competitors: Word remains great for text-based letters, and InOneShot takes over whenever the job is producing PDFs in bulk, cleanly, without losing your day to it.",
      },
    ],
  }),
  make({
    slug: "inoneshot-1-1-0-nouveautes",
    title: "InOneShot 1.1.0 : mode sombre, interface FR/EN, fusion PDF, glisser-déposer — et Linux",
    description:
      "La mise à jour 1.1.0 d'InOneShot apporte le mode sombre, une interface bilingue, l'import CSV, la fusion en un seul PDF, le glisser-déposer de fichiers, et une version Linux.",
    date: "2026-07-18",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "InOneShot évolue au fil de vos retours plutôt que selon une feuille de route figée à l'avance. La version 1.1.0 regroupe plusieurs demandes revenues souvent ces dernières semaines : plus de confort visuel, plus de formats de données acceptés, et un fichier de sortie plus simple à utiliser. Voici ce qui change concrètement.",
      },
      { type: "h2", text: "Mode sombre et interface bilingue FR/EN" },
      {
        type: "p",
        text: "Un bouton dans la barre du haut bascule l'application en mode sombre, et un autre change la langue de l'interface entre français et anglais. Les deux réglages sont mémorisés d'une session à l'autre — pas de détection automatique surprenante selon les réglages système, vous choisissez et ça reste.",
      },
      { type: "h2", text: "Fusion en un seul PDF, en plus du ZIP" },
      {
        type: "p",
        text: "Jusqu'ici, InOneShot produisait un PDF par ligne du tableur, livrés dans un ZIP. C'est toujours le cas par défaut, mais une nouvelle option de sortie permet de fusionner directement tous les documents générés en un seul fichier PDF — pratique pour un lot à imprimer d'un coup ou à archiver comme un seul document plutôt qu'une centaine de fichiers séparés.",
      },
      { type: "h2", text: "Import CSV et glisser-déposer" },
      {
        type: "ul",
        items: [
          "Les fichiers CSV sont maintenant acceptés comme source de données, en plus de l'Excel — détection automatique du délimiteur et de l'encodage",
          "Le modèle PDF et le fichier de données peuvent être glissés-déposés directement dans la fenêtre, plus besoin de passer systématiquement par le sélecteur de fichiers",
          "Un double-clic sur un champ posé ouvre une boîte d'édition pour ajuster précisément sa position et son format",
          "L'aperçu se parcourt maintenant ligne par ligne, pour vérifier le rendu de plusieurs entrées avant de lancer le lot complet",
        ],
      },
      { type: "h2", text: "InOneShot arrive sur Linux" },
      {
        type: "p",
        text: "InOneShot est désormais disponible sur Linux via le Snap Store, avec les mêmes fonctionnalités que la version Windows — y compris le glisser-déposer. C'est la même logique que VoxCut, notre autre application : plus question d'être enfermé sur un seul système d'exploitation quand les mêmes outils peuvent tourner partout, en local.",
      },
      {
        type: "p",
        text: "La mise à jour est disponible dès maintenant en téléchargement direct sur ce site (version portable Windows) et sur le Snap Store pour Linux. La fiche Microsoft Store est en cours de mise à jour et suivra dans les prochains jours.",
      },
    ],
  }),
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
