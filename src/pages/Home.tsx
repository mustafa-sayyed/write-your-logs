import { useState, useEffect } from "react";
import service from "../appwrite/service";
import { Button, Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image, NotebookTextIcon, Pencil, Plus, Share2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const allpost = await service.getAllBlogs();
        if (allpost) {
          setPosts(allpost.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Spinner className="size-6" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen">
        <Container>
          <div className="py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                <NotebookTextIcon />
              </div>

              <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-4">
                Welcome to{" "}
                <span className="text-primary italic">
                  Write Your Thoughts
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Your space to share ideas, stories, and connect with readers around the
                world.
              </p>

              {authStatus ?
                <Button className="w-fit p-3 px-6">
                  <Link to="/add-post" className="flex items-center gap-2">
                    <Plus />
                    Create Your First Post
                  </Link>
                </Button>
              : <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="w-fit p-3 px-6">
                    <Link to="/login">Sign In to Start</Link>
                  </Button>

                  <Button className="w-fit p-3 px-6">
                    <Link to="/signup">Create Account</Link>
                  </Button>
                </div>
              }
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            <div className="bg-card border border-border hover:border-muted-foreground rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <Pencil />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Easy Writing
              </h3>
              <p className="text-muted-foreground text-sm">
                Rich text editor to bring your stories to life
              </p>
            </div>

            <div className="bg-card border border-border hover:border-muted-foreground rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Image />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Media Support
              </h3>
              <p className="text-muted-foreground text-sm">
                Add images to make your posts stand out
              </p>
            </div>

            <div className="bg-card border border-border hover:border-muted-foreground rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                <Share2 />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Share & Connect
              </h3>
              <p className="text-muted-foreground text-sm">
                Share your posts with readers worldwide
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Latest Posts</h1>
          <p className="text-muted-foreground mt-1">Discover stories, ideas, and expertise</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
