import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/service";
import type { BlogPost } from "../appwrite/service";
import { Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Info, Pencil, Share2, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function Post() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchPost = async () => {
      if (id) {
        try {
          const fetchedPost = await service.getBlog(id);
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          navigate("/");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/");
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async () => {
    if (!post) return;
    const status = await service.deleteBlogs(post.$id);
    if (status) {
      await service.deleteFile(post.image);
      navigate("/");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Spinner className="size-6" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  const isAuthorised = post && userData ? post.userId === userData.$id : false;

  return post ?
      <div className="min-h-screen">
        {post.image && (
          <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden bg-muted">
            <img
              src={service.getPreview(post.image)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        )}

        <Container>
          <article className="max-w-3xl mx-auto">
            <div className={`${post.image ? "-mt-20 relative z-10" : "pt-8"} mb-6`}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to posts
              </Link>
            </div>

            <header className={`${post.image ? "" : ""} mb-8`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {post.$createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.$createdAt)}
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </header>

            {isAuthorised && (
              <div className="flex flex-wrap gap-3 mb-8 p-4 bg-card rounded-xl border border-border/60 shadow-sm">
                <p className="flex-1 flex items-center text-sm text-muted-foreground">
                  <Info size={16} className="mr-2 text-primary" />
                  You are the author of this post
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      to={`/edit-blog/${post.$id}`}
                      className="flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    onClick={deletePost}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            <div className="mb-12">
              <div className="bg-card wrap-break-word rounded-lg p-6 md:p-10 prose dark:prose-invert max-w-none prose-ol:flex prose-ol:flex-col prose-ol:gap-1 prose-ul:flex prose-ul:flex-col prose-li:my-0.5 [&_li_p]:m-0">
                {parse(String(post.content))}
              </div>
            </div>
          </article>
        </Container>
      </div>
    : null;
}

export default Post;
