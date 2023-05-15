import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;        

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>  ) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>  
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
                
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonsContainer>
                
            </form>
        </SignInContainer>
    )
}

export default SignInForm;