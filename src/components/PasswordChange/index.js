import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../store/authenticationReducer.js";
import LANGUAGE from "../../language/index.js";

let PasswordChange = function() {
    let lang = useSelector((state) => state.siteSettings.language);
    let userLogin = useSelector((state) => state.auth?.payload?.sub?.login);
    let login = useRef();
    let password = useRef();
    let newPassword = useRef();
    let dispatch = useDispatch();

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
                           placeholder={LANGUAGE[lang].login}
                           defaultValue={userLogin ? userLogin : ""}
                           disabled={userLogin ? true : false}/>
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
                           htmlFor="newPassword">
                        {LANGUAGE[lang].newPassword}
                    </label><br/>
                    <input className="password-change__input"
                           id="newPassword"
                           type="password"
                           ref={newPassword}
                           placeholder={LANGUAGE[lang].newPassword}/>
                </li>
            </ul>
            <button className="password-change__button"
                    onClick={() => dispatch(changePassword({
                                                            login: login.current.value,
                                                            password: password.current.value,
                                                            newPassword: newPassword.current.value
                                                            }))}>
                {LANGUAGE[lang].change}
            </button>
        </section>
    );
};

export default PasswordChange;