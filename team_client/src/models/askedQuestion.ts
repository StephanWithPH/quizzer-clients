import BaseModel from "./baseModel.ts";
import Question from "./question.ts";
import GivenAnswer from "./givenAnswer.ts";

export default interface AskedQuestion extends BaseModel {
    question: Question;
    givenAnswers: GivenAnswer[];
    closed: boolean;
}