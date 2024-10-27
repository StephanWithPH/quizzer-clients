import Question from "../models/question.ts";

const questionsPerCategory = import.meta.env.VITE_QUESTIONS_PER_CATEGORY ? import.meta.env.VITE_QUESTIONS_PER_CATEGORY : 5;

export default function selectRandomQuestionFromCategories(questions: Question[]) {
  const selectedQuestions: Question[] = [];
  const categories = [...new Set(questions.map((question) => question.category))];
  categories.forEach((category) => {
    const questionsInCategory = questions.filter((question) => question.category === category);
    const questionLoopMax = questionsInCategory.length > questionsPerCategory ? questionsPerCategory : questionsInCategory.length;
    for (let i = 0; i < questionLoopMax; i++) {
      let uniqueQuestionFound = false;
      while (!uniqueQuestionFound) {
        const randomQuestionIndex = Math.floor(Math.random() * questionsInCategory.length);
        if (!selectedQuestions.includes(questionsInCategory[randomQuestionIndex])) {
          selectedQuestions.push(questionsInCategory[randomQuestionIndex]);
          uniqueQuestionFound = true;
        }
      }
    }
  });
  return selectedQuestions;
}
