import type { OnboardingPage } from "./Onboarding";
import styles from "./Onboarding.module.css";

export interface ProgressProps {
    page: OnboardingPage;
}

export default function Progress({ page }: ProgressProps) {
    return (
        <div className={`glass panel ${styles.progressPanel}`}>
            <TitleCard title="Account Creation" position={0} selected={page} />
            <TitleCard title="Personal Info" position={1} selected={page} />
            <TitleCard title="Regulatory Info" position={2} selected={page} />
            <TitleCard title="ID Photo" position={3} selected={page} />
            <TitleCard title="Account Permissions" position={4} selected={page} />
        </div>
    );
}

export interface TitleCardProps {
    title: string;
    position: number;
    selected: number;
}  

export function TitleCard({ title, position, selected }: TitleCardProps) {
    let className = undefined;
    if (selected === position) {
        className = styles.selected;
    } else if (selected < position) {
        className = styles.notReached;
    }

    return (
        <div className={`${styles.titleCard} ${className ?? ""}`}>
            <h1>{title}</h1>
        </div>
    );
}