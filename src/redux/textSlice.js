import { createSlice } from "@reduxjs/toolkit";
import { english_word, turkish_word } from "./text";

const shuffleWords = (arr) => {
    let new_arr = [...arr].sort(() => Math.random() - 0.5);
    new_arr[0] = { ...new_arr[0], status: "current" };
    return new_arr;
}

export const textSlice = createSlice({
    name: "text",
    initialState: {
        start: false,
        timer: 60,
        language: "Turkish",
        languages: ["Turkish", "English"],
        text: shuffleWords(turkish_word),
        count: 0,
        correct: 0,
        incorrect: 0,
        currentWord: "",
        index: 0,
        loading: true,
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
            if (action.payload === "English") {
                state.text = shuffleWords(english_word);
            } else {
                state.text = shuffleWords(turkish_word);
            }
        },
        changeCount: (state) => {
            state.count += 1
            if (state.count === 1) {
                state.currentWord = state.text[0].word
            }
        },
        changeCurrentWord: (state) => {
            state.index += 1;
            state.currentWord = state.text[state.index].word;
            state.text[state.index - 1] = { ...state.text[state.index - 1], "status": "" };
            state.text[state.index] = { ...state.text[state.index], "status": "current" };
        },
        changeColor: (state, action) => {
            const check = action.payload.trim();
            if (check === state.text[state.index - 1].word) {
                state.text[state.index - 1] = { ...state.text[state.index - 1], "status": "", "answer": "true" };
                state.correct += 1
            } else {
                state.text[state.index - 1] = { ...state.text[state.index - 1], "status": "", "answer": "false" };
                state.incorrect += 1
            }
        },
        changeStart: (state, action) => {
            state.start = action.payload;
        },
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        tick: (state) => {
            state.timer -= 1;
        },
        restart: state => {
            state.start = false;
            state.timer = 60;
            state.count = 0;
            state.correct = 0;
            state.incorrect = 0;
            state.currentWord = "";
            state.index = 0;
            state.loading = true;
            if (state.language === "English") {
                state.text = shuffleWords(english_word)
            } else {
                state.text = shuffleWords(turkish_word)
            }
        }
    },
})

export const {
    changeLanguage,
    changeCount,
    changeCurrentWord,
    changeColor,
    changeLoading,
    changeStart,
    tick,
    restart } = textSlice.actions;

export default textSlice.reducer;