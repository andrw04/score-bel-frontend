import {Modal} from '@mui/material';
import {FC, ReactNode} from 'react';
import {CustomBox} from './CustomBox';

type PropsType = {
  children: ReactNode;
  onClose?: () => void;
};

export const CustomModal: FC<PropsType> = ({ children, onClose }) => {
  return (
    <Modal
      component="form"
      open
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CustomBox width="400px" sx={{ padding: "50px 30px" }}>
        {children}
      </CustomBox>
    </Modal>
  );
};
