import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ManualCutout from "../components/manualCutout.js";

export default function Cutout() {
  const [editor, setEditor] = useState<unknown | undefined>();
  useEffect(() => {
    const editor = new ManualCutout({});
    setEditor(editor);
    editor.init({
      drawPanel: "drawPanel",
      imgSrc: "/cutout-test.png",
      penColor: "#ff40ef",
      width: 500,
      // height: "100%",
    });
  }, []);
  const redo = () => {
    editor?.ReDo();
  };
  const cut = () => {
    editor?.createCutImg(function (imgSrcData, w, h) {
      const target = document.getElementById("imgCutShow");
      if (!target) return;
      target.setAttribute("src", imgSrcData);
      target.style.cssText = `display: "block", width: ${w}, height: ${h}`;
    });
  };
  const download = () => {
    editor?.downLoad();
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="body1"
        style={{ textAlign: "center", marginBottom: 8, width: "100%" }}
      >
        对图片进行细节抠图，弥补自动抠图不准确的地方
      </Typography>
      <Box
        style={{
          width: "100%",
          minHeight: 400,
          paddingTop: 40,
          transition: "all 200ms",
        }}
      >
        <div id="drawPanel"></div>
        <img id="imgCutShow"></img>
      </Box>
      <Box sx={{ mt: 10, textAlign: "center", width: "100%" }}>
        <Button variant="contained" size="small" onClick={redo} sx={{ mr: 2 }}>
          重做
        </Button>
        <Button variant="contained" size="small" onClick={cut} sx={{ mr: 2 }}>
          裁剪
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={download}
          sx={{ mr: 2 }}
        >
          下载
        </Button>
      </Box>
    </Box>
  );
}
