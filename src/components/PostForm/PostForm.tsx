import { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { RTE } from "../index";
import service from "../../appwrite/service";
import type { BlogPost } from "../../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pencil, Send, Loader2, ImagePlus, X, Trash2 } from "lucide-react";
import type { RootState } from "@/store/store";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";

interface PostFormProps {
  post?: BlogPost;
}

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  status: string;
}

function PostForm({ post }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(post?.status === "active" || !post);
  const [featuredImage, setFeaturedImage] = useState<{
    fileId: string;
    previewUrl: string;
  } | null>(null);
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false);
  const featuredInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, watch, setValue, getValues, reset } =
    useForm<PostFormData>({
      defaultValues: {
        title: post?.title || "",
        slug: "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    if (post?.image) {
      setFeaturedImage({
        fileId: post.image,
        previewUrl: service.getPreview(post.image) || "",
      });
    }
  }, [post]);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFeatured(true);
    try {
      const uploadedFile = await service.uploadFile(file);
      if (uploadedFile) {
        if (featuredImage?.fileId && featuredImage.fileId !== post?.image) {
          await service.deleteFile(featuredImage.fileId);
        }
        setFeaturedImage({
          fileId: uploadedFile.$id,
          previewUrl: service.getPreview(uploadedFile.$id) || "",
        });
      }
    } catch (error) {
      console.error("Failed to upload featured image:", error);
    } finally {
      setIsUploadingFeatured(false);
      if (featuredInputRef.current) {
        featuredInputRef.current.value = "";
      }
    }
  };

  const removeFeaturedImage = async () => {
    if (featuredImage?.fileId && featuredImage.fileId !== post?.image) {
      await service.deleteFile(featuredImage.fileId);
    }
    setFeaturedImage(null);
  };

  const handleImageUpload = async (file: File): Promise<string | undefined> => {
    const uploadedFile = await service.uploadFile(file);
    if (uploadedFile) {
      return service.getPreview(uploadedFile.$id);
    }
    return undefined;
  };

  const submit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const postData = {
        ...data,
        status: isActive ? "active" : "inactive",
        image: featuredImage?.fileId || "",
      };

      if (post) {
        if (post.image && featuredImage?.fileId !== post.image) {
          await service.deleteFile(post.image);
        }
        const dbPost = await service.updateBlogs({
          ...postData,
          userId: userData?.$id || "",
          blogId: post.$id,
        });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
        const dbPost = await service.createBlogs({
          userId: userData?.$id || "",
          ...postData,
        });

        if (dbPost) {
          navigate(`/blog/${dbPost.blogId}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value: string | undefined): string => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    reset({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    });
    setValue("slug", slugTransform(post?.title || ""));
    setIsActive(post?.status === "active" || !post);
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
    <div className="min-h-screen">

      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">
              {post ? "Edit Post" : "New Post"}
            </h1>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="status" />
              <label
                htmlFor="status"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {isActive ? "Public" : "Draft"}
              </label>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleSubmit(submit)}
            disabled={isSubmitting}
            className="px-4 w-fit flex items-center gap-2"
          >
            {isSubmitting ?
              <Loader2 className="w-4 h-4 animate-spin" />
            : post ?
              <Pencil className="w-4 h-4" />
            : <Send className="w-4 h-4" />}

            {post ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(submit)} className="space-y-6">

          <div>
            <input
              type="text"
              placeholder="Article title..."
              {...register("title", { required: true })}
              className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 text-foreground"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Slug:</span>
            <input
              type="text"
              {...register("slug", { required: true })}
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                setValue("slug", slugTransform((e.target as HTMLInputElement).value))
              }
              className="bg-transparent border-none outline-none text-muted-foreground flex-1"
            />
          </div>

          <div>
            <input
              ref={featuredInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              onChange={handleFeaturedImageUpload}
              className="hidden"
            />

            {featuredImage ?
              <div className="relative group">
                <img
                  src={featuredImage.previewUrl}
                  alt="Featured image"
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    onClick={() => featuredInputRef.current?.click()}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    Change Image
                  </Button>
                  <Button
                    type="button"
                    onClick={removeFeaturedImage}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            : <button
                type="button"
                onClick={() => featuredInputRef.current?.click()}
                disabled={isUploadingFeatured}
                className="w-full h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-muted/30 transition-colors cursor-pointer"
              >
                {isUploadingFeatured ?
                  <>
                    <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
                    <span className="text-muted-foreground">Uploading...</span>
                  </>
                : <>
                    <ImagePlus className="w-10 h-10 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-muted-foreground font-medium">
                        Add a cover image
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        Click to upload
                      </p>
                    </div>
                  </>
                }
              </button>
            }
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <RTE
              control={control}
              defaultValues={getValues("content")}
              name="content"
              onImageUpload={handleImageUpload}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
