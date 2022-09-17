import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "../redux/textSlice";

export function Dropdown() {
    const languages = useSelector(state => state.text.languages);
    const language = useSelector(state => state.text.language);
    const timer = useSelector(state => state.text.timer);

    const dispatch = useDispatch();
    return (
        <div className="select-box">
            <select
                disabled={timer !== 60 ? true : false}
                value={language}
                onChange={(e) => dispatch(changeLanguage(e.target.value))}
            >
                {languages.map((item, i) => (
                    <option value={item} key={i}>
                        {item}
                    </option>)
                )}
            </select>
            <p>
                {language === "English" ? "Switch Typing Test language" : "Test Dilini Değiştirin"}
            </p>
        </div>
    );
}