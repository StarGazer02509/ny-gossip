// filepath: /Users/ricky/Workspace/git/001_Network/ny-gossip/src/app/page.tsx
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  // 从 'posts' 表中获取所有数据，并按创建时间降序排序
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>Error fetching posts: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Gossips</h1>
      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            // 这是卡片组件
            <div key={post.id} className="bg-gray-800 rounded-lg p-6">
              <p className="text-lg">{post.content}</p>
              <p className="text-sm text-gray-400 mt-4">
                {/* 格式化并显示时间 */}
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No posts yet. Be the first to share!</p>
      )}
    </div>
  );
}