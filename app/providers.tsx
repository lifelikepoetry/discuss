// app/providers.tsx
'use client'

import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
    attribute="class" // 设置到 html 的 data-theme 属性
      defaultTheme="light"   // 默认使用 light，防止 SSR mismatch
      enableSystem={false}   // 禁用跟随系统，避免 SSR 和客户端不一致
      >
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  )
}