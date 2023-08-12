import React, { useContext, useEffect } from "react";
import styles from "./Form.module.sass";
import cn from "classnames";

import CreateLendContext from "../../context/LendContext";

const Form = ({ profile }) => {
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
    currentListingOffers,
  } = useContext(CreateLendContext);

  const banks = [
    { name: "SBI", approved: false },
    { name: "HDFC", approved: false },
  ];

  const handleApproval = async () => {
    const response = await listNftToMarketplace(myNftForm);
    console.log("Handle listing response: ", response);
  };

  useEffect(() => console.log(myNftForm), [myNftForm]);

  return (
    <div className={styles.list_form}>
      <p style={{ letterSpacing: "0.5px" }}>DETAILS</p>

      <div className={styles.inputs}>
        <div className={styles.input}></div>

        <div className={styles.input}>
          <p className={styles.label}>Listing Id:</p>
          {profile ? (
            <div>
              <input
                type="number"
                className={styles.prof_input_number}
                placeholder="Enter NFT Id"
                min={0}
                id="nftId"
                onChange={(e) =>
                  setMyNftForm({ ...myNftForm, nftId: e.target.value })
                }
              />
            </div>
          ) : (
            <p className={styles.data}>0001</p>
          )}
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Owner:</p>

          <p className={styles.data}>
            {currentAccount ? currentAccount : "Connect your wallet"}
          </p>
        </div>
        <div className={styles.input}>
          <p className={styles.label}>Company Name</p>
        </div>

        {currentListingOffers.length >= 1 ? (
          currentListingOffers.map((element, index) => {
            return (
              <div
                className={styles.input}
                style={{
                  width: "90%",
                  display: " flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className={styles.label}>{element.name}</p>
                <button
                  className={cn("button")}
                  style={{
                    width: "30%",
                    height: "60%",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "300",
                  }}
                  onClick={async () => {
                    let response = await handleApproval(index);
                  }}
                >
                  {element.approved ? "Approved" : "Approve"}
                </button>
              </div>
            );
          })
        ) : (
          <div>No Offers yet</div>
        )}
      </div>
    </div>
  );
};

export default Form;
