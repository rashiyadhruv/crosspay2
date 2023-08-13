import styles from "./styles/Exchange.module.sass";
import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
const Exchange = () => {
  //   const {
  //     tokenTransfer,
  //     connectWallet,
  //     setAddress,
  //     setAmount,
  //     getOwner,
  //     getTokenInfo,
  //     getTotalSupply,
  //     setMintAmount,
  //     mint,
  //     checkEvent,
  //     owner,
  //     totalSupply,
  //     info,
  //     mintAmount,
  //     currentAccount,
  //     accBalance,
  //     loading,
  //     getAccBalance,
  //   } = useContext(TokenContext);

  //   useEffect(() => {
  //     getAccBalance();
  //   }, []);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <label className={styles.title}>Transfer</label>

        <input
          type="text"
          className={styles.input}
          placeholder="Recipient address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          className={styles.input}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        {loading ? (
          <TailSpin
            height="60"
            width="60"
            color=" #ff52d8"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          // <TransferBtn title="Send" handleClick={tokenTransfer} />
          <button
            className={styles.btn}
            onClick={() => {
              console.log("transfer");
            }}
          >
            <span className="relative px-5 py-2.5 rounded-md ">Transfer</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Exchange;
