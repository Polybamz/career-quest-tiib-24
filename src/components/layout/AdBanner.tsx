import React, { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import useContent from "@/hooks/useContent";

// =========================
// 🔹 TYPES (UNCHANGED)
// =========================


interface AdBannerProps {
    position: 'top' | 'side' | 'inline';
    className?: string;
}

// =========================
// 🔹 HELPERS (UNCHANGED)
// =========================
const getAdDimensions = (position: AdBannerProps['position']) => {
    // get width and height based on position
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const map = {
        top: { width: 1000, height: 150 },
        side: { width: 160, height: screenHeight * 0.8 },
        inline: { width: 468, height: 60 },
    };
    return map[position] ?? { width: 400, height: 100 };
};


// =========================
// 🔹 MAIN COMPONENT (FIXED HOOK ORDER)
// =========================
const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
    // 1. CALL ALL HOOKS FIRST (Unconditional)
    const [index, setIndex] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [visible, setVisible] = useState(position !== 'side');
    const { bannerState } = useContent();
    const { width, height } = getAdDimensions(position); // Note: This helper is NOT a hook, so its position doesn't strictly matter, but keeping it high is clean.
    
    const banners = useMemo(() => {
        const data = bannerState?.data ?? [];
        return data.filter((b) => b.displayOrder === position);
    }, [position, bannerState]);

    // Ensure banners is always an array and guard reads from it
    const safeBanners = Array.isArray(banners) ? banners : [];
    const multiple = safeBanners.length > 1;
    // Keep `index` within bounds when the banners list changes
    useEffect(() => {
        setIndex((prev) => {
            if (safeBanners.length === 0) return 0;
            return Math.min(prev, safeBanners.length - 1);
        });
    }, [safeBanners.length]);

    const current = safeBanners[index] ?? safeBanners[0];

    // Delay for side banners (Hook 5)
    useEffect(() => {
        if (position === 'side' && !visible) {
            const timer = setTimeout(() => setVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [position, visible]);

    // Auto rotate banners (Hook 6)
    useEffect(() => {
        if (!multiple) return;
        const interval = setInterval(
            () => setIndex((prev) => (prev + 1) % banners.length),
            5000
        );
        return () => clearInterval(interval);
    }, [multiple, banners.length]);


    // 2. NOW, USE CONDITIONAL RENDERING (Return early)

    // Show loading skeleton while data is fetching
    if (bannerState.loading) {
        return (<div className="animate-pulse bg-gray-200 rounded-[2px]" style={{ width, height }} />);
    }

    // Hide if dismissed, not visible (due to delay), or if no banners exist for this position
    if (dismissed || !visible || banners.length === 0) {
        // Use 'null' instead of <></> or <div className="hidden" /> for cleaner component removal
        return null;
    }
    
    // The previous conditional check for banners.length == 0 is redundant here
    // because it was already handled at the top, and if it wasn't handled, it
    // would mean 'banners' is guaranteed to be an array and have elements.

    return (
        <div
            className={` shadow-lg overflow-hidden rounded-[2px] transition-all duration-300 ${className}`}
            style={{ width, height }}
        >
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            `}</style>

            <a
                href={current.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
            >
                <img
                    key={current.id}
                    src={current.imageUrl}
                    alt={current.altText || 'Advertisement'}
                    className="w-full h-full  rounded-[2px] transition-opacity duration-700"
                    style={{ animation: 'fade-in 0.7s forwards' }}
                    onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/${width}x${height}/ef4444/ffffff?text=Ad+Load+Error`;
                    }}
                />

                {/* Dots indicator */}
                {multiple && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/40 p-1 rounded-full">
                        {banners.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full ${
                                    i === index ? 'bg-white' : 'bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </a>

            {/* Close button for top/side ads */}
            {['side', 'top'].includes(position) && (
                <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-1 right-1 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition"
                    aria-label="Close Ad"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default AdBanner;