'use client'
import { useEffect, useRef } from 'react'

export default function AdSidebar() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    ;(window as any).atOptions = {
      key: 'adb3d4cb6e3c26bb8cbccb18e6301d5b',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    }
    const s = document.createElement('script')
    s.src = 'https://www.highperformanceformat.com/adb3d4cb6e3c26bb8cbccb18e6301d5b/invoke.js'
    s.async = true
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="hidden lg:flex justify-center">
      <div ref={ref} className="min-h-[250px] w-[300px]" />
    </div>
  )
}
