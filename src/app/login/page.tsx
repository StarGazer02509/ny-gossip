"use client";

import { supabase } from "@/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  // 这个 useEffect 会监听用户的登录状态变化
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // 一旦检测到用户成功登录 (session 存在)
      if (session) {
        // 就立刻将他们重定向到主页
        router.push("/");
        // 并且刷新页面以确保主页能加载最新的用户状态
        router.refresh();
      }
    });

    // 在组件卸载时，取消监听，防止内存泄漏
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center">Welcome to NY Gossip</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]} // 暂时只用邮箱密码登录
        />
      </div>
    </div>
  );
}