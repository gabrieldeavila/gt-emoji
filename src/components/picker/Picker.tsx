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
import useEmoji from "../hooks/useEmoji";
import Categories from "./categories";
import CurrentEmoji from "./current";
import Options from "./options";
import Search from "./search";
import EmojiSt from "./style";
import useMobile from "../hooks/useMobile";

export interface IPickerRefProps {
  toggle: () => void;
}

interface IPickerProps extends IPickerContext {
  baseRef: React.RefObject<HTMLElement>;
}

const Picker = forwardRef<IPickerRefProps, IPickerProps>(
  ({ onPickerChange, baseRef }: IPickerProps, ref) => {
    const [pickerRef, setPickerRef] = useState<HTMLDivElement | null>(null);
    const isMobile = useMobile();

    useEmoji();

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
          <EmojiSt.Content isMobile={isMobile} isClosed={!tempShow} ref={onRef}>
            <Search />
            <Settings
              isMobile={isMobile}
              pickerRef={pickerRef}
              baseRef={baseRef}
            />
            <Categories />
            <Options isMobile={isMobile} />

            {!isMobile && <CurrentEmoji />}
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
    isMobile,
  }: {
    pickerRef: HTMLDivElement | null;
    baseRef: React.RefObject<HTMLElement>;
    isMobile: boolean;
  }) => {
    useLayoutEffect(() => {
      if (isMobile) return;

      if (pickerRef == null || baseRef.current == null) return;

      const baseBounds = baseRef.current.getBoundingClientRect();

      let top = baseBounds.height + baseBounds.top;
      let left = baseBounds.left;

      const pickerHeight = pickerRef.clientHeight;
      const pickerWidth = pickerRef.clientWidth;

      if (top + pickerHeight > window.innerHeight) {
        top = baseBounds.top - pickerRef.clientHeight - baseBounds.height;
      }

      if (left + pickerWidth > window.innerWidth) {
        left = window.innerWidth - pickerWidth - baseBounds.width * 0.5;
      }

      pickerRef.style.left = `${left}px`;
      pickerRef.style.top = `${top}px`;
    });

    useEffect(() => {
      if (!isMobile) return;

      if (pickerRef == null || baseRef.current == null) return;

      pickerRef.style.left = "0";
      pickerRef.style.top = "0";
      pickerRef.style.bottom = "0";
      pickerRef.style.right = "0";
      pickerRef.style.maxHeight = "100%";
      pickerRef.style.maxWidth = "100%";

      return () => {
        pickerRef.style.left = "";
        pickerRef.style.top = "";
        pickerRef.style.width = "";
        pickerRef.style.height = "";
        pickerRef.style.maxHeight = "";
        pickerRef.style.maxWidth = "";
      };
    }, [baseRef, isMobile, pickerRef]);

    return null;
  }
);

Settings.displayName = "Settings";
