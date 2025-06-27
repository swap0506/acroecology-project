import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Example questions
const questions = [
  {
    text: "🌱 Welcome, Seedling! Ready to begin your growth journey? What's your name?",
    transition: 'fadeInFromSoil', // custom animation key
  },
  {
    text: "🌦️ The rain falls gently. What is your favorite color?",
    transition: 'rainDrop',
  },
  {
    text: "☀️ Sunlight warms you. What is your favorite hobby?",
    transition: 'sunBeam',
  },
  {
    text: "🌿 Leaves unfurl. What is your dream destination?",
    transition: 'leafUnfurl',
  },
];

const transitionVariants: Record<string, any> = {
  fadeInFromSoil: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: -100, opacity: 0, transition: { duration: 0.8 } },
  },
  rainDrop: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 1 } },
    exit: { scale: 1.2, opacity: 0, transition: { duration: 0.8 } },
  },
  sunBeam: {
    initial: { rotate: -10, opacity: 0 },
    animate: { rotate: 0, opacity: 1, transition: { duration: 1 } },
    exit: { rotate: 10, opacity: 0, transition: { duration: 0.8 } },
  },
  leafUnfurl: {
    initial: { scaleY: 0.5, opacity: 0 },
    animate: { scaleY: 1, opacity: 1, transition: { duration: 1 } },
    exit: { scaleY: 1.2, opacity: 0, transition: { duration: 0.8 } },
  },
};

const PlantGrowth = () => (
  <motion.svg
    width="200"
    height="300"
    viewBox="0 0 200 300"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
    }}
    style={{ display: 'block', margin: '0 auto' }}
  >
    {/* Soil */}
    <motion.rect
      x="0" y="250" width="200" height="50" fill="#8B5E3C"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8 }}
    />
    {/* Stem */}
    <motion.rect
      x="95" y="150" width="10" height="100" fill="#4CAF50"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
    />
    {/* Leaves */}
    <motion.ellipse
      cx="80" cy="180" rx="20" ry="8" fill="#388E3C"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.7, delay: 1.5 }}
    />
    <motion.ellipse
      cx="120" cy="170" rx="18" ry="7" fill="#388E3C"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.7, delay: 2.2 }}
    />
    {/* Flower */}
    <motion.circle
      cx="100" cy="140" r="15" fill="#FFEB3B"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, delay: 3 }}
    />
  </motion.svg>
);

const GamifiedQuestions: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleNext = () => {
    setAnswers([...answers, input]);
    setInput('');
    setStep(step + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #e0ffe0 0%, #b2dfdb 100%)',
        color: '#1b3a2b',
        fontFamily: 'Quicksand, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 1s',
      }}
    >
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            {...transitionVariants[questions[step].transition]}
            style={{
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
              minWidth: 320,
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              style={{ marginBottom: 16, fontWeight: 700, fontSize: 24 }}
            >
              {questions[step].text}
            </motion.h2>
            <motion.input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: 12,
                border: '1px solid #4CAF50',
                fontSize: 18,
                marginBottom: 16,
                width: '80%',
                outline: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            />
            <motion.button
              onClick={handleNext}
              disabled={!input}
              style={{
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '10px 24px',
                fontSize: 18,
                cursor: 'pointer',
                marginTop: 12,
                boxShadow: '0 2px 8px rgba(44,62,80,0.08)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
            >
              {step === questions.length - 1 ? "Grow!" : "Next 🌱"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="plant-growth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 8px 32px rgba(44,62,80,0.12)',
              minWidth: 320,
            }}
          >
            <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 28 }}>
              🌳 Congratulations! Your journey is complete.
            </h2>
            <PlantGrowth />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 4.2 } }}
              style={{ marginTop: 32, fontSize: 20, color: '#388E3C' }}
            >
              Your answers have helped this plant grow strong!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamifiedQuestions;