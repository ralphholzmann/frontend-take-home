import type { InputHTMLAttributes } from 'react';
import { useState, useCallback, useMemo } from 'react';

const useInput = <T extends HTMLInputElement | HTMLTextAreaElement>(
  defaultValue = '',
): [
  string,
  Pick<InputHTMLAttributes<T>, 'onChange'>,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [value, setValue] = useState<string>(defaultValue || '');

  const onChange = useCallback(
    (event: React.ChangeEvent<T>) => {
      setValue(event.target.value);
    },
    [setValue],
  );

  const inputProps = useMemo(
    () => ({
      onChange,
      value,
    }),
    [onChange, value],
  );

  return [value, inputProps, setValue];
};

export default useInput;
