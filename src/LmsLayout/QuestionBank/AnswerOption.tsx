import React from 'react';

type AnswerOptionProps = {
	option: string;
	isCorrect: boolean;
	isSelected: boolean;
	showAnswer: boolean;
	handleClick: () => void;
};

export const AnswerOption: React.FC<AnswerOptionProps> = ({
	option,
	isCorrect,
	isSelected,
	showAnswer,
	handleClick,
}) => {
	let bgClass = '';
	if (showAnswer) {
		if (isCorrect) {
			bgClass = 'bg-primary';
		} else if (isSelected) {
			bgClass = 'bg-danger';
		}
	}

	return (
		<div
			className={`card my-2 ${bgClass}`}
			onClick={handleClick}
			style={{ cursor: showAnswer ? 'default' : 'pointer' }}>
			<div className='card-body'>
				<div className='form-check'>
					<input
						className='form-check-input'
						type='radio'
						value={option}
						checked={isSelected}
						disabled={showAnswer}
						onChange={() => {}}
					/>
					<label className='form-check-label'>{option}</label>
				</div>
			</div>
		</div>
	);
};
