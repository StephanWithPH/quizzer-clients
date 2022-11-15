export function setAnswerAction(answer) {
  return {
    type: 'SET_ANSWER',
    payload: answer,
  };
}

export function setGivenAnswerAction(givenAnswer) {
  return {
    type: 'SET_GIVEN_ANSWER',
    payload: givenAnswer,
  };
}

export function clearQuestionAction() {
  return {
    type: 'CLEAR_QUESTION',
  };
}
