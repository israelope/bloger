import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import blogPosts from "./data";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://itrain.services.hodessy.com");

const Info = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nav, setNav] = useState({ prev: null, next: null });

  useEffect(() => {
    const fetchBlogAndNav = async () => {
      setLoading(true);
      try {
        const cloudRecords = await pb.collection("Bloger").getFullList({
          sort: "-created",
        });
        const allBlogs = [...cloudRecords, ...blogPosts];
        const currentIndex = allBlogs.findIndex(
          (b) => String(b.id) === String(id),
        );

        if (currentIndex !== -1) {
          setBlog(allBlogs[currentIndex]);
          setNav({
            prev: allBlogs[currentIndex - 1] || null,
            next: allBlogs[currentIndex + 1] || null,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndNav();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-2xl font-serif">Loading...</div>
    );
  if (!blog)
    return (
      <div className="text-center py-20 text-2xl font-serif">
        Blog Not Found
      </div>
    );

  return (
    <>
      <Navbar />


      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm">
          {blog.author} • {blog.date}
        </p>
        <h1 className="text-3xl md:text-5xl font-serif mt-4 leading-tight">
          {blog.title}
        </h1>
      </div>


      <div className="w-full">
        <img
          src={blog.imageUrl || blog.mainImage}
          alt={blog.title}
          className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
        />
      </div>


      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6 md:space-y-10">
        {blog.subTitle && (
          <h2 className="text-xl md:text-3xl font-serif text-gray-800 text-center italic border-b pb-6">
            {blog.subTitle}
          </h2>
        )}

        {blog.sections?.map((section, index) => {
          if (section.type === "paragraph") {
            return (
              <p
                key={index}
                className="text-base md:text-lg leading-relaxed text-gray-700"
              >
                {section.content}
              </p>
            );
          }
          if (section.type === "image") {
            return (
              <div key={index} className="py-4 md:py-8 text-center">
                <img
                  src={section.src}
                  alt={section.label}
                  className="mx-auto rounded-lg shadow-md max-w-full h-auto"
                />
                {section.label && (
                  <p className="text-xs md:text-sm text-gray-400 mt-3 italic">
                    {section.label}
                  </p>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>


      <div className="border-t border-b py-8 md:py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 sm:gap-4">
          {nav.prev ? (
            <Link
              to={`/blog/${nav.prev.id}`}
              className="group w-full sm:max-w-[45%]"
            >
              <p className="text-[10px] md:text-xs text-gray-400 uppercase mb-1 tracking-widest">
                ← Previous
              </p>
              <h4 className="font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 sm:line-clamp-1">
                {nav.prev.title}
              </h4>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nav.next ? (
            <Link
              to={`/blog/${nav.next.id}`}
              className="group w-full sm:max-w-[45%] text-left sm:text-right"
            >
              <p className="text-[10px] md:text-xs text-gray-400 uppercase mb-1 tracking-widest">
                Next →
              </p>
              <h4 className="font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 sm:line-clamp-1">
                {nav.next.title}
              </h4>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Info;
