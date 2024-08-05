import { useState } from "react";

import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [enteredValues, setEnteredValues] = useState({
  //   email: '',
  //   password: ''
  // });

  // const [didEdit, setDidEdit] = useState ({
  //   email: false,
  //   password: false
  // })

  const {
    value: emailValue, 
    handleInputChange: handleEmailChange, 
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) & isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6));
  
  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }
    
    console.log(emailValue, passwordValue)
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  // const emailIsInvalid = didEdit.email && 
  //   !isEmail(enteredValues.email) && 
  //   isNotEmpty(enteredValues.email);
  // const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  // function handleInputChange(identifier, value) {
  //   setEnteredValues((prevValues) => ({
  //     ...prevValues,
  //     [identifier]: value
  //   }));
  //   setDidEdit(prevEdit => ({
  //     ...prevEdit,
  //     [identifier]: false
  //   }))
  // }

  // function handleInputBlur(identifier) {
  //   setDidEdit(prevEdit => ({
  //     ...prevEdit,
  //     [identifier]: true
  //   }))
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
          label="Email" 
          id="email" 
          type="email" 
          name="email" 
          onChange={handleEmailChange}
          value={emailValue}
          onBlur={handleEmailBlur}
          error={emailHasError && 'Please enter a valid email!!'}
        />
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          name="password" 
          onChange={handlePasswordChange}
          value={passwordValue}
          onBlur={handlePasswordBlur}
          error={passwordHasError && 'Please entered a valid password!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
