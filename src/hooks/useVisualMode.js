import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // adds a mode to the history stack for the new transition, replace the previous one if replace is true
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace ? setHistory(prev => [...prev.slice(0,-1), newMode]) : setHistory(prev => [...prev, newMode]);    
  };

  // as long as the the history stack is longer than 1, move to the previous mode
  const back = () => {
    if (history.length === 1) {
      return;
    }

    const newHistory = history.slice(0, -1);
    setHistory(newHistory)
    setMode(newHistory[newHistory.length - 1]);    
  };
  
  return { mode, transition, back };
}