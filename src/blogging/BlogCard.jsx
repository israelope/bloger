import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, category, date, title, description, imageUrl, mainImage }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm overflow-hidden bg-white">
      
      {/* Image Section */}
      <div className="relative h-64 w-full">
        <img 
          src={imageUrl || mainImage} 
          alt={title} 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="py-6">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
          IN <span className="text-black">{category}</span> ON {date}
        </p>
        
        <h2 className="mt-4 text-3xl font-serif leading-tight text-gray-900">
          {title}
        </h2>
        
        <p className="mt-4 text-gray-600 line-clamp-3">
          {description}
        </p>

        <button
          onClick={() => navigate(`/blog/${id}`)}
          className="mt-8 px-8 py-3 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
