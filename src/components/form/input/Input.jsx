import './input.css'

function Input(props, ref) {
	return (
		<div className='input-container'>
			<label htmlFor={props.name}>
				{props.label}{' '}
				{props.requiredLabel ? <span className='required'>*</span> : null}
			</label>

			{props.type === 'textarea' ? (
				<textarea
					ref={props.reff}
					className={`input ${props.message ? 'error' : ''}`}
					id={props.name}
					name={props.name}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
					autoComplete='off'
				/>
			) : (
				<input
					ref={props.reff}
					className={`input ${props.message ? 'error' : ''}`}
					id={props.name}
					type={props.type}
					name={props.name}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
					autoComplete='off'
				/>
			)}
			{props.message ? (
				<p className='error'>
					<span className='error-sign'>!</span>
					{props.message}
				</p>
			) : null}
		</div>
	)
}

export default Input
