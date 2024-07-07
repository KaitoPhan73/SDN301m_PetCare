import React, {useState} from 'react';
import {Button, Modal} from 'antd';
// import {IUser} from '@/schemaValidations/user.schema';
import userApi from "@/actions/users";
import {TUser} from "@/types/User";
import {useSnackbar} from "notistack";


const ModalUpdateStatus = ({record, handleChange}: { record: TUser, handleChange: () => void }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you sure to want enable this user?');
    const { enqueueSnackbar } = useSnackbar();
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        // setModalText('The modal will be closed after two seconds');
       const response = await userApi.enableUser(record._id)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            handleChange()
        }, 500);
        if (response.status === 200) {
            enqueueSnackbar("Enable user successfully!", { variant: "success" });
        }else {
            enqueueSnackbar("Enable user failed", {variant: "error"});
        }
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