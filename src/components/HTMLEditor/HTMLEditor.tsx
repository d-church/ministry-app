import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CButton, CButtonGroup } from "@coreui/react";
import { FaEye, FaCode, FaSun, FaMoon } from "react-icons/fa6";

import VisualEditor from "./VisualEditor";
import CodeEditor from "./CodeEditor";
import type { HTMLEditorEditorMode } from "./types";

import "./style.scss";

const HTMLEditor: React.FC<{
  value?: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  height?: string;
  initialMode?: HTMLEditorEditorMode;
  onModeChange?: (mode: HTMLEditorEditorMode) => void;
}> = ({ value = "", onChange, hasError = false, height, initialMode = "VISUAL", onModeChange }) => {
  const { t } = useTranslation("common");
  const [mode, setMode] = useState<HTMLEditorEditorMode>(initialMode);
  const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleModeChange = (newMode: HTMLEditorEditorMode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div className="flex gap-2">
          {mode === 'HTML' && (
            <CButtonGroup size="sm">
              <CButton
                color={editorTheme === 'light' ? 'primary' : 'secondary'}
                variant={editorTheme === 'light' ? undefined : 'outline'}
                onClick={() => setEditorTheme('light')}
                className="flex items-center gap-1"
              >
                <FaSun className="inline w-3 h-3" />
                Light
              </CButton>
              <CButton
                color={editorTheme === 'dark' ? 'primary' : 'secondary'}
                variant={editorTheme === 'dark' ? undefined : 'outline'}
                onClick={() => setEditorTheme('dark')}
                className="flex items-center gap-1"
              >
                <FaMoon className="inline w-3 h-3" />
                Dark
              </CButton>
            </CButtonGroup>
          )}
        </div>
        <CButtonGroup size="sm">
          <CButton
            color={mode === 'VISUAL' ? 'primary' : 'secondary'}
            variant={mode === 'VISUAL' ? undefined : 'outline'}
            onClick={() => handleModeChange('VISUAL')}
            className="flex items-center gap-1"
          >
            <FaEye className="inline w-3 h-3" />
            {t("htmlEditor.visualMode")}
          </CButton>
          <CButton
            color={mode === 'HTML' ? 'primary' : 'secondary'}
            variant={mode === 'HTML' ? undefined : 'outline'}
            onClick={() => handleModeChange('HTML')}
            className="flex items-center gap-1"
          >
            <FaCode className="inline w-3 h-3" />
            {t("htmlEditor.htmlMode")}
          </CButton>
        </CButtonGroup>
      </div>
      {mode === 'VISUAL' ? (
        <VisualEditor
          value={value}
          onChange={onChange}
          hasError={hasError}
          height={height}
        />
      ) : (
        <CodeEditor
          value={value}
          onChange={onChange}
          hasError={hasError}
          height={height}
          theme={editorTheme}
        />
      )}
    </div>
  );
};

export default HTMLEditor;
