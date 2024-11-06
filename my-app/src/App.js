import styles from './app.module.css';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	let isValueValid = false;

	function onInputButtonClick() {
		let promptValue = prompt('Введите значение');
		console.log(promptValue);

		promptValue.length < 3
			? setError('Введенное значение должно содержать минимум 3 символа')
			: setError('');
		if (!error) {
			promptValue = '';
			isValueValid = true;
		}
		return promptValue;
	}
	const handleClick = () => setValue(onInputButtonClick);

	const updatedList = [...list, { id: Date.now(), value }];

	function onAddButtonClick() {
		if (isValueValid) {
			setList(updatedList);
			this.setState({ value: '' });
			this.setState({ error: '' });
		}
	}

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : null}
			<div className={styles['button-container']}>
				<button className={styles.button} onClick={handleClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				<ul className={styles.list}>
					<li className={styles['list-item']}>Первый элемент</li>
				</ul>
			</div>
			<header className={styles['app-header']}></header>
		</div>
	);
}

export default App;
