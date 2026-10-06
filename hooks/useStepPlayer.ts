"use client";

import { useEffect, useState } from "react";

export function useStepPlayer(totalSteps: number, initialSpeed = 50) {
  const [step, setStep] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(initialSpeed);

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  const goAuto = () => {
    if (isAuto) setIsAuto(false);
    else setIsAuto(true);
  };

  const goReset = () => {
    setStep(0);
    setIsAuto(false);
  };

  const handleSpeedChange = (nextSpeed: number) => setPlaybackSpeed(nextSpeed);

  useEffect(() => {
    if (!isAuto) return;

    const interval = setInterval(() => {
      goNext();
    }, Math.max(20, 150 - playbackSpeed));

    return () => clearInterval(interval);
  }, [isAuto, playbackSpeed]);

  useEffect(() => {
    if (totalSteps <= 0) {
      setStep(0);
      setIsAuto(false);
      return;
    }

    setStep((currentStep) => Math.min(currentStep, totalSteps - 1));
  }, [totalSteps]);

  useEffect(() => {
    if (isAuto && step === totalSteps - 1) {
      setIsAuto(false);
    }
  }, [step, isAuto, totalSteps]);

  return {
    step,
    isAuto,
    playbackSpeed,
    goNext,
    goPrev,
    goAuto,
    goReset,
    handleSpeedChange,
  };
}
