import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/service";

function PostCard({ $id, title, image }) {
  return (
    <Link to={`/blog/${$id}`} className="group block">
      <article className="bg-background rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-normal hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={service.getPreview(image)} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-normal group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal"></div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-fast">
            {title}
          </h2>
          
          {/* Read More Indicator */}
          <div className="mt-3 flex items-center gap-2 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-fast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
