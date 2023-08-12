import React, { useContext, useEffect } from "react";
import styles from "./Form.module.sass";
import cn from "classnames";

import CreateLendContext from "../../context/LendContext";

const Form2 = ({ profile, offer }) => {
  const {
    wishlistForm,
    setWishlistForm,
    listClicked,
    setListClicked,
    myNftForm,
    setMyNftForm,
    currentAccount,
    listNftToMarketplace,
    estAmt,
    setNewBid,
    newBid,
    setCurrOffer,
    currOffer,
    requestDocApproval,
    myListForm,
  } = useContext(CreateLendContext);

  const [instname, setInstname] = React.useState("");
  const [bid, setBid] = React.useState(0);

  const handleRequestApproval = async () => {
    setCurrOffer(instname);
    const response = await requestDocApproval(offer.id, currOffer);
  };

  const handleBid = async () => {
    setCurrOffer(instname);
    setNewBid(bid);
    const response = await requestDocApproval(offer.id, instname);
  };

  useEffect(() => console.log("df", myNftForm), [myNftForm]);

  return (
    <div className={styles.list_form}>
      <p style={{ letterSpacing: "0.5px" }}>Bid</p>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <p className={styles.data}>{offer.id}</p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Owner:</p>
          <p className={styles.data}>{offer.owner}</p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Company Name:</p>
          <p className={styles.data}>{offer.companyName}</p>
        </div>

        <div className={styles.input}>
          <p className={styles.label}>Discription:</p>
          <p className={styles.data}>{offer.description}</p>
        </div>

        <div className={styles.input}>
          <p className={styles.label}>Institution Name: </p>
          <input
            className={styles.dataInputtext}
            type="text"
            id="discription of company"
            onChange={(e) => {
              setInstname(e.target.value);
            }}
          ></input>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button
            className={cn("button")}
            style={{ width: "50%", height: "40px", textAlign: "center" }}
            onClick={() => {
              let response = handleRequestApproval();
            }}
          >
            Request Documents
          </button>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Loan Amount:</p>
          <p className={styles.data}>{offer.loanAmt}</p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Current Interest Bid:</p>
          <p className={styles.data}>
            {offer.currentInterestBid == 10000
              ? "No bid"
              : offer.currentInterestBid}
          </p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Your Interest Bid:</p>
          <input
            className={styles.dataInput}
            type="number"
            id="discription of company"
            onChange={(e) => {
              setBid(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          className={cn("button")}
          style={{ width: "50%", height: "40px", textAlign: "center" }}
          onClick={() => {
            handleBid();
          }}
        >
          Bid
        </button>
      </div>
    </div>
  );
};

export default Form2;
