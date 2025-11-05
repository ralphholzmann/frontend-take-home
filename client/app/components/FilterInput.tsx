import { useEffect, useRef } from "react";
import Input from "./Input";
import useInput from "../hooks/useInput";

type FilterInputProps = {
  placeholder: string;
  handleSearchChange: (value:string, event?: React.FormEvent<HTMLFormElement>) => void;
  defaultValue?: string;
  autoFocus?: boolean;
}

const FilterInput = ({ placeholder, handleSearchChange, defaultValue, autoFocus }: FilterInputProps) => {
  const searchDebounceId = useRef<NodeJS.Timeout | null>(null);
  const [searchValue, searchInputProps] = useInput(defaultValue || '');

  const handleSearchSubmit= (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    handleSearchChange(searchValue, event);
  }

  useEffect(() => {
    if (searchDebounceId.current) {
      clearTimeout(searchDebounceId.current);
    }

    searchDebounceId.current = setTimeout(() => {
      handleSearchChange(searchValue);
    }, 300);

    return () => {
      if (searchDebounceId.current) {
        clearTimeout(searchDebounceId.current);
      }
    }
  }, [searchValue]);

  return (
    <form className="grow" onSubmit={handleSearchSubmit}>
      <Input placeholder={placeholder} startIcon="magnifying-glass" className="grow" autoFocus={autoFocus} {...searchInputProps}  />
    </form>
  )
}

export default FilterInput;