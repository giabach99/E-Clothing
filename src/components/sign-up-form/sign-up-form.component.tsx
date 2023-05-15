import { useState, FormEvent, ChangeEvent} from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { SignUpContainer } from './sign-up-form.styles';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmedPassword} = formFields;
    const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmedPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            // const {user} = await createAuthUserWithEmailAndPassword(email, password);            
            
            // await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('This email is already used!');
            }
            console.log("User creation ecountered error: ", error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}                    
                />

                <FormInput 
                    label="Confirm Your Password" 
                    type='password' required 
                    onChange={handleChange} 
                    name="confirmedPassword" 
                    value={confirmedPassword}
                />
                

                <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;