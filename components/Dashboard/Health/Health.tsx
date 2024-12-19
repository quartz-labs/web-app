import { useStore } from "@/utils/store";
import styles from "./Health.module.css";
import type React from "react";
import { rgb } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function Health() {
    const { health } = useStore();

    const COLOR_BOUNDARIES = [10, 20, 30] as const;
    const COLORS = ["FF8080", "E88F20", "ffffff"] as const;

    const getHealthColor = () => {
        const COLORS_RGB = [rgb(COLORS[0]), rgb(COLORS[1]), rgb(COLORS[2])] as const;
        
        if (!health) return COLORS_RGB[2];
        if (health <= COLOR_BOUNDARIES[0]) {
            return `rgba(${COLORS_RGB[0].r}, ${COLORS_RGB[0].g}, ${COLORS_RGB[0].b})`;
        } else if (health <= COLOR_BOUNDARIES[1]) {
            // Blend between first and second color
            const ratio = (health - COLOR_BOUNDARIES[0]) / (COLOR_BOUNDARIES[1] - COLOR_BOUNDARIES[0]);
            return `rgb(${Math.round(COLORS_RGB[0].r + (ratio * (COLORS_RGB[1].r - COLORS_RGB[0].r)))}, 
                        ${Math.round(COLORS_RGB[0].g + (ratio * (COLORS_RGB[1].g - COLORS_RGB[0].g)))}, 
                        ${Math.round(COLORS_RGB[0].b + (ratio * (COLORS_RGB[1].b - COLORS_RGB[0].b)))})`;
        } else if (health <= COLOR_BOUNDARIES[2]) {
            // Blend between second and third color
            const ratio = (health - COLOR_BOUNDARIES[1]) / (COLOR_BOUNDARIES[2] - COLOR_BOUNDARIES[1]);
            return `rgb(${Math.round(COLORS_RGB[1].r + (ratio * (COLORS_RGB[2].r - COLORS_RGB[1].r)))}, 
                        ${Math.round(COLORS_RGB[1].g + (ratio * (COLORS_RGB[2].g - COLORS_RGB[1].g)))}, 
                        ${Math.round(COLORS_RGB[1].b + (ratio * (COLORS_RGB[2].b - COLORS_RGB[1].b)))})`;
        } else {
            return `rgba(${COLORS_RGB[2].r}, ${COLORS_RGB[2].g}, ${COLORS_RGB[2].b})`;
        }
    };

    const color = getHealthColor();

    return (
        <div className={styles.healthWrapper}>
            <p>Account Health: {(health !== undefined) ? `${health}%` : "--"}</p>
            <progress
                value={health}
                max={100}
                className={styles.healthBar}
                style={{
                    "--healthColor": color,
                    "--glowColor": (health) ? color : "transparent",
                    "--bgColor": (health) ? "#ffffff1a" : `#${COLORS[0]}1a`,
                } as React.CSSProperties}
            />
        </div>
    );
}