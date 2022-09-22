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
        console.log("prev", prev);
        const newArr = [...prev];
        console.log("newArr", newArr);

        newArr.pop();

        if (newArr[newArr.length - 1] === "CONFIRM") {
          newArr.pop();
        }

        setMode(newArr[newArr.length - 1]);
        console.log(" newArr after setMode", newArr);

        return newArr;
      });
    }
  }

  return { mode, transition, back };
}
