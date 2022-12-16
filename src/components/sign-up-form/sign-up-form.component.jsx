import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
import { UserContext } from "../../contexts/user.context";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmedPassword} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmedPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This email is already used!');
            }
            console.log("User creation ecountered error: ", error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
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
                

                <Button buttonType='google' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;