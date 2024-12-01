'use client';

import { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaRedo } from 'react-icons/fa';

interface TuringMachineProps {
  initialCode?: string;
}

export default function TuringMachine({ initialCode = '' }: TuringMachineProps) {
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [tape, setTape] = useState<string[]>([]);
  const [head, setHead] = useState(0);
  const [currentState, setCurrentState] = useState('state0');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [machineState, setMachineState] = useState<'running' | 'accept' | 'reject' | 'idle'>('idle');
  const tapeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tapeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setTape(Array(100).fill(''));
    setHead(50);
  }, []);

  const step = useCallback(() => {
    const lines = code.split('\n').filter(line => line.trim() && !line.startsWith('//'));
    const currentSymbol = tape[head] || '0';
    let matched = false;
    
    for (const line of lines) {
      const [state, symbol, write, move, nextState] = line.trim().split(' ');
      
      if (state === currentState && (symbol === currentSymbol || symbol === '*')) {
        matched = true;
        // Update tape
        const newTape = [...tape];
        newTape[head] = write;
        setTape(newTape);
        
        // Move head
        const newHead = move === 'R' ? head + 1 : head - 1;
        setHead(newHead);
        
        // Update state
        setCurrentState(nextState);

        // Check for accept/reject states
        if (nextState.toLowerCase().includes('accept')) {
          setMachineState('accept');
          setIsRunning(false);
        } else if (nextState.toLowerCase().includes('reject')) {
          setMachineState('reject');
          setIsRunning(false);
        }
        break;
      }
    }

    if (!matched) {
      setMachineState('reject');
      setIsRunning(false);
    }
  }, [code, tape, head, currentState, setTape, setHead, setCurrentState, setMachineState, setIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      setMachineState('running');
      interval = setInterval(step, speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed, step, setMachineState]);

  // Scroll to head position when it changes
  useEffect(() => {
    if (tapeContainerRef.current) {
      const cell = tapeRefs.current[head];
      if (cell) {
        cell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [head]);

  const handleCellKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'ArrowLeft' || (e.key === 'Delete' && !tape[index])) {
      if (index > 0) {
        tapeRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Tab' || (e.key === 'Enter' && tape[index])) {
      if (index < tape.length - 1) {
        tapeRefs.current[index + 1]?.focus();
      }
    } else if (e.key === '0' || e.key === '1') {
      const newTape = [...tape];
      newTape[index] = e.key;
      setTape(newTape);
      if (index < tape.length - 1) {
        tapeRefs.current[index + 1]?.focus();
      }
    }
  };

  const resetTape = () => {
    setTape(Array(100).fill(''));
    setHead(50);
    setCurrentState('state0');
    setMachineState('idle');
    setIsRunning(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => setIsRunning(!isRunning)}
          disabled={machineState === 'accept' || machineState === 'reject'}
          title={isRunning ? "Stop" : "Run"}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
          <span className="sr-only">{isRunning ? 'Stop' : 'Run'}</span>
        </button>
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 transition-colors"
          onClick={step}
          disabled={isRunning || machineState === 'accept' || machineState === 'reject'}
          title="Step"
        >
          <FaStepForward />
          <span className="sr-only">Step</span>
        </button>
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center gap-2 transition-colors"
          onClick={resetTape}
          disabled={isRunning}
          title="Reset"
        >
          <FaRedo />
          <span className="sr-only">Reset</span>
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24"
            title={`Speed: ${speed}ms`}
          />
          <span className="text-sm text-gray-600 w-16">{speed}ms</span>
        </div>
        <AnimatePresence>
          {machineState === 'accept' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-500 font-bold"
            >
              Accepted! ✅
            </motion.div>
          )}
          {machineState === 'reject' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-bold"
            >
              Rejected! ❌
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div 
        ref={tapeContainerRef}
        className="flex overflow-x-auto p-4 rounded-lg"
      >
        {tape.map((symbol, i) => (
          <motion.div
            key={i}
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center border ${
              i === head ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            initial={false}
            animate={i === head ? { scale: 1.1 } : { scale: 1 }}
          >
            <input
              ref={el => {
                if (el) tapeRefs.current[i] = el;
              }}
              type="text"
              value={symbol}
              onChange={() => {}}
              onKeyDown={(e) => handleCellKeyDown(e, i)}
              className="w-6 h-6 text-center bg-transparent focus:outline-none"
              maxLength={1}
              disabled={isRunning}
            />
          </motion.div>
        ))}
      </div>

      <textarea
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setMachineState('idle');
        }}
        className="w-full h-48 font-mono p-4 bg-gray-900 text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Write your Turing machine program here..."
        style={{
          caretColor: '#4ade80',
          textShadow: '0 0 5px rgba(74, 222, 128, 0.5)'
        }}
      />
    </div>
  );
}