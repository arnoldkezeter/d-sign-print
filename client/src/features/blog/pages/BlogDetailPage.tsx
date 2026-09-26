import { useParams, Link } from "react-router-dom";
import { useBlogPostBySlug } from "@/features/blog/hooks/useBlog";
import { ROUTES } from "@/constants/routes.constant";
import { ArrowLeft } from "lucide-react";

export function BlogDetailPage() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useBlogPostBySlug(slug);

  if (isLoading) {
    return <p className="mx-auto max-w-3xl px-4 py-16 text-center text-muted-foreground">Chargement...</p>;
  }

  if (isError || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Cet article est introuvable.</p>
        <Link to={ROUTES.BLOG} className="text-primary hover:underline">
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to={ROUTES.BLOG} className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Tous les articles
      </Link>

      {post.coverImageUrl && (
        <img src={post.coverImageUrl} alt={post.title} className="mb-8 aspect-[16/9] w-full rounded-xl object-cover" />
      )}

      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("fr-FR")} · {post.authorName}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-line dark:prose-invert">{post.content}</div>

      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
