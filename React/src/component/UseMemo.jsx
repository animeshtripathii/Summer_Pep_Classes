import { useMemo, useState } from 'react';

function slowFunction(num) {
	console.log('Calculating...');

	let result = 0;
	for (let i = 0; i < 100000000; i++) {
		result += num;
	}

	return result;
}

export default function UseMemoExample() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');

	const expensiveValue = useMemo(() => slowFunction(count), [count]);

	return (
		<div style={{ padding: '20px' }}>
			<h1>useMemo Example</h1>
			<p>The expensive calculation only runs when <code>count</code> changes.</p>

			<p>Expensive Value: {expensiveValue}</p>

			<button onClick={() => setCount((prev) => prev + 1)}>
				Increase Count
			</button>

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