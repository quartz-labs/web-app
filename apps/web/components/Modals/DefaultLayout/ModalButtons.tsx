import { PuffLoader } from "react-spinners";
import styles from "./DefaultLayout.module.css";

interface ModalButtonsProps {
  label: string;
  awaitingSign: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalButtons({ label, awaitingSign, onConfirm, onCancel }: ModalButtonsProps) {
  return (
    <div className={styles.buttons}>
      <button className={`glass-button ${styles.mainButton}`} onClick={onConfirm}>
        {awaitingSign && <PuffLoader color={"#ffffff"} size={30} aria-label="Loading" data-testid="loader" />}

        {!awaitingSign && <p>{label}</p>}
      </button>
      <button className={`glass-button ghost ${styles.mainButton}`} onClick={() => onCancel()}>
        Cancel
      </button>
    </div>
  );
}
