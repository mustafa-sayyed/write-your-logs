import { useState, useEffect } from "react";
import { PostCard, Container } from "../components/index";
import service from "../appwrite/service";
import type { BlogPost } from "../appwrite/service";
import { BookOpen, FileX, Plus, Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function AllPost() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await service.getAllBlogs();
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Spinner className="size-6" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-accent/5">
        <Container className="py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Explore</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">All Posts</h1>
              <p className="text-muted-foreground">
                Browse through {posts.length} published{" "}
                {posts.length === 1 ? "article" : "articles"}
              </p>
            </div>
            {authStatus && (
              <Button asChild className="shrink-0">
                <Link to="/add-post" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Write a Post
                </Link>
              </Button>
            )}
          </div>

          {posts.length > 0 && (
            <div className="mt-8 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <PostCard {...post} key={post.$id} />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search query
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <FileX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to share your story!
              </p>
              {authStatus && (
                <Button asChild>
                  <Link to="/add-post" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create a Post
                  </Link>
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export default AllPost;
