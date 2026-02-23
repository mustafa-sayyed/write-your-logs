import React from "react";
import { PostForm, Container } from "../components/index";

function AddPost() {
  return (
    <div className="min-h-screen py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
