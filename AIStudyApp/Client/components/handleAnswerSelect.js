const handleAnswerSelect = (choiceLabel, currentQuestion, setFeedback) => {
    const correctChoice = currentQuestion.choices.find(choice => choice.isCorrect);
    if (choiceLabel === correctChoice.label) {
        setFeedback('Correct!');
    } else {
        setFeedback('Wrong, try again!');
    }
};

export default handleAnswerSelect;
