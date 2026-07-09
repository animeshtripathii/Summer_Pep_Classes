import { memo, useCallback, useState } from 'react';

const Button = memo(function Button({ onClick, label }) {
	console.log('Button rendered');

	return <button onClick={onClick}>{label}</button>;
});

export default function UseCallbackExample() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');

	const handleIncrement = useCallback(() => {
		setCount((prev) => prev + 1);
	}, []);

	return (
		<div style={{ padding: '20px' }}>
			<h1>useCallback Example</h1>
			<p>The button component only re-renders when its props change.</p>

			<p>Count: {count}</p>
			<Button onClick={handleIncrement} label="Increase Count" />

			<div style={{ marginTop: '16px' }}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Type here"
				/>
			</div>

			<p>Name: {name}</p>
		</div>
	);
}