import React, { useContext } from "react";

import Style from './Input.module.css'

const Input = ({ inputType, title, placehoder, handleClick }) => {
    return (
        <div className={Style.input}>
            <p>{title}</p>
            {inputType === "text" ? (
                <div className={Style.input__box}>
                    <input
                        type="text"
                        className={Style.input__box__form}
                        placeholder={placehoder}
                        onChange={handleClick}

                    />
                </div>
            ) :
                ('')}

        </div>
    )
}

export default Input