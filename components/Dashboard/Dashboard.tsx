import { useStore } from "@/utils/store";

export default function Dashboard() {
  const isInitialized = useStore((state) => state.isInitialized);
  const health = useStore((state) => state.health);
  const prices = useStore((state) => state.prices);
  const balances = useStore((state) => state.balances);
  const rates = useStore((state) => state.rates);
  const withdrawLimits = useStore((state) => state.withdrawLimits);

  return (
    <>
      <div className={"glass panel"}>
        {isInitialized ? (
          <>
            <p>Health: {health}</p>
            <p>Prices: {JSON.stringify(prices)}</p>
          </>
        ) : (
          <p>Please connect wallet</p>
        )}
      </div>
      <div className={"glass panel"}>
        <p>Balances: {JSON.stringify(balances)}</p>
        <p>Rates: {JSON.stringify(rates)}</p>
        <p>Withdraw Limits: {JSON.stringify(withdrawLimits)}</p>
      </div>
    </>
  );
}
