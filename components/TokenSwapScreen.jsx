// import TokenSwap from "../contracts/TokenSwap.json";
import React,{useState,useEffect} from 'react'
import Keppler from "../contracts/keppler.json";
import tokenSwap from "../contracts/TokenTrade.json";
import Unicorn from "../contracts/unicorn.json";
export default function TokenSwapScreen({Web3,Contracts,Accounts}) {

const [switchAmount, setSwitchAmount] = useState(
);


const [tokenABalance, setTokenABalance] = useState(0);
const [tokenXBalance, setTokenXBalance] = useState(0);
const [tokenSwapAddress, setTokenSwapAddress] = useState(0);


const web3 =Web3;
let contracts = Contracts;
let accounts= Accounts;
let addresss1 ='0xcf336EA09481f6A211bA5226e1E1A9b703FF75B3';
let addresss2 ='0xC69bE8c751e72577176856e9Df4cBD21a3d8b569';
let wallet = '0x5148912CB6Bb7404Cd7d8328A68450B5CE76c679';
let  address3 = '0x8ba5FC93f63367A60606B445B3f52490fd127E2B';

    //Run only once
    useEffect(async ()=>
    {        
        const networkId = await web3.eth.net.getId();
        console.log("network ID:::"+networkId);
        const deployedNetworktokenSwap = tokenSwap.networks[networkId];
        console.log("depoyedNetworkTokensSwap:::",deployedNetworktokenSwap);
        setTokenSwapAddress(deployedNetworktokenSwap.address);
        await getBalances();

    },[]);

    useEffect(()=>{
      
    
    },[switchAmount]);

     const getBalances = async() =>
    {

       
          const tokenInst = new Web3.eth.Contract(Unicorn.abi,addresss1);
           const balance =  Web3.utils.fromWei(await tokenInst.methods.balanceOf(wallet).call(),'ether');
               
                setTokenABalance(parseInt(balance));  
    
          const tokenInsta = new Web3.eth.Contract(Keppler.abi,addresss2);
           const balances =  Web3.utils.fromWei(await tokenInsta.methods.balanceOf(wallet).call(),'ether');
           
             setTokenXBalance(parseInt(balances));
             
         
  }
  const  approve = async() =>
  {
  const tokenInst = new Web3.eth.Contract(Unicorn.abi,addresss1);
      const receipt = await tokenInst.methods.approve(tokenSwapAddress,Web3.utils.toWei(switchAmount,'ether')).send({from:accounts[0]},function(error,result){
          console.log(result);
      });
      console.log(receipt);
  }
    const swapTokens = async()=>
    {
    
      const tekken = new Web3.eth.Contract(tokenSwap.abi,address3);
     const result =  await tekken.methods.swap(Web3.utils.toWei(switchAmount,'ether')).send({from:accounts[0]},function(error,result) {
          console.log(result);
       
       }); 
      
       console.log(result); 
        
    }     
           
         

    return (
        <div class="container mt-5">
        <nav class ="navbar navbar-expand-lg navbar-light bg-dark rounded-3 ">
            <div class="container-fluid">
            <h1 class="text-light">TokenSwap</h1>
            <label class="badge bg-primary fs-4 rounded">Unicorn Balance: {tokenABalance} Tokens</label>
            <label class="badge bg-primary fs-4 rounded">Keppler Balance: {tokenXBalance} Tokens</label>
                  
            </div>
        </nav>
        <div class="d-flex mt-3 input-group">
          
        </div>  


            <div class="input-group mt-3">
            <div class="input-group mt-5">
            <input class="form-control" placeholder="Amount" type="number" onChange={(evt)=>{setSwitchAmount(evt.target.value)}}></input>
              <button class="btn-success text-center form-control" type="submit" onClick={()=>{approve()}}>Approve</button>
            <button class="btn-warning form-control" onClick={()=>{swapTokens()}}>Swap</button>
            </div>      </div>
        </div>
    )
}
























































// // console.log(TokenSwap);
// const web3 =Web3;
// let contracts = Contracts;
// console.log(contracts)
// let accounts= Accounts;
// // console.log(accounts);
// let addresss1 ='0xcf336EA09481f6A211bA5226e1E1A9b703FF75B3';
// let addresss2 ='0xC69bE8c751e72577176856e9Df4cBD21a3d8b569';
//     //Run only once
//     let wallet = '0x5148912CB6Bb7404Cd7d8328A68450B5CE76c679';
   
//     useEffect(async () =>
//     {        
//         const networkId = await web3.eth.net.getId();
//         console.log("network ID:::"+networkId);
//         const deployedNetworktokenSwap = tokenSwap.networks[networkId];
//         console.log("depoyedNetworkTokensSwap:::",deployedNetworktokenSwap);
//         setTokenSwapAddress(deployedNetworktokenSwap.address);
//         // console.log(TokenSwapAddress);
         
//         // await updateBalance();

//     },[]);

//     useEffect(()=>{
//         // calculateSwap();
//     },[switchAmount])

//    
  

// let finalAmount;
//     const swapTokens = async()=>
//     {
//         if(finalAmount > 0)
//         {
//             console.log("tokenselcted::",tokenSelected);
//             if(tokenSelected ==="ABC")
//             {
//                 const receipt = await contracts[1].methods.approve(tokenSwap.Address,switchAmount).send({from:accounts[0]},function(error, transactionHash){
//     console.log(transactionHash);

// });
                
//             }
           
//         } if(tokenSelected ==="XYZ")
//             {
//                 const receipt = await contracts[2].methods.approve(tokenSwap.Address,switchAmount).send({from:accounts[0]},function(error, transactionHash){
//     console.log(error);

// });
//     } else {
//         console.log("you came right")
//     }
// }  
// // const calculateSwap=()=>
// // {
// //     let Final;
// //     if(tokenSelected==="ABC")
// //    {
// //         const exchangeA= parseInt(switchAmount) 
// //         // Final= exchangeA - ((exchangeA * fees)/100);
// //     }
// //     else
// //     {
// //         const exchangeA = switchAmount ;
// //         // Final = exchangeA-((exchangeA *fees)/100);
// //     }
// //     if(isNaN(Final))
// //     {
// //         setFinalAmount(0);
// //     }else
// //     {
// //         setFinalAmount(Math.ceil(Final));
// //     }
// // }
// //  const  buyTokensABC = async ()=>
// //     {
// //         try
// //         {
// //             const receipt = await contracts[1].methods.buyTokens(numOfTokenA).send({from:accounts[0]});
// //         }
// //         catch(err)
// //         {
// //             alert("Transaction Failed due to the following Error"+err);
// //         }
// //     }

// //     const buyTokensXYZ = async ()=>
// //     {
// //         try
// //         {
// //             const receipt = await contracts[2].methods.buyTokens(numOfTokenX).send({from:accounts[0]});
// //         }
// //         catch(err)
// //         {
// //             alert("Transaction Failed due to the following Error"+err);
// //         }
// //     }
//     return (
//         <div class="container mt-5">
//         <nav class ="navbar navbar-expand-lg navbar-light bg-dark rounded-3 ">
//             <div class="container-fluid">
//             <h1 class="text-light">TokenSwap</h1>
//             <label class="badge bg-primary fs-4 rounded">Unicorn: {tokenABalance} Tokens</label>
//             <label class="badge bg-primary fs-4 rounded">Keppler: {tokenXBalance} Tokens</label>
//             </div>
//         </nav>
//         <div class="d-flex mt-3 input-group">
//             <input class="form-control border" placeholder="Amount" type="number" onChange={(evt)=>{setNumOfTokenA(evt.target.value)}} ></input>
//             {/* <button class="btn-danger text-center form-control" type="submit" onClick={()=>{swapTokens()}}>buy Token ABC</button> */}
//             <input class="form-control" type="number" placeholder="Amount" onChange={(evt)=>{setNumOfTokenX(evt.target.value)}} ></input>
//             {/* <label class="btn-danger text-center form-control" onClick={()=>{buyTokensXYZ(numOfTokenX)}} >buy Token XYZ</label> */}
//         </div>


//             <div class="input-group mt-3">
//                 <select onChange={(evt)=>{
//                     setTokenSelected(evt.target.value)
//                     }} class="form-select text-center" aria-label="Value">
//                     <option value="ABC">switch TokenABC with Token XYZ</option>
//                     <option value="XYZ">switch Token XYZ with Token ABC</option>
//                 </select>

//             <div class="input-group mt-5">
//             <input class="form-control" placeholder="Amount" type="number" onChange={(evt)=>{setSwitchAmount(evt.target.value)}} ></input>
//             <button class="btn-warning form-control" onClick={()=>{swapTokens()}}>Switch</button>
//             </div>    
//             {/* <label class="alert alert-info mt-3">1 ABC = {ratio} XYZ, Fees: {fees}%  Expected to get:{finalAmount}</label> */}
//             </div>
//         </div>
//     )
// }


