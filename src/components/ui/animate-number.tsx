import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";


export function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      // Extracts the numerical part from the string (e.g., "5,000+" -> 5000)
      const numberValue = parseInt(value.replace(/[^0-9]/g, ""), 10);

      const controls = animate(0, numberValue, {
        duration: 2, // Animation duration in seconds
        ease: "easeOut",
        onUpdate(latest) {
          // Format the number with commas and update the element's text
          ref.current.textContent = latest.toLocaleString();
        },
        onComplete() {
          // After animation, set the final text content including non-numeric parts
          ref.current.textContent = value;
        }
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  // We render the final value initially for non-JS users or quick flashes
  return <span ref={ref}>{value}</span>;
}
