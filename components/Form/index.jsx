import React, { useContext, useEffect, useState } from "react";
import styles from "./Form.module.sass";
import cn from "classnames";

import CreateLendContext from "../../context/LendContext";

const Form = ({ profile }) => {
  const {
    wishlistForm,
    setWishlistForm,
    listClicked,
    setListClicked,
    myListForm,
    setMyListForm,
    currentAccount,
    listCompany,
    estAmt,
  } = useContext(CreateLendContext);

  const [selectedFile, setSelectedFile] = useState();
  const handleListing = async () => {
    const response = await listCompany(myListForm);
    console.log("Handle listing response: ", response);
  };

  return (
    <div className={styles.list_form}>
      <p style={{ letterSpacing: "0.5px" }}>DETAILS</p>

      <div className={styles.inputs}>
        <div className={styles.input}></div>

        <div className={styles.input}>
          <p className={styles.label}>Listing Id:</p>
          <p className={styles.data}>0001</p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Owner:</p>

          <p className={styles.data}>
            {currentAccount ? currentAccount : "Connect your wallet"}
          </p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Company Name:</p>
          <input
            className={styles.dataInputtext}
            type="text"
            id="name of company"
            onChange={(e) => {
              //according to  context
              setMyListForm({ ...myListForm, companyName: e.target.value });
            }}
          ></input>
        </div>

        <div className={styles.input}>
          <p className={styles.label}>Company discription:</p>
          <input
            className={styles.dataInputtext}
            type="text"
            id="discription of company"
            onChange={(e) => {
              setMyListForm({ ...myListForm, description: e.target.value });
            }}
          ></input>
        </div>

        <div className={styles.input}>
          <p className={styles.label}>Loan Amount:</p>
          <input
            className={styles.dataInput}
            type="number"
            id="loan amount"
            onChange={(e) => {
              setMyListForm({ ...myListForm, loanAmt: e.target.value });
            }}
          ></input>
        </div>

        <div className={styles.input}>
          <p className={styles.label}>Required documents:</p>
          <input
            className={styles.dataInputfile}
            type="file"
            id="required documents"
            onChange={(e) => {
              console.log("Selected file: ", e.target.files[0].name);
              setSelectedFile(e.target.files[0]);
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
          style={{ width: "50%", textAlign: "center" }}
          onClick={async () => {
            let response = await handleListing();
            console.log("Response to listing: ", response);
            console.log("List clicked");
          }}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default Form;
