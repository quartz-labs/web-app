import styles from "./OtherViews.module.css";

export default function NoBetaKey() {
  return (
    <div className={"glass panel center-content"}>
      <div className={"central-container"}>
        <h1 className={styles.titleError}>No Quartz Pin beta key found in wallet</h1>
        <p>The private beta is currently only available to select members from our <a href="https://discord.gg/K3byNmnKNm" target="_blank" className={"no-wrap"}>Discord community</a>.</p>
        <p>If you've been given beta access, please ensure you're using the wallet where you received the beta key NFT.</p>
      </div>
    </div>
  );
}