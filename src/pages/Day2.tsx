import { useCallback, useState } from "react";
import * as React from "react";

export const Day2 = () => {
  const [userInput, setUserInput] = useState<string | undefined>();
  const [outputPart1, setOutputPart1] = useState<string | undefined>();
  const [outputPart2, setOutputPart2] = useState<string | undefined>();

  const run = useCallback(() => {
    if (userInput) {
      const parsed = userInput
        .trim()
        .split("\n")
        .map((line) => {
          const [conf, password] = line.split(":");
          const [minmax, c] = conf.split(" ");
          const [min, max] = minmax.split("-");
          return {
            min: parseInt(min),
            max: parseInt(max),
            c,
            password: password.trim(),
          };
        });

      const out1 = parsed.filter((elm) => {
        const count = elm.password.split("").filter((a) => a === elm.c).length;
        return elm.min <= count && count <= elm.max;
      }).length;
      const out2 = parsed.filter((elm) => {
        return (
          (elm.password.charAt(elm.min - 1) == elm.c) !==
          (elm.password.charAt(elm.max - 1) == elm.c)
        );
      }).length;

      setOutputPart1(out1.toString());
      setOutputPart2(out2.toString());
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
