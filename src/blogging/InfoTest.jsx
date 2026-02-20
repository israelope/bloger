import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import blogPosts from "./data";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Info = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(pb.collection('Bloger').getOne(id)) || [];

    const combinedBlogs = [...blogPosts, ...storedBlogs];

    setBlogs(combinedBlogs);
  }, []);

  const blogIndex = blogs.findIndex((post) => post.id == id);
  const blog = blogs[blogIndex];

  if (!blog) return <div>Not found</div>;

  const prevBlog = blogs[blogIndex - 1];
  const nextBlog = blogs[blogIndex + 1];

  return (
    <>
      <Navbar />

      <div className="text-center max-w-3xl mx-auto px-6 py-10">
        <p className="text-gray-500">
          {blog.author} • {blog.date}
        </p>
        <h1 className="text-5xl font-serif mt-4">{blog.title}</h1>
      </div>

      <div className="w-full">
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {blog.subTitle && (
          <h2 className="text-2xl font-serif text-gray-700 text-center">
            {blog.subTitle}
          </h2>
        )}

        {blog.sections?.map((section, index) => {
          if (section.type === "paragraph") {
            return (
              <p key={index} className="text-lg leading-8">
                {section.content}
              </p>
            );
          }

          if (section.type === "image") {
            return (
              <div key={index} className="text-center">
                <img src={section.src} alt="" className="mx-auto" />
                <p className="text-sm text-gray-500 mt-2">{section.label}</p>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="border-t py-10 px-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          {prevBlog ? (
            <div>
              <p className="text-sm text-gray-500">Previous</p>
              <h3>{prevBlog.title}</h3>
            </div>
          ) : (
            <div />
          )}

          {nextBlog ? (
            <div className="text-right">
              <p className="text-sm text-gray-500">Next</p>
              <h3>{nextBlog.title}</h3>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Info;
