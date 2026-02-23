import { Link } from "react-router-dom";
import service from "../appwrite/service";
import { ChevronRight } from "lucide-react";

interface PostCardProps {
  $id: string;
  title: string;
  image: string;
}

function PostCard({ $id, title, image }: PostCardProps) {
  return (
    <Link to={`/blog/${$id}`} className="group block">
      <article className="bg-background rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-normal hover:-translate-y-1">

        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={service.getPreview(image)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-normal group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg capitalize font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-fast">
            {title.slice(0, 60) + (title.length > 60 ? "..." : "")}
          </h2>

          <div className="mt-3 flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
            <span>Read more</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
