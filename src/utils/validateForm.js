import React, { useState } from "react";

function useFormValidation(currentValues) {
  const [userData, setUserData] = useState(currentValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value});
    setIsValid({...isValid, [name]: e.target.validity.valid});
    setErrors({...errors, [name]: e.target.validationMessage});
    setFormIsValid(document.querySelector('.form').checkValidity())
  }

  return { userData, errors, isValid, formIsValid, handleChange };
}

export default useFormValidation;