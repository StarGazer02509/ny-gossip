"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. 组件加载时，立即获取当前用户状态
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    // 2. 监听后续的认证状态变化
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // 3. 组件卸载时，取消监听
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // 退出后返回首页
    router.refresh();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        NY Gossip
      </Link>
      <nav>
        {user ? (
          // 用户已登录时显示
          <div className="flex items-center gap-4">
            <Link
              href="/post/new"
              className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              New Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          // 用户未登录时显示
          <Link
            href="/login"
            className="px-3 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}