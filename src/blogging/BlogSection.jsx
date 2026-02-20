import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';
import BlogCard from "./BlogCard";
import blogPosts from "./data"; 

const pb = new PocketBase('https://itrain.services.hodessy.com');

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchCloudBlogs = async () => {
      try {
        const records = await pb.collection('Bloger').getFullList({
          sort: '-created',
        });
        setBlogs([...records, ...blogPosts]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs(blogPosts);
      }
    };

    fetchCloudBlogs();
  }, []);

  return (

    <section className="container mx-auto px-6 md:px-12 lg:px-20 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {blogs.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
      
    </section>
  );
};

export default BlogSection;