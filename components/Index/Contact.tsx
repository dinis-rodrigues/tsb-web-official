import { useState } from "react";
import BottomWaves from "../Animations/BottomWaves";
import ReCAPTCHA from "react-google-recaptcha";
import { submitContact } from "../utils/contactFormSubmission";

const Contact = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [recaptcha, setRecaptcha] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  return (
    <div
      className="section fp-noscroll"
      style={{
        backgroundColor: "black",
        fontSize: "small",
      }}
    >
      <div className="container">
        <div className="row mobile-top-margin">
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
              <form
                action="https://ulisboa.us18.list-manage.com/subscribe/post?u=2ac69b5d550216fd6ad8e81a7&amp;id=f1f04c8732"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
              >
                <input
                  className="form-control-subscribe"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  name="EMAIL"
                  placeholder="Your email"
                  width="80%"
                  autoComplete="new-password"
                />
                <button
                  className="btnd btnd-outline-secundary"
                  id="subscription-form-submit"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="contact-margin">
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
          {!submissionSuccess ? (
            <div className="col-md-5 z-inf">
              <h3 className="index-header">
                Have a question?
                <span className="text-info"> Get in touch!</span>
              </h3>
              {!submissionSuccess && (
                <div className="mt-5">
                  <div className="form-group mb-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      type="name"
                      placeholder="Name *"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      type="email"
                      placeholder="Email *"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control"
                      rows={3}
                      placeholder="Message *"
                    />
                  </div>

                  <div className="row d-flex">
                    <div className="col">
                      <ReCAPTCHA
                        sitekey="6LevdbcUAAAAALvwOgwXD4_aw716oeIx3WtZOXcQ"
                        onChange={(value) => setRecaptcha(value)}
                        theme="dark"
                      />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                      <div className="form-group" style={{ float: "right" }}>
                        <button
                          className="btnd btnd-outline-info"
                          onClick={() =>
                            !isSubmitting &&
                            submitContact(
                              name,
                              email,
                              message,
                              recaptcha,
                              setIsSubmitting,
                              setSubmissionSuccess
                            )
                          }
                        >
                          {isSubmitting ? (
                            <div
                              role="status"
                              className="spinner-border-sm spinner-border"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="col-md-5 z-inf d-flex justify-content-center align-items-center flex-column">
              <h3 className="index-header">
                <span className="text-info">Thank you for your message!</span>
              </h3>
              We will get back to you as soon as possible!
            </div>
          )}
        </div>
      </div>
      <BottomWaves />
    </div>
  );
};

export default Contact;
