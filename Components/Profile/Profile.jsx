import React,{useState} from "react";

import {ProfileMain,SideBar} from "../index";




const Profile = ({nativeToken,
transferNativeToken,
mainBalance,
balance,
getAllDonation,
withdrawfunds,
getAllERC20Listed,
getUserERC20Listed,
createERC20,
donateFunds,
setActive,
setTransfer,
address,
fee
}) => {
  //states
  const [open,setOpen]=useState("Dashboard");
  return <div className="dashboard-area bg-color area-padding-3" >
      <div className="container">
         <div className="row">
          <SideBar address={address} setOpen={setOpen} open={open} setActive={setActive} setTransfer={setTransfer}/>
          <ProfileMain nativeToken={nativeToken} mainBalance={mainBalance} getAllDonation={getAllDonation} donateFunds={donateFunds} withdrawfunds={withdrawfunds} balance={balance} createERC20={createERC20} setOpen={setOpen} open={open} fee={fee} address={address} getAllERC20Listed={getAllERC20Listed} getUserERC20Listed={getUserERC20Listed}/>
         </div>
      </div>
  </div>;
};

export default Profile;
