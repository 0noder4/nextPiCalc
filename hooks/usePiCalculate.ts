import { useCallback, useEffect, useRef, useState } from "react";

const usePiCalculate = (precision: number) => {
  const [piValue, setPiValue] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (isCalculating) {
      workerRef.current = new window.Worker("/workers/piWorker.js", {
        type: "module",
      });

      workerRef.current.postMessage({ precision });

      workerRef.current.onmessage = (event: MessageEvent<{ pi: number }>) => {
        setPiValue(event.data.pi);
        setIsCalculating(false);
      };

      workerRef.current.onerror = (error) => {
        console.error("Worker error:", error);
        setIsCalculating(false);
      };

      return () => {
        if (workerRef.current) {
          workerRef.current.terminate();
        }
      };
    }
  }, [isCalculating, precision]);

  const startCalculation = useCallback(() => {
    setIsCalculating(true);
  }, []);

  return { piValue, isCalculating, startCalculation };
};

export default usePiCalculate;
