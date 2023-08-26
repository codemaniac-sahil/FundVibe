import React from 'react'
import {useState}from "react"
import "../App.css"

import idl from '../idl.json'
import { Connection,PublicKey,clusterApiUrl } from "@solana/web3.js";
import { Program,AnchorProvider,web3,BN } from "@project-serum/anchor";
import {Buffer} from 'buffer'
import { useNavigate } from 'react-router-dom';
window.Buffer=Buffer;

const programID=new PublicKey(idl.metadata.address)
const network=clusterApiUrl("devnet")
const opts={
  preflightCommitment:"processed",
}
const {SystemProgram}=web3

function WalletConnection() {
  const navigate=useNavigate()
    const getProvider=()=>{
        const connection=new Connection(network,opts.preflightCommitment)
        const provider=new AnchorProvider(connection,window.solana,opts.preflightCommitment)
        return provider
      }
  const [Campaign, setCampaign] = useState([])


    const getCampaign=async()=>{
        const connection=new Connection(network,opts.preflightCommitment)
        const provider=getProvider()
        const program=new Program(idl,programID,provider)
        Promise.all((await connection.getProgramAccounts(programID)).map(
          async (campaign)=>({
            ...(await program.account.campaign.fetch(campaign.pubkey)),
            pubkey:campaign.pubkey,
          })
        )).then((campaigns)=>setCampaign(campaigns))
      }
      
      const createCampaign=async()=>{
        navigate("/createcampaign")

      }
      const donate=async(publicKey)=>{
        try {
          const provider=getProvider()
          const program=new Program(idl,programID,provider)
          await program.rpc.donate(new BN(0.2*web3.LAMPORTS_PER_SOL),{
            accounts:{
              campaign:publicKey,
              user:provider.wallet.publicKey,
              systemProgram:SystemProgram.programId
            }
          })
      
          console.log("Donated money")
          getCampaign()
        } catch (error) {
          console.log(error)
          
        }
      }
      const withdraw= async(publicKey)=>{
        
          try {
            const provider=getProvider()
            const program=new Program(idl,programID,provider)
            await program.rpc.withdraw(new BN(0.2*web3.LAMPORTS_PER_SOL),{
              accounts:{
                campaign:publicKey,
                user:provider.wallet.publicKey,
               
              }
            })
        
            console.log("Donated money")
        } catch (error) {
          console.log(error)
          
        }
      }
      
      
  return (
   
   
        <>
        <div className='create-or-donate'>
          <div className='create-or-donate-heading'>

         <h1>Create Or Donate</h1>
          </div>
        <div className='buttonclass'>

        <button onClick={createCampaign}>Create Campaign</button>
        <button onClick={getCampaign}>Get Campaign</button>
        </div>
        </div>
     
        {Campaign.map(campaign=>(

         <>
         <div className='campaign-info'>
          <div className='campaign-info-1'>

         <p>Campaign ID: {campaign.pubkey.toString()}</p>
         <p>Balance :{(campaign.amountDonated / web3.LAMPORTS_PER_SOL).toString()}</p>
         <p>{campaign.name} </p>
         <p>{campaign.description} </p>
         <br/>
          </div>

         <div className='donate-or-withdraw'>

         <button onClick={()=>donate(campaign.pubkey)} key={campaign.pubkey}>
           Click to Donate
         </button>
     
         <button onClick={()=>withdraw(campaign.pubkey)} key={campaign.pubkey}>
           Click to Withdraw
         </button>
         </div>
         </div>
         </>
        ))}
         </>
  )
}

export default WalletConnection