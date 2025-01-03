import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Toolbar>
      <AppBar>
        <Box padding={1}>
          <p>Neina Assignment</p>
        </Box>
      </AppBar>
    </Toolbar>
  );
}
