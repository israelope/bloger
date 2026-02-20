import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';
import BlogCard from "./BlogCard";
import blogPosts from "./data"; // Your existing static posts

const pb = new PocketBase('https://itrain.services.hodessy.com');

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchCloudBlogs = async () => {
      try {
        // Fetch all records from 'Bloger', newest first
        const records = await pb.collection('Bloger').getFullList({
          sort: '-created',
        });
        
        // Merge static posts with cloud posts
        // Cloud posts will appear at the top
        setBlogs([...records, ...blogPosts]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to static data if the cloud fetch fails
        setBlogs(blogPosts);
      }
    };

    fetchCloudBlogs();
  }, []);

  return (
    <section className="container mx-auto px-32 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;