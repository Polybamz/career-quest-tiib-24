interface AdBannerProps {
  width: number;
  height: number;
  position: "top" | "side" | "inline";
  className?: string;
  isHidden?: boolean;
}

const AdBanner = ({ width, height, position, className = "", isHidden = true }: AdBannerProps) => {
  return (
    <div 
      className={`bg-muted border border-border rounded-lg flex items-center justify-center ${className} ${isHidden && 'hidden'}`}
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