import { useState } from "react";
import { Link } from "react-router-dom";
import { usePublicBlogPosts } from "@/features/blog/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constant";

export function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePublicBlogPosts({ page, limit: 9 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Actualités &amp; conseils</h1>
        <p className="mt-4 text-muted-foreground">
          Tendances design, astuces impression et actualités de D-Sign Print.
        </p>
      </div>

      {isLoading ? (
        <p className="mt-12 text-center text-muted-foreground">Chargement...</p>
      ) : data && data.data.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((post) => (
            <Link
              key={post._id}
              to={ROUTES.BLOG_DETAIL(post.slug)}
              className="group overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-lg"
            >
              {post.coverImageUrl && (
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-primary">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("fr-FR")} · {post.authorName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">Aucun article publié pour le moment.</p>
      )}

      {data && data.meta.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {data.meta.page} / {data.meta.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page === data.meta.totalPages} onClick={() => setPage((p) => p + 1)}>
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}
