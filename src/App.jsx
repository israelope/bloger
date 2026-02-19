import { Routes, Route } from "react-router-dom";
import Blog from "./blogging/Blog";
import Info from "./blogging/Info";
import Admin from "./admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/blog/:id" element={<Info />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;