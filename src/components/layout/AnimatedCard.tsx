import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const values = [
    { text: "Integrity", description: "We stay true to honesty and transparency in all we do." },
    { text: "Excellence", description: "We deliver results that meet global standards." },
    { text: "Empowerment", description: "We equip individuals and businesses with tools for success." },
    { text: "Growth", description: "We promote continuous learning and career development." },
    { text: "Impact", description: "We measure success by the lives transformed and opportunities created." },
    { text: "Availability", description: "We are known for our ever-present nature, always ready to respond to you and provide assistance when you need it." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <Card className="max-h-[400px] overflow-hidden shadow-lg">
      <CardHeader>
        <Award className="h-12 w-12 text-accent mx-auto mb-4" />
        <CardTitle className="text-center text-black">Values</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center px-6"
          >
            <p className="text-lg font-semibold text-black">
              {values[currentIndex].text}
            </p>
            <p className="text-gray-600">{values[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AnimatedCard;
