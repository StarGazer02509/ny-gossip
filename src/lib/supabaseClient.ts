// filepath: /Users/ricky/Workspace/git/001_Network/ny-gossip/src/lib/supabaseClient.ts
import { createBrowserClient } from '@supabase/ssr'

// 注意：这里我们使用了从 @supabase/ssr 导入的 createBrowserClient 函数
// 它专门用于在浏览器环境中的“客户端组件”里创建 Supabase 客户端
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)