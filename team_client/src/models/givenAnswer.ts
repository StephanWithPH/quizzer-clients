import BaseModel from "./baseModel.ts";
import Team from "./team.ts";

export default interface GivenAnswer extends BaseModel {
    answer: string;
    isCorrect: boolean;
    team: Team;
}