import React,{useState} from "react";
import { ERC20,Header,Footer,UserProfile,Transfer,Profile } from "../Components/index";
import { Contextprovider } from "../Context/index";



const create = () => {
  const[active,setactive]=useState(false);
  const[transfer,setTransfer]=useState(false)
  return <div>create</div>;
};

export default create;
