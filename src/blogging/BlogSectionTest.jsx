import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import blogPosts from "./data";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // Merge static + admin blogs
    const combinedBlogs = [...blogPosts, ...storedBlogs];

    setBlogs(combinedBlogs);
  }, []);

  return (
    <section className="container mx-auto px-30 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
