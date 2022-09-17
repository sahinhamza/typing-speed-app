import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export function Textbox() {
    const text_ = useSelector(state => state.text.text);
    const index_ = useSelector(state => state.text.index);

    const fieldRef = useRef();

    useEffect(() => {
        if (index_ && fieldRef.current) {
            fieldRef.current.scrollIntoView();
        }
    }, [index_]);

    return (
        <div className="text-box">
            {text_.map((item, index) => (
                <span
                    key={index}
                    className={item.status === "current" ? "current" :
                        item.answer === "true" ? "correct" :
                            item.answer === "false" ? "incorrect" : ""}
                    ref={index_ === index ? fieldRef : null}
                >
                    {item.word}
                </span>
            ))}
        </div>
    );
}