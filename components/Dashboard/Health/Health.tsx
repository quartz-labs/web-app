import { useStore } from "@/utils/store";
import styles from "./Health.module.css";

export default function Health() {
    const { health } = useStore();

    return (
        <div>
            <p>Account Health: {health}%</p>
        </div>
    );
}