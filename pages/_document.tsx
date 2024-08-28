import { Head, Html, Main, NextScript } from "next/document";
import FaviconIcons from "../components/Head/FaviconIcons";

import { GA_TRACKING_ID } from "../components/utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

const Document = () => {
  return (
    <Html>
      <Head>
        <FaviconIcons />
        {/* enable analytics script only for production */}
        {isProduction && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
            <script
              // eslint-disable-next-line react/no-danger
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
