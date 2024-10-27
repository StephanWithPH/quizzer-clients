import toastr from "toastr";
import fetcher from "../fetcher";
import { AppDispatch, RootState } from "../store/store.ts";
import {
  CorrectAnswersByTeamId,
  CorrectAnswersPerTeam,
} from "../models/correctQuestion.ts";
import { setCorrectAnswersPerTeam } from "../reducers/correctQuestionReducer.ts";

const serverURL = import.meta.env.VITE_API_URL;

export function getCorrectQuestionsActionAsync() {
  return (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve) => {
      const { global, rounds } = getState();
      fetcher(
        `${serverURL}/scoreboard/quiz/${global.lobbyCode}/rounds/${rounds[rounds.length - 1]._id}/askedQuestions`,
        {
          credentials: "include",
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((items: CorrectAnswersPerTeam[]) => {
          const list: CorrectAnswersByTeamId[] = [];
          items.forEach((item) => {
            list.push({
              teamId: item.team._id,
              correctAnswers: item.correctAnswers,
            });
          });
          dispatch(setCorrectAnswersPerTeam(list));
          resolve(null);
        })
        .catch(() => {
          toastr.error("Er is iets fout gegaan!");
          resolve(null);
        });
    });
}
