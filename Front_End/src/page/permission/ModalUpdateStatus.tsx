import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { IUser } from '@/schemaValidations/user.schema';

const ModalUpdateStatus= ({record}:{record:IUser}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you sure to want enable this user?');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="flex justify-center items-center ">
      <Button
          type="text"
          className="bg-yelow-300 flex items-center"
          onClick={showModal}
        >
          Enable
        </Button>
      <Modal
        title="Enable user"
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Save"
        okType="danger"
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default ModalUpdateStatus;