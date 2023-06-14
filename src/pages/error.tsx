import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: theme.palette.common?.black,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.common?.white,
}));

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <BoxWrapper id="error-page">
      <Typography variant="h5">额...出错了！</Typography>
      <Typography variant="body1" sx={{ color: "error.main" }}>
        {error.statusText || error.message}
      </Typography>
    </BoxWrapper>
  );
}
