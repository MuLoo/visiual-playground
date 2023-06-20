import * as React from "react";
import { Box, Typography } from "@mui/material";
import Spline from "@splinetool/react-spline";

export default function Glass() {
  return (
    <Box>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        This is glass material, hope you enjoy!
      </Typography>
      <Box style={{ width: "100%", minHeight: 400, transition: "all 200ms" }}>
        <Spline scene="https://prod.spline.design/zwpnLSz6707rQKP8/scene.splinecode" />
      </Box>
    </Box>
  );
}
