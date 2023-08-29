import React, { Component, useState, useEffect } from "react";
// import TokenSwap from "./contracts/TokenSwap.json";
import tokenSwap from "./contracts/TokenTrade.json";
import Unicorn from "./contracts/unicorn.json";
import Keppler from "./contracts/keppler.json";

import getWeb3 from "./getWeb3";

import TokenSwapScreen from "./components/TokenSwapScreen";
import "./App.css";
import Particles from "react-tsparticles";
console.log(tokenSwap)
function App() {
      const [web3, setweb3] = useState(null);
     const [accounts, setaccounts] = useState([]);
     const [networkId, setNetworId] = useState(null);
    const [deployedNetwork, setDeployedNetwork] = useState(null);
    const [contracts, setContracts] = useState(null);
   

     console.log(Unicorn);
     useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        //shoudl check wether metamsk is connected to the desired network or not, if not ask the user to sitch networks

        // Use web3 to get the user's accounts.
        const metaMaskAccounts = await web3.eth.getAccounts();
        console.log(metaMaskAccounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        console.log(networkId)

        // const deployedNetworkTokenSwap = TokenSwap.networks[networkId];
        const deployedNetworktokenSwap = tokenSwap.networks[networkId];

        const deployedNetworkUnicorn = Unicorn.networks[networkId];
        console.log(deployedNetworkUnicorn)
        const deployedNetworkKeppler = Keppler.networks[networkId];
            console.log(deployedNetworkKeppler);
       
         const instance = new web3.eth.Contract(
         tokenSwap.abi,
          deployedNetworktokenSwap && deployedNetworktokenSwap.address
        );

      
         const instance4 = new web3.eth.Contract(
          Unicorn.abi,
          deployedNetworkUnicorn && deployedNetworkUnicorn.address
        );
           const instance5 = new web3.eth.Contract(
          Keppler.abi,
          deployedNetworkKeppler && deployedNetworkKeppler.address
        );

        
        const arr = [instance, instance4, instance5];
          console.log(arr);
  

        setweb3(web3);
        setDeployedNetwork(deployedNetwork);
        setaccounts(metaMaskAccounts);
        setNetworId(networkId);
        setContracts(arr);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const load = async () => {
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log("accountsChanges", accounts);
        setaccounts(accounts);
        window.location.reload();
      });
    };
    if (web3 && accounts) {
      load();
    }
  }, [web3, contracts, accounts]);

  if (!web3) {
    return( 
      <React.Fragment>
        <div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
          <div class="spinner-grow" style={{width: "6rem", height: "6rem"}} role="status">
          </div>
        </div>
      </React.Fragment>
    )
        
  }


    else {
      console.log("contracts from app");
      console.log(contracts);
      return (
        <React.Fragment>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "#0e7569",
                },
              },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "grab",
                  },
                  resize: true,
                },
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                  },
                  push: {
                    quantity: 2,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                  value: 50,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: true,
            }}
          />
          <TokenSwapScreen
            Web3={web3}
            Contracts={contracts}
            Accounts={accounts}
          ></TokenSwapScreen>
        </React.Fragment>
      );
    }
  
// return <div className="App"></div>;
  
}

export default App;