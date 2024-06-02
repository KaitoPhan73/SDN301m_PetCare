"use client";
import { Avatar, Button, Flex, Layout } from "antd";
import React from "react";
import { Col, Row } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header } = Layout;
type Props = {
  style?: any;
  setCollapsed: any;
  collapsed: boolean;
};
const HeaderCustom = ({ style, setCollapsed, collapsed }: Props) => {
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
          <Avatar size={36} icon={<UserOutlined />} />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderCustom;
