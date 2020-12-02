import { useCallback, useState } from "react";
import * as React from "react";

export const Day1 = () => {
  const [userInput, setUserInput] = useState<string | undefined>();
  const [outputPart1, setOutputPart1] = useState<string | undefined>();
  const [outputPart2, setOutputPart2] = useState<string | undefined>();

  const run = useCallback(() => {
    if (userInput) {
      const numbers = userInput
        .trim()
        .split("\n")
        .map((v) => parseInt(v));

      const nmap = new Set();
      numbers.forEach((v) => {
        nmap.add(v);
      });

      const out1: number[] = numbers
        .filter((v) => nmap.has(2020 - v))
        .map((v) => v * (2020 - v));
      const out2: number[] = [];

      numbers.forEach((v) => {
        numbers.forEach((v2) => {
          if (nmap.has(2020 - v - v2)) {
            out2.push(v * v2 * (2020 - v - v2));
          }
        });
      });

      setOutputPart1(Array.from(new Set(out1)).join(","));
      setOutputPart2(Array.from(new Set(out2)).join(","));
    }
  }, [userInput]);

  return (
    <>
      <textarea
        placeholder="input"
        onChange={(event) => setUserInput(event.target.value)}
        value={userInput}
      />
      <button onClick={run}>Run</button>
      <pre>{outputPart1}</pre>
      <pre>{outputPart2}</pre>
    </>
  );
};
