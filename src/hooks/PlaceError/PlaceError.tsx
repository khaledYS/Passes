import { useState } from "react";

interface CRUD_OptionsProps {
  startStr?: string;
  endStr?: string;
}
/**
 *
 * @returns {errors, addError, setError, removeError, clearErrors}
 */
const PlaceError = () => {
  const [errors, setErrors] = useState<Array<string>>([]);

  function addError(error: string, options: Partial<CRUD_OptionsProps>) {
    try {
      setErrors([
        ...errors,
        `${options?.startStr ? options.startStr : ""}${error}${
          options?.endStr ? options.endStr : ""
        }`,
      ]);
    } catch (error) {
      console.error(error);
    }
  }
  function setError(error: string) {
    try {
      setErrors([error]);
    } catch (error) {
      console.error(error);
    }
  }
  function removeError(errorIndex: number) {
    try {
      setErrors(
        errors.filter((_, ind) => {
          return ind !== errorIndex;
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
  function clearErrors() {
    try {
      setErrors([]);
    } catch (error) {
      console.error(error);
    }
  }

  return {errors, addError, setError, removeError, clearErrors} as {
    errors: Array<string>,
    addError: Function,
    setError: Function,
    removeError: Function,
    clearErrors:Function
  };
};

export default PlaceError;
