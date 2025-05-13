import "../Css-Code/FooterCSS.css"
import Logo from "../Assets/E-CommersShooping.png"

function Footer () {
    return (
        <div>
            
            <div className="footerForWebsite">
                <div className="FooterMaindiv">

                    <div className="Logo-TextTags">

                        <div>
                            <img
                                src={Logo}
                                className="Imgaelogo"
                                alt="ImageLogo"
                            />
                        </div>

                        <div className="Tagstext">
                            <p>Quick Links</p>
                            <p>Need help?</p>
                            <p>Follow Us</p>
                        </div>
                    </div>

                    <div className="ContentSection">

                        <div>
                            <p>We diliver fresh groceries and snacks staight to your <br/> 
                            door. Trusted by thousands, we aim to make your <br/>
                            shooping experience simple and affordable. 
                            </p>
                        </div>

                        <div className="Optionstext">
                            <div>
                                <p className="QuickListtext">Home</p>
                                <p className="QuickListtext">Best Seller</p>
                                <p className="QuickListtext">Offers & Deals</p>
                                <p className="QuickListtext">Contact Us</p>
                                <p className="QuickListtext">FAQs</p>
                            </div>

                            <div>
                                <p className="NeedhelpText">Delivery Imformation</p>
                                <p className="NeedhelpText">Review & Refund Policy</p>
                                <p className="NeedhelpText">Payment Method</p>
                                <p className="NeedhelpText">Track your Order</p>
                                <p className="NeedhelpText">Contact Us</p>
                            </div>

                            <div>
                                <p className="FollowUstext">Instagram</p>
                                <p className="FollowUstext">Twitter</p>
                                <p className="FollowUstext">Facebook</p>
                                <p className="FollowUstext">You Tube</p>
                                <p className="FollowUstext">Whatsapp</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "30px", fontSize: "13px", color: "#666" }}>
                        © 2025 GreenCart. All rights reserved.
                    </div>

                </div>
            </div>

            {/* For Mobile Phone */}
            <div className="footerForMobilePhone">
                <div className="FooterMaindiv">

                    <div className="Logo-TextTags">

                        <div>
                            <img
                                src={Logo}
                                className="Imgaelogo"
                            />
                        </div>

                        <div className="ParagraphText">
                            <p>We diliver fresh groceries and snacks staight to your <br/> 
                            door. Trusted by thousands, we aim to make your <br/>
                            shooping experience simple and affordable. 
                            </p>
                        </div>
                    </div>

                    <div className="ContentSection">

                        <div className="Optionstext">
                            <div>
                                <p className="Tagstext">Quick Links</p>
                                <p className="QuickListtext">Home</p>
                                <p className="QuickListtext">Best Seller</p>
                                <p className="QuickListtext">Offers & Deals</p>
                                <p className="QuickListtext">Contact Us</p>
                                <p className="QuickListtext">FAQs</p>
                            </div>

                            <div>
                                <p className="Tagstext">Need help?</p>
                                <p className="NeedhelpText">Delivery Imformation</p>
                                <p className="NeedhelpText">Review & Refund Policy</p>
                                <p className="NeedhelpText">Payment Method</p>
                                <p className="NeedhelpText">Track your Order</p>
                                <p className="NeedhelpText">Contact Us</p>
                            </div>

                            <div>
                                <p className="Tagstext">Follow Us</p>
                                <p className="FollowUstext">Instagram</p>
                                <p className="FollowUstext">Twitter</p>
                                <p className="FollowUstext">Facebook</p>
                                <p className="FollowUstext">You Tube</p>
                                <p className="FollowUstext">Whatsapp</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "30px", fontSize: "13px", color: "#666" }}>
                        © 2025 GreenCart. All rights reserved.
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;