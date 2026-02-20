import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import blogPosts from "./data";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://itrain.services.hodessy.com');

const Info = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState({ prev: null, next: null });

  useEffect(() => {
    const fetchBlogAndNav = async () => {
      setLoading(true);
      try {
        // 1. Fetch all cloud blogs
        const cloudRecords = await pb.collection('Bloger').getFullList({
          sort: '-created',
        });

        // 2. Combine with static data
        const allBlogs = [...cloudRecords, ...blogPosts];

        // 3. Find the current blog and its position in the list
        const currentIndex = allBlogs.findIndex((b) => String(b.id) === String(id));

        if (currentIndex !== -1) {
          setBlog(allBlogs[currentIndex]);
          // 4. Set Navigation based on the index
          setNav({
            prev: allBlogs[currentIndex - 1] || null,
            next: allBlogs[currentIndex + 1] || null
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndNav();
  }, [id]); // Reload whenever the ID in the URL changes

  if (loading) return <div className="text-center py-20 text-2xl font-serif">Loading...</div>;
  if (!blog) return <div className="text-center py-20 text-2xl font-serif">Blog Not Found</div>;

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto px-6 py-10">
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          {blog.author} • {blog.date}
        </p>
        <h1 className="text-5xl font-serif mt-4 leading-tight">{blog.title}</h1>
      </div>

      {/* Main Image */}
      <div className="w-full">
        <img
          src={blog.imageUrl || blog.mainImage} 
          alt={blog.title}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {blog.subTitle && (
          <h2 className="text-3xl font-serif text-gray-800 text-center italic border-b pb-6">
            {blog.subTitle}
          </h2>
        )}

        {blog.sections?.map((section, index) => {
          if (section.type === "paragraph") {
            return (
              <p key={index} className="text-lg leading-relaxed text-gray-700">
                {section.content}
              </p>
            );
          }
          if (section.type === "image") {
            return (
              <div key={index} className="py-6 text-center">
                <img src={section.src} alt={section.label} className="mx-auto rounded-lg shadow-md" />
                {section.label && <p className="text-sm text-gray-400 mt-3 italic">{section.label}</p>}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Navigation Section */}
      <div className="border-t border-b py-10 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          {nav.prev ? (
            <Link to={`/blog/${nav.prev.id}`} className="group max-w-[45%]">
              <p className="text-xs text-gray-400 uppercase mb-1 tracking-widest">← Previous</p>
              <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                {nav.prev.title}
              </h4>
            </Link>
          ) : <div />}

          {nav.next ? (
            <Link to={`/blog/${nav.next.id}`} className="group max-w-[45%] text-right">
              <p className="text-xs text-gray-400 uppercase mb-1 tracking-widest">Next →</p>
              <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                {nav.next.title}
              </h4>
            </Link>
          ) : <div />}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Info;