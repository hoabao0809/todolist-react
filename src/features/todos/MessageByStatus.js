import { Typography } from "@mui/material";
import { MESSAGES } from "../../constants";

export function RenderMessageByStatus({ status }) {
  return <Typography variant="h5">{MESSAGES[status]}</Typography>;
}
