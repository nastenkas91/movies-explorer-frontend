import React, {useCallback, useState} from "react";

function useFormValidation(currentValues) {
  const [values, setValues] = useState(currentValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
    setIsValid({...isValid, [name]: e.target.validity.valid});
    setErrors({...errors, [name]: e.target.validationMessage});
    setFormIsValid(e.target.closest('.form').checkValidity())
  }

  return { values, errors, isValid, formIsValid, handleChange };
}

export default useFormValidation;