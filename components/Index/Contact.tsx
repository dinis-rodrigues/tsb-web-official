import { useEffect } from "react";

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
          <div className="col-md-5">
            <h2>
              Want to keep up to date ?
              <p>
                <span className="text-info">
                  {" "}
                  Subscribe to our newsletter !
                </span>
              </p>
            </h2>
            <div className="form-group mb-3">
              <input
                className="form-control-subscribe"
                type="text"
                placeholder="Your email"
                width="80%"
              />
              <button className="btnd btnd-outline-secundary">Subscribe</button>
            </div>
            <div className="mt-10">
              <h3>Our Headquarters</h3>
              <h5 className="contact-addr">
                Av. Rovisco Pais 1, 1049-001 Lisboa
              </h5>
              <h6 className="contact-addr">
                IST - Taguspark, Room 1 - 4.16, Av. Prof. Dr. Cavaco Silva,
                2744-016, Porto Salvo
              </h6>
              <h6 className="contact-addr">tecnico.solarboat@gmail.com</h6>
              <p className="f-medium"></p>
            </div>
          </div>

          <div className="col-md-2"></div>
          <div className="col-md-5">
            <h3>
              Have a question ?{" "}
              <span className="text-info">Get in touch !</span>
            </h3>
            <div className="mt-5">
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="name"
                  placeholder="Name"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email*"
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
      <div className="spacer-1">
        <svg
          id="visual"
          viewBox="0 0 900 600"
          preserveAspectRatio="none"
          width="100%"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <g>
            <path
              id="wave-1-1"
              className="wave"
              d="M0 407L129 448L257 402L386 415L514 378L643 445L771 396L900 393L900 601L771 601L643 601L514 601L386 601L257 601L129 601L0 601Z"
              fill="#00a2ff"
            ></path>
            <path
              id="wave-1-2"
              className="wave"
              d="M0 415L129 478L257 448L386 398L514 457L643 466L771 469L900 410L900 601L771 601L643 601L514 601L386 601L257 601L129 601L0 601Z"
              fill="#0088e6"
            ></path>
            <path
              id="wave-1-3"
              className="wave"
              d="M0 507L129 486L257 480L386 488L514 504L643 472L771 505L900 503L900 601L771 601L643 601L514 601L386 601L257 601L129 601L0 601Z"
              fill="#006ecd"
            ></path>
            <path
              id="wave-1-4"
              className="wave"
              d="M0 542L129 503L257 513L386 508L514 509L643 533L771 481L900 534L900 601L771 601L643 601L514 601L386 601L257 601L129 601L0 601Z"
              fill="#0055b3"
            ></path>
            <path
              id="wave-1-5"
              className="wave"
              d="M0 562L129 545L257 563L386 528L514 550L643 552L771 542L900 536L900 601L771 601L643 601L514 601L386 601L257 601L129 601L0 601Z"
              fill="#003d99"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Contact;
