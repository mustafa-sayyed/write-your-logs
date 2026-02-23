import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/service";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
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
  }, [id, navigate]);

  const deletePost = async () => {
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

  return post ? (
    <div className="min-h-screen py-8">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
            <img 
              src={service.getPreview(post.image)} 
              alt={post.title} 
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Author Actions */}
          {isAuthorised && (
            <div className="flex flex-wrap gap-3 mb-8 p-4 bg-card rounded-xl border border-border">
              <p className="flex-1 flex items-center text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                You are the author of this post
              </p>
              <Link to={`/edit-blog/${post.$id}`}>
                <Button 
                  variant="success" 
                  fullWidth={false} 
                  size="sm"
                  className="gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Button>
              </Link>
              <Button 
                onClick={deletePost} 
                variant="danger" 
                fullWidth={false} 
                size="sm"
                className="gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
            </div>
          )}

          {/* Content */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
            <div className="prose prose-lg max-w-none text-foreground
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-a:text-primary hover:prose-a:text-primary-hover
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-foreground/90 prose-ol:text-foreground/90
              prose-blockquote:border-l-primary prose-blockquote:text-foreground/80
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
            ">
              {parse(String(post.content))}
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors duration-fast font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}

export default Post;
