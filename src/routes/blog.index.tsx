import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { posts, type BlogPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — InOneShot" },
      {
        name: "description",
        content:
          "Conseils, tutoriels et guides sur le publipostage PDF, la génération de documents en masse et l'automatisation, par l'équipe InOneShot.",
      },
      { property: "og:title", content: "Blog — InOneShot" },
      {
        property: "og:description",
        content: "Conseils et tutoriels sur le publipostage PDF par l'équipe InOneShot.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.inoneshot.fr/blog" }],
  }),
  component: BlogIndex,
});

const byDateDesc = (a: BlogPost, b: BlogPost) => b.date.localeCompare(a.date);

function PostCard({ post }: { post: BlogPost }) {
  const fr = post.lang === "fr";
  return (
    <li>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block rounded-xl border border-border/60 bg-card p-6 transition hover:border-primary/60 hover:bg-card/80"
      >
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time>
            {new Date(post.date).toLocaleDateString(fr ? "fr-FR" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime} {fr ? "min de lecture" : "min read"}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h3>
        <p className="mt-2 text-muted-foreground">{post.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          {fr ? "Lire l'article" : "Read the article"} <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </li>
  );
}

function BlogIndex() {
  const frPosts = posts.filter((p) => p.lang === "fr").sort(byDateDesc);
  const enPosts = posts.filter((p) => p.lang === "en").sort(byDateDesc);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>

        <header className="mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Conseils et tutoriels pour produire vos PDF plus vite, sans copier-coller.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            En français
          </h2>
          <ul className="space-y-6">
            {frPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            In English
          </h2>
          <ul className="space-y-6">
            {enPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
