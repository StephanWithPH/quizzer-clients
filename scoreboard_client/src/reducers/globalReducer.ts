import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  lobbyCode: string | null;
  roundNumber: number;
  questionNumber: number;
}

const initialState: GlobalState = {
  lobbyCode: null,
  roundNumber: 0,
  questionNumber: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLobbyCode: (state, action) => {
      return { ...state, lobbyCode: action.payload };
    },
    setRoundNumber: (state, action) => {
      return { ...state, roundNumber: action.payload };
    },
    setQuestionNumber: (state, action) => {
      return { ...state, questionNumber: action.payload };
    },
    logout: () => {
      return { ...initialState };
    },
  },
});

export const { setLobbyCode, setRoundNumber, setQuestionNumber, logout } =
  globalSlice.actions;

export default globalSlice.reducer;
