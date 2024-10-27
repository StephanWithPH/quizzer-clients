import BaseModel from "./baseModel.ts";

export default interface Question extends BaseModel{
    question: string;
    answer: string;
    category: string;
    type: string;
    image: string;
}