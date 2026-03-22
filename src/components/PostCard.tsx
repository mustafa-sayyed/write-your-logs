import { Link } from "react-router-dom";
import service from "../appwrite/service";
import { ArrowUpRight, Calendar, FileText } from "lucide-react";

interface PostCardProps {
  $id: string;
  title: string;
  image?: string;
  $createdAt?: string;
}

function PostCard({ $id, title, image, $createdAt }: PostCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link to={`/blog/${$id}`} className="group block h-full">
      <article className="h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {image ? (
            <img
              src={service.getPreview(image)}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
              <FileText className="w-16 h-16 text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col flex-1 p-5">
          {$createdAt && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate($createdAt)}
            </div>
          )}

          <h2 className="text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 flex-1">
            {title}
          </h2>

          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read article
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
