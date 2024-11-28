'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TapCounter() {
  const [count, setCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lastTap, setLastTap] = useState(Date.now())
  const [showRipple, setShowRipple] = useState(false)
  
  // Calculate background color based on count
  const backgroundColor = `hsl(${count % 360}, 70%, 95%)`
  
  const handleTap = useCallback(() => {
    // Vibrate if supported (100ms)
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }
    
    const now = Date.now()
    // If tap within 2 seconds, increase streak
    if (now - lastTap < 2000) {
      setStreak(s => s + 1)
    } else {
      setStreak(1)
    }
    
    setLastTap(now)
    setCount(c => c + 1)
    setShowRipple(true)
    
    // Reset ripple effect
    setTimeout(() => setShowRipple(false), 300)
  }, [lastTap])

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 touch-none select-none"
      style={{ backgroundColor }}
    >
      <Card className="w-full max-w-md p-8 flex flex-col items-center gap-8 relative overflow-hidden">
        <div className="text-center space-y-2">
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold"
          >
            {count}
          </motion.div>
          <div className="text-sm text-muted-foreground">taps</div>
        </div>

        {streak > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-orange-500"
          >
            {streak} tap streak! 🔥
          </motion.div>
        )}

        <div className="relative">
          <Button
            size="lg"
            className="w-32 h-32 rounded-full text-2xl relative overflow-hidden"
            onClick={handleTap}
          >
            Tap!
            <AnimatePresence>
              {showRipple && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-full"
                />
              )}
            </AnimatePresence>
          </Button>
        </div>

        {count > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground text-center"
          >
            Keep tapping to build your streak!
          </motion.div>
        )}
      </Card>
    </div>
  )
}

