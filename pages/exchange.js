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
    <div className="flex flex-col p-4 h-full w-full items-center rounded-3xl ">
      <label className="flex mb-4 font-medium text-2xl items-center justify-center color-[#fff]">
        Transfer
      </label>
      <h3 className="mb-2 text-[#50d71e] ">
        {/* Balance: {accBalance ? `${accBalance} ARV` : "Click Connect button"} */}
        Balance: {"Click Connect button"}
      </h3>

      <input
        type="text"
        className="bg-[#fff] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
          block p-2.5 mb-4 min-w-[300px]
          "
        placeholder="Recipient address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        className="bg-[#fff] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          p-2.5 mb-4 min-w-[300px]
          "
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
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg border bg-gray-900 border-gray-900 "
          onClick={() => {
            console.log("transfer");
          }}
        >
          <span className="relative px-5 py-2.5 rounded-md ">Transfer</span>
        </button>
      )}
    </div>
  );
};

export default Exchange;
