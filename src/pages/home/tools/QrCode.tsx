import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import { create } from "qrcode";
import { useTranslation } from "react-i18next";

const formats = {
  "1:1": { width: 1080, height: 1080 },
  "3:4": { width: 1080, height: 1440 },
  "16:9": { width: 1920, height: 1080 },
};

const maxQrInputLength = 7089;
const quietZone = 4;

export default function QrCode() {
  const { t } = useTranslation("pages/qr-code");
  const [content, setContent] = useState("");
  const [format, setFormat] = useState<keyof typeof formats>("1:1");
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#000000");
  const [caption, setCaption] = useState("");
  const [exportFailed, setExportFailed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = formats[format];
  const hasContent = Boolean(content.trim());

  const modules = useMemo(() => {
    if (!hasContent || content.length > maxQrInputLength) return null;

    try {
      return create(content).modules;
    } catch {
      return null;
    }
  }, [content, hasContent]);

  const error = (background === foreground && "sameColor") || (hasContent && !modules && "tooLong");
  const canDownload = Boolean(modules && !error);

  useLayoutEffect(() => {
    if (!canDownload || !modules) return;

    const context = canvas.current?.getContext("2d");
    if (!context) return;

    const label = caption.trim();
    const padding = 64;
    const captionHeight = label ? 108 : 0;
    const codeHeight = height - captionHeight;
    const moduleCount = modules.size + quietZone * 2;
    const moduleSize = Math.floor((Math.min(width, codeHeight) - padding * 2) / moduleCount);
    const codeSize = moduleSize * moduleCount;
    const left = Math.floor((width - codeSize) / 2) + quietZone * moduleSize;
    const top = Math.floor((codeHeight - codeSize) / 2) + quietZone * moduleSize;

    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    context.fillStyle = foreground;

    for (let row = 0; row < modules.size; row++) {
      for (let column = 0; column < modules.size; column++) {
        if (modules.get(row, column)) {
          context.fillRect(
            left + column * moduleSize,
            top + row * moduleSize,
            moduleSize,
            moduleSize,
          );
        }
      }
    }

    if (label) {
      context.font = "600 48px system-ui, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, width / 2, codeHeight, width - padding * 2);
    }
  }, [background, canDownload, caption, foreground, height, modules, width]);

  const download = () => {
    if (!canDownload || !canvas.current) return;

    setExportFailed(false);
    canvas.current.toBlob((blob) => {
      if (!blob) {
        setExportFailed(true);
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <h1 className="mb-4 text-2xl font-semibold">{t("navigation.qrCodes", { ns: "common" })}</h1>
      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-5">
          <CCard>
            <CCardBody className="d-grid gap-3">
              <CFormTextarea
                id="qr-content"
                label={t("content")}
                rows={3}
                spellCheck={false}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
              <CFormSelect
                id="qr-format"
                label={t("format")}
                value={format}
                onChange={(event) => setFormat(event.target.value as keyof typeof formats)}
              >
                {Object.keys(formats).map((ratio) => (
                  <option key={ratio}>{ratio}</option>
                ))}
              </CFormSelect>
              <div className="row g-3">
                <div className="col">
                  <CFormInput
                    type="color"
                    id="qr-background"
                    label={t("background")}
                    value={background}
                    onChange={(event) => setBackground(event.target.value)}
                  />
                </div>
                <div className="col">
                  <CFormInput
                    type="color"
                    id="qr-foreground"
                    label={t("foreground")}
                    value={foreground}
                    onChange={(event) => setForeground(event.target.value)}
                  />
                </div>
              </div>
              <CFormInput
                id="qr-caption"
                label={t("caption")}
                maxLength={80}
                spellCheck={false}
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
              />
              {error && (
                <CAlert color="danger" className="mb-0">
                  {t(error)}
                </CAlert>
              )}
              {canDownload && exportFailed && (
                <CAlert color="danger" className="mb-0">
                  {t("exportFailed")}
                </CAlert>
              )}
              <CButton color="primary" disabled={!canDownload} onClick={download}>
                {t("download")}
              </CButton>
            </CCardBody>
          </CCard>
        </div>
        <div className="col-12 col-lg-7">
          <canvas
            ref={canvas}
            width={width}
            height={height}
            hidden={!canDownload}
            role="img"
            aria-label={t("preview")}
            className="mx-auto h-auto max-w-full rounded border"
          />
        </div>
      </div>
    </div>
  );
}
