import SearchIcon from "../../assets/icons/search.svg?react"
import InputText from "../input-text"
import React from "react";
import { debounce } from "../../helpers/util";





export default function PhotoSearch() {
    const [inputValue, setInputValue] = React.useState("");

    function handleDebounceFunction(value: any) {
        console.log(" Valor do debounce", value)
    }

    const debouncedSetValue = React.useCallback(debounce(handleDebounceFunction, 1000), [])

    function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setInputValue(value)
        debouncedSetValue(value)
    }




    return (
        <InputText
            icon={SearchIcon}
            placeholder="Buscar fotos"
            className="flex-1"
            value={inputValue}
            onChange={handleInputValueChange}
        />

    )
}