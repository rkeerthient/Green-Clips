import * as React from "react";

const Footer = ({ _site }: any) => {
  console.log(JSON.stringify(_site));

  return (
    <footer className="">
      <div className="flex flex-col flex-wrap justify-center pt-5 md:flex-row">
        <img src={_site.c_footerImg?.url} alt="" />
      </div>
    </footer>
  );
};

export default Footer;
