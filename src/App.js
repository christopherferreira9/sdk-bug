import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import MetaMaskSDK from "@metamask/sdk"
import { useState, useEffect } from "react";

import './App.css';

new MetaMaskSDK({
  useDeeplink: false,
  communicationLayerPreference: "socket",
});

const toAddress = "0x849b125D48a5606d9785F95Fd88d23f4B5Ed8e14";

function App() {
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

  const connect = async () => {
    await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      })
  };

  const switchEthereumChain = async () => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x5',
          },
        ],
      });
  };

  const sendGoodTransaction = async () => {
    const to = toAddress;
    const transactionParameters = {
      to, 
      from: window.ethereum.selectedAddress, 
      value: "0xD8D726B7177A80000", 
    };
        console.log(transactionParameters)

    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    window.ethereum.on("chainChanged", (chain) => {
      setChain(chain);
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts?.[0]);
    });
  });


  return (
    <div className="App">
      <div className="one">
        <h1>Bug Dapp</h1>
        <hr />

        <h2>Account: </h2> 
        {account}
        <p></p>
        <h2>Chain: </h2> 
        {chain}
        
        <p></p>
        <h2>Last request response: </h2> {response}
      </div>

      <div className="two">
        <h1>Operations</h1>
        <hr />
        <div id="account-chain-management">
          <Button variant={account ? "success" : "warning"} style={{marginRight: "10px"}} id="connect-button" onClick={connect}>
            {account ? "Connected" : "Connect"}
          </Button>

          {
          (account)
            ? <Button style={{marginLeft: "10px"}} onClick={switchEthereumChain}>
              Switch Chain
            </Button>
            : <div>  </div> 
          }
        </div>

        <hr />
          {
            (account)
            ? <div id ="working-tx">
                <h2>Payload:</h2>
                <p><b>From: </b> {window.ethereum.selectedAddress}</p>
                <p><b>To:</b> {toAddress}</p>
                <p><b>Method: </b> eth_sendTransaction</p> 
                <p><b>Value: </b> 0xD8D726B7177A80000 -{'>'} {parseInt("0xD8D726B7177A80000", 16)} ETH</p>
                <Button onClick={sendGoodTransaction}>Send Transaction</Button>
              </div>
            : <div>  </div>
          }

      </div>
    </div>
  );
}

export default App;
