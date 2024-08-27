const FaviconIcons = () => {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.BASE_PATH}/assets/images/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${process.env.BASE_PATH}/assets/images/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${process.env.BASE_PATH}/assets/images/favicons/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${process.env.BASE_PATH}/assets/images/favicons/site.webmanifest`}
      />
      <link
        rel="mask-icon"
        href={`${process.env.BASE_PATH}/assets/images/favicons/safari-pinned-tab.svg`}
        color="#ffffff"
      />
      <link
        rel="shortcut icon"
        href={`${process.env.BASE_PATH}/assets/images/favicons/favicon.ico`}
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/assets/images/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff"></meta>

      <meta
        name="description"
        content="Técnico Solar Boat is an university project consisting of cross-degree engineering students at Instituto Superior Técnico that work together on the development of a solar powered boat. Its main purpose is to participate in worldwide engineering competitions organized by Solar Sport One and Yatch Club de Monaco."
      />

      <meta
        property="og:image"
        content={`${process.env.BASE_PATH}/assets/images/ogimage.png`}
      ></meta>
      <meta
        name="twitter:image"
        content={`${process.env.BASE_PATH}/assets/images/ogimage.png`}
      ></meta>
    </>
  );
};

export default FaviconIcons;
