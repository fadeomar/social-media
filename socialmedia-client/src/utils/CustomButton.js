import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({ children, onClick, tip, btnClass, tipClass }) => (
  <Tooltip title={tip} className={tipClass}>
    <IconButton onClick={onClick} className={btnClass}>
      {children}
    </IconButton>
  </Tooltip>
);