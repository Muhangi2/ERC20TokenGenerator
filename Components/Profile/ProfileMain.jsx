import React from "react";
import {Table,TableTwo} from "../index"

const ProfileMain = ({
  nativeToken,
  mainBalance,
  getAllDonation,
  donateFunds,
  withdrawfunds,
  balance,
  createERC20,
  setOpen,
  open,
  fee,
  address,
  getAllERC20Listed,
  getUserERC20Listed,
  transferNativeToken,
  setActive,
  setTransfer
}) => {
  const details=[
    {
       title:"Created",
       value:`#${getUserERC20Listed?.length||0}`
    },
    {
       title:"ERC20 Tokens",
       value:`${getUserERC20Listed?.length||0}`
    },{
     title:"Listing Fee",
     value:`${fee} Matic`
    },
    {
      title:"Doners",
      value:`${getAllDonation?.length||0}`
    },
    {
      title:"Contract Balance",
      value:`${mainBalance==undefined ? "Only Owner see" :mainBalance} Matic`
  }
  ]
  const contractOwner= 0x1633B8595ed0847993801600C68e635FB32724D7

  return <div className="col-xl-9 col-lg-9 col-md-8"> 
         <div className="row user-dashboard">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="user-top"> 
              <div className="user-balance">
                <span> Your Balance</span>
                <div className="main-bal"> {balance?.slice(1,7)}Matic</div>
              </div>
              <div className="userboard-btn">
                <a className="user-btn coin-btn" onClick={()=>donateFunds()}>Donate 1 MATIC</a>
                { 
                   address==contractOwner && (
                    <a onClick={()=>withdrawfunds()} className="user-btn color-btn">
                          Withdraw funds
                    </a>
                   )
                }
              </div>
            </div>
          </div>
         </div>
         {/* content */}

         <div className="row dashboard-content">
            {details.map((details,i)=>(
          <div key={i+1} className="col-xl-4 col-lg-4 col-md-6">
           <div></div>
          </div>
            ))}
         </div>
  </div>;
};

export default ProfileMain;
