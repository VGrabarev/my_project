import { useRef } from "react";
import { useSelector } from "react-redux";
import LANGUAGE from "../../language/index.js";

let PasswordChange = function() {
    let lang = useSelector((state) => state.siteSettings.language);
    let login = useRef("");
    let password = useRef("");
    let passwordRepeat = useRef("");

    return (
        <section className="password-change">
            <h2 className="password-change__title">{LANGUAGE[lang].passwordChangeForm}</h2>
            <ul className="password-change__list">
                <li className="password-change__item">
                    <label className="password-change__label"
                           htmlFor="login">
                        {LANGUAGE[lang].yourLogin}
                    </label><br/>
                    <input className="password-change__input"
                           id="login"
                           type="text"
                           ref={login}
                           placeholder={LANGUAGE[lang].login}/>
                </li>
                <li className="password-change__item">
                    <label className="password-change__label"
                           htmlFor="password">
                        {LANGUAGE[lang].yourPassword}
                    </label><br/>
                    <input className="password-change__input"
                           id="password"
                           type="password"
                           ref={password}
                           placeholder={LANGUAGE[lang].password}/>
                </li>
                <li className="password-change__item">
                    <label className="password-change__label"
                           htmlFor="passwordRepeat">
                        {LANGUAGE[lang].newPassword}
                    </label><br/>
                    <input className="password-change__input"
                           id="passwordRepeat"
                           type="password"
                           ref={passwordRepeat}
                           placeholder={LANGUAGE[lang].newPassword}/>
                </li>
            </ul>
            <button className="password-change__button">
                {LANGUAGE[lang].change}
            </button>
        </section>
    );
};

export default PasswordChange;