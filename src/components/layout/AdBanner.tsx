import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  width: number;
  height: number;
  position: "top" | "side" | "inline";
  className?: string;
  isHidden?: boolean;
}

const AdBanner = ({ width, height, position, className = "", isHidden = true }: AdBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAfterDelay, setShowAfterDelay] = useState(false);

  useEffect(() => {
    if (position === 'side' && !isHidden) {
      const timer = setTimeout(() => {
        setShowAfterDelay(true);
      }, 3000); // Show after 3 seconds of browsing

      return () => clearTimeout(timer);
    }
  }, [position, isHidden]);

  if (isDismissed || (position === 'side' && !showAfterDelay && !isHidden)) {
    return null;
  }

  if (isHidden) {
    return null;
  }

  return (
    <div 
      className={`bg-muted border border-border rounded-lg flex items-center justify-center relative ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {position === 'side' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium">
          {position === 'side' ? 'Sell your services/products here' : 'Advertisement'}
        </div>
        <div className="text-xs">{width} x {height}</div>
        <div className="text-xs capitalize">{position} Placement</div>
      </div>
    </div>
  );
};

export default AdBanner;