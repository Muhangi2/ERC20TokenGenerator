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
  console.log(getUserERC20Listed,"getUserERC20Listed");
  console.log(getAllERC20Listed,"getAllERC20Listed")
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


  const contractOwner=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

  return <div className="col-xl-9 col-lg-9 col-md-8"> 
         <div className="row user-dashboard">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="user-top"> 
              <div className="user-balance">
                <span> Your Balance</span>
                <div className="main-bal"> {balance?.slice(0,10)}Matic</div>
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
           <div className="single-dash-head"> 
             <div className="dashboard-amount d-flex flex-wrap align-items-center">
              <div className="amount-content"> 
            <span className="pro-name">{details.title}</span>
            <span className="pro-money">{details.value}</span>
              </div>
              <div className="invest-tumb"> 
                 <img src={`img/icon/d${i+1}.png`} alt=""/>
              </div>
             </div>
           </div>
          </div>
            ))}
         </div>
         {/* another coumn in row */}
         {open == "Dashboard" ? (
          <Table title="All Created ERC20 Tokens" tableData={getAllERC20Listed}/>
         ):open == "Your Token "?(
          <Table title="Your Tokens" tableData={getUserERC20Listed}/>
         ):open =="Donation" ?(
        <TableTwo title="All user donations" tableData={getAllDonation}/>
         ):("") }
  </div>;
};

export default ProfileMain;
