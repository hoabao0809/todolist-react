import { Typography } from "@mui/material";
import React from "react";
import FormInput from "./FormInput";

function Header() {
  return (
    <>
      <Typography
        sx={{ fontSize: "1.5rem", textAlign: "center", mb: "1.5rem" }}
      >
        My To-do List
      </Typography>
      <FormInput />
    </>
  );
}

export default Header;
