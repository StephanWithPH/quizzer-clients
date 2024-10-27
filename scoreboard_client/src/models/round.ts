import AskedQuestion from "./askedQuestion.ts";
import BaseModel from "./baseModel.ts";

export default interface Round extends BaseModel{
    askedQuestions: AskedQuestion[];
    finished: boolean;
    chosenCategories: string[];
}