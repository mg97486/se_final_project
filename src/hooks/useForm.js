import { useState, useRef, useCallback, useEffect } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  // Keep latest default values in a ref so resetForm can be stable
  const defaultRef = useRef(defaultValues);
  useEffect(() => {
    defaultRef.current = defaultValues;
  }, [defaultValues]);

  const handleChange = useCallback((evt) => {
    const { name, value } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(defaultRef.current);
  }, []);

  return { values, setValues, handleChange, resetForm };
}
