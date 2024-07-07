import React from "react";
import {Tag} from "antd"
const RoleTag = ({ content }: { content: string }) => {
  let borderColor : string | undefined;
  let textColor: string;

  switch (content) {
    case "manager":
      borderColor  = "#FFD700";
      textColor = "#FFD700";
      break;
    case "admin":
      borderColor  = "#FF4500";
      textColor = "#FF4500";
      break;
    case "employee":
      borderColor  = "#1E90FF";
      textColor = "#1E90FF";
      break;
    case "customer":
      borderColor  = "#32CD32";
      textColor = "#32CD32";
      break;
    default:
      borderColor  = "#FFFFFF";
      textColor = "#000000";
  }

  const style = {
    borderColor ,
    color: textColor,
  };

  return (
    <Tag style={style} className="flex items-center justify-center rounded-md w-fit border-[1px]  bg-white uppercase">
      {content}
    </Tag>
  );
};

export default RoleTag;
