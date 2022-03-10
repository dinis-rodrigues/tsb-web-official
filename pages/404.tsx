import ReactFullpage from "@fullpage/react-fullpage";
import Head from "next/head";
import Link from "next/link";
import BottomWaves from "../components/Animations/BottomWaves";
import GlowingStars from "../components/Animations/GlowingStars";
import Universe from "../components/Animations/Universe";

const Custom404 = () => {
  return (
    <div className="App">
      <Head>
        <title>Page not Found</title>
      </Head>

      <ReactFullpage
        scrollOverflow
        fitToSection={true}
        navigation={false}
        responsiveWidth={1250}
        verticalCentered
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section bg-black" style={{ fontSize: "small" }}>
                <div className="container stars">
                  {/* This is only for large screens */}
                  <div className="row h-100">
                    <div className="col-12 flex-column d-flex justify-content-center align-items-center z-inf">
                      <h1 className="very-large-font">404</h1>
                      <h2>Page Not Found</h2>
                      <h5>
                        The Page You Are Attempting To Reach Is Currently Not
                        Available. This May Be Because The Page Does Not Exist
                        Or Has Been Moved.
                      </h5>
                      <Link passHref href={"/"}>
                        <a>
                          <button className="btnd btnd-info">Go Home</button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <GlowingStars />
                <BottomWaves />
                <Universe />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default Custom404;
