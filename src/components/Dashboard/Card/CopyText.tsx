import styles from "./Card.module.css";

interface CopyTextProps {
    text: string;
}

export default function CopyText({ text }: CopyTextProps) {
    return (
        <button 
            className={styles.copyText}
            title="Copy to clipboard"
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
        >
            <p>{text}</p>
        </button>
    );
}