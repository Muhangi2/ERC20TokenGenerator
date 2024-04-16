import React,{useState} from "react";
import  {AiOutlineClose} from "react-icons/ai";

const ERC20 = ({setActive,createERC20}) => {
  const[token,setToken]=useState({
    name:"",
    symbol:"",
    supply:0,
  })

  const handleTokenInfo=()=>{
    setToken({...token,[fielName]:e.target.value});
  }
  return <div className="login-area area-padding fix">
   <div className="login-overlay"></div>
   <div className="container">
    <div className="row justify-content-center text-center">
      <div className="col-xl-6 col-lg-6 col-md-8">
        <div className="login-form signup-form">
          <span  onClick={()=>setActive(false)}><AiOutlineClose/></span>
          <h4 className="login-title text-center">Create ERC20</h4>
          <div id="contactForm" className="log-form">
            <input type="text" id="name" className="form-control" placeholder="Name" required onChange={(e)=>handleTokenInfo("name",e)}/>
            <input type="text" id="email" className="form-control" placeholder="Symbol" required onChange={(e)=>handleTokenInfo("symbol",e)}/>
            <input type="number" id="msg_subject" className="form-control" placeholder="total supply" required onChange={(e)=>handleTokenInfo("symbol",e)}/>
            <button onClick={()=>createERC20(token) }>Create Token</button>
          </div>
        </div>
      </div>
    </div>
   </div>
  </div>;
};

export default ERC20;
