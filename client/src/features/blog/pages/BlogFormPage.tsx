import { useParams, useNavigate } from "react-router-dom";
import { useBlogPost, useCreateBlogPost, useUpdateBlogPost } from "@/features/blog/hooks/useBlog";
import { BlogPostForm } from "@/features/blog/components/BlogPostForm";
import type { BlogPostFormValues } from "@/features/blog/schemas/blog.schema";
import { ROUTES } from "@/constants/routes.constant";

export function BlogFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: post, isLoading } = useBlogPost(id);
  const createBlogPost = useCreateBlogPost();
  const updateBlogPost = useUpdateBlogPost(id ?? "");

  function handleSubmit(values: BlogPostFormValues) {
    const mutation = isEditMode ? updateBlogPost : createBlogPost;
    mutation.mutate(values, { onSuccess: () => navigate(ROUTES.ADMIN.BLOG) });
  }

  if (isEditMode && isLoading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">{isEditMode ? "Modifier l'article" : "Nouvel article"}</h1>
      <BlogPostForm defaultValues={post} onSubmit={handleSubmit} isSubmitting={createBlogPost.isPending || updateBlogPost.isPending} />
    </div>
  );
}
