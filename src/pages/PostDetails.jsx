import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { postService } from "../services/api";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await postService.getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  if (loading)
    return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="rounded-[24px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
      <div className="bg-[#4A6D8C]/85 backdrop-blur-md p-8 md:p-12 text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer text-black gap-2 bg-white/70 hover:bg-white/90 px-4 py-2 rounded-full text-sm font-semibold transition-all mb-8 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Posts
        </button>

        <h1 className="text-2xl md:text-4xl font-semibold leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-sm font-medium text-white/80">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 opacity-70" />
            <span>Leanne Graham</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-70" />
            <span>Sun, August 24th, 2025</span>
          </div>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-[12px] p-8 md:p-12 min-h-[400px]">
        <div className="max-w-4xl ">
          <p className="text-gray-900 leading-[1.8] text-lg font-small">
            <span className="">{post.body?.charAt(0).toLowerCase()}</span>
            {post.body?.slice(1)}

            <br />
            <br />
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
