import {useEffect,useState}from "react"


import {Buffer} from 'buffer'

import { useNavigate } from "react-router-dom";
// import Home from "./component/Home";

window.Buffer=Buffer;




function Home() {
    const [walletAddress, setWalletAddress] = useState(null)
    const navigate=useNavigate()
    const checkIfWalletConnected=async()=>{
      try {
        const {solana}=window
        if(solana){
          if(solana.isPhantom){
            console.log("Phantom wallet is connected")
            const response=await solana.connect({
              onlyIfTrusted:true,
            })
            console.log("Connected with public Key",response.publicKey.toString())
            setWalletAddress(response.publicKey.toString())
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    const connectWallet=async()=>{
      const {solana}=window;
      if(solana){
        const response=await solana.connect()
        console.log(response.publicKey.toString())
        setWalletAddress(response.publicKey.toString())
        console.log(walletAddress)
        navigate("/walletconnection")
      }
    }
    if(checkIfWalletConnected){
      // console.log("It worked")
      navigate("/walletconnection")
    }
  
  
  
   
      
    useEffect(()=>{
      const onLoad=async()=>{
        await checkIfWalletConnected()
      }
      window.addEventListener('load',onLoad)
      return ()=>{
        window.removeEventListener('load',onLoad)
      }
    },[])
  



  return (
    <>
      <h1>FundVibes</h1>
    <div className="connecting-wallet">
      <h2>Connect your Wallet</h2>

<button onClick={connectWallet}>Connect Wallet</button>
    </div>
    
    </>
  )
}

export default Home