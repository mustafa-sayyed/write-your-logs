import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Button, Input, Select } from "../index";
import service from "../../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pencil, Plus } from "lucide-react";

function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
      if (file) {
        service.deleteFile(post.image);
      }
      const dbPost = await service.updateBlogs({
        ...data,
        image: file ? file.$id : null,
        userId: userData.userId, // TODO: Check
        blogId: post.$id,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

      const dbPost = await service.createBlogs({
        userId: userData.$id, // TODO: Check
        ...data,
        image: file.$id,
      });

      if (dbPost) {
        navigate(`/blog/${dbPost.blogId}`);
      } else {
        console.log("error ");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return "";
  });

  useEffect(() => {
    reset({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    });
    setValue("slug", slugTransform(post?.title || ""));
  }, [post, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {post ? "Edit Your Post" : "Create New Post"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {post ? "Update your post details below" : "Share your thoughts with the world"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="text"
            label="Title"
            placeholder="Enter an engaging title"
            {...register("title", { required: true })}
          />
          <Input
            type="text"
            label="Slug"
            placeholder="auto-generated-slug"
            {...register("slug", { required: true })}
            onInput={(e) => setValue("slug", slugTransform(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Content
          </label>
          <div className="rounded-lg overflow-hidden border border-border">
            <RTE
              control={control}
              defaultValues={getValues("content")}
              name={"content"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Featured Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="
                  w-full px-4 py-2
                  bg-background text-foreground
                  border-2 border-border
                  rounded-lg
                  cursor-pointer
                  transition-all duration-fast
                  hover:border-primary hover:bg-primary/5
                  file:mr-4 file:py-1 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary file:text-primary-foreground
                  file:cursor-pointer file:transition-all"
                {...register("image", {
                  required: !post,
                })}
              />
            </div>
          </div>

          <Select
            label="Status"
            options={["active", "inactive"]}
            {...register("status", { required: true })}
          />
        </div>

        {post && post.image && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Current Image
            </label>
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
              <img
                src={service.getPreview(post.image)}
                alt={post.title}
                className="w-full max-h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            className="w-fit px-8 py-2"
          >
            <span className="flex items-center gap-2">
              {post ?
                <div className="flex items-center gap-2">
                  <Pencil />
                  Update Post
                </div>
              : <div className="flex items-center gap-2">
                  <Plus />
                  Publish Post
                </div>
              }
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
