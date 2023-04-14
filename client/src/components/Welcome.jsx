import React, { useState, useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../context/TransactionContext";

import { Loader } from "./";
const commonStyles =
  "min-h-[70px] px-2 min-w-[150px] flex justify-center items-center border-4 border-gray-400 text-sm font-bold text-black";

const Input = ({ placeholder, name, type, value, handleChange, className }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className={`my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-small white-glassmorphism placeholder-bold-orange font-bold ${className}`}
  />
);

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);
  // console.log(value);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-5">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            TRANSACT ETH ACROSS BHUTAN
          </h1>
          <p className="text-left mt-5 text-white font-bold md:w-9/12 w-11/2 text-base ">
            WELCOME TO THE PEMACHAIN WHERE YOU CAN SEND AND RECEIVE ETH
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-bold"> ConnectWallet</p>
            </button>
          )}
          <div className="grid grid-cols-3 gap-4 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>TRANSPARENT</div>
            <div className={commonStyles}>SECURED</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>PUBLIC</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>IMMUTABLITY</div>
            <div className={commonStyles}>LOW FEES </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>WEB3</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <FaEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Address</p>
                <p className="text-white font-bold text-lg mt-1">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-star items-center blue-glassmorphism">
            <Input
              placeholder="AddressTo"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-pink-200 w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer  hover:bg-[#2546bd]"
              >
                SEND ETHEREUM 24/7
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
