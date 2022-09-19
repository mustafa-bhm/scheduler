import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // to transition from one mode to another
  function transition(mode, replace = false) {
    if (replace) {
      return setMode(mode);
    }

    setMode(mode);
    setHistory([...history, mode]);
  }

  // to go back from one mode to the previous one
  function back() {
    if (history.length - 1) {
      setHistory((prev) => {
        const newArr = [...prev];

        newArr.pop();

        setMode(newArr[newArr.length - 2]);
        console.log(" +++++", newArr);

        return newArr;
      });
    }
  }

  return { mode, transition, back };
}
