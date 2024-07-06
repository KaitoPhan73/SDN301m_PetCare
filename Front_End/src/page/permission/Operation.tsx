"use client";
import { Button, Dropdown, MenuProps } from "antd";
import React, { ReactNode, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalDelete from "./ModelDelete";
import ModalUpdateStatus from "./ModalUpdateStatus";
import { IUser } from "@/schemaValidations/user.schema";
import Link from "next/link";
interface Props {
  record: IUser;
}

const Operation = ({ record }: Props) => {
  let items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-center items-center bg-yelow-300">
          <Button
            className=" flex items-center w-full bg-yelow-300"
            type="text"
          >
            <Link href={`/dashboard/user/edit/${record._id}`}>Edit</Link>
          </Button>
        </div>
      ),
    },

  ];

  if (!record.status) {
    items = [
      ...items,
      {
        key: "2",
        label: <ModalUpdateStatus record={record} />,
      },
    ]
  }else {
    items = [
      ...items,
      {
        key: "2",
        label: <ModalDelete record={record} />,
      },
    ]
  }

  const getPopupContainer = (triggerNode: HTMLElement) =>
    triggerNode.parentNode as HTMLElement;
  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
      getPopupContainer={getPopupContainer}
    >
      <MoreVertIcon onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
};

export default Operation;
