interface AdBannerProps {
  width: number;
  height: number;
  position: "top" | "side" | "inline";
  className?: string;
}

const AdBanner = ({ width, height, position, className = "" }: AdBannerProps) => {
  return (
    <div 
      className={`bg-muted border border-border rounded-lg flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium">Advertisement</div>
        <div className="text-xs">{width} x {height}</div>
        <div className="text-xs capitalize">{position} Placement</div>
      </div>
    </div>
  );
};

export default AdBanner;