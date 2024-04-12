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
              {/* firstitemrow */}
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="footer-content logo-footer">
                    <div className="footer-head">
                      <div className="footer-logo">
                        <a href="#">
                          <img src="img/logo/logo2.png" alt=""/>
                        </a>
                      </div>
                      {/* footer-icons */}
                      <div className="footer-icons">
                          <ul>
                            {
                              [1,2,3,4,5].map((social,i)=>{
                                <li>
                                  <a href="#"> 
                                  <img src={`img/about/midea${i+1}.png`} alt=""/>
                                  </a>
                                </li>
                              }

                              )
                            }
                          </ul>
                      </div>
                    </div>
                </div>
              </div>
              {/* anotheriteminrow */}
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="footer-content rs-mar-0">
                  <div className="footer-head">
                      <h4>Patnents Option</h4>
                      <ul className="footer-list">
                        {
                          coinList.map((coin,i)=>{
                            <li>
                              <a>{coin}</a>
                            </li>
                          })
                        }
                      </ul>
                      <ul className="footer-list">
                        {menuList.map((menu,i)=>{
                          <li>
                            <a href={menu.link}>{menu.name}</a>
                          </li>
                        })}
                      </ul>
                  </div>
                  </div> 

              </div>
            </div>
            {/* the third item in row */}
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="footer-content last-content rs-mar-0">
                
              </div>
            </div>
          </div>
         </div>
  </footer>;
};

export default Footer;
