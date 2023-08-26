import {useEffect,useState}from "react"
import './App.css';

import {Buffer} from 'buffer'
import WalletConnection from "./component/WalletConnection";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import CreateCampaign from "./component/CreateCampaign";

window.Buffer=Buffer;



const App=()=> {
   return( 
  <>
  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/walletconnection" element={<WalletConnection/>}/>
    <Route path="/createcampaign" element={<CreateCampaign/>}/>

  </Routes>
  </BrowserRouter>

  </>
  
  )
}

export default App;
