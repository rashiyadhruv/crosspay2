import React, { createContext, useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import Web3Modal from "web3modal";

import { useRouter } from "next/router";
import TransLendAbi from "./Translend.json"

const CreateLendContext = createContext({});

const contractAddress="0x6eb8D12d2B883265F006a162Eb803986c1b13d6C"
const contractAbi = TransLendAbi.abi;

export const CreateLendProvider = ({ children }) => {
  const route = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");

  const [myListForm, setMyListForm] = useState({
    companyName: "",
    description: "",
    loanAmt: "",
    docs: "",
  });

  const [currOffer, setCurrOffer] = useState("")

  const [allListings, setAllListings] = useState([]);
  const [allBidings, setAllBidings] = useState([]);
  const [currentListingOffers, setCurrentListingOffers] = useState([]);
  const [newBid, setNewBid] = useState(0);

  const [wishlistForm, setWishlistForm] = useState({
    tenure: "",
    apy: "",
  });
  const [listClicked, setListClicked] = useState(false);
  const [myNfts, setMyNfts] = useState([]);
  const [lenderList, setLenderList] = useState([]);
  const [borrowerList, setBorrowerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeObject, setActiveObject] = useState({
    title: "",
    image: "",
    escrowId: "",
    amount: "",
    tenure: "",
    apy: "",
    borrower: "",
    accepted: "",
    isInsuared: "",
    lender: "",
    nftAddress: "",
    nftId: "",
  });
  const [database, setDatabase] = useState();
  const [tablename, setTablename] = useState();
  const [tabledata, setTabledata] = useState({
    key: "",
    value: "",
  });

  useEffect(() => {
    (async () => {
      await getAllMyListingss();
      await getAllBidings();
    })();
  }, []);

  const getListingOffers = async (listingId) => {
    let results = [], listing;
    let userAddress;

    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      
      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        userAddress = accounts[0];
      }
      
      const txRes = await contract.getListingsOfferDetails(listingId);
      console.log("Listing offers: ", txRes);

      txRes.map((element, index) => {
        listing = {
          name: element.name,
          approved: element.approved
        }

        results.push(listing);
      })

      setCurrentListingOffers(results)

      return results;
    }
  }

  const getAllBidings = async () => {
    let results = [], listing;
    let userAddress;

    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      
      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        userAddress = accounts[0];
      }
      
      const txRes = await contract.getAllBidings();
      console.log("All Bidings: ", txRes);

      txRes.map((details, index) => {
        listing = {
          id: Number(details.id._hex),
          companyName: details.companyName,
          description: details.description,
          loanAmt: Number(details.loanAmt._hex),
          docs: details.docs,
          owner: details.owner,
          bidingStatus: details.bidingStatus,
          currentInterestBid: Number(details.currentInterestBid._hex)
        }

        results.push(listing);
        listing={}
      })

      setAllBidings(results);
      console.log("Formatted Bidings: ", results);
    }
  }

  const getAllMyListingss = async () => {
    let results = [], listing;
    let userAddress;

    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      
      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        userAddress = accounts[0];
      }
      
      const txRes = await contract.getMyListings(userAddress);
      console.log("My listings: ", txRes);

      txRes.map((details, index) => {
        listing = {
          id: Number(details.id._hex),
          companyName: details.companyName,
          description: details.description,
          loanAmt: Number(details.loanAmt._hex),
          docs: details.docs,
          owner: details.owner,
          bidingStatus: details.bidingStatus,
          currentInterestBid: Number(details.currentInterestBid._hex)
        }

        results.push(listing);
        listing={}
      })

      setAllListings(results);
      console.log("Formatted Listing: ", results);
    }
  }

  const listCompany = async ({companyName, description, loanAmt, docs=""}) => {
    let user;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts[0]);
          user = accounts[0];
        }

        // string memory _companyName, string memory _description, uint256 _loanAmt, string memory _docs
        const txRes = await contract.listCompany(
          companyName, description, loanAmt, docs,
          {
            gasLimit: 500000000,
          }
        );

        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);

        route.push("/listings");

        console.log(txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while listing Offer!");
    }
  };

  const requestDocApproval = async (listingId, name) => {
    let user;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts[0]);
          user = accounts[0];
        }

        // string memory _companyName, string memory _description, uint256 _loanAmt, string memory _docs
        const txRes = await contract.requestDocuments(
          listingId, name,
          {
            gasLimit: 500000000,
          }
        );

        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);

        route.push("/biddings");

        console.log(txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while requesting approval!");
    }
  };

  const bidListing = async (listingId, newBid) => {
    let user;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts[0]);
          user = accounts[0];
        }

        const txRes = await contract.bid(
          listingId, newBid,
          {
            gasLimit: 500000000,
          }
        );

        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);

        route.push("/biddings");

        console.log("New bid: ", txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while bidding!");
    }
  };

  const approveAnOffer = async (listingId, index) => {
    let user;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts[0]);
          user = accounts[0];
        }

        const txRes = await contract.approveOffer(
          listingId, index,
          {
            gasLimit: 500000000,
          }
        );

        setIsLoading(true);
        await txRes.wait(1);
        setIsLoading(false);

        console.log("New approval: ", txRes);
        return true;
      }
    } catch (error) {
      console.log(error);
      alert("Error while approving!");
    }
  };

  return (
    <CreateLendContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        listCompany,
        setMyListForm,
        myListForm,
        setAllListings,
        allListings,
        getListingOffers,
        currentListingOffers,
        setCurrentListingOffers,
        allBidings,
        setCurrOffer,
        currOffer,
        newBid,
        setNewBid,
        requestDocApproval,
        bidListing,
        approveAnOffer
      }}
    >
      {children}
    </CreateLendContext.Provider>
  );
};

export default CreateLendContext;
