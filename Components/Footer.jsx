import React from "react";

const Footer = () => {
  const coinList =[
    "Ripple coin",
    "Bitcoin",
    "Ethereum",
    "Litecoin",
    "coin base",
    "skrill card"
  ]
  const menuList=[
    {
      name:"Home",
      link:"/"
    },
    {
      name:"ERC20",
      link:"#"
    },
    {
      name:"Contact Us",
      link:"#"

    },
    {
      name:"About Us",
      link:"#"
    },
    {
      name:"Blog",
      link:"#",
    }
    ,{
      name:"Details",
      link:"#"
    }
  ]
  return <footer className="footer1">
         <div className="footer-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="footer-content logo-footer">
     
                </div>
              </div>
            </div>
          </div>
         </div>
  </footer>;
};

export default Footer;
