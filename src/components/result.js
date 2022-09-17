import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLoading } from "../redux/textSlice";

export function Result() {
    const language = useSelector(state => state.text.language);
    const count = useSelector(state => state.text.count);
    const correct = useSelector(state => state.text.correct);
    const incorrect = useSelector(state => state.text.incorrect);
    const timer = useSelector(state => state.text.timer);
    const loading = useSelector(state => state.text.loading);

    const dispatch = useDispatch();

    if (timer === 0) {
        setTimeout(() => {
            dispatch(changeLoading(false))
        }, 2000);
    }

    return (
        <>
            {timer === 0 && loading ?
                <div className="loading">
                    <img src="https://10fastfingers.com/img/layout/stuff/ajax-loader.gif?1656498999" alt="loading" />
                </div> :
                timer === 0 && !loading ?
                    <div className="result">
                        <h3>
                            {language === "English" ? "Result" : "Sonuç"}
                        </h3>
                        <table>
                            <caption className="wpm">
                                <strong >
                                    {language === "English" ? "0 WPM" : "0 DKS"}
                                </strong>
                                <small>
                                    {language === "English" ? "(words per minute)" : "(dakikada kelime sayısı)"}
                                </small>
                            </caption>
                            <tbody>
                                <tr>
                                    <td className="name">
                                        {language === "English" ? "Keystrokes" : "Tuş Vuruşu"}
                                    </td>
                                    <td className="value">
                                        <small>
                                            (<span
                                                className="correct">{correct}</span> | <span className="wrong">{incorrect}
                                            </span>)
                                        </small>&nbsp;{count}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        {language === "English" ? "Accuracy" : "Doğruluk"}
                                    </td>
                                    <td className="value">
                                        {(incorrect + correct) === 0 ?
                                            <strong>0%</strong> :
                                            <strong>
                                                {((correct / (incorrect + correct)) * 100).toFixed()}%
                                            </strong>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        {language === "English" ? "Correct words" : "Doğru kelime"}
                                    </td>
                                    <td className="value"> <strong className="correct">{correct}</strong></td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        {language === "English" ? "Wrong words" : "Yanlış kelime"}
                                    </td>
                                    <td className="value"> <strong className="wrong">{incorrect}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> : ""}
        </>
    );
}

