import { createContext, useEffect, useState } from "react";
import api from "../../api/api";
import { ethers } from "ethers";
const API = import.meta.env.VITE_API_BASE;

export const ContractContext=createContext(null);

const ContractProvider = ({children}) => {
    const [contractAddress, setContractAddress] = useState("");
    const [account, setAccount] = useState("");
    const hasMM = typeof window !== "undefined" && window.ethereum;

  async function loadInfoFromApi() {
    const { data } = await api.get(`${API}/api/controllers/contractInfo`);
    setContractAddress(data.contractAddress);
  }

  async function connect() {
    try {
      if (!hasMM) return alert("Установи MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());

    } catch (e) {
      console.error(e);
      alert(e?.message ?? e);
    }
  }

  async function deposit(amount) {
    try {
      if (!hasMM) return alert("Установи MetaMask");
      if (!contractAddress) return alert("Нет адреса контракта");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: amount
      });

      await tx.wait();
      return true;
    } catch (e) {
      console.error(e);
      alert(e?.reason || e?.message || e);
      return false;
    }
  }

  useEffect(() => {
    loadInfoFromApi().catch(console.error);

    
    if (hasMM) {
      window.ethereum.on("accountsChanged", () => connect());
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
   
  }, []);

    return (
       <ContractContext.Provider value={{account, setAccount,connect, deposit}}>
            {children}
       </ContractContext.Provider>
    );
}

export default ContractProvider;
