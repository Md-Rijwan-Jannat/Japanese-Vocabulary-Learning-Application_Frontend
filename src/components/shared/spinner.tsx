'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AdvancedSpinnerProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export const Spinner: React.FC<AdvancedSpinnerProps> = ({
  size = 100,
  color = '#447EF6',
  backgroundColor = '#A357F7',
}) => {
  const circleSize = size * 0.8;
  const dotSize = size * 0.15;

  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: circleSize,
            height: circleSize,
            border: `${size * 0.05}px solid ${backgroundColor}`,
            borderTop: `${size * 0.05}px solid ${color}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: circleSize * 0.7,
            height: circleSize * 0.7,
            border: `${size * 0.04}px solid ${backgroundColor}`,
            borderBottom: `${size * 0.04}px solid ${color}`,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: dotSize, height: dotSize, backgroundColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
};
