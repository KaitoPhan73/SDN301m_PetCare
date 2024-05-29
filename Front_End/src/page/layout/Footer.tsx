import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;
type Props = {
  style?: any;
};
export default function FooterCustom({ style }: Props) {
  return (
    <Footer style={style}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}
