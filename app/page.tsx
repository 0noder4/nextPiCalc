import PiCalculator from "@/components/PiCalculator/PiCalculator";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <PiCalculator />
    </div>
  );
}
