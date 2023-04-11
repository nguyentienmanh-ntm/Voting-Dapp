import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client"
import axios from "axios";
import { useRouter } from "next/router";

//
import { VotingAddress, VotingAddressABI } from "./Constants";

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const projectId = "PROJECT IT";
const projectSecretKey = "SECRECT KEY";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "SUBDOMAIn";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});



const fetchContract = (signerOrProvider) =>
    new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
    const router = useRouter()
    const [currentAccount, setCurrentAccount] = useState('')
    const [candidateLength, setCandidateLenth] = useState('')
    const pushCandidate = []
    const candidateIndex = []
    const [candidateArray, setCandidateArray] = useState(pushCandidate)

    //end info 

    const [error, setError] = useState('')
    const higestVote = []

    // voter section
    const pushVoter = []
    const [voterArray, setVoterArray] = useState(pushVoter)
    const [voterLenth, setVoterLength] = useState('')
    const [voterAddress, setVoterAddress] = useState([])

    // conecting  metamask
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setError("Please Install Metamask")

        const account = await window.ethereum.request({ method: "eth_accounts" })

        if (account.length) {
            setCurrentAccount(account[0])
        } else {
            setError("please Install Metamask & Connect, Reload")
        }
    }

    // connect wallet
    const connectWallet = async () => {
        if (!window.ethereum) return setError("please Install MetaMask")

        const account = await window.ethereum.request({
            method: "eth_requestAccounts"
        })

        setCurrentAccount(account[0])

    }

    // upload ipfs voter image
    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file })

            // const url = `http://ipfs.infura.io.ipfs/${added.path}`
            const url = `${subdomain}/ipfs/${added.path}`;
            return url
        } catch (error) {
            setError("Error Uploading file to IPFS")
        }
    }

    const createdVoter = async (formInput, fileUrl, router) => {
        try {
            const { name, address, position } = formInput

            if (!name || !address || !position) {
                return console.log("Input data is missing")
            }

            //conecting smart contract
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            console.log(contract)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <VotingContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                createdVoter

            }}
        >
            {children}
        </VotingContext.Provider>
    )
}

