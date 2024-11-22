'use client';
import { motion } from 'framer-motion';

const containerVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity
    }
  }
};

const circleVariants = {
  animate: (i: number) => ({
    scale: [1, 1.5, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.2
    }
  })
};

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-32">
      <motion.div
        variants={containerVariants}
        animate="animate"
        className="relative w-16 h-16"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={circleVariants}
            animate="animate"
            className="absolute top-0 left-0 w-full h-full"
            style={{
              rotate: `${i * 120}deg`,
              transformOrigin: "50% 50%"
            }}
          >
            <div 
              className="absolute w-4 h-4 bg-gray-600 rounded-full"
              style={{
                top: "0%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}