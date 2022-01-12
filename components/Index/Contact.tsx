import { useEffect } from "react";
import BottomWaves from "../Animations/BottomWaves";

const Contact = () => {
  useEffect(() => {}, []);
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-5 z-inf">
            <h5 className="index-header">
              Want to keep up to date ?
              <p>
                <span className="text-info">
                  {" "}
                  Subscribe to our newsletter !
                </span>
              </p>
            </h5>
            <div className="form-group mb-3">
              <input
                className="form-control-subscribe"
                type="text"
                placeholder="Your email"
                width="80%"
                autoComplete="new-password"
              />
              <button className="btnd btnd-outline-secundary">Subscribe</button>
            </div>
            <div className="mt-10">
              <h3 className="index-header">
                <span className="text-info">Headquarters</span>
              </h3>
              <h5 className="contact-addr f-medium">
                Av. Rovisco Pais 1, 1049-001 Lisboa
              </h5>
              <h6 className="contact-addr f-medium">
                IST - Taguspark, Room 1 - 4.16, Av. Prof. Dr. Cavaco Silva,
                2744-016, Porto Salvo
              </h6>
              <h6 className="contact-addr f-medium">
                tecnico.solarboat@gmail.com
              </h6>
              <p className="f-medium"></p>
            </div>
          </div>

          <div className="col-md-2"></div>
          <div className="col-md-5 z-inf">
            <h3 className="index-header">
              Have a question ?{" "}
              <span className="text-info">Get in touch !</span>
            </h3>
            <div className="mt-5">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="name"
                  placeholder="Name"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email*"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Message"
                />
              </div>
              <div className="form-group" style={{ float: "right" }}>
                <button className="btnd btnd-outline-info">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomWaves />
    </div>
  );
};

export default Contact;
