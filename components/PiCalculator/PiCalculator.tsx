"use client";

import React, { useState } from "react";
import Link from "next/link";
import usePiCalculate from "@/hooks/usePiCalculate";

import styles from "./PiCalculator.module.scss";

import CopyIcon from "@/public/icons/content_copy.svg";

const PiCalculator: React.FC = () => {
  const [precision, setPrecision] = useState<number>(10000);
  const { piValue, isCalculating, startCalculation } =
    usePiCalculate(precision);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(piValue));
      alert("Pi value copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Next Pi Calculator</h1>
      <p className={styles.description}>
        Calculate Pi using the Gregory-Leibniz Series. Set the length of the
        series below. Check the algorithm proof{" "}
        <Link
          href="https://crypto.stanford.edu/pbc/notes/pi/glseries.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </Link>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startCalculation();
        }}
        className={styles.form}
      >
        <input
          type="number"
          value={precision}
          min={1}
          onChange={(e) => setPrecision(Number(e.target.value))}
          aria-label="Precision"
        />
        <button
          type="submit"
          disabled={isCalculating}
          aria-busy={isCalculating}
        >
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </form>

      <div className={styles.result}>
        <h2>Result: {piValue ?? "..."}</h2>
        {piValue && (
          <button
            onClick={handleCopy}
            className={styles.copy}
            aria-label="Copy Pi value"
          >
            <CopyIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default PiCalculator;
