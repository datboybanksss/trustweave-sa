"use client"

import React, { useState } from "react"
import { RefreshCcw, Shell } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import AnimatedNumberRandom from "@/components/ui/shuffle-number"

export default function WealthCalculatorDemo() {
  const numbers = [13479762, 476906, 37459, 867940, 1348768]
  const diffs = [0.0564, -0.114, 0.0029, 0.0821, -0.0234]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleCalculate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numbers.length)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Badge
        variant="outline"
        className="rounded-[14px] border border-black/10 text-base text-neutral-800"
      >
        <img src="/lovable-uploads/37114d14-7351-474d-a6a9-a8174ba90e72.png" alt="Tree icon" className="w-5 h-5" />
        &nbsp;Live Wealth Calculator
      </Badge>
      
      <AnimatedNumberRandom
        value={numbers[currentIndex]}
        diff={diffs[currentIndex]}
      />
      
      <div className="flex gap-4">
        <button
          onClick={handleCalculate}
          className="duration-[.16s] ease-[cubic-bezier(.4,0,.2,1)] active:duration-[25ms] flex h-11 w-fit items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition hover:brightness-125 active:scale-[98%] active:brightness-[98%]"
        >
          <RefreshCcw className="size-5" />
          Calculate
        </button>
        
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => window.open('https://legacybuilder.smartwill.io/system/portal/calculator/index.php', '_blank')}
        >
          Click me !
        </Button>
      </div>
    </div>
  )
}