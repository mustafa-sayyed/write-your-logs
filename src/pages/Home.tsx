import { useState, useEffect } from "react";
import service from "../appwrite/service";
import type { BlogPost } from "../appwrite/service";
import { Button, Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  Pencil,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { RootState } from "@/store/store";

function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

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
        <div className="flex items-center gap-3">
          <Spinner className="size-6" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <Container className="relative py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Your personal blog platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Write, Share &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Inspire
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Your space to share ideas, tell stories, and connect with readers
                around the world. Start your blogging journey today.
              </p>

              {authStatus ? (
                <Button size="lg" asChild className="group">
                  <Link to="/add-post" className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Your First Post
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="group">
                    <Link to="/signup" className="flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      Sign In
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </section>

        <section className="py-20 border-t border-border/40">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Why Write Your Logs?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to create, publish, and grow your blog.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Pencil className="w-6 h-6" />}
                title="Rich Editor"
                description="Powerful editor with formatting, images, and more"
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6" />}
                title="Fast & Secure"
                description="Lightning fast with enterprise-grade security"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="Build Audience"
                description="Connect with readers who love your content"
              />
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Grow Together"
                description="Analytics and insights to track your progress"
              />
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default Home;
