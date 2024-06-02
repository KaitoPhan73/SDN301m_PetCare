import React from "react";

const Image = ({ imgSrc, className }: { imgSrc: any; className?: any }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
