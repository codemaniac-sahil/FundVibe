import React from 'react'
import {useState}from "react"

import idl from '../idl.json'
import { Connection,PublicKey,clusterApiUrl } from "@solana/web3.js";
import { Program,AnchorProvider,web3,utils } from "@project-serum/anchor";
import {Buffer} from 'buffer'
import { useNavigate } from 'react-router-dom';
window.Buffer=Buffer;
function CreateCampaign() {
    const getProvider=()=>{
    const connection=new Connection(network,opts.preflightCommitment)
    const provider=new AnchorProvider(connection,window.solana,opts.preflightCommitment)
    return provider
  }
  const programID=new PublicKey(idl.metadata.address)
const network=clusterApiUrl("devnet")
const opts={
  preflightCommitment:"processed",
}
const {SystemProgram}=web3
// const [Campaign, setCampaign] = useState([])
const [campaignName, setCampaignName] = useState("")
const [campaignDescription, setCampaignDescription] = useState("")
const navigate=useNavigate()

const createCampaign=async ()=>{
    try {
        const provider=getProvider()
        const program=new Program(idl,programID,provider)
        const [campaign]=await PublicKey.findProgramAddress([
          utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
          provider.wallet.publicKey.toBuffer()
        ],
        program.programId)
        await program.rpc.create(campaignName,campaignDescription,{
          accounts:{
            campaign,
            user:provider.wallet.publicKey,
            systemProgram:SystemProgram.programId
            
          },
          
        })
        console.log("Campaign created",campaign.toString())
        navigate("/walletconnection")
      } catch (error) {
        console.log(error)
        
      }
    }
    
  return (
    <>
    <div className='create-campaign-form'>

        <div className='create-campaign-form-1'>
            <div className='create-campaign-heading'>

            <h1>
                Create Campaign
            </h1>
            </div>
        <div className='create-campaign-form-input-field'>
         <input type='text' placeholder='Enter Campign Name' size={50} value={campaignName} onChange={(e)=>setCampaignName(e.target.value)} key="1"/>
            
        </div>
        <div className='create-campaign-from-input-field'>
            <textarea placeholder='Enter Campaign description'value={campaignDescription} onChange={(e)=>setCampaignDescription(e.target.value)}key="2" cols={50} rows={15}></textarea>

        </div>
        <div className='create-campaign-form-button'>
            <button onClick={createCampaign}>Create Campaign</button>
        </div>
        </div>

    </div>
    </>
  )
}

export default CreateCampaign