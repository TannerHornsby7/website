'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const TuringMachine = dynamic(() => import('./components/TuringMachine'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-gray-100 rounded-lg animate-pulse"></div>
  ),
});

const INITIAL_CODE = `state0 0 0 R state1
state0 1 1 R state0
// Add your states here
// use reject or accept to end the program`;

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 py-12 px-4">
      <motion.h4 
        className="text-4xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        This page is under construction!
      </motion.h4>
      
      <motion.p 
        className="text-lg text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Want to help? Take my pc:
      </motion.p>

      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <TuringMachine initialCode={INITIAL_CODE} />
      </motion.div>
    </div>
  );
}
