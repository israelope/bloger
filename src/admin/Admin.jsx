import { useState } from "react";

const Admin = () => {
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );

  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    author: "",
    date: "",
    category: "",
    description: "",
    mainImage: "",
    sections: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { type: "paragraph", content: "" }],
    });
  };

  const handleSectionChange = (index, value) => {
    const newSections = [...form.sections];
    newSections[index].content = value;
    setForm({ ...form, sections: newSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { ...form, id: Date.now() }; // simple unique ID
    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setForm({
      title: "",
      subTitle: "",
      author: "",
      date: "",
      category: "",
      description: "",
      mainImage: "",
      sections: [],
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin - Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="subTitle"
          placeholder="Subtitle"
          value={form.subTitle}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="date"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="description"
          placeholder="Preview Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="mainImage"
          placeholder="Main Image URL"
          value={form.mainImage}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* Sections */}
        {form.sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <textarea
              placeholder="Paragraph Content"
              value={section.content}
              onChange={(e) => handleSectionChange(idx, e.target.value)}
              className="w-full border p-2"
            />
          </div>
        ))}

        <button type="button" onClick={handleAddSection} className="px-4 py-2 border rounded">
          Add Paragraph
        </button>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Blog
        </button>
      </form>

      <h2 className="text-2xl font-bold">Existing Blogs</h2>
      <ul className="space-y-2">
        {blogs.map((b) => (
          <li key={b.id}>{b.title} - {b.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
