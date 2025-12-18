"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    // 阻止表单的默认提交行为（即刷新页面）
    e.preventDefault();

    // 获取当前登录的用户信息
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 如果用户未登录，则不执行任何操作
    if (!user) {
      alert("Please log in to post.");
      return;
    }

    // 将新帖子插入到 'posts' 表中
    const { error } = await supabase
      .from("posts")
      .insert([{ content: content, user_id: user.id }]); // 假设我们有一个 user_id 列

    if (error) {
      alert("Error creating post: " + error.message);
    } else {
      // 发布成功后，清空输入框
      setContent("");
      // 并将用户导航回主页
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Share a New Gossip</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded bg-gray-800 text-white"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's the tea?"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </main>
  );
}