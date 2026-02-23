import { Container } from "../components/index";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components";
import service from "../appwrite/service";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

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
  }, [navigate, id]);

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

  return post ? (
    <div className="min-h-screen py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
