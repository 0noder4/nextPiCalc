import { WorkerMessageT } from "@/types/workerMessageT";

const calculatePi = (precision: number): number => {
  let pi = 0;
  for (let i = 0; i < precision; i++) {
    pi += (4 * Math.pow(-1, i)) / (2 * i + 1);
  }
  return pi;
};

self.addEventListener("message", (event: MessageEvent<WorkerMessageT>) => {
  try {
    if (!event.data || typeof event.data.precision !== "number") {
      throw new Error("Invalid message format: precision must be a number");
    }

    const { precision } = event.data;

    if (precision <= 0 || !Number.isInteger(precision)) {
      throw new Error("Precision must be a positive integer");
    }

    const pi = calculatePi(precision);

    self.postMessage({ pi });
  } catch (error) {
    console.error("Worker error:", error);
    self.postMessage({ error: (error as Error).message });
  }
});
