import React from "react";
import { IEmoji } from "../interfaces/EMOJI";

export interface IPickerContext {
  onPickerChange: (picker: IEmoji) => void;
}

interface PickerProviderProps {
  children: React.ReactElement;
  onPickerChange: (picker: IEmoji) => void;
}

export const PickerContext = React.createContext<IPickerContext>({
  onPickerChange: () => {},
});

export const PickerProvider: React.FC<PickerProviderProps> = ({
  children,
  onPickerChange,
}) => {
  return (
    <PickerContext.Provider value={{ onPickerChange }}>
      {children}
    </PickerContext.Provider>
  );
};

export const usePickerContext = () => React.useContext(PickerContext);
