import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

TabPanel.propTypes = {
  children: PropTypes.node,
};

function TabPanel(props) {
  const { children, ...other } = props;

  return (
    <div
      role="tabpanel"
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

export default TabPanel;
