import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IPickerContext, PickerProvider } from "../context";
import Categories from "./categories";
import Options from "./options";
import EmojiSt from "./style";

export interface IPickerRefProps {
  toggle: () => void;
}

interface IPickerProps extends IPickerContext {
  baseRef: React.RefObject<HTMLElement>;
}

const Picker = forwardRef<IPickerRefProps, IPickerProps>(
  ({ onPickerChange, baseRef }: IPickerProps, ref) => {
    const [pickerRef, setPickerRef] = useState<HTMLDivElement | null>(null);

    const [tempShow, setTempShow] = useState(false);
    const [show, setShow] = useState(false);

    const toggle = useCallback(() => {
      void (async () => {
        let newValue: boolean = false;
        await setShow((prev) => {
          newValue = !prev;

          return prev;
        });

        const timeoutTime = newValue ? 0 : 200;

        setTimeout(() => {
          setTempShow(newValue);
        }, 1);

        setTimeout(() => {
          setShow(newValue);
        }, timeoutTime);
      })();
    }, []);

    // handle outside clicks
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (pickerRef == null || pickerRef.contains(e.target as Node)) return;

        toggle();
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [pickerRef, toggle]);

    useImperativeHandle(ref, () => ({
      toggle,
    }));

    const onRef = useCallback((node: HTMLDivElement | null) => {
      setPickerRef(node);
    }, []);

    if (!show) return null;

    return (
      <PickerProvider onPickerChange={onPickerChange}>
        {createPortal(
          <EmojiSt.Content isClosed={!tempShow} ref={onRef}>
            <Settings pickerRef={pickerRef} baseRef={baseRef} />
            <Categories />
            <Options />
          </EmojiSt.Content>,
          document.body
        )}
      </PickerProvider>
    );
  }
);

Picker.displayName = "Picker";

export default Picker;

const Settings = memo(
  ({
    pickerRef,
    baseRef,
  }: {
    pickerRef: HTMLDivElement | null;
    baseRef: React.RefObject<HTMLElement>;
  }) => {
    useLayoutEffect(() => {
      if (pickerRef == null || baseRef.current == null) return;

      const baseBounds = baseRef.current.getBoundingClientRect();

      pickerRef.style.left = `${baseBounds.left}px`;
      pickerRef.style.top = `${baseBounds.height}px`;
    });

    return null;
  }
);

Settings.displayName = "Settings";
