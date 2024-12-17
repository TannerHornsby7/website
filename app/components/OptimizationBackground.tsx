'use client';

import { motion, None } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
}

const ANIMATION_DURATION = 0.5; // Increased for smoother animation
const GRID_SIZE = 30; // Surface resolution
const LEARNING_RATE = 0.2; // Gradient descent step size
const CONVERGENCE_THRESHOLD = 0.0001; // Threshold to stop descent
const CELEBRATION_DELAY = 2000; // 2 second delay at convergence
const BALL_FADE_OUT_DURATION = 10000; // Duration of fade out

// Convex objective function (bowl with slight ripples)
const objectiveFunction = (x: number, y: number): number =>
  (x * x + y * y) / 10 + Math.sin(Math.sqrt(x * x + y * y)) * 0.2;

// Compute gradient using central difference
const computeGradient = (x: number, y: number) => {
  const h = 1e-5; // Small step for numerical precision
  const dx = (objectiveFunction(x + h, y) - objectiveFunction(x - h, y)) / (2 * h);
  const dy = (objectiveFunction(x, y + h) - objectiveFunction(x, y - h)) / (2 * h);
  return { dx, dy };
};

// Isometric projection for 3D effect
const cos45 = Math.cos(Math.PI / 4);
const sin45 = Math.sin(Math.PI / 4);
const project3DTo2D = (x: number, y: number, z: number) => ({
  x: (x - y) * cos45,
  y: (x + y) * sin45 - z,
});

// Generate the surface mesh
const generateSurface = (width: number, height: number) => {
  const scale = Math.min(width, height) * 0.45;
  const halfGrid = GRID_SIZE / 2;
  const gridStep = 5 / GRID_SIZE;

  return Array.from({ length: GRID_SIZE + 1 }, (_, i) =>
    Array.from({ length: GRID_SIZE + 1 }, (_, j) => {
      const x = (i - halfGrid) * gridStep;
      const y = (j - halfGrid) * gridStep;
      const z = objectiveFunction(x, y);
      const { x: projX, y: projY } = project3DTo2D(x, y, z);
      return {
        x: projX * scale + width / 2,
        y: projY * scale + height / 2,
        z,
      };
    })
  );
};

// Generate a gradient descent path
const generateGradientPath = (width: number, height: number, x: number = (Math.random() - 0.5) * 4, y: number = (Math.random() - 0.5) * 4): Point[] => {
  const scale = Math.min(width, height) * 0.45;
  const path: Point[] = [];
  const visited = new Set<string>();

  while (path.length < 200) {
    const z = objectiveFunction(x, y);
    const { x: projX, y: projY } = project3DTo2D(x, y, z);

    // Create a unique key for this position
    const posKey = `${x.toFixed(4)},${y.toFixed(4)}`;
    
    // Check if we've been here before
    if (visited.has(posKey)) {
      // remove this last point
      path.pop();
      break;
    }
    
    // Mark this position as visited
    visited.add(posKey);

    path.push({
      x: projX * scale + width / 2,
      y: projY * scale + height / 2,
      z,
    });

    const { dx, dy } = computeGradient(x, y);
    const gradientMagnitude = Math.sqrt(dx * dx + dy * dy);

    if (gradientMagnitude < CONVERGENCE_THRESHOLD) {
      break;
    }

    // Update x and y using gradient descent
    x -= (dx / gradientMagnitude) * LEARNING_RATE;
    y -= (dy / gradientMagnitude) * LEARNING_RATE;

    // Clamp x and y within bounds
    x = Math.max(Math.min(x, 4), -4);
    y = Math.max(Math.min(y, 4), -4);
  }

  return path;
};

export default function OptimizationBackground() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [surface, setSurface] = useState<Point[][]>([]);
  const [path, setPath] = useState<Point[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("mousedown", (e) => {
      setCelebrating(false);
      setPath([])
      setPath(generateGradientPath(dimensions.width, dimensions.height, (e.pageX / dimensions.width - 0.5) * 4, (e.pageY / dimensions.height - 0.5) * 4))
      console.log("click drop")
      console.log(e.pageX, e.pageY)
      console.log(dimensions.width, dimensions.height)
  })
    return () => {
      window.removeEventListener("resize", updateDimensions);
      // figure out how to debug events better
      window.removeEventListener("mousedown", (e) => {
        generateGradientPath(dimensions.width, dimensions.height, e.pageX, e.pageY)
    })
    }
  }, []);

  // Generate surface and gradient path
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    setSurface(generateSurface(dimensions.width, dimensions.height));
    setPath(generateGradientPath(dimensions.width, dimensions.height));
  }, [dimensions]);

  // Animate gradient descent
  useEffect(() => {
    if (path.length === 0) return;

    const interval = setInterval(() => {
      if (celebrating) return;

      setCurrentIndex((i) => {
        if (i === path.length - 1) {
          setCelebrating(true);
          setTimeout(() => {
            setCelebrating(false);
            // setPath(generateGradientPath(dimensions.width, dimensions.height));
          }, CELEBRATION_DELAY);
          return 0;
        }
        return i + 1;
      });
    }, ANIMATION_DURATION * 1000);

    return () => clearInterval(interval);
  }, [path, dimensions, celebrating]);

  const meshElements = useMemo(
    () =>
      surface.map((row, i) =>
        row.map((point, j) => {
          const next = row[j + 1];
          const below = surface[i + 1]?.[j];
          return (
            <g key={`mesh-${i}-${j}`}>
              {next && (
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="lightgray"
                  strokeWidth="0.5"
                />
              )}
              {below && (
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={below.x}
                  y2={below.y}
                  stroke="lightgray"
                  strokeWidth="0.5"
                />
              )}
            </g>
          );
        })
      ),
    [surface]
  );

  if (!dimensions.width || !dimensions.height || path.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {meshElements}
        <motion.circle
          animate={{
            cx: path[currentIndex]?.x,
            cy: path[currentIndex]?.y,
            // opacity: [1, 0],
          }}
          transition={{ 
            duration: ANIMATION_DURATION,
            ease: "linear",
            // opacity: {
            //   duration: BALL_FADE_OUT_DURATION / 1000, // Convert ms to seconds
            //   ease: "easeInOut"
            // }
          }}
          r={8}
          fill="darkgray"
        />
      </svg>
    </div>
  );
}