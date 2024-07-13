"use client";
import { Avatar, Button, Flex, Layout } from "antd";
import React from "react";
import { Col, Row } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Header } = Layout;
type Props = {
  style?: any;
  setCollapsed: any;
  collapsed: boolean;
};
const HeaderCustom = ({ style, setCollapsed, collapsed }: Props) => {
  const router = useRouter();
  return (
    <Header style={style}>
      <Row justify="space-between">
        <Col>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Col>
        <Col>
          <Button
            onClick={() => router.push("/logout")}
            type="text"
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderCustom;
