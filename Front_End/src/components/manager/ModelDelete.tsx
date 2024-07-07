import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { IUser } from '@/schemaValidations/user.schema';

const ModelDelete= ({record}:{record:IUser}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you sure to want disable this user?');

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
      <Button type="text" danger onClick={showModal} className="w-full">
       Diable
      </Button>
      <Modal
        title="Disable user"
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

export default ModelDelete;