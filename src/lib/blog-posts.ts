export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  lang: "fr" | "en";
  readingTime: number; // minutes
  // Optional contextual link to a landing page, rendered above the generic CTA
  related?: { to: string; label: string };
  // Slug of the equivalent article in the other language, for hreflang alternates
  altLangSlug?: string;
  // Content as array of blocks for simple rendering
  content: Array<
    { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] }
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
    altLangSlug: "generate-pdfs-from-excel",
    title:
      "Comment générer des centaines de PDF personnalisés depuis un Excel (sans copier-coller)",
    description:
      "Attestations, factures, courriers, diplômes : voici comment produire un PDF par ligne de votre tableur, automatiquement, sans recommencer cent fois.",
    date: "2026-06-28",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Le publipostage PDF consiste à fusionner un modèle fixe avec les données d'un fichier Excel pour générer un PDF unique par ligne, automatiquement.",
      },
      {
        type: "p",
        text: "Vous avez un beau modèle de document — une attestation, une facture, un courrier — et un fichier Excel avec une centaine de lignes. Le but : produire un PDF pour chaque ligne, avec les bonnes informations au bon endroit. Fait à la main, c'est l'une des tâches les plus longues et les plus ingrates qui soient.",
      },
      {
        type: "p",
        text: "La bonne nouvelle : c'est exactement le genre de travail répétitif qu'un ordinateur fait mieux que vous. On parle de publipostage PDF, et voici comment l'automatiser de bout en bout.",
      },
      { type: "h2", text: "Qu'est-ce que le publipostage PDF ?" },
      {
        type: "p",
        text: "Le publipostage consiste à fusionner un modèle (la mise en page, fixe) avec une source de données (votre Excel, variable). Chaque ligne du tableur devient un document : la colonne « Nom » remplit le champ nom, la colonne « Montant » remplit le champ montant, et ainsi de suite. Le tout se répète automatiquement pour toutes les lignes.",
      },
      { type: "h2", text: "Pourquoi la méthode manuelle de publipostage PDF coûte-t-elle cher ?" },
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
      { type: "h2", text: "Comment automatiser le publipostage PDF avec InOneShot ?" },
      {
        type: "p",
        text: "InOneShot est une application Windows dédiée au publipostage PDF. Vous importez un modèle PDF et un fichier Excel, vous placez vos champs par glisser-déposer (colonnes, date du jour, image de signature, QR code), puis vous cliquez une fois : l'application génère un PDF par ligne, les nomme automatiquement et vous livre un ZIP prêt à envoyer. Tout se passe en local, sur votre ordinateur.",
      },
      { type: "h2", text: "Quels conseils suivre pour réussir son publipostage PDF ?" },
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
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [préparer son fichier Excel sans erreur](/blog/preparer-fichier-excel-publipostage) ; [traiter un publipostage PDF en local plutôt qu'en ligne](/blog/publipostage-pdf-local-vs-en-ligne) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf).",
      },
    ],
  }),
  make({
    slug: "publipostage-pdf-local-vs-en-ligne",
    altLangSlug: "local-pdf-mail-merge-vs-online",
    title: "Publipostage PDF : pourquoi le faire en local plutôt qu'en ligne",
    description:
      "Les outils de publipostage en ligne demandent d'envoyer vos données dans le cloud. Pour des documents sensibles (RH, factures, juridique), traiter en local change tout.",
    date: "2026-06-25",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Le publipostage PDF en ligne consiste à téléverser votre modèle et vos données sur un serveur tiers pour générer les documents dans le cloud, plutôt que sur votre propre ordinateur.",
      },
      {
        type: "p",
        text: "Beaucoup d'outils de fusion PDF fonctionnent en ligne : vous téléversez votre modèle et votre fichier de données sur un serveur, le traitement se fait dans le cloud, puis vous récupérez les fichiers. Pratique — mais loin d'être anodin quand vos documents contiennent des données personnelles.",
      },
      { type: "h2", text: "Le publipostage en ligne est-il sûr pour des données RH ?" },
      {
        type: "ul",
        items: [
          "Vos données (noms, adresses, montants, numéros) quittent votre ordinateur et transitent vers un tiers",
          "Vous dépendez d'une connexion internet et de la disponibilité du service",
          "Beaucoup de ces services fonctionnent par abonnement, avec des plafonds de volume",
        ],
      },
      { type: "h2", text: "Pourquoi le publipostage PDF local est-il souvent le bon choix ?" },
      {
        type: "p",
        text: "Pour les RH, les professions juridiques, la comptabilité ou toute structure qui manipule des données sensibles, le traitement local est un argument de conformité (RGPD) autant que de tranquillité : vos fichiers ne quittent jamais votre machine. Pas de serveur, pas de cloud, pas de question à se poser sur l'endroit où finissent vos données.",
      },
      {
        type: "p",
        text: "InOneShot a été conçu sur ce principe : tout le publipostage se fait sur votre ordinateur, hors ligne. Et comme il n'y a pas de coûts d'infrastructure cloud à amortir, le modèle est un paiement unique plutôt qu'un abonnement.",
      },
      { type: "h2", text: "Le publipostage PDF en ligne reste-t-il pertinent dans certains cas ?" },
      {
        type: "p",
        text: "Si vous avez besoin que plusieurs personnes collaborent en temps réel sur les mêmes modèles depuis des sites différents, une solution en ligne peut avoir du sens. Mais pour le cas le plus courant — produire un lot de documents à partir d'un tableur, vite et bien — le local est plus simple, plus rapide et plus sûr.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [choisir entre Word et InOneShot pour fusionner Excel et PDF](/blog/publipostage-word-vs-inoneshot) ; [produire contrats, convocations et badges](/blog/publipostage-rh-contrats-convocations-badges).",
      },
    ],
  }),
  make({
    slug: "publipostage-word-vs-inoneshot",
    altLangSlug: "word-mail-merge-vs-pdf-tool",
    title: "Word ou InOneShot : quelle solution pour fusionner Excel et PDF ?",
    description:
      "Le publipostage de Word existe depuis toujours. Voici ce qu'il fait bien, ses limites pour le PDF, et quand un outil dédié vous fera gagner du temps.",
    date: "2026-06-20",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Le publipostage Word fusionne un document texte avec des données Excel, mais ne produit pas nativement un PDF distinct et correctement nommé pour chaque destinataire — c'est ce qu'un outil dédié comme InOneShot ajoute.",
      },
      {
        type: "p",
        text: "Si vous avez déjà fait du publipostage, c'était probablement dans Word, à partir d'une source Excel. C'est un outil éprouvé — mais dès qu'on veut produire de vrais PDF, un par destinataire, avec un nommage propre, ça se complique.",
      },
      { type: "h2", text: "Que fait bien le publipostage Word ?" },
      {
        type: "ul",
        items: [
          "Fusionner un document type avec des champs issus d'un Excel",
          "Imprimer ou envoyer en masse depuis un modèle texte",
          "Gratuit si vous avez déjà la suite Office",
        ],
      },
      { type: "h2", text: "Pourquoi le publipostage Word coince-t-il pour produire des PDF ?" },
      {
        type: "ul",
        items: [
          "Pas d'export d'un PDF par destinataire en natif : il faut des manipulations ou des macros",
          "Le nommage automatique des fichiers générés n'est pas prévu",
          "Difficile de partir d'un PDF existant comme modèle (formulaire, mise en page verrouillée)",
          "Champs avancés (QR code, image de signature) compliqués à intégrer proprement",
        ],
      },
      { type: "h2", text: "Qu'apporte un outil dédié comme InOneShot ?" },
      {
        type: "p",
        text: "InOneShot part directement d'un modèle PDF, place les champs par glisser-déposer (colonnes Excel, date, QR code, signature), génère un PDF par ligne, les nomme automatiquement et les réunit dans un ZIP — en un clic, en local. C'est précisément le maillon que Word ne couvre pas bien.",
      },
      { type: "h2", text: "Comment choisir entre Word et un outil dédié comme InOneShot ?" },
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
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [préparer son fichier Excel sans erreur](/blog/preparer-fichier-excel-publipostage) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf).",
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
        text: "Le publipostage PDF consiste à générer automatiquement un document PDF personnalisé pour chaque ligne d'un fichier Excel, à partir d'un même modèle.",
      },
      {
        type: "p",
        text: "Quand on parle de publipostage, on pense d'abord aux lettres types. Pourtant, dès qu'une structure doit produire le même document pour plusieurs personnes, le publipostage PDF s'applique — et il réduit un lot de 150 documents de plusieurs heures à quelques secondes. Voici cinq cas d'usage que nous voyons revenir chez les utilisateurs d'InOneShot.",
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
      { type: "h2", text: "Quel est le point commun entre ces cas d'usage du publipostage PDF ?" },
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
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des factures PDF en masse](/blog/generer-factures-pdf-masse-excel) ; [ajouter un QR code personnalisé à vos documents](/blog/qr-code-document-genere-en-masse) ; [produire contrats, convocations et badges](/blog/publipostage-rh-contrats-convocations-badges) ; [générer ses attestations de formation Qualiopi](/blog/comment-generer-attestations-formation-qualiopi-sans-logiciel-gestion).",
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
        text: "Préparer son fichier Excel pour un publipostage consiste à nettoyer les en-têtes, les cellules fusionnées et les formats de données avant de les relier à un modèle PDF, pour qu'un lot entier se génère sans erreur.",
      },
      {
        type: "p",
        text: "Dans un publipostage PDF, le modèle est rarement le problème : c'est le fichier Excel qui cause l'essentiel des mauvaises surprises. Une colonne mal nommée, une cellule fusionnée, un format de date incohérent — et c'est tout le lot qui est à refaire. Bonne nouvelle : quelques réflexes simples éliminent la quasi-totalité des erreurs.",
      },
      { type: "h2", text: "Faut-il une seule ligne d'en-têtes dans son Excel ?" },
      {
        type: "p",
        text: "La première ligne de votre feuille doit contenir les noms de colonnes, et rien d'autre : pas de titre de document au-dessus, pas de ligne vide, pas de double en-tête. Des noms courts et explicites (« Nom », « Prénom », « Montant ») rendent le placement des champs beaucoup plus lisible au moment de préparer le modèle.",
      },
      { type: "h2", text: "Pourquoi éviter les cellules fusionnées avant un publipostage ?" },
      {
        type: "p",
        text: "Les cellules fusionnées sont l'ennemi numéro un : elles cassent la logique « une ligne = un document ». Si votre fichier en contient, défusionnez-les et recopiez la valeur dans chaque ligne concernée. Chaque ligne doit être complète et autonome.",
      },
      { type: "h2", text: "Comment obtenir des données propres dans chaque colonne ?" },
      {
        type: "ul",
        items: [
          "Uniformisez les formats de date sur toute la colonne (évitez de mélanger 01/02/2026 et 1 février 2026)",
          "Supprimez les espaces parasites en début ou fin de cellule",
          "Vérifiez les lignes vides au milieu du tableau : elles produiraient des documents vides",
          "Harmonisez majuscules et minuscules si le champ apparaît en clair sur le document",
        ],
      },
      { type: "h2", text: "Quelle colonne choisir pour nommer les fichiers générés ?" },
      {
        type: "p",
        text: "Cent PDF nommés « document (1) », « document (2) »… sont inutilisables. Prévoyez une colonne dont les valeurs sont uniques — numéro de facture, matricule, ou une colonne « NomPrenom » construite avec une formule — et utilisez-la pour le nommage automatique des fichiers générés.",
      },
      { type: "h2", text: "Faut-il tester sur une seule ligne avant de lancer tout le lot ?" },
      {
        type: "p",
        text: "Quelle que soit la qualité de votre préparation, générez d'abord un seul document et relisez-le entièrement : bon champ au bon endroit, format de date correct, pas de texte tronqué. Ce contrôle prend trente secondes et vous évite de refaire un lot de deux cents fichiers.",
      },
      {
        type: "p",
        text: "Avec un tableur propre, le publipostage devient une opération sans surprise : dans InOneShot, vous importez le modèle et l'Excel, vous placez vos champs par glisser-déposer, et le premier aperçu vous confirme que tout est en place avant de générer l'ensemble.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [générer des factures PDF en masse](/blog/generer-factures-pdf-masse-excel) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf).",
      },
    ],
  }),
  make({
    slug: "generate-pdfs-from-excel",
    altLangSlug: "publipostage-pdf-depuis-excel",
    title: "How to Generate Hundreds of Personalized PDFs from an Excel File",
    description:
      "Certificates, invoices, letters, diplomas: here's how to turn every row of your spreadsheet into its own PDF — automatically, without copy-pasting a single value.",
    date: "2026-07-12",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "PDF mail merge means combining a fixed template with the data from an Excel file to automatically generate one unique PDF per row.",
      },
      {
        type: "p",
        text: "You have a polished document template — a certificate, an invoice, a letter — and an Excel file with a hundred rows. The goal: one PDF per row, with the right information in the right place. Done by hand, it's one of the most tedious and error-prone tasks there is.",
      },
      {
        type: "p",
        text: "The good news: this is exactly the kind of repetitive work a computer does better than you. It's called PDF mail merge, and here's how to automate it end to end.",
      },
      { type: "h2", text: "What is PDF mail merge?" },
      {
        type: "p",
        text: "A mail merge combines a template (the fixed layout) with a data source (your spreadsheet, which varies). Each row of the spreadsheet becomes one document: the “Name” column fills the name field, the “Amount” column fills the amount field, and so on — repeated automatically for every row.",
      },
      { type: "h2", text: "Why does the manual way of doing a PDF mail merge cost you so much?" },
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
      { type: "h2", text: "How do you automate PDF mail merge with InOneShot?" },
      {
        type: "p",
        text: "InOneShot is a Windows app built for PDF mail merge. You import a PDF template and an Excel file, place your fields by drag and drop (spreadsheet columns, today's date, a signature image, a QR code), then click once: the app generates one PDF per row, names each file automatically, and delivers a ZIP ready to send. Everything runs locally on your computer — your data never leaves your machine.",
      },
      { type: "h2", text: "What tips help you get a clean result?" },
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
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online); [choose between Word mail merge and a dedicated PDF tool](/blog/word-mail-merge-vs-pdf-tool); [generate bulk PDF invoices](/blog/generate-bulk-pdf-invoices-from-excel).",
      },
    ],
  }),
  make({
    slug: "local-pdf-mail-merge-vs-online",
    altLangSlug: "publipostage-pdf-local-vs-en-ligne",
    title: "PDF Mail Merge: Why Local Processing Beats Online Tools",
    description:
      "Online mail merge tools require uploading your data to the cloud. For sensitive documents — HR, invoices, legal — processing everything locally changes the game.",
    date: "2026-07-13",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "Online PDF mail merge means uploading your template and your data to a third-party server to generate the documents in the cloud, instead of processing them on your own computer.",
      },
      {
        type: "p",
        text: "Most PDF merge tools work online: you upload your template and your data file to a server, processing happens in the cloud, and you download the results. Convenient — but far from trivial when your documents contain personal data.",
      },
      { type: "h2", text: "Is online PDF mail merge safe for HR data?" },
      {
        type: "ul",
        items: [
          "Your data (names, addresses, amounts, ID numbers) leaves your computer and passes through a third party",
          "You depend on an internet connection and on the service staying up",
          "Many of these services are subscription-based, with volume caps",
        ],
      },
      { type: "h2", text: "Why is local PDF mail merge usually the right call?" },
      {
        type: "p",
        text: "For HR teams, legal professionals, accountants, or any organization handling sensitive data, local processing is as much a compliance argument (GDPR) as a peace-of-mind one: your files never leave your machine. No server, no cloud, no wondering where your data ends up.",
      },
      {
        type: "p",
        text: "InOneShot was designed around this principle: the entire mail merge runs on your computer, offline. And since there's no cloud infrastructure to pay for, the pricing is a one-time purchase instead of a subscription.",
      },
      { type: "h2", text: "Does online PDF mail merge still make sense in some cases?" },
      {
        type: "p",
        text: "If several people need to collaborate on the same templates in real time from different locations, an online solution can be worth it. But for the most common case — producing a batch of documents from a spreadsheet, quickly and reliably — local is simpler, faster, and safer.",
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [choose between Word mail merge and a dedicated PDF tool](/blog/word-mail-merge-vs-pdf-tool); [produce contracts, invitations and badges](/blog/hr-mail-merge-contracts-invitations-badges).",
      },
    ],
  }),
  make({
    slug: "word-mail-merge-vs-pdf-tool",
    altLangSlug: "publipostage-word-vs-inoneshot",
    title: "Word Mail Merge vs. a Dedicated PDF Tool: Which One Do You Need?",
    description:
      "Word's mail merge has been around forever. Here's what it does well, where it falls short for PDF output, and when a dedicated tool will save you real time.",
    date: "2026-07-14",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "Word's mail merge combines a text document with Excel data, but it does not natively produce a separate, properly named PDF for each recipient — that's the gap a dedicated tool like InOneShot fills.",
      },
      {
        type: "p",
        text: "If you've ever run a mail merge, it was probably in Microsoft Word with an Excel data source. It's a proven tool — but the moment you need real PDFs, one per recipient, with clean file names, things get complicated.",
      },
      { type: "h2", text: "What does Word's mail merge do well?" },
      {
        type: "ul",
        items: [
          "Merging a text document with fields from an Excel sheet",
          "Printing or sending letters in bulk from a text template",
          "Free if you already own the Office suite",
        ],
      },
      { type: "h2", text: "Where does Word's mail merge fall short for PDF output?" },
      {
        type: "ul",
        items: [
          "No native way to export one PDF per recipient: you need workarounds or macros",
          "Automatic naming of generated files simply isn't built in",
          "Hard to start from an existing PDF as the template (forms, locked layouts)",
          "Advanced fields like QR codes or signature images are painful to integrate",
        ],
      },
      { type: "h2", text: "What does a dedicated tool like InOneShot add?" },
      {
        type: "p",
        text: "InOneShot starts directly from a PDF template, lets you place fields by drag and drop (Excel columns, date, QR code, signature), generates one PDF per row, names every file automatically, and bundles the batch into a ZIP — in one click, entirely on your machine. That's precisely the link in the chain Word doesn't cover well.",
      },
      { type: "h2", text: "How do you choose between Word and a dedicated PDF tool?" },
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
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online); [generate bulk PDF invoices](/blog/generate-bulk-pdf-invoices-from-excel).",
      },
    ],
  }),
  make({
    slug: "inoneshot-1-1-0-nouveautes",
    altLangSlug: "inoneshot-1-1-0-whats-new",
    title: "InOneShot 1.1.0 : mode sombre, interface FR/EN, fusion PDF, glisser-déposer — et Linux",
    description:
      "La mise à jour 1.1.0 d'InOneShot apporte le mode sombre, une interface bilingue, l'import CSV, la fusion en un seul PDF, le glisser-déposer de fichiers, et une version Linux.",
    date: "2026-07-18",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "InOneShot 1.1.0 est une mise à jour de l'application de publipostage PDF qui ajoute le mode sombre, une interface bilingue, l'import CSV, la fusion en un seul PDF, le glisser-déposer et une version Linux.",
      },
      {
        type: "p",
        text: "InOneShot évolue au fil de vos retours plutôt que selon une feuille de route figée à l'avance. La version 1.1.0 regroupe plusieurs demandes revenues souvent ces dernières semaines : plus de confort visuel, plus de formats de données acceptés, et un fichier de sortie plus simple à utiliser. Voici ce qui change concrètement.",
      },
      { type: "h2", text: "Qu'apportent le mode sombre et l'interface bilingue FR/EN ?" },
      {
        type: "p",
        text: "Un bouton dans la barre du haut bascule l'application en mode sombre, et un autre change la langue de l'interface entre français et anglais. Les deux réglages sont mémorisés d'une session à l'autre — pas de détection automatique surprenante selon les réglages système, vous choisissez et ça reste.",
      },
      { type: "h2", text: "Comment fonctionne la fusion en un seul PDF, en plus du ZIP ?" },
      {
        type: "p",
        text: "Jusqu'ici, InOneShot produisait un PDF par ligne du tableur, livrés dans un ZIP. C'est toujours le cas par défaut, mais une nouvelle option de sortie permet de fusionner directement tous les documents générés en un seul fichier PDF — pratique pour un lot à imprimer d'un coup ou à archiver comme un seul document plutôt qu'une centaine de fichiers séparés.",
      },
      { type: "h2", text: "Que changent l'import CSV et le glisser-déposer ?" },
      {
        type: "ul",
        items: [
          "Les fichiers CSV sont maintenant acceptés comme source de données, en plus de l'Excel — détection automatique du délimiteur et de l'encodage",
          "Le modèle PDF et le fichier de données peuvent être glissés-déposés directement dans la fenêtre, plus besoin de passer systématiquement par le sélecteur de fichiers",
          "Un double-clic sur un champ posé ouvre une boîte d'édition pour ajuster précisément sa position et son format",
          "L'aperçu se parcourt maintenant ligne par ligne, pour vérifier le rendu de plusieurs entrées avant de lancer le lot complet",
        ],
      },
      { type: "h2", text: "InOneShot est-il disponible sur Linux ?" },
      {
        type: "p",
        text: "InOneShot est désormais disponible sur Linux via le Snap Store, avec les mêmes fonctionnalités que la version Windows — y compris le glisser-déposer. C'est la même logique que VoxCut, notre autre application : plus question d'être enfermé sur un seul système d'exploitation quand les mêmes outils peuvent tourner partout, en local.",
      },
      {
        type: "p",
        text: "La mise à jour est disponible dès maintenant en téléchargement direct sur ce site (version portable Windows) et sur le Snap Store pour Linux. La fiche Microsoft Store est en cours de mise à jour et suivra dans les prochains jours.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [ajouter un QR code personnalisé à vos documents](/blog/qr-code-document-genere-en-masse) ; [InOneShot sur Android](/blog/inoneshot-disponible-sur-android).",
      },
    ],
  }),
  make({
    slug: "inoneshot-1-1-0-whats-new",
    altLangSlug: "inoneshot-1-1-0-nouveautes",
    title: "InOneShot 1.1.0: Dark Mode, Bilingual UI, PDF Merging, Drag & Drop — and Linux",
    description:
      "InOneShot 1.1.0 brings dark mode, a bilingual interface, CSV import, merging generated PDFs into a single file, drag-and-drop file handling, and a Linux release.",
    date: "2026-07-18",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "InOneShot 1.1.0 is an update to the PDF mail merge app that adds dark mode, a bilingual interface, CSV import, single-file PDF merging, drag-and-drop, and a Linux release.",
      },
      {
        type: "p",
        text: "InOneShot evolves based on how people actually use it, not a roadmap fixed in advance. Version 1.1.0 bundles several requests that kept coming up over the past few weeks: more visual comfort, more accepted data formats, and a simpler output file. Here's what actually changed.",
      },
      { type: "h2", text: "What do dark mode and the bilingual FR/EN interface add?" },
      {
        type: "p",
        text: "A button in the top bar switches the app to dark mode, and another switches the interface language between French and English. Both settings are remembered across sessions — no surprise auto-detection based on system settings, you choose and it stays.",
      },
      { type: "h2", text: "How does merging into a single PDF work, on top of the ZIP?" },
      {
        type: "p",
        text: "Until now, InOneShot produced one PDF per spreadsheet row, delivered in a ZIP. That's still the default, but a new output option lets you merge all the generated documents directly into a single PDF file — handy for a batch you want to print in one go or archive as one document instead of a hundred separate files.",
      },
      { type: "h2", text: "What do CSV import and drag & drop change?" },
      {
        type: "ul",
        items: [
          "CSV files are now accepted as a data source, alongside Excel — automatic delimiter and encoding detection",
          "The PDF template and data file can be dropped directly into the window, no need to go through the file picker every time",
          "Double-clicking a placed field opens an edit box to fine-tune its position and format",
          "The preview can now be browsed row by row, to check how several entries render before running the full batch",
        ],
      },
      { type: "h2", text: "Is InOneShot now available on Linux?" },
      {
        type: "p",
        text: "InOneShot is now available on Linux via the Snap Store, with the same feature set as the Windows version — including drag and drop. Same logic as VoxCut, our other app: no reason to be locked to a single operating system when the same tools can run everywhere, locally.",
      },
      {
        type: "p",
        text: "The update is available now as a direct download on this site (Windows portable) and on the Snap Store for Linux. The Microsoft Store listing is being updated and will follow in the coming days.",
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [add a personalized QR code to your documents](/blog/add-qr-code-bulk-generated-documents); [InOneShot on Android](/blog/inoneshot-now-available-on-android).",
      },
    ],
  }),
  make({
    slug: "inoneshot-disponible-sur-android",
    altLangSlug: "inoneshot-now-available-on-android",
    title: "InOneShot est maintenant disponible sur Android",
    description:
      "Le publipostage PDF d'InOneShot passe sur mobile : générez vos lots de PDF personnalisés depuis votre téléphone ou votre tablette, avec Google Play.",
    date: "2026-08-08",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "InOneShot pour Android est la version mobile de l'application de publipostage PDF : elle permet de générer un lot de PDF personnalisés depuis un téléphone ou une tablette, avec le même principe que la version bureau.",
      },
      {
        type: "p",
        text: "InOneShot était jusqu'ici une application de bureau, pour Windows et Linux. C'est maintenant aussi une application Android, disponible sur le Google Play Store : le même principe de publipostage PDF, mais accessible depuis votre téléphone ou votre tablette.",
      },
      { type: "h2", text: "Pourquoi une version Android d'InOneShot ?" },
      {
        type: "p",
        text: "Un usage courant : préparer ses documents sur ordinateur, mais vouloir relancer un lot, vérifier un rendu ou dépanner une génération de PDF sans être devant un poste fixe. La version Android répond à ce besoin : importer un modèle et un fichier de données, placer ses champs, générer le lot — directement depuis un appareil mobile.",
      },
      { type: "h2", text: "Qu'est-ce qui ne change pas sur la version Android ?" },
      {
        type: "ul",
        items: [
          "Le traitement reste local, sur votre appareil : vos données ne transitent par aucun serveur",
          "Le même flux qu'en version bureau : modèle PDF + tableur de données, champs placés par glisser-déposer, génération en un clic",
          "Un ZIP de PDF prêt à partager en sortie",
        ],
      },
      { type: "h2", text: "Comment télécharger InOneShot sur Android ?" },
      {
        type: "p",
        text: "L'application est disponible dès maintenant, gratuitement, sur le Google Play Store : cherchez « InOneShot » ou suivez le lien direct depuis la page d'accueil de ce site.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [les nouveautés de la version 1.1.0](/blog/inoneshot-1-1-0-nouveautes) ; [traiter un publipostage PDF en local plutôt qu'en ligne](/blog/publipostage-pdf-local-vs-en-ligne).",
      },
    ],
  }),
  make({
    slug: "inoneshot-now-available-on-android",
    altLangSlug: "inoneshot-disponible-sur-android",
    title: "InOneShot Is Now Available on Android",
    description:
      "InOneShot's PDF mail merge is now on mobile: generate your batches of personalized PDFs from your phone or tablet, via Google Play.",
    date: "2026-08-08",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "InOneShot for Android is the mobile version of the PDF mail merge app: it lets you generate a batch of personalized PDFs from a phone or tablet, using the same principle as the desktop app.",
      },
      {
        type: "p",
        text: "InOneShot has been a desktop app so far, for Windows and Linux. It's now also an Android app, available on the Google Play Store: the same PDF mail merge workflow, now accessible from your phone or tablet.",
      },
      { type: "h2", text: "Why an Android version of InOneShot?" },
      {
        type: "p",
        text: "A common case: preparing documents on a computer, but needing to re-run a batch, check a render, or troubleshoot a PDF generation without sitting at a desk. The Android version covers that: import a template and a data file, place your fields, generate the batch — straight from a mobile device.",
      },
      { type: "h2", text: "What stays the same on the Android version?" },
      {
        type: "ul",
        items: [
          "Processing stays local, on your device: your data never passes through any server",
          "The same flow as the desktop version: PDF template + spreadsheet, fields placed by drag and drop, one-click generation",
          "A ready-to-share ZIP of PDFs as output",
        ],
      },
      { type: "h2", text: "How do you download InOneShot on Android?" },
      {
        type: "p",
        text: 'The app is available now, for free, on the Google Play Store: search for "InOneShot" or follow the direct link from this site\'s homepage.',
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [what's new in version 1.1.0](/blog/inoneshot-1-1-0-whats-new); [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online).",
      },
    ],
  }),
  make({
    slug: "generer-factures-pdf-masse-excel",
    altLangSlug: "generate-bulk-pdf-invoices-from-excel",
    title: "Générer des factures PDF personnalisées en masse depuis un tableur Excel",
    description:
      "Pour les indépendants, associations et petites entreprises, automatiser l'édition de factures en série grâce au publipostage PDF réduit un lot de 150 factures de plusieurs heures à quelques minutes.",
    date: "2026-08-30",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Générer des factures PDF en masse depuis Excel consiste à relier un modèle de facture unique aux lignes d'un tableur pour produire automatiquement une facture PDF distincte par client, sans ressaisie.",
      },
      {
        type: "p",
        text: "La facturation est le nerf de la guerre de toute activité, mais son traitement manuel peut vite devenir chronophage. Si vous gérez vos ventes, cotisations ou prestations dans un fichier Excel, il y a de fortes chances que vous passiez un temps précieux à copier-coller ces informations dans des modèles Word ou PDF.",
      },
      { type: "h2", text: "Quel est le problème de la facturation manuelle ?" },
      {
        type: "p",
        text: "Créer une facture demande de la précision : erreur sur le montant, mauvais numéro de facture, faute de frappe dans l'adresse du client... Les risques sont nombreux. Sans compter la tâche ingrate d'exporter chaque document en PDF et de le nommer correctement pour l'archivage.",
      },
      { type: "h2", text: "Comment fonctionne l'approche publipostage PDF pour les factures ?" },
      {
        type: "p",
        text: "Avec un outil comme InOneShot, votre tableau Excel devient une base de données automatisée. Vous concevez un modèle de facture PDF unique (avec votre logo, vos mentions légales, etc.). Ensuite, il suffit de placer les champs (Nom du client, Montant HT, TVA, Total TTC) sur le modèle.",
      },
      {
        type: "ul",
        items: [
          "Chaque ligne de votre fichier Excel génère une facture unique.",
          "Les numéros de facture s'incrémentent naturellement selon votre tableur.",
          "Les fichiers générés sont nommés automatiquement (ex: Facture_2026-08_ClientA.pdf).",
        ],
      },
      { type: "h2", text: "Combien d'heures peut-on gagner chaque fin de mois ?" },
      {
        type: "p",
        text: "Une fois le modèle configuré, la génération de 10 ou 500 factures prend exactement le même temps : un seul clic. Le traitement se faisant en local, les données financières de votre entreprise restent confidentielles sur votre ordinateur.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [préparer son fichier Excel sans erreur](/blog/preparer-fichier-excel-publipostage) ; [ajouter un QR code personnalisé à vos documents](/blog/qr-code-document-genere-en-masse) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf).",
      },
    ],
  }),
  make({
    slug: "generate-bulk-pdf-invoices-from-excel",
    altLangSlug: "generer-factures-pdf-masse-excel",
    title: "Generate Bulk PDF Invoices Automatically from an Excel Spreadsheet",
    description:
      "For freelancers, nonprofits, and small businesses, automating batch invoice generation with PDF mail merge saves hours of manual work.",
    date: "2026-08-30",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "Generating bulk PDF invoices from Excel means linking a single invoice template to the rows of a spreadsheet so each row automatically produces its own PDF invoice, with no retyping.",
      },
      {
        type: "p",
        text: "Invoicing is the lifeblood of any business, but manual processing can quickly consume your time. If you track sales, memberships, or services in an Excel file, chances are you spend hours copy-pasting that data into Word or PDF templates.",
      },
      { type: "h2", text: "What is the problem with manual invoicing?" },
      {
        type: "p",
        text: "Creating an invoice requires precision. A mistake in the amount, an incorrect invoice number, a typo in the client's address... the risks are everywhere. Not to mention the tedious task of exporting each document to PDF and naming it properly for your records.",
      },
      { type: "h2", text: "How does the PDF mail merge approach work for invoices?" },
      {
        type: "p",
        text: "With a tool like InOneShot, your Excel spreadsheet acts as an automated database. You design a single PDF invoice template (with your logo, legal terms, etc.). Then, you drag and drop fields (Client Name, Amount, Tax, Total) onto the layout.",
      },
      {
        type: "ul",
        items: [
          "Each row in your Excel file generates a unique invoice.",
          "Invoice numbers increment naturally based on your spreadsheet.",
          "Generated files are automatically named (e.g., Invoice_2026-08_ClientA.pdf).",
        ],
      },
      { type: "h2", text: "How many hours can you save at the end of every month?" },
      {
        type: "p",
        text: "Once the template is configured, generating 10 or 500 invoices takes exactly the same amount of time: one click. And because processing is strictly local, your company's financial data remains private on your computer.",
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [add a personalized QR code to your documents](/blog/add-qr-code-bulk-generated-documents); [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online).",
      },
    ],
  }),
  make({
    slug: "qr-code-document-genere-en-masse",
    altLangSlug: "add-qr-code-bulk-generated-documents",
    title: "Ajouter un QR code personnalisé sur vos documents générés en masse",
    description:
      "Billets d'entrée, badges d'accès ou cartes de visite : apprenez à insérer automatiquement un QR code unique pour chaque ligne de votre fichier Excel.",
    date: "2026-09-02",
    author: "Équipe InOneShot",
    lang: "fr",
    content: [
      {
        type: "p",
        text: "Ajouter un QR code personnalisé sur des documents générés en masse consiste à relier une colonne de votre Excel (lien, identifiant, vCard) à un champ QR code du modèle, pour que chaque PDF reçoive automatiquement un code unique et valide.",
      },
      {
        type: "p",
        text: "L'utilisation de QR codes sur des documents physiques ou numériques est devenue incontournable. Que ce soit pour un billet d'événement, un badge de conférence, ou une carte de membre, un QR code permet de relier instantanément le document à une action numérique.",
      },
      { type: "h2", text: "Comment obtenir un QR code unique par personne ?" },
      {
        type: "p",
        text: "La difficulté majeure réside dans la personnalisation. Comment générer 200 invitations avec un QR code différent sur chacune, sans utiliser des générateurs en ligne fastidieux et assembler le tout manuellement ?",
      },
      { type: "h2", text: "Comment automatiser l'ajout de QR codes avec InOneShot ?" },
      {
        type: "p",
        text: "InOneShot intègre un générateur de QR codes natif. Dans votre fichier Excel, préparez une colonne contenant le lien ou le texte que le QR code doit représenter (un lien vers un formulaire, un identifiant unique, ou une vCard).",
      },
      {
        type: "p",
        text: "Lors de la configuration du modèle, vous faites simplement glisser le champ \"QR code\" et vous le reliez à cette colonne. Lors de la génération, InOneShot dessinera instantanément un QR code valide et unique sur chaque PDF.",
      },
      { type: "h2", text: "Quels sont les cas d'usage fréquents du QR code personnalisé ?" },
      {
        type: "ul",
        items: [
          "Événementiel : Billetterie avec code de scan pour le contrôle à l'entrée.",
          "Ressources Humaines : Badges d'employés scannables pointant vers l'annuaire interne.",
          "Associations : Cartes de membres interactives pour la gestion des présences.",
        ],
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer des factures PDF en masse](/blog/generer-factures-pdf-masse-excel) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf) ; [produire contrats, convocations et badges](/blog/publipostage-rh-contrats-convocations-badges).",
      },
    ],
  }),
  make({
    slug: "add-qr-code-bulk-generated-documents",
    altLangSlug: "qr-code-document-genere-en-masse",
    title: "Add a Personalized QR Code to Your Bulk-Generated Documents",
    description:
      "Event tickets, access badges, or business cards: learn how to automatically insert a unique QR code for each row of your Excel file.",
    date: "2026-09-02",
    author: "InOneShot Team",
    lang: "en",
    content: [
      {
        type: "p",
        text: "Adding a personalized QR code to bulk-generated documents means linking a column of your Excel file (a link, an ID, a vCard) to a QR code field on the template, so every PDF automatically gets its own valid, unique code.",
      },
      {
        type: "p",
        text: "QR codes on physical or digital documents have become essential. Whether it's an event ticket, a conference badge, or a membership card, a QR code instantly connects a printed document to a digital action.",
      },
      { type: "h2", text: "How do you get a unique QR code per person?" },
      {
        type: "p",
        text: "The main challenge is personalization. How do you generate 200 invitations with a different QR code on each, without relying on tedious online generators and assembling everything by hand?",
      },
      { type: "h2", text: "How do you automate QR codes with InOneShot?" },
      {
        type: "p",
        text: "InOneShot includes a native QR code generator. In your Excel file, just prepare a column containing the link or text the QR code should represent (a URL, a unique ID, or vCard info).",
      },
      {
        type: "p",
        text: "When setting up your template, simply drag and drop the \"QR Code\" field and link it to that column. During generation, InOneShot will instantly draw a valid, unique QR code onto every single PDF.",
      },
      { type: "h2", text: "What are the most common use cases?" },
      {
        type: "ul",
        items: [
          "Events: Ticketing with scannable codes for access control.",
          "Human Resources: Employee badges linking to the internal directory.",
          "Nonprofits: Interactive membership cards for attendance tracking.",
        ],
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate bulk PDF invoices](/blog/generate-bulk-pdf-invoices-from-excel); [produce contracts, invitations and badges](/blog/hr-mail-merge-contracts-invitations-badges).",
      },
    ],
  }),
  make({
    slug: "publipostage-rh-contrats-convocations-badges",
    altLangSlug: "hr-mail-merge-contracts-invitations-badges",
    title: "Publipostage RH : produire contrats, convocations et badges sans y passer la semaine",
    description:
      "Un service RH génère les mêmes documents en série toute l'année. Voici comment transformer un tableur du SIRH en centaines de PDF nominatifs, sans copier-coller et sans envoyer les données du personnel dans le cloud.",
    date: "2026-09-02",
    author: "Équipe InOneShot",
    lang: "fr",
    related: { to: "/attestations-rh", label: "Voir la page dédiée aux documents RH" },
    content: [
      {
        type: "p",
        text: "Le publipostage RH consiste à relier un tableur exporté du SIRH à un modèle PDF unique (contrat, convocation, badge) pour générer automatiquement un document nominatif par collaborateur, sans copier-coller.",
      },
      {
        type: "p",
        text: "Dans un service RH, la production documentaire ne s'arrête jamais. Avenants au contrat en janvier, convocations aux entretiens annuels au printemps, badges pour les nouveaux arrivants toute l'année, attestations diverses à la demande. À chaque fois, le même schéma : une trame identique pour tout le monde, et une poignée d'informations qui changent d'une personne à l'autre.",
      },
      {
        type: "p",
        text: "C'est précisément la définition du publipostage. Pourtant, dans beaucoup d'entreprises, ces documents se fabriquent encore un par un, à coups de copier-coller depuis un export du SIRH. Voici comment sortir de cette boucle.",
      },
      { type: "h2", text: "Trois familles de documents RH, un seul mécanisme ?" },
      {
        type: "p",
        text: "Les documents RH les plus chronophages se ressemblent tous structurellement : un modèle fixe, validé par le juridique ou la direction, et des champs variables tirés d'un tableau de collaborateurs.",
      },
      {
        type: "ul",
        items: [
          "Contrats et avenants : nom, poste, date d'effet, rémunération, durée de période d'essai.",
          "Convocations : nom du salarié, date et heure de l'entretien, salle, nom du manager.",
          "Badges et cartes d'accès : nom, service, photo ou QR code pointant vers l'annuaire interne.",
        ],
      },
      {
        type: "p",
        text: "Une fois qu'on voit ce point commun, il devient évident qu'un seul outil peut couvrir les trois. Le modèle change, la méthode reste la même.",
      },
      { type: "h2", text: "Quel est le vrai coût de la méthode manuelle en RH ?" },
      {
        type: "p",
        text: "Comptez deux à trois minutes par document quand tout va bien : ouvrir la trame, recopier cinq ou six valeurs, relire, exporter en PDF, renommer le fichier pour qu'il soit classable. Sur une campagne de 150 convocations, cela représente près d'une journée entière de travail, entièrement consacrée à de la recopie.",
      },
      {
        type: "p",
        text: "Le problème n'est pas seulement le temps perdu. C'est aussi le risque d'erreur : une date d'entretien décalée d'une ligne, un montant qui appartient au collaborateur précédent, un nom mal orthographié sur un contrat. Sur des documents à portée contractuelle, ces fautes coûtent bien plus cher que les minutes économisées.",
      },
      { type: "h2", text: "Pourquoi la donnée RH ne devrait-elle pas quitter l'entreprise ?" },
      {
        type: "p",
        text: "C'est le point qui distingue le publipostage RH de tous les autres. Un fichier de paie, une liste de salariés avec leurs rémunérations ou leurs coordonnées personnelles constituent des données à caractère personnel sensibles au sens du RGPD. Les téléverser sur un service en ligne pour générer des PDF, c'est créer un transfert de données qu'il faudra documenter, justifier et, le cas échéant, expliquer à un délégué à la protection des données.",
      },
      {
        type: "p",
        text: "Un outil qui travaille en local règle la question à la racine : le tableur et les PDF produits ne quittent jamais le poste de travail. Il n'y a pas de sous-traitant à inscrire au registre des traitements, pas de serveur tiers à auditer, pas de fichier de paie oublié sur une plateforme.",
      },
      { type: "h2", text: "Comment mettre en place une campagne de publipostage RH, concrètement ?" },
      {
        type: "p",
        text: "Le principe tient en trois temps. D'abord, exportez depuis votre SIRH un tableur contenant une ligne par collaborateur et une colonne par information variable. Ensuite, ouvrez votre trame PDF déjà validée et positionnez les champs par glisser-déposer, en reliant chaque emplacement à la colonne correspondante. Enfin, lancez la génération : vous obtenez un PDF par ligne, nommé automatiquement, plus une archive ZIP prête à être distribuée.",
      },
      {
        type: "p",
        text: "L'intérêt réel apparaît à la deuxième campagne. Le modèle se sauvegarde et se réutilise : la campagne de convocations de l'an prochain ne demandera plus que le nouvel export du SIRH et un clic. Le travail de mise en place ne se paie qu'une fois.",
      },
      { type: "h2", text: "Quelles précautions prendre avant de lancer le lot ?" },
      {
        type: "ul",
        items: [
          "Nettoyez les en-têtes du tableur : une colonne par information, des noms explicites, aucune ligne de titre fusionnée au-dessus.",
          "Vérifiez le format des dates avant l'export, c'est la source d'erreur la plus fréquente.",
          "Générez toujours un lot de test sur trois ou quatre lignes et relisez-le avant de lancer les 150 autres.",
          "Faites relire la trame par le service juridique une fois pour toutes : c'est elle qui sera dupliquée à l'identique.",
        ],
      },
      {
        type: "p",
        text: "Une fois ces réflexes en place, produire cent contrats ou cent badges prend le même temps qu'en produire un seul. C'est du temps rendu au service RH pour faire ce qu'un tableur ne fera jamais à sa place.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [générer ses attestations de formation Qualiopi](/blog/comment-generer-attestations-formation-qualiopi-sans-logiciel-gestion) ; [cinq cas d'usage concrets du publipostage PDF](/blog/5-cas-usage-publipostage-pdf) ; [traiter un publipostage PDF en local plutôt qu'en ligne](/blog/publipostage-pdf-local-vs-en-ligne).",
      },
    ],
  }),
  make({
    slug: "hr-mail-merge-contracts-invitations-badges",
    altLangSlug: "publipostage-rh-contrats-convocations-badges",
    title: "HR Mail Merge: Contracts, Meeting Invitations and Badges Without Losing a Week",
    description:
      "HR teams produce the same documents in batches all year long. Here's how to turn an HRIS export into hundreds of personalized PDFs, with no copy-pasting and without sending employee data to the cloud.",
    date: "2026-09-02",
    author: "InOneShot Team",
    lang: "en",
    related: { to: "/attestations-rh", label: "See the dedicated HR documents page" },
    content: [
      {
        type: "p",
        text: "HR mail merge means linking a spreadsheet exported from your HRIS to a single PDF template (contract, invitation, badge) to automatically generate one personalized document per employee, with no copy-pasting.",
      },
      {
        type: "p",
        text: "In an HR department, document production never really stops. Contract amendments in January, annual review invitations in the spring, badges for new joiners all year round, various certificates on request. Every time, the same pattern: one identical layout for everyone, and a handful of details that change from one person to the next.",
      },
      {
        type: "p",
        text: "That is the textbook definition of a mail merge. Yet in many companies these documents are still produced one at a time, by copy-pasting from an HRIS export. Here is how to break out of that loop.",
      },
      { type: "h2", text: "Three HR document families, one single mechanism?" },
      {
        type: "p",
        text: "The most time-consuming HR documents are structurally identical: a fixed template, signed off by legal or management, and variable fields pulled from a list of employees.",
      },
      {
        type: "ul",
        items: [
          "Contracts and amendments: name, job title, effective date, salary, probation period.",
          "Meeting invitations: employee name, date and time, room, manager's name.",
          "Badges and access cards: name, department, photo or QR code pointing to the internal directory.",
        ],
      },
      {
        type: "p",
        text: "Once you see what they have in common, it becomes obvious that a single tool can cover all three. The template changes; the method does not.",
      },
      { type: "h2", text: "What is the real cost of doing HR mail merge by hand?" },
      {
        type: "p",
        text: "Count two to three minutes per document on a good day: open the template, retype five or six values, proofread, export to PDF, rename the file so it can actually be filed. Across a campaign of 150 invitations, that adds up to nearly a full working day spent entirely on retyping.",
      },
      {
        type: "p",
        text: "Wasted time is not the only issue. There is also the risk of error: an interview date shifted by one row, an amount belonging to the previous employee, a misspelled name on a contract. On documents with contractual weight, those mistakes cost far more than the minutes saved.",
      },
      { type: "h2", text: "Why should employee data not leave the company?" },
      {
        type: "p",
        text: "This is what sets HR mail merge apart from every other use case. A payroll file, or a list of employees with their compensation and home addresses, is sensitive personal data under GDPR. Uploading it to an online service to generate PDFs creates a data transfer that must be documented, justified, and possibly explained to a data protection officer.",
      },
      {
        type: "p",
        text: "A tool that works locally removes the question entirely: the spreadsheet and the resulting PDFs never leave the workstation. There is no processor to add to your records, no third-party server to audit, no payroll file left sitting on a platform.",
      },
      { type: "h2", text: "How do you set up an HR mail merge campaign, in practice?" },
      {
        type: "p",
        text: "The principle comes down to three steps. First, export a spreadsheet from your HRIS with one row per employee and one column per variable field. Then open your approved PDF template and place the fields by drag and drop, linking each position to the matching column. Finally, run the generation: you get one PDF per row, named automatically, plus a ZIP archive ready to distribute.",
      },
      {
        type: "p",
        text: "The real payoff shows up on the second campaign. The template can be saved and reused, so next year's invitation run only needs a fresh HRIS export and one click. The setup work is paid for once.",
      },
      { type: "h2", text: "What should you check before you hit generate?" },
      {
        type: "ul",
        items: [
          "Clean up your spreadsheet headers: one column per field, explicit names, no merged title row on top.",
          "Check your date formats before exporting — this is by far the most common source of errors.",
          "Always generate a test batch of three or four rows and proofread it before launching the other 150.",
          "Have legal review the template once and for all: it is the one thing that gets duplicated identically.",
        ],
      },
      {
        type: "p",
        text: "With those habits in place, producing a hundred contracts or a hundred badges takes the same time as producing one. That is time handed back to the HR team to do what a spreadsheet will never do for them.",
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [generate training certificates without management software](/blog/how-to-generate-training-certificates-without-management-software); [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online).",
      },
    ],
  }),
  make({
    slug: "comment-generer-attestations-formation-qualiopi-sans-logiciel-gestion",
    altLangSlug: "how-to-generate-training-certificates-without-management-software",
    title:
      "Comment générer ses attestations de formation Qualiopi sans logiciel de gestion à 100 €/mois ?",
    description:
      "Attestations de fin de formation, certificats de réalisation, convocations : voici comment un petit organisme de formation ou un formateur indépendant peut produire ces documents en série, conformes Qualiopi, sans s'abonner à une suite de gestion complète.",
    date: "2026-09-28",
    author: "Équipe InOneShot",
    lang: "fr",
    related: { to: "/attestations-rh", label: "Voir la page dédiée aux documents RH et attestations" },
    content: [
      {
        type: "p",
        text: "Un organisme de formation (OF) certifié Qualiopi ou en cours de certification doit produire, à chaque session, plusieurs documents nominatifs : convocation, feuille d'émargement, attestation de formation, certificat de réalisation. Ces documents peuvent être générés en série à partir d'un fichier Excel et d'un modèle PDF, sans passer par un logiciel de gestion de formation complet facturé par abonnement.",
      },
      {
        type: "p",
        text: "Si vous êtes formateur indépendant ou responsable pédagogique dans un petit organisme, vous connaissez ce moment : une session se termine, et il faut produire quinze, trente ou cinquante attestations et certificats de réalisation, un par stagiaire, avec le bon nom, les bonnes dates et parfois une signature. Fait à la main dans Word, c'est long et risqué. Souscrire à un logiciel de gestion Qualiopi à 80 ou 150 € par mois pour ce seul besoin est souvent disproportionné, surtout quand vous animez quelques sessions par mois.",
      },
      {
        type: "p",
        text: "Cet article fait le point sur les documents réellement exigés, sur ce que couvrent (et ne couvrent pas) les suites de gestion Qualiopi, et sur une méthode plus légère : le publipostage PDF, qui permet de générer tous ces documents en un clic à partir d'un tableur, sans abonnement et sans envoyer les données de vos stagiaires sur un serveur.",
      },
      { type: "h2", text: "Quels documents un organisme de formation doit-il produire à chaque session ?" },
      {
        type: "p",
        text: "Une session de formation génère toujours le même petit lot de documents nominatifs, quel que soit le thème enseigné. Ce sont des documents à mise en page fixe, avec seulement quelques champs qui changent d'un stagiaire à l'autre : nom, dates, durée, modalité, résultat de l'évaluation.",
      },
      {
        type: "ul",
        items: [
          "La convocation, envoyée avant la session, avec le nom du stagiaire, les dates, le lieu ou le lien de connexion.",
          "La feuille d'émargement, signée en présentiel ou en distanciel, qui prouve la présence effective.",
          "L'attestation de formation, remise au stagiaire à l'issue de la session, qui décrit les compétences travaillées.",
          "Le certificat de réalisation, destiné au financeur (OPCO, France Travail, CPF), qui atteste que la formation a bien eu lieu.",
          "Parfois une attestation d'assiduité ou un diplôme interne, pour les formations certifiantes ou diplômantes.",
        ],
      },
      {
        type: "p",
        text: "Sur une promotion de trente stagiaires, cela représente potentiellement plus de cent documents à produire pour une seule session, à multiplier par le nombre de sessions dans l'année. C'est exactement le type de tâche répétitive que le copier-coller dans Word rend lent et sujet à l'erreur : une date décalée d'une ligne, un nom mal orthographié sur un certificat destiné à un OPCO, et c'est toute la crédibilité du dossier qui en pâtit lors d'un contrôle.",
      },
      {
        type: "h2",
        text: "Attestation de formation et certificat de réalisation : quelle différence, et que dit Qualiopi ?",
      },
      {
        type: "p",
        text: "Ces deux documents sont souvent confondus, alors qu'ils n'ont ni le même destinataire ni le même statut. Le certificat de réalisation est le document que la loi impose réellement : c'est lui qui est transmis au financeur pour justifier que l'action de formation a eu lieu, avec les dates, la durée et la modalité (présentiel, distanciel, mixte). L'attestation de formation, elle, est remise au stagiaire : depuis la loi Avenir professionnel, elle n'est plus une obligation légale en tant que telle, mais elle reste très largement utilisée par les organismes, et elle est directement liée aux indicateurs du Référentiel National Qualité qui portent sur l'évaluation des acquis (l'indicateur 11 impose d'évaluer l'atteinte des objectifs par les bénéficiaires).",
      },
      {
        type: "p",
        text: "Dans les deux cas, un auditeur Qualiopi ne vérifie pas la mise en page du document : il vérifie sa cohérence avec les autres pièces du dossier (convocation, émargement, évaluation). C'est précisément ce que permet un modèle unique réutilisé pour tous les stagiaires : la structure ne change jamais, seuls les champs variables changent, ce qui élimine le risque d'incohérence entre les documents d'une même session.",
      },
      { type: "h2", text: "Pourquoi un logiciel de gestion Qualiopi n'est pas toujours la bonne réponse" },
      {
        type: "p",
        text: "Il existe une vraie catégorie de logiciels de gestion de formation (Digiforma, Dendreo, SmartOF, TousQuali et d'autres), qui couvrent l'ensemble du processus Qualiopi : gestion des inscriptions, facturation, suivi des 32 indicateurs, génération documentaire, parfois même la partie pédagogique en ligne. Pour un organisme de taille moyenne avec plusieurs formateurs et un volume de sessions important, ces outils ont un vrai intérêt : ils structurent tout le parcours qualité, pas seulement les documents.",
      },
      {
        type: "p",
        text: "Le problème apparaît pour les structures plus petites : formateur indépendant, micro-entreprise, association qui organise quelques sessions par an. Ces suites facturent en général entre 50 et plus de 150 € par mois, avec un engagement annuel, pour un outil dont vous n'utiliserez souvent qu'une fraction des fonctionnalités. Payer un abonnement toute l'année pour générer des attestations quatre ou cinq fois dans l'année n'est pas un mauvais choix par principe, mais ce n'est pas non plus le seul choix possible.",
      },
      {
        type: "p",
        text: "Il existe une alternative plus ciblée : un outil qui ne fait qu'une chose, la génération de documents en série à partir d'un modèle PDF et d'un tableur, sans gérer ni les inscriptions ni la facturation ni le suivi des indicateurs. C'est moins complet, mais c'est aussi beaucoup moins cher, et suffisant pour le seul besoin documentaire.",
      },
      {
        type: "h2",
        text: "Comment générer ses attestations et certificats de réalisation sans abonnement ?",
      },
      {
        type: "p",
        text: "La méthode s'appelle le publipostage PDF : on relie un modèle PDF fixe (votre attestation, déjà mise en page avec votre logo et vos mentions obligatoires) à un fichier Excel contenant une ligne par stagiaire. Chaque colonne du tableur (nom, dates, résultat de l'évaluation, durée) est associée à un emplacement sur le modèle, et un clic génère un PDF par ligne, nommé automatiquement, livré dans un dossier prêt à distribuer ou à archiver.",
      },
      {
        type: "p",
        text: "C'est exactement ce que fait InOneShot. Vous importez votre modèle d'attestation ou de certificat de réalisation déjà validé, vous placez les champs par glisser-déposer (y compris la date du jour et une image de signature), vous liez le fichier Excel de votre promotion, et vous générez la totalité du lot en une fois. La licence coûte 39 € en paiement unique, sans abonnement : pour un organisme qui produit des attestations quelques fois par an, l'écart avec une suite de gestion facturée chaque mois est net.",
      },
      {
        type: "ul",
        items: [
          "Un seul modèle PDF, préparé une fois pour toutes les sessions futures.",
          "Un fichier Excel par session, exporté de votre outil d'inscription existant ou simplement tenu à jour.",
          "Une génération en un clic : un PDF par stagiaire, nommé automatiquement (nom, date, ou numéro de dossier).",
          "Aucun abonnement, aucun engagement, le modèle se réutilise à l'identique pour la session suivante.",
        ],
      },
      {
        type: "p",
        text: "Ce n'est pas un logiciel de gestion Qualiopi : InOneShot ne suit pas vos 32 indicateurs, ne gère pas vos inscriptions ni votre facturation. C'est un outil qui répond précisément au besoin documentaire, celui qui revient à chaque fin de session, sans vous faire payer pour des fonctionnalités de gestion dont vous n'avez pas l'usage.",
      },
      { type: "h2", text: "Pourquoi les données de vos stagiaires ne devraient-elles pas quitter votre poste ?" },
      {
        type: "p",
        text: "Un fichier d'inscription de formation contient des données personnelles au sens du RGPD : nom, coordonnées, parfois des informations sur le poste occupé ou l'employeur. Le téléverser vers un service en ligne pour générer des attestations crée un transfert de données à documenter dans votre registre des traitements, avec un sous-traitant supplémentaire à identifier et à auditer.",
      },
      {
        type: "p",
        text: "InOneShot traite tout en local, sur votre ordinateur : le fichier Excel de vos stagiaires et les PDF générés ne transitent par aucun serveur. Pour un organisme de formation qui doit déjà justifier sa conformité RGPD lors d'un audit Qualiopi, c'est une case de moins à cocher, et une source de risque en moins à expliquer.",
      },
      { type: "h2", text: "Questions fréquentes" },
      { type: "h2", text: "L'attestation de formation est-elle obligatoire pour être certifié Qualiopi ?" },
      {
        type: "p",
        text: "Non, pas en tant que telle. Depuis la loi Avenir professionnel de 2018, l'attestation de formation remise au stagiaire n'est plus une obligation légale autonome. Le document réellement exigé par les financeurs est le certificat de réalisation. En pratique, la plupart des organismes continuent de délivrer une attestation, car elle est un élément de preuve cohérent avec les indicateurs du Référentiel National Qualité liés à l'évaluation des acquis.",
      },
      { type: "h2", text: "Quelle est la différence entre attestation de formation et certificat de réalisation ?" },
      {
        type: "p",
        text: "Le certificat de réalisation est adressé au financeur (OPCO, CPF, France Travail) et atteste que l'action de formation a eu lieu, avec ses dates et sa durée. L'attestation de formation est remise au stagiaire et porte sur les compétences travaillées et les résultats de l'évaluation. Les deux documents sont souvent demandés ensemble lors d'un audit Qualiopi et gagnent à être générés à partir du même fichier de session, pour rester parfaitement cohérents entre eux.",
      },
      { type: "h2", text: "Un formateur indépendant a-t-il besoin d'un logiciel de gestion Qualiopi complet ?" },
      {
        type: "p",
        text: "Pas nécessairement. Les suites de gestion Qualiopi sont conçues pour couvrir l'ensemble du processus qualité (indicateurs, inscriptions, facturation, suivi pédagogique), ce qui a du sens pour un organisme avec plusieurs formateurs et un volume important de sessions. Pour un formateur indépendant qui anime quelques sessions par mois, un abonnement mensuel peut représenter un coût disproportionné au regard du seul besoin réel : produire des documents fiables et cohérents à chaque fin de session.",
      },
      { type: "h2", text: "Peut-on ajouter une signature ou un QR code sur une attestation générée automatiquement ?" },
      {
        type: "p",
        text: "Oui. Un outil de publipostage PDF comme InOneShot permet de placer, en plus des champs texte issus du tableur, une image de signature et un QR code (par exemple vers un lien de vérification du certificat ou vers l'avis de satisfaction) directement sur le modèle, au même titre que n'importe quel autre champ.",
      },
      { type: "h2", text: "Comment garder la cohérence entre convocation, émargement et attestation ?" },
      {
        type: "p",
        text: "En partant du même fichier Excel pour les trois documents. Si la convocation, la feuille d'émargement et l'attestation sont toutes générées à partir de la même ligne de données par stagiaire, les noms, dates et durées restent identiques d'un document à l'autre, ce qui évite les incohérences qui posent problème lors d'un audit.",
      },
      {
        type: "p",
        text: "Que vous soyez formateur indépendant ou responsable qualité dans un petit organisme, le besoin documentaire d'une fin de session n'exige pas nécessairement un abonnement mensuel. Un modèle PDF préparé une fois, un fichier Excel par session, et un outil de publipostage local suffisent à produire des attestations et des certificats de réalisation fiables, cohérents entre eux, et sans faire transiter les données de vos stagiaires par un serveur tiers.",
      },
      { type: "h2", text: "Pour aller plus loin" },
      {
        type: "p",
        text: "À lire aussi : [produire contrats, convocations et badges](/blog/publipostage-rh-contrats-convocations-badges) ; [générer des centaines de PDF personnalisés depuis un Excel](/blog/publipostage-pdf-depuis-excel) ; [préparer son fichier Excel sans erreur](/blog/preparer-fichier-excel-publipostage) ; [traiter un publipostage PDF en local plutôt qu'en ligne](/blog/publipostage-pdf-local-vs-en-ligne).",
      },
    ],
  }),
  make({
    slug: "how-to-generate-training-certificates-without-management-software",
    altLangSlug: "comment-generer-attestations-formation-qualiopi-sans-logiciel-gestion",
    title: "How Do You Generate Training Certificates Without Paying for Full Management Software?",
    description:
      "Certificates of completion, attendance records, invitations: here's how a small training provider or independent trainer can batch-produce these documents without subscribing to a full training-management suite.",
    date: "2026-09-28",
    author: "InOneShot Team",
    lang: "en",
    related: { to: "/attestations-rh", label: "See the dedicated HR documents page" },
    content: [
      {
        type: "p",
        text: "Every training provider produces the same small batch of documents at the end of each session: an invitation, an attendance sheet, and a certificate of completion for each participant. These can be generated in bulk from a spreadsheet and a PDF template, without subscribing to a full training-management platform billed every month.",
      },
      {
        type: "p",
        text: "If you run a small training business or work as an independent trainer, you know the moment: a session ends, and you need to produce fifteen, thirty or fifty certificates, one per participant, each with the right name and dates. Doing this by hand in a word processor is slow and error-prone. Subscribing to a full management suite for $80 to $150 a month just for this one need is often disproportionate, especially if you only run a handful of sessions per month.",
      },
      { type: "h2", text: "What documents does a training session actually require?" },
      {
        type: "p",
        text: "A training session always produces the same small set of nominative documents, whatever the subject: an invitation sent beforehand, an attendance record signed during the session, and a certificate of completion handed out at the end. Each has a fixed layout, with only a handful of fields that change from one participant to the next — name, dates, duration, and sometimes an assessment result.",
      },
      {
        type: "ul",
        items: [
          "Invitation: participant name, dates, location or connection link.",
          "Attendance record: signed proof of presence for each session day.",
          "Certificate of completion: handed to the participant, describing the skills covered.",
          "For regulated or funded training, a separate proof-of-completion document for the funder.",
        ],
      },
      {
        type: "p",
        text: "On a cohort of thirty participants, that is already close to a hundred documents for a single session. Doing this by copy-pasting invites exactly the kind of mistake that matters on a document with contractual weight: a shifted date, a misspelled name, a certificate that ends up inconsistent with the attendance record for the same person.",
      },
      { type: "h2", text: "Why a full training-management suite isn't always the right fit" },
      {
        type: "p",
        text: "Full training-management platforms exist for good reason: for a mid-sized provider with several trainers and a steady volume of sessions, they structure the entire process — enrollment, invoicing, compliance tracking, and document generation all in one place. If that is your situation, the subscription pays for itself.",
      },
      {
        type: "p",
        text: "The mismatch shows up for smaller setups: an independent trainer, a small business, an association running a handful of sessions a year. These platforms typically bill $50 to $150+ per month, often with an annual commitment, for a tool you would only use a fraction of. Paying for a full suite all year to generate certificates a few times a year is not unreasonable, but it is not the only option either.",
      },
      { type: "h2", text: "How do you generate certificates without a subscription?" },
      {
        type: "p",
        text: "This is what PDF mail merge does: it links a fixed PDF template — your certificate, already laid out with your logo — to a spreadsheet with one row per participant. Each column (name, dates, result) maps to a position on the template, and one click generates one PDF per row, automatically named and delivered ready to send or archive.",
      },
      {
        type: "p",
        text: "That's exactly what InOneShot does. You import your certificate template, place the fields by drag and drop (including today's date and a signature image), link your session spreadsheet, and generate the whole batch at once. The license is a one-time $39, no subscription: for a provider that only produces certificates a few times a year, the gap with a monthly-billed suite is significant. It is not a full Qualiopi-style management tool — it does not track compliance indicators, enrollments, or invoicing. It just solves the recurring document problem, at the end of every session, without paying for management features you won't use.",
      },
      { type: "h2", text: "Why keep participant data off a server?" },
      {
        type: "p",
        text: "A training enrollment file contains personal data: names, contact details, sometimes employer information. Uploading it to an online service to generate certificates creates a data transfer that has to be documented and justified under data protection rules like GDPR. InOneShot processes everything locally — the spreadsheet and the generated PDFs never leave your computer, which removes that question entirely.",
      },
      { type: "h2", text: "Frequently asked questions" },
      { type: "h2", text: "Do I need training-management software as an independent trainer?" },
      {
        type: "p",
        text: "Not necessarily. Full suites make sense for providers with several trainers and a high session volume. For an independent trainer running a few sessions a month, a monthly subscription can cost more than the actual need — reliable, consistent documents at the end of each session.",
      },
      { type: "h2", text: "Can I add a signature or QR code to a generated certificate?" },
      {
        type: "p",
        text: "Yes. A PDF mail merge tool like InOneShot lets you place a signature image and a QR code (for example linking to a verification page) on the template, the same way as any other field from your spreadsheet.",
      },
      { type: "h2", text: "How do I keep the invitation, attendance record and certificate consistent?" },
      {
        type: "p",
        text: "By generating all three from the same spreadsheet. If every document is produced from the same row of data per participant, names, dates and durations stay identical across documents, which avoids the inconsistencies that cause problems during an audit.",
      },
      {
        type: "p",
        text: "Whether you run training sessions solo or manage a small provider, the end-of-session paperwork doesn't require a monthly subscription. A template prepared once, a spreadsheet per session, and a local mail-merge tool are enough to produce certificates that are reliable, consistent with each other, and never send participant data to a third-party server.",
      },
      { type: "h2", text: "Going further" },
      {
        type: "p",
        text: "Related reading: [produce contracts, invitations and badges](/blog/hr-mail-merge-contracts-invitations-badges); [generate hundreds of personalized PDFs from an Excel file](/blog/generate-pdfs-from-excel); [why local processing beats online mail-merge tools](/blog/local-pdf-mail-merge-vs-online).",
      },
    ],
  }),
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
