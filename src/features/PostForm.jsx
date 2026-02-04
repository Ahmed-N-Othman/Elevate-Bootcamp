import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../utils/postValidation";
import { AlertCircle, CheckCircle2, NotebookPen } from "lucide-react";
import { postService } from "../services/api";

const PostForm = () => {
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data) => {
    setServerError(false);
    setSuccess(false);
    try {
      await postService.createPost(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setServerError(true);
    }
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-[24px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in duration-500">
      
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <NotebookPen className="w-6 h-6 text-gray-800" />
        <h2 className="font-bold text-[20px] text-gray-900 tracking-tight">Create a New Post</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">
        
        <div className="space-y-3">
          <label className="block font-bold text-[14px] text-gray-800 ml-1">Title</label>
          <input
            {...register("title")}
            placeholder="Enter post title"
            className={`w-full p-4 bg-gray-50 border-none rounded-[16px] text-[15px] focus:ring-2 focus:ring-blue-400/20 transition-all ${
              errors.title ? "ring-2 ring-red-500 bg-red-50" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
              <AlertCircle className="w-4 h-4" /> {errors.title.message}
            </p>
          )}
        </div>

       
        <div className="space-y-3">
          <label className="block font-bold text-[14px] text-gray-800 ml-1">Body</label>
          <textarea
            {...register("body")}
            placeholder="Enter post body"
            rows="6"
            className={`w-full p-4 bg-gray-50 border-none rounded-[16px] text-[15px] focus:ring-2 focus:ring-blue-400/20 transition-all resize-none ${
              errors.body ? "ring-2 ring-red-500 bg-red-50" : ""
            }`}
          />
          {errors.body && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
              <AlertCircle className="w-4 h-4" /> {errors.body.message}
            </p>
          )}
        </div>

    
        <div className="space-y-3">
          <label className="block font-bold text-[14px] text-gray-800 ml-1">Author</label>
          <div className="relative">
            <select
              {...register("author")}
              onChange={(e) =>
                setValue("author", e.target.value, { shouldValidate: true })
              }
              className={`w-full p-4 bg-gray-50 border-none rounded-[16px] text-[15px] focus:ring-2 focus:ring-blue-400/20 transition-all appearance-none cursor-pointer ${
                errors.author ? "ring-2 ring-red-500 bg-red-50" : ""
              }`}
            >
              <option value="">Select Author</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>
          {errors.author && (
            <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
              <AlertCircle className="w-4 h-4" /> {errors.author.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in-95">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Internal Server Error</span>
          </div>
        )}

  
        <div className="flex justify-center md:justify-end pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-[407px] h-[51px] bg-[#333333] text-white rounded-[12px] font-bold text-[16px] hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>

     
      {success && (
        <div className="fixed bottom-10 right-10 bg-[#1a1a1a] text-white px-8 py-5 rounded-[16px] flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500 border border-white/10">
          <CheckCircle2 className="text-green-400 w-6 h-6" />
          <span className="text-sm font-semibold tracking-wide">
            A new post has been successfully created!
          </span>
        </div>
      )}
    </div>
  );
};

export default PostForm;