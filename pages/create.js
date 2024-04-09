import { useState, useContext, useEffect } from "react";
import {
  ERC20,
  Header,
  Footer,
  UserProfile,
  Transfer,
  Profile,
} from "../Components/index";

import { Contextprovider } from "../Context/index";

const create = () => {
  const [active, setactive] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const {} = useContext();
  return <div>create</div>;
};

export default create;
