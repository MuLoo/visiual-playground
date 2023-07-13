import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import imglyRemoveBackground, { Config } from "@imgly/background-removal";
import useBoolean from "../hooks/useBoolean";
import CircularProgress from "@mui/material/CircularProgress";
import ReactImgEditor from "react-img-editor";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

import "react-img-editor/assets/index.css";
import { throttle, localeZH } from "../utils/tool";
import ImageEditor from "../components/imageEditor";

// const ImageEditor = require('tui-image-editor');
// const FileSaver = require('file-saver');

const demoImageList = [
  {
    key: 1,
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=pauline-loroy-U3aF7hgUSrk-unsplash.jpg&w=1920",
  },
  {
    key: 2,
    src: "http://pic.yupoo.com/leisurenana/6cddb851/cdb8985f.jpg",
  },
  {
    key: 3,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=dom-hill-nimElTcTNyY-unsplash.jpg&w=1920",
  },
  {
    key: 4,
    src: "https://images.unsplash.com/photo-1628035514544-ebd32b766089?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=kristian-angelo-KW-jwdSgOw4-unsplash.jpg&w=1920",
  },
  {
    key: 5,
    src: "https://images.unsplash.com/photo-1540492649367-c8565a571e4b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=andreas-m-p40QuGwGCcw-unsplash.jpg&w=1920",
  },
  {
    key: 6,
    src: "https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=good-faces-xmSWVeGEnJw-unsplash.jpg&w=1920",
  },
];

const config: Config = {
  publicPath: "/", // path to the wasm files
};

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text?.secondary,
  width: 350,
  minHeight: 400,
  height: "100%",
  maxHeight: 500,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Image = styled(ImageListItem)(({ theme }) => ({
  width: "74px",
  "&:hover": {
    transiton: "all 200ms",
    cursor: "pointer",
    boxShadow: theme.customShadows.primary,
  },
  // height: "120px",
}));

export default function RemoveBG() {
  const [originImageUrl, setOriginImageUrl] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [loading, loadingMthods] = useBoolean();
  const [showDialog, setShowDialog] = useBoolean();
  const [showAnotherDialog, setShowAnotherDialog] = useBoolean();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setOriginImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleUrlInput = throttle((event: ChangeEvent<HTMLInputElement>) => {
    setOriginImageUrl(event.target.value);
  }, 500);

  const handleDemoClick = (src: string) => setOriginImageUrl(src);

  useEffect(() => {
    if (originImageUrl) {
      loadingMthods.on();
      setShowDialog.off();
      setShowAnotherDialog.off();
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
  const editImage = () => {
    setShowAnotherDialog.off();
    setShowDialog.on();
  };
  const editImageAnother = () => {
    setShowDialog.off();
    setShowAnotherDialog.on();
  };
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
        <Typography variant="h4" sx={{ display: "inline-block", m: "0 20px" }}>
          or
        </Typography>
        <TextField
          label="输入图片链接"
          variant="outlined"
          size="small"
          onChange={handleUrlInput}
        />
        <Typography variant="h4" sx={{ display: "inline-block", m: "0 20px" }}>
          or
        </Typography>
        <Box sx={{ padding: "0 200px" }}>
          {/* <Typography variant="body2">在线图片如</Typography> */}
          <ImageList cols={6} rowHeight={120} sx={{ mt: 4 }}>
            {demoImageList.map(({ key, src }) => (
              <Image onClick={() => handleDemoClick(src)}>
                <img src={src} key={key} />
              </Image>
            ))}
          </ImageList>
        </Box>
        <Stack
          sx={{
            width: "100%",

            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
          direction="row"
          spacing={6}
        >
          <Item>
            {originImageUrl ? (
              <img
                src={originImageUrl}
                alt="原始图"
                style={{ objectFit: "cover", height: "100%" }}
              />
            ) : (
              "请选择图片"
            )}
          </Item>
          <Item>
            {loading ? (
              <CircularProgress />
            ) : newImageUrl ? (
              <img
                src={newImageUrl}
                alt="抠图"
                style={{ objectFit: "cover", height: "100%" }}
              />
            ) : (
              "处理后图片"
            )}
          </Item>
        </Stack>
        {newImageUrl && (
          <Box>
            <Button
              sx={{ mt: 6, mr: 4 }}
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={editImage}
            >
              编辑器1
            </Button>
            <Button
              sx={{ mt: 6 }}
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={editImageAnother}
            >
              编辑器2
            </Button>
          </Box>
        )}
        {showDialog && (
          <Box
            sx={{
              maxWidth: "80vw",
              maxHeight: "50vh",
              display: "flex",
              margin: "50px auto",
              textAlign: "center",
            }}
          >
            <ReactImgEditor
              width={1000}
              src={newImageUrl}
              toolbar={{
                items: [
                  "pen",
                  "eraser",
                  "arrow",
                  "rect",
                  "circle",
                  "mosaic",
                  "text",
                  "|",
                  "repeal",
                  "download",
                  "crop",
                  "|",
                  "zoomIn",
                  "zoomOut",
                ],
              }}
            />
          </Box>
        )}
        {showAnotherDialog && (
          <Box sx={{ mt: 4 }}>
            <ImageEditor
              {...{
                includeUI: {
                  loadImage: {
                    path: newImageUrl,
                    name: "new_image",
                  },
                  locale: localeZH,
                  // theme: blackTheme, // or whiteTheme
                  initMenu: "filter",
                  menuBarPosition: "bottom",
                  // uiSize: {
                  //   height: "1000px",
                  //   width: "100%",
                  // },
                },
                cssMaxWidth: 1000,
                cssMaxHeight: 1500,
                selectionStyle: {
                  cornerSize: 20,
                  rotatingPointOffset: 70,
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
