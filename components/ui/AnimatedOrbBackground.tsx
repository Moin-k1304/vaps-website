'use client'

import { useEffect, useRef } from 'react'

interface AnimatedOrbBackgroundProps {
  className?: string
  hue?: number
  intensity?: number
}

export default function AnimatedOrbBackground({
  className = '',
  hue = 0,
  intensity = 1,
}: AnimatedOrbBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Base colors matching the theme
    const baseColor1 = { r: 0.612, g: 0.263, b: 0.996 } // Purple
    const baseColor2 = { r: 0.298, g: 0.761, b: 0.914 } // Blue
    const baseColor3 = { r: 0.063, g: 0.078, b: 0.600 } // Dark Blue

    const adjustHue = (color: { r: number; g: number; b: number }, hueDeg: number) => {
      const hueRad = (hueDeg * Math.PI) / 180
      const cosA = Math.cos(hueRad)
      const sinA = Math.sin(hueRad)
      
      // Convert RGB to YIQ
      const y = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
      const i = 0.596 * color.r - 0.274 * color.g - 0.322 * color.b
      const q = 0.211 * color.r - 0.523 * color.g + 0.312 * color.b
      
      // Rotate I and Q
      const iNew = i * cosA - q * sinA
      const qNew = i * sinA + q * cosA
      
      // Convert back to RGB
      return {
        r: y + 0.956 * iNew + 0.621 * qNew,
        g: y - 0.272 * iNew - 0.647 * qNew,
        b: y - 1.106 * iNew + 1.703 * qNew,
      }
    }

    // Simplified noise function using sine waves for smooth animation
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 2 + t) * 0.5 +
        Math.sin(y * 3 + t * 0.7) * 0.3 +
        Math.sin((x + y) * 1.5 + t * 0.5) * 0.2
      ) * 0.5 + 0.5
    }

    const drawOrb = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      const centerX = width / 2
      const centerY = height / 2
      const size = Math.min(width, height)
      
      ctx.clearRect(0, 0, width, height)
      
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      
      const color1 = adjustHue(baseColor1, hue)
      const color2 = adjustHue(baseColor2, hue)
      const color3 = adjustHue(baseColor3, hue)
      
      const innerRadius = 0.6
      const noiseScale = 0.65
      const time = timeRef.current * 0.5
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const px = ((x - centerX) / size) * 2
          const py = ((y - centerY) / size) * 2
          
          const ang = Math.atan2(py, px)
          const len = Math.sqrt(px * px + py * py)
          const invLen = len > 0 ? 1 / len : 0
          
          const n0 = noise(px * noiseScale, py * noiseScale, time) * 0.5 + 0.5
          const r0 = innerRadius + (1 - innerRadius) * (0.4 + n0 * 0.2)
          const d0 = Math.abs(len - r0 * invLen * len)
          const v0 = 1.0 / (1.0 + d0 * 10.0)
          const smooth = len < r0 * 1.05 ? (r0 - len) / (r0 * 0.05) : 0
          const v0Final = v0 * Math.max(0, Math.min(1, smooth))
          
          const cl = (Math.cos(ang + timeRef.current * 2.0) * 0.5 + 0.5)
          
          const a = timeRef.current * -1.0
          const posX = Math.cos(a) * r0
          const posY = Math.sin(a) * r0
          const d = Math.sqrt((px - posX) ** 2 + (py - posY) ** 2)
          const v1 = 1.5 / (1.0 + d * d * 5.0)
          const v1Final = v1 * (1.0 / (1.0 + d0 * 50.0))
          
          const v2 = len < 1.0 ? (1.0 - len) / (1.0 - (innerRadius + (1 - innerRadius) * n0 * 0.5)) : 0
          const v3 = len > innerRadius ? (len - innerRadius) / ((innerRadius + (1 - innerRadius) * 0.5) - innerRadius) : 0
          
          let col = {
            r: color1.r * (1 - cl) + color2.r * cl,
            g: color1.g * (1 - cl) + color2.g * cl,
            b: color1.b * (1 - cl) + color2.b * cl,
          }
          
          col = {
            r: color3.r * (1 - v0Final) + col.r * v0Final,
            g: color3.g * (1 - v0Final) + col.g * v0Final,
            b: color3.b * (1 - v0Final) + col.b * v0Final,
          }
          
          col = {
            r: (col.r + v1Final) * v2 * v3,
            g: (col.g + v1Final) * v2 * v3,
            b: (col.b + v1Final) * v2 * v3,
          }
          
          col = {
            r: Math.max(0, Math.min(1, col.r)),
            g: Math.max(0, Math.min(1, col.g)),
            b: Math.max(0, Math.min(1, col.b)),
          }
          
          const alpha = Math.max(col.r, Math.max(col.g, col.b))
          const idx = (y * width + x) * 4
          
          if (alpha > 0.01) {
            data[idx] = Math.floor((col.r / alpha) * 255 * intensity)
            data[idx + 1] = Math.floor((col.g / alpha) * 255 * intensity)
            data[idx + 2] = Math.floor((col.b / alpha) * 255 * intensity)
            data[idx + 3] = Math.floor(alpha * 255)
          } else {
            data[idx] = 0
            data[idx + 1] = 0
            data[idx + 2] = 0
            data[idx + 3] = 0
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001
      drawOrb()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [hue, intensity])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

