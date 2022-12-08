import { useState } from "react";
import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("This email is not associated to any user");
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopUp();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div className="sign-up-container">
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
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;