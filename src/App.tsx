import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";

const steps = [
  {
    label: "Enter Soil Type",
    placeholder: "e.g. Loamy",
    animation: "seed", // custom animation key
  },
  {
    label: "Enter Rainfall (mm)",
    placeholder: "e.g. 500",
    animation: "watering",
  },
  {
    label: "Enter Temperature (°C)",
    placeholder: "e.g. 25",
    animation: "sprout",
  },
  {
    label: "Enter pH Level",
    placeholder: "e.g. 6.5",
    animation: "growing",
  },
];

const animations = {
  seed: <div className="plant-stage seed" />,
  watering: <div className="plant-stage watering" />,
  sprout: <div className="plant-stage sprout" />,
  growing: <div className="plant-stage growing" />,
  harvest: <div className="plant-stage harvest" />,
};

export default function App() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<string[]>(Array(steps.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [buildup, setBuildup] = useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setBuildup(true);
      setTimeout(() => {
        setShowResult(true);
        setBuildup(false);
      }, 3000); // 3s buildup animation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[step] = e.target.value;
    setInputs(newInputs);
  };

  return (
    <div className="farm-bg">
      <div className="form-container">
        <AnimatePresence mode="wait">
          {!showResult && !buildup && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.7 }}
              className="step-card"
            >
              <div className="animation-area">
                {animations[steps[step].animation]}
              </div>
              <label className="step-label">{steps[step].label}</label>
              <input
                className="step-input"
                placeholder={steps[step].placeholder}
                value={inputs[step]}
                onChange={handleChange}
              />
              <button className="next-btn" onClick={handleNext} disabled={!inputs[step]}>
                Next
              </button>
            </motion.div>
          )}
          {buildup && (
            <motion.div
              key="buildup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="buildup-animation"
            >
              {/* Plant growth animation */}
              <div className="plant-growth-sequence">
                <div className="plant-stage seed" />
                <div className="plant-stage watering" />
                <div className="plant-stage sprout" />
                <div className="plant-stage growing" />
                <div className="plant-stage harvest" />
              </div>
              <div className="buildup-text">Your crop is growing...</div>
            </motion.div>
          )}
          {showResult && (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="result-card"
            >
              <div className="animation-area">{animations.harvest}</div>
              <h2 className="result-title">Best Crop Prediction</h2>
              <div className="result-output">
                {/* Replace with your actual prediction logic */}
                Wheat 🌾
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}