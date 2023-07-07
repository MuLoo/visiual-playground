import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import imglyRemoveBackground, { Config } from "@imgly/background-removal";
import useBoolean from "../hooks/useBoolean";
import CircularProgress from "@mui/material/CircularProgress";
// import { UIEvent, PhotoEditorSDKUI } from "photoeditorsdk";

const config: Config = {
  publicPath: "/", // path to the wasm files
};

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text?.secondary,
  width: 400,
  minHeight: 400,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function RemoveBG() {
  const [originImageUrl, setOriginImageUrl] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [loading, loadingMthods] = useBoolean();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setOriginImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (originImageUrl) {
      loadingMthods.on();
      imglyRemoveBackground(originImageUrl, config)
        .then((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          setNewImageUrl(url);
        })
        .finally(() => loadingMthods.off());
    }
  }, [originImageUrl]);
  // 没有使用名额，暂时弃用
  // const initEditor = async () => {
  //   const editor = await PhotoEditorSDKUI.init({
  //     container: "#imageEditor",
  //     image: newImageUrl, // Image url or Image path relative to assets folder
  //     // Please replace this with your license: https://img.ly/dashboard
  //     license: "",
  //   });
  //   console.log("PhotoEditorSDK for Web is ready!");
  //   editor.on(UIEvent.EXPORT, (imageSrc) => {
  //     console.log("Exported ", imageSrc);
  //   });
  // };
  // const startEditor = () => {
  //   initEditor();
  // };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: 8 }}
      >
        从图片中抠出主体图片，去除背景
      </Typography>
      <Box
        sx={{
          width: "100%",
          minHeight: 400,
          transition: "all 200ms",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Button variant="contained" startIcon={<AddIcon />} component="label">
          选择图片
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
        <Stack
          sx={{
            width: "100%",
            minHeight: 400,
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
          }}
          direction="row"
          spacing={6}
        >
          <Item>
            {originImageUrl ? (
              <img src={originImageUrl} alt="原始图" />
            ) : (
              "请选择图片"
            )}
          </Item>
          <Item>
            {loading ? (
              <CircularProgress />
            ) : newImageUrl ? (
              <img src={newImageUrl} alt="抠图" />
            ) : (
              "处理后图片"
            )}
          </Item>
        </Stack>
        {true && (
          <Button
            sx={{ mt: 10 }}
            variant="contained"
            startIcon={<CreateIcon />}
            onClick={() => {}}
          >
            编辑图片
          </Button>
        )}
        <Box id="imageEditor" sx={{ width: "80vw", height: "50vh" }}></Box>
      </Box>
    </Box>
  );
}
