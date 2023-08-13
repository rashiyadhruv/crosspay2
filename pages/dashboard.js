import React from "react";
import styles from "./styles/Dashboard.module.sass";
import Layout from "../components/Layout";

const Dashboard = () => {
  const data = [
    {
      from: "0x85c...AbB2",
      to: "0x85c90217E502f59231e7D240022F57CBaE04AbB1",
      amount: "0.0001",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x167...AbB2",
      to: "0x81c90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0003",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x167...AbB2",
      to: "0x85e90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0003",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x85c...AbB2",
      to: "0x85c90217E502f59231e7D240022F57CBaE04AbB1",
      amount: "0.0001",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x85c...AbB2",
      to: "0x85c90217E502f59231e7D240022F57CBaE04AbB1",
      amount: "0.0001",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x85c...AbB2",
      to: "0x85c90217E502f59231e7D240022F57CBaE04AbB1",
      amount: "0.0001",
      status: "completed",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x167...AbB2",
      to: "0x25c90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0003",
      status: "pending",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "receive",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x164...AbB2",
      to: "0x45c90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0003",
      status: "pending",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "receive",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x164...AbB2",
      to: "0x35c90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0023",
      status: "pending",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
    {
      from: "0x164...AbB2",
      to: "0x15c90217E502f59231e7D240022F57CBaE04AbB2",
      amount: "0.0043",
      status: "pending",
      chain_from: "ETH",
      chain_to: "BSC",
      type: "send",
      explorer: "https://etherscan.io/tx/0x1234",
    },
  ];

  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.title}>History</div>
          {data
            .filter((it) => {
              if (it.status === "completed") return it;
            })
            .map((item, index) => {
              return (
                <div className={styles.itemwrap} key={index}>
                  <div className={styles.item__to}>{item.to}</div>
                  <div className={styles.item__amount}>{item.amount}</div>
                  <div
                    className={styles.item__chain}
                  >{`${item.chain_from}->${item.chain_to}`}</div>
                  <a href={item.explorer} className={styles.item__explorer}>
                    explorer
                  </a>
                </div>
              );
            })}
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Pending send</div>
          {data
            .filter((it) => {
              if (it.status === "pending" && it.type === "send") return it;
            })
            .map((item, index) => {
              return (
                <div className={styles.itemwrap} key={index}>
                  <div className={styles.item__to}>{item.to}</div>
                  <div className={styles.item__amount}>{item.amount}</div>
                  <div
                    className={styles.item__chain}
                  >{`${item.chain_from}->${item.chain_to}`}</div>
                  <button className={styles.item__explorer_btn}>Approve</button>
                </div>
              );
            })}
        </div>
        <div className={styles.card}>
          <div className={styles.title}>Pending receive</div>
          {data
            .filter((it) => {
              if (it.status === "pending" && it.type === "receive") return it;
            })
            .map((item, index) => {
              return (
                <div className={styles.itemwrap} key={index}>
                  <div className={styles.item__to}>{item.to}</div>
                  <div className={styles.item__amount}>{item.amount}</div>
                  <div
                    className={styles.item__chain}
                  >{`${item.chain_from}->${item.chain_to}`}</div>
                  <button className={styles.item__explorer_btn}>Request</button>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
