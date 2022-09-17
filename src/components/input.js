import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCount, changeCurrentWord, changeColor, changeStart, tick, restart } from "../redux/textSlice";

export function Input() {
    const start = useSelector(state => state.text.start);
    const timer = useSelector(state => state.text.timer);

    const [userWord, setUserWord] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        let interval = null;
        if (timer === 0) {
            dispatch(changeStart(false));
        }
        if (start) {
            interval = setInterval(() => {
                dispatch(tick());
            }, 1000);
        } else if (!start && timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [start, timer, dispatch]);

    if (userWord[userWord.length - 1] === " ") {
        setUserWord("")
    }

    const handleChange = (e) => {
        if (e.target.value.includes(' ') && e.target.value[0] !== " ") {
            dispatch(changeCurrentWord());
            dispatch(changeColor(e.target.value));
        }
        setUserWord(e.target.value);
        dispatch(changeCount());
        dispatch(changeStart(true));
    }

    const handleClick = () => {
        dispatch(restart());
        setUserWord("");
    }
    return (
        <div className="input-row">
            <input value={userWord} onChange={handleChange} disabled={timer === 0 ? true : false} />
            <div>{timer === 60 ? "1:00" : timer > 9 ? `0:${timer}` : `0:0${timer}`}</div>
            <button onClick={handleClick}>↻</button>
        </div>
    );
}