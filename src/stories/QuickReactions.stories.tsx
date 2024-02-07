/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useEffect, useRef, useState } from "react";
import P, { IPickerRefProps } from "../components/picker/Picker";
import "./global.css";
import { stateStorage } from "react-trigger-state";

export default {
  title: "Picker",
};

const Template = () => {
  const pickerRef = useRef<IPickerRefProps>(null);
  const baseRef = useRef<HTMLButtonElement>(null);
  const [language, setLanguage] = useState<"en" | "pt">("en");

  const togglePicker = useCallback(() => {
    if (pickerRef.current == null) return;

    pickerRef.current.toggle();
  }, []);

  const handlePickerLanguage = useCallback(async (lang: "en" | "pt" = "en") => {
    const data = import(`./languages/emoji-${lang}.json`);
    setLanguage(lang);

    data
      .then((module) => {
        stateStorage.set("gt-emoji-core", module.default);
      })
      .catch((error) => {
        console.error("Error during dynamic import:", error);
      });
  }, []);

  useEffect(() => {
    void handlePickerLanguage("en");
  }, [handlePickerLanguage]);

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <button
        ref={baseRef}
        onClick={togglePicker}
        style={{
          border: "none",
        }}
      >
        Click to toggle picker
      </button>

      <P
        baseRef={baseRef}
        ref={pickerRef}
        onPickerChange={(emoji) => {
          console.log(emoji, "suchwow");
          alert(emoji.emoji);
        }}
      />

      <div>
        <h3>Change picker language</h3>
        <p>Current: {language} </p>
        <button onClick={() => handlePickerLanguage("en")}>English</button>
        <button onClick={() => handlePickerLanguage("pt")}>Portuguese</button>
      </div>
    </div>
  );
};

export const Picker = Template.bind({});
