import React, {useState} from 'react';
import {Button, Modal} from 'antd';
// import {IUser} from '@/schemaValidations/user.schema';
import userApi from "@/actions/users";
import {TUser} from "@/types/User";
import {useSnackbar} from "notistack";

const ModelDelete = ({record, handleChange}: { record: TUser , handleChange:()=> void}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you sure to want disable this user?');
    const {enqueueSnackbar} = useSnackbar();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        // setModalText('The modal will be closed after two seconds');
        const response = await userApi.disableUser(record._id)
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            handleChange()
        }, 500);
        if (response.status === 200) {
            enqueueSnackbar("Disable user successfully!", { variant: "success" });
        }else {
            enqueueSnackbar("Disable user failed", {variant: "error"});
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className="flex justify-center items-center ">
            <Button type="text" danger onClick={showModal} className="w-full">
                Disable
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