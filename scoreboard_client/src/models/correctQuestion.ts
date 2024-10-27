import Team from "./team.ts";

export interface CorrectAnswersPerTeam {
  team: Team;
  correctAnswers: number;
}

export interface CorrectAnswersByTeamId {
  teamId: string;
  correctAnswers: number;
}
