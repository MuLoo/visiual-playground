import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import TuiImageEditor from "tui-image-editor";
import Button from "@mui/material/Button";
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
function ImageEditor(props: tuiImageEditor.IOptions) {
  const rootEl = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState("");
  const [editor, setEditor] = useState<TuiImageEditor | undefined>();
  useEffect(() => {
    const editor = new TuiImageEditor(rootEl.current as HTMLDivElement, {
      ...props,
    });
    const header = document.getElementsByClassName(
      "tui-image-editor-header-logo"
    );
    const content = document.getElementsByClassName(
      "tui-image-editor-container"
    );
    header[0].classList.add("hidden");
    content[0].style.height = "1000px";
    setEditor(editor);
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await editor?.loadImageFromFile(e.target.files[0]);
    }
  };
  const downloadImage = (image: string) => {
    if (image) {
      // Convertimos la imagen en un objeto Blob
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => {
          // Creamos un objeto URL para la imagen
          const url = URL.createObjectURL(blob);
          // Creamos un enlace de descarga y lo agregamos al DOM
          const a = document.createElement("a");
          a.href = url;
          a.download = "image.jpg";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // Liberamos el objeto URL
          URL.revokeObjectURL(url);
        });
    }
  };

  return (
    <>
      {/* <div className="flex justify-around">
        <Button
          onClick={() => {
            setSrc("");
            document.getElementById("file-tui")?.click();
          }}
        >
          Cargar
        </Button>
        <Button
          onClick={() => {
            downloadImage(editor?.toDataURL() as string);
            // setSrc(editor?.toDataURL() as string);
          }}
        >
          Guardar
        </Button>
      </div> */}

      <div ref={rootEl} />
    </>
  );
}

export default ImageEditor;
