const CopyrightText = () => {
  return (
    <div className={"copy f-medium d-none d-sm-block footer-text"}>
      <a
        href="https://github.com/dinis-rodrigues/tsb-web-official"
        target={"_blank"}
        rel="noreferrer"
      >
        © Técnico Solar Boat {new Date().getFullYear()}
      </a>
    </div>
  );
};

export default CopyrightText;
