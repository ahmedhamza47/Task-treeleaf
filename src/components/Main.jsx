import React from "react";
import { Form } from "./Form";
import { Box } from "@mui/material";
import Tables from "./Tables";
const Main = () => {
  return (
    <div className="bg-color">
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        padding="30px"
      >
        <Box>
          <Form />
        </Box>
      </Box>
      <Tables />
    </div>
  );
};

export default Main;
