import styles from './app.module.css';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	function onInputButtonClick() {
		const promptValue = prompt('Введите значение');
		console.log(promptValue);

		if (promptValue === null || promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setValue('');
		}
		if (promptValue !== null && promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		}
		return promptValue;
	}

	const isValueValid = Boolean(value);

	function onAddButtonClick() {
		const updatedList = [...list, { id: Date.now(), value }];
		if (isValueValid) {
			setList(updatedList);
			setValue('');
			setError('');
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error ? <div className={styles.error}>{error}</div> : ''}
			<div className={styles['button-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length < 1 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : null}
				<ul className={styles.list}>
					{list.map(({ id, value }) => (
						<li className={styles['list-item']} key={id}>
							{value} -{' '}
							{new Intl.DateTimeFormat('ru', {
								dateStyle: 'short',
								timeStyle: 'short',
							}).format(id)}
						</li>
					))}
				</ul>
			</div>
			<header className={styles['app-header']}></header>
		</div>
	);
}

export default App;
