import { useState, memo } from 'react';

const Child = memo(function Child({ count }) {
	console.log('Child rendered');

	return <h2>Child Count: {count}</h2>;
});

export default function ReactMemoExample() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('');

	return (
		<div style={{ padding: '20px' }}>
			<h1>React.memo Example</h1>
			<p>Child only re-renders when <code>count</code> changes.</p>

			<Child count={count} />

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
