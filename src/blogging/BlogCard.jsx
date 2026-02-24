import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, category, date, title, description, imageUrl, mainImage }) => {
  const navigate = useNavigate();

  const displayImage = imageUrl || mainImage;

  return (

    <div className="w-full overflow-hidden bg-white flex flex-col h-full border-b md:border-none pb-8 md:pb-0">
      
      {/* Image Section - Scaled for different devices */}
      <div 
        className="relative h-56 sm:h-64 lg:h-72 w-full cursor-pointer overflow-hidden group"
        onClick={() => navigate(`/blog/${id}`)}
      >
        <img 
          src={displayImage || "https://via.placeholder.com/400x300?text=No+Image"} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {/* Mobile Category Tag Overlay */}
        <div className="absolute top-4 left-4 md:hidden bg-white px-3 py-1 text-[10px] font-bold tracking-widest">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="py-6 grow flex flex-col">
        <p className="hidden md:block text-xs font-bold tracking-widest uppercase text-gray-400">
          IN <span className="text-black">{category}</span> ON {date}
        </p>
        
        <h2 className="mt-2 md:mt-4 text-2xl md:text-3xl font-serif leading-tight text-gray-900 line-clamp-2">
          {title}
        </h2>
        
        <p className="mt-4 text-gray-600 line-clamp-3 text-sm md:text-base grow">
          {description}
        </p>

        <div className="mt-6 md:mt-8">
          <button
            onClick={() => navigate(`/blog/${id}`)}
            className="w-full md:w-auto px-8 py-3 border border-black rounded-full text-xs md:text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;