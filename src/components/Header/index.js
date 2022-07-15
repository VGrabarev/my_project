import { languageToggle, themeToggle } from "../../store/siteSettingsReducer.js";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LANGUAGE from "../../language/index.js";

let Header = function() {
    let [lightTheme, setLightTheme] = useState(true);
    let themeToggleButton = useRef();
    let hamburgerButton = useRef();
    let nav = useRef();
    let lang = useSelector((state) => state.siteSettings.language);
    let dispatch = useDispatch();

    return (
        <header className="header">
            <div className="header__hamburger-button-container">
                <button className="header__hamburger-button"
                        ref={hamburgerButton}
                        onClick={() => {
                            nav.current.classList.toggle("header__nav--open");
                            hamburgerButton.current.classList.toggle("header__hamburger-button--close")
                        }}>
                    <span className="visually-hidden">Перемикач меню</span>
                </button>
            </div>
            <div className="header__logo">{LANGUAGE[lang].logo}</div>
            <nav className="header__nav"
                 ref={nav}>
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <Link className="header__nav-link"
                              to="/">
                            {LANGUAGE[lang].navMain}
                        </Link>
                    </li>
                    <li className="header__nav-item">
                        <Link className="header__nav-link"
                              to="/profile">
                            {LANGUAGE[lang].navMyProfile}
                        </Link>
                    </li>
                    <li className="header__nav-item">
                        <Link className="header__nav-link"
                              to="/create-ad">
                            {LANGUAGE[lang].navCreateAd}
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="header__site-setting-container">
                <button className="header__button-theme-toggle"
                        ref={themeToggleButton}
                        onClick={() => {
                            setLightTheme(!lightTheme);
                            dispatch(themeToggle(lightTheme));
                            themeToggleButton.current.classList.toggle("header__button-theme-toggle--left")
                        }}>
                        🌞 🌛
                    <span className="visually-hidden">Зміна теми сайту</span>
                </button>
                <ul className="header__lang-change-list">
                    <li className="header__lang-change-item">
                        <button className="header__lang-change-button"
                                disabled={lang === "ukr" ? true : false}
                                onClick={() => dispatch(languageToggle("ukr"))}>
                            Українська
                        </button>
                    </li>
                    <li className="header__lang-change-item">
                        <button className="header__lang-change-button"
                                disabled={lang === "en" ? true : false}
                                onClick={() => dispatch(languageToggle("en"))}>
                            English
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;