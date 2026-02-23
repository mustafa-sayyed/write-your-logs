import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/service";
import type { BlogPost } from "../appwrite/service";
import { Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Pencil, Trash2 } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  const isAuthorised = post && userData ? post.userId === userData.$id : false;

  return post ?
      <div className="min-h-screen py-8">
        <Container>
          <article className="max-w-4xl mx-auto">
            <div className="mb-8 text-left ">
              <Link
                to="/"
                className="flex w-fit font-light text-sm items-center gap-2 hover:text-primary"
              >
                <ArrowLeft size={16} />
                Back to all posts
              </Link>
            </div>

            <h1 className="text-2xl mb-4 capitalize font-semibold md:text-4xl drop-shadow-lg">
              {post.title}
            </h1>
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
              <img
                src={service.getPreview(post.image)}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>

            {isAuthorised && (
              <div className="flex flex-wrap gap-3 mb-8 p-4 bg-card rounded-xl border border-border">
                <p className="flex-1 flex items-center text-sm text-muted-foreground">
                  <Info size={16} className="mr-2" />
                  You are the author of this post
                </p>
                <Link to={`/edit-blog/${post.$id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Pencil />
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer flex items-center gap-2 hover:text-red-200"
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
            )}

            <div className="bg-card mb-10 border border-border rounded-2xl p-6 md:p-10 shadow-lg">
              <div>{parse(String(post.content))}</div>
            </div>
          </article>
        </Container>
      </div>
    : null;
}

export default Post;
