import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import BlogCard from "./BlogCard";
import blogPosts from "./data";

const pb = new PocketBase("https://itrain.services.hodessy.com");

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 6;

  useEffect(() => {
    const fetchCloudBlogs = async () => {
      try {
        const result = await pb.collection("Bloger").getList(page, perPage, {
          sort: "-created",
        });

        // combine cloud + local blogs if needed
        setBlogs([...result.items]);

        setTotalPages(result.totalPages);

      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs(blogPosts);
      }
    };

    fetchCloudBlogs();
  }, [page]);

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-20 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </section>
  );
};

export default BlogSection;