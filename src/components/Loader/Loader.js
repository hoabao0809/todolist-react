import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        sx={{ m: "auto", mt: 5 }}
        size="5rem"

      />
    </Box>
  );
}

export default Loader;
