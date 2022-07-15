import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFullRegister } from "../../store/authenticationReducer.js";
import LANGUAGE from "../../language/index.js";

let Registration = function() {
    let registerError = useSelector(state => state.auth.registerFailed);
    let lang = useSelector((state) => state.siteSettings.language);
    let dispatch = useDispatch();
    let login = useRef("");
    let password = useRef("");
    let passwordRepeat = useRef("");

    return (
        <section className="registration">
            <h2 className="registration__title">{LANGUAGE[lang].registrationForm}</h2>
            <ul className="registration__list">
                <li className="registration__item">
                    <label className="registration__label"
                           htmlFor="login">
                        {LANGUAGE[lang].yourLogin}
                    </label><br/>
                    <input className="registration__input"
                           id="login"
                           type="text"
                           ref={login}
                           placeholder={LANGUAGE[lang].login}/>
                </li>
                <li className="registration__item">
                    <label className="registration__label"
                           htmlFor="password">
                        {LANGUAGE[lang].yourPassword}
                    </label><br/>
                    <input className="registration__input"
                           id="password"
                           type="password"
                           ref={password}
                           placeholder={LANGUAGE[lang].password}/>
                </li>
                <li className="registration__item">
                    <label className="registration__label"
                           htmlFor="passwordRepeat">
                        {LANGUAGE[lang].repeatThePassword}
                    </label><br/>
                    <input className="registration__input"
                           id="passwordRepeat"
                           type="password"
                           ref={passwordRepeat}
                           placeholder={LANGUAGE[lang].repeatThePassword}/>
                </li>
            </ul>
            {registerError && <div className="registration__error">{LANGUAGE[lang].registerError}</div>}
            <button className="registration__button"
                    onClick={() => dispatch(userFullRegister({login: login.current.value,
                                                              password: password.current.value}))}>
                {LANGUAGE[lang].register}
            </button>
        </section>
    );
};

export default Registration;