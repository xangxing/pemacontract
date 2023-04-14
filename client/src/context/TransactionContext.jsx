// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { contractABI, contractAddress } from "../utils/constants";

// export const TransactionContext = React.createContext();

// const { ethereum } = window;

// const getEthereumContract = () => {
//   const provider = new ethers.provider.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const transactionContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );
//   return transactionContract;
// };

// export const TransactionProvider = ({ children }) => {
//   const [currentAccount, setCurrentAccount] = useState();
//   const [formData, setFormData] = useState({
//     addressTo: "",
//     amount: "",
//     keyword: "",
//     message: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [transactionCount, setTransactionCount] = useState(
//     localStorage.getItem("transactionCount")
//   );

//   const handleChange = (e, name) => {
//     setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
//   };

//   const checkWalletIsConnected = async () => {
//     try {
//       if (!ethereum) return alert("Please install Meta Mask");
//       const accounts = await ethereum.request({ method: "eth_accounts" });
//       if (accounts.length) {
//         setCurrentAccount(accounts[0]);
//       } else {
//         console.log("No accounts found");
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error("No Ethereum Object");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!ethereum) return alert("Please install MetaMask");
//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.log(error);
//       throw new Error("No Ethereum Object");
//     }
//   };

//   const sendTransaction = async () => {
//     try {
//       if (!ethereum) return alert("Please install MetaMask");
//       const { addressTo, amount, keyword, message } = formData;
//       const transactionContract = getEthereumContract();
//       const parsedAmount = ethers.utils.parseEther(amount);

//       await ethereum.request({
//         method: "eth_sendTransaction",
//         params: [
//           {
//             from: currentAccount,
//             to: addressTo,
//             gas: "0x7a120", // 21000 gwei
//             value: parsedAmount._hex, // 0.00001
//           },
//         ],
//       });

//       const transactionHash = await transactionContract.addToBlockchain(
//         addressTo,
//         parsedAmount,
//         message,
//         keyword
//       );
//       setIsLoading(true);
//       console.log(`Loading - ${transactionHash.hash}`);
//       await transactionHash.wait();

//       setIsLoading(false);
//       console.log(`Success - ${transactionHash.hash}`);

//       const transactionCount = await transactionContract.getTransactionCount();

//       setTransactionCount(transactionCount.toNumber());
//     } catch (error) {
//       console.log(error);
//       throw new Error("No ethereum object");
//     }
//   };

//   useEffect(() => {
//     checkWalletIsConnected();
//   }, []);

//   return (
//     <TransactionContext.Provider
//       value={{
//         connectWallet,
//         currentAccount,
//         formData,
//         setFormData,
//         handleChange,
//         sendTransaction,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        throw new Error("MetaMask not detected");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error checking for connected wallet");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        throw new Error("MetaMask not detected");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Error connecting wallet");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = {
        to: addressTo,
        value: parsedAmount.toHexString(),
      };

      const signedTx = await ethereum.request({
        method: "eth_sendTransaction",
        params: [tx],
      });

      setIsLoading(true);
      console.log(`Loading - ${signedTx}`);

      await signedTx.wait();

      setIsLoading(false);
      console.log(`Success - ${signedTx}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
