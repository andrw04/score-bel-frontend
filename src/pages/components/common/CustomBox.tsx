import { Box, BoxProps, styled } from "@mui/material";
import { FC } from "react";

type PropsType = {
  children: React.ReactNode;
  width: string;
  bgColor?: string;
};

export const CustomBox = styled(Box)<PropsType>(
  ({ theme, width, bgColor }) => ({
    width: width,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    boxSizing: "border-box",
  }),
);
