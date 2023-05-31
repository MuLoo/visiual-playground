import { useRouteError } from "react-router-dom";
import { Box } from "@mui/material";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>额...</h1>
      <p>出错了！</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
