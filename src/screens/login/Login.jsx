import { useState, useRef, useEffect } from 'react'
import { Input, Button } from '../../components'

function Login() {

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	})

	const [formErrors, setFormErrors] = useState({})
	const [isSubmit, setIsSubmit] = useState(false)

	const emailRef = useRef()
	const passwordRef = useRef()

	useEffect(() => {
		emailRef.current.focus()
	}, [])

	const handleChange = e => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const errors = validate(formValues)
		setFormErrors(errors)
		focusInput(errors)
		setIsSubmit(true)

		if (Object.keys(errors).length === 0 && isSubmit) {
			console.log('submit')
		}
	}

	const validate = values => {
		const errors = {}
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
		if (!values.email) {
			errors.email = 'Email is required!'
		} else if (!regex.test(values.email)) {
			errors.email = 'This is not a valid email format!'
		}
		if (!values.password) {
			errors.password = 'Password is required'
		} else if (values.password.length < 4) {
			errors.password = 'Password must be more than 4 characters'
		} else if (values.password.length > 10) {
			errors.password = 'Password cannot exceed more than 10 characters'
		}
		return errors
	}

	const focusInput = (errors) => {
		if (errors.email) {
			emailRef.current.focus()
		} else if (errors.password) {
			passwordRef.current.focus()
		}
	}

	return (
		<div className='login-container'>
			<div className='form-box'>
				{Object.keys(formErrors).length === 0 && isSubmit ? (
					<div className='ui message success'>Signed in successfully</div>
				) : (
						<>
							<p>form values</p>
							<pre>{JSON.stringify(formValues, undefined, 2)}</pre>
							<p>form errors</p>
						<pre>{JSON.stringify(formErrors, undefined, 2)}</pre>
					</>
				)}
				<h1>Log in</h1>

				<form onSubmit={handleSubmit} noValidate>
					<Input
						reff={emailRef}
						label='Email'
						name='email'
						type='email'
						placeholder='example@email.com'
						value={formValues.email}
						onChange={handleChange}
						message={formErrors?.email}
					/>

					<Input
						reff={passwordRef}
						label='Password'
						name='password'
						type='password'
						placeholder='Password'
						value={formValues.password}
						onChange={handleChange}
						message={formErrors?.password}
					/>

					<Button type='submit'>Log In</Button>
				</form>
			</div>
		</div>
	)
}

export default Login
