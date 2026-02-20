import { useState } from "react";

const Admin = () => {
  const [blogs, setBlogs] = useState(
    JSON.parse(localStorage.getItem("blogs")) || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    title: "",
    subTitle: "",
    author: "",
    date: "",
    category: "",
    description: "",
    mainImage: "",
    sections: [],
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSection = (type) => {
    const newSection =
      type === "paragraph"
        ? { type: "paragraph", content: "" }
        : { type: "image", src: "", label: "" };

    setForm({
      ...form,
      sections: [...form.sections, newSection],
    });
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...form.sections];
    newSections[index][field] = value;
    setForm({ ...form, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = form.sections.filter((_, i) => i !== index);
    setForm({ ...form, sections: newSections });
  };

  // --- EDIT LOGIC ---
  const startEdit = (blog) => {
    setForm(blog); // Load blog data into the form
    setEditingId(blog.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm(initialFormState);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.author) {
      return alert("Please fill in the title and author!");
    }

    let updatedBlogs;

    if (isEditing) {
      // Update existing
      updatedBlogs = blogs.map((b) =>
        b.id === editingId ? { ...form, id: editingId } : b
      );
      alert("Blog updated successfully!");
    } else {
      // Create new
      const newBlog = { ...form, id: Date.now() };
      updatedBlogs = [newBlog, ...blogs];
      alert("Blog published successfully!");
    }

    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    // Reset Form
    setForm(initialFormState);
    setIsEditing(false);
    setEditingId(null);
  };

  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const filtered = blogs.filter((b) => b.id !== id);
      setBlogs(filtered);
      localStorage.setItem("blogs", JSON.stringify(filtered));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600">
        {isEditing ? "Editing Post" : "Admin Dashboard"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="category"
            placeholder="Category (e.g. HEALTH)"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="date"
            placeholder="Date (e.g. 12TH JAN 2026)"
            value={form.date}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

        <input
          name="subTitle"
          placeholder="Subtitle (Optional)"
          value={form.subTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="mainImage"
          placeholder="Main Image URL"
          value={form.mainImage}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Short Preview Description (for the Blog Card)"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded h-24"
        />

        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold text-lg">Content Sections</h3>
          {form.sections.map((section, idx) => (
            <div key={idx} className="p-4 border rounded-md bg-gray-50 relative">
              <button
                type="button"
                onClick={() => removeSection(idx)}
                className="absolute top-2 right-2 text-red-500 text-sm font-bold"
              >
                ✕ Remove
              </button>

              {section.type === "paragraph" ? (
                <textarea
                  placeholder="Enter paragraph text..."
                  value={section.content}
                  onChange={(e) =>
                    handleSectionChange(idx, "content", e.target.value)
                  }
                  className="w-full border p-2 rounded mt-2 h-32"
                />
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    placeholder="Image URL"
                    value={section.src}
                    onChange={(e) =>
                      handleSectionChange(idx, "src", e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  />
                  <input
                    placeholder="Image Caption/Label"
                    value={section.label}
                    onChange={(e) =>
                      handleSectionChange(idx, "label", e.target.value)
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => handleAddSection("paragraph")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            + Add Paragraph
          </button>
          <button
            type="button"
            onClick={() => handleAddSection("image")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            + Add Image
          </button>
          <div className="ml-auto flex gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-8 py-2 bg-gray-400 text-white font-bold rounded hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
            >
              {isEditing ? "Save Changes" : "Publish Blog"}
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found in local storage.</p>
        ) : (
          <ul className="divide-y">
            {blogs.map((b) => (
              <li key={b.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{b.title}</p>
                  <p className="text-sm text-gray-500">
                    {b.author} • {b.date}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => startEdit(b)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(b.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;