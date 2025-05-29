// import logo from './logo.svg';
import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const isValueVaild = value.length >= 3;
	const dateCreateTheElement = new Date().toLocaleString('ru-Ru').replace(',', '');
	const updatedList = [...list, { id: Date.now(), value, dateCreateTheElement }];

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue === null) {
			console.log('Отмена ввода');
			return;
		}

		const trimPromptValue = promptValue.trim();
		if (trimPromptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else if (trimPromptValue.length >= 3) {
			setValue(trimPromptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		// console.log(list);
		if (value.length >= 3) {
			list.push(value);
			setValue('');
			setError('');
			setList(updatedList);
			console.log('updatedList', updatedList);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}> {value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length > 0 ? (
					<ul className={styles.list}>
						{list.map(({ id, value }) => (
							<li className={styles.listItem} key={id}>
								{value}
							</li>
						))}
					</ul>
				) : (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
