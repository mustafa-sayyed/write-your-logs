import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../components/index";
import service from "../appwrite/service";
import { NotebookTextIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Posts</h1>
          <p className="text-muted-foreground mt-1">Browse through all published articles</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard {...post} key={post.$id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <NotebookTextIcon />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No posts yet</h2>
            <p className="text-muted-foreground">Be the first to share your story!</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
