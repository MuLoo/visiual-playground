import * as React from "react";
import { Box, Typography } from "@mui/material";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <Box>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        This is your brand new Iphone14 Pro Max, hope you enjoy!
      </Typography>
      <Box style={{ width: "100%", minHeight: 400, transition: "all 200ms" }}>
        <Spline scene="https://prod.spline.design/Mmal3cxZShUo7T4g/scene.splinecode" />
      </Box>
    </Box>
  );
}
