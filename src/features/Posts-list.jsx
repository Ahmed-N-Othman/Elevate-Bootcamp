import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ScrollText, ChevronRight } from "lucide-react";
import { postService } from "../services/api";

const PostsList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  useEffect(() => {
    postService.getAllPosts().then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAuthor =
      selectedAuthor === "all" || post.userId.toString() === selectedAuthor;
    return matchesSearch && matchesAuthor;
  });

  const displayedPosts = filteredPosts.slice(0, 12);

  return (
    <div className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/20 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ScrollText className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-semibold text-gray-900">Post List</h2>
        </div>

        <button
          onClick={() => navigate("/create-post")}
          className="
            flex items-center gap-1.5
            text-black hover:text-gray-500 cursor-pointer
            text-sm font-medium transition-colors
          "
        >
          <Plus className="w-4 h-4" />
          Create a new post
        </button>
      </div>

      <div className="p-6 border-b border-white/20 bg-black/15 flex flex-col sm:flex-row gap-5 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-3 bg-white border border-white/40 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-300/50 transition text-sm"
          />
        </div>

        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-gray-800 font-medium text-sm">Author:</span>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="bg-white/80 border border-white text-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/70 cursor-pointer min-w-[160px] shadow-sm"
          >
            <option value="all">All</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-white/20">
        {loading ? (
          <div className="p-16 text-center text-gray-600">Loading...</div>
        ) : displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className={`group px-6 py-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-white/40 ${
                index % 2 === 0 ? "bg-white/20" : "bg-transparent"
              }`}
            >
              <p className="text-gray-900 font-medium text-[15px] leading-relaxed truncate max-w-[85%]">
                {post.title}
              </p>
              <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        ) : (
          <div className="p-16 text-center text-gray-500 italic">
            No results found
          </div>
        )}
      </div>

      <div className="px-6 py-5 border-t border-white/20 bg-white/30 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition">
            «
          </button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition">
            ‹
          </button>

          {[1, 2, 3, "...", 10].map((page, i) => (
            <button
              key={i}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                page === 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              {page}
            </button>
          ))}

          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition">
            ›
          </button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-700 transition">
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsList;
