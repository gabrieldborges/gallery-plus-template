import SearchIcon from "../../assets/icons/search.svg?react";
import InputText from "../input-text";
import React from "react";
import { debounce } from "../../helpers/util";
import usePhotos from "../../context/photos/hooks/use-photos";
import cx from "classnames";


interface PhotoSearchProps extends React.ComponentProps<"input">{

}

export default function PhotoSearch({className}:PhotoSearchProps) {
  const [inputValue, setInputValue] = React.useState("");
  const { filter } = usePhotos();

  function handleDebounceFunction(value: any) {
    filter.setQ(value);
  }

  const debouncedSetValue = React.useCallback(
    debounce(handleDebounceFunction, 300),
    [handleDebounceFunction],
  );

  function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar fotos"
      className={cx("flex-1",className)}
      value={inputValue}
      onChange={handleInputValueChange}
    />
  );
}
