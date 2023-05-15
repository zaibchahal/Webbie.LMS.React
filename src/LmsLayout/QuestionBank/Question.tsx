import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Question = () => {
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);

	interface Option {
		id: number;
		text: string;
		isCorrect: boolean;
	}

	const options: Option[] = [
		{ id: 1, text: 'Option 1', isCorrect: true },
		{ id: 2, text: 'Option 2', isCorrect: false },
		{ id: 3, text: 'Option 3', isCorrect: false },
		{ id: 4, text: 'Option 4', isCorrect: false },
	];

	const handleOptionSelect = (optionId: number) => {
		if (!selectedOption && !showAnswer) {
			setSelectedOption(optionId);
			setShowAnswer(true);
		}
	};

	return (
		<div className='container mt-5'>
			<h2 className='mb-4'>Question:</h2>
			<p className='lead'>What is the correct answer?</p>

			<div className='list-group'>
				{options.map((option) => {
					const isOptionSelected = selectedOption === option.id;
					const isCorrectAnswer = option.isCorrect;
					const isWrongAnswer = showAnswer && isOptionSelected && !isCorrectAnswer;

					let optionClass = 'list-group-item list-group-item-action';
					if (isOptionSelected && showAnswer) {
						optionClass += isCorrectAnswer
							? ' bg-primary text-white'
							: ' bg-danger text-white';
					}

					return (
						<div
							key={option.id}
							onClick={() => handleOptionSelect(option.id)}
							className={optionClass}>
							{option.text}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Question;
