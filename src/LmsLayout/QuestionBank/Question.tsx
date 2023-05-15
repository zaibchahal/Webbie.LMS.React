import React, { useState } from 'react';
import { AnswerOption } from './AnswerOption';

type QuestionProps = {
	question: string;
	options: string[];
	answer: string;
};

export const Question: React.FC<QuestionProps> = ({ question, options, answer }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [showAnswer, setShowAnswer] = useState(false);

	const handleOptionClick = (option: string) => {
		if (!showAnswer) {
			setSelectedOption(option);
			setShowAnswer(true);
		}
	};

	return (
		<div className='card my-3'>
			<div className='card-body'>
				<h5 className='card-title'>{question}</h5>
				{options.map((option, index) => (
					<AnswerOption
						key={index}
						option={option}
						isCorrect={option === answer}
						isSelected={option === selectedOption}
						showAnswer={showAnswer}
						handleClick={() => handleOptionClick(option)}
					/>
				))}
			</div>
			{showAnswer && (
				<div className='card-footer'>
					<p className='mb-0'>
						<strong>Correct answer:</strong> {answer}
					</p>
				</div>
			)}
		</div>
	);
};
