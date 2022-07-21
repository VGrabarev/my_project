import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { userFullLogin } from "../../store/authenticationReducer.js";
import LANGUAGE from "../../language/index.js";


let Login = function() {
    let lang = useSelector((state) => state.siteSettings.language);
    let loginFailed = useSelector((state) => state.auth.loginFailed);
    let dispatch = useDispatch();
    let login = useRef("");
    let password = useRef("");

    return (
        <section className="login">
            <h2 className="login__title">{LANGUAGE[lang].loginPage}</h2>
            <ul className="login__list">
                <li className="login__item">
                    <label className="login__label"
                           htmlFor="login">
                        {LANGUAGE[lang].yourLogin}
                    </label><br/>
                    <input className="login__input"
                           id="login"
                           type="text"
                           ref={login}
                           placeholder={LANGUAGE[lang].login}/>
                </li>
                <li className="login__item">
                    <label className="login__label"
                           htmlFor="password">
                        {LANGUAGE[lang].yourPassword}
                    </label><br/>
                    <input className="login__input"
                           id="password"
                           type="password"
                           ref={password}
                           placeholder={LANGUAGE[lang].password}/>
                </li>
            </ul>
            <button className="login__button"
                    onClick={() => dispatch(userFullLogin({login: login.current.value, 
                                                           password: password.current.value}))}>
                {LANGUAGE[lang].enter}
            </button>
            {loginFailed && <div className="login__failed">{LANGUAGE[lang].loginFailed}</div>}
            <ul className="login__other-list">
                <li className="login__other-item">
                    <Link className="login__link"
                          to="/password-change">
                        {LANGUAGE[lang].passwordChange}
                    </Link>
                </li>
                <li className="login__other-item">
                    <Link className="login__link"
                          to="/registration">
                        {LANGUAGE[lang].registration}
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default Login;