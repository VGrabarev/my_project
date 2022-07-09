import { languageToggle, themeToggle } from "../../store/reducers.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import LANGUAGE from "../../language/index.js";

let Header = function() {
    let [lightTheme, setLightTheme] = useState(true);
    let lang = useSelector((state) => state.siteSettings.language);
    let dispatch = useDispatch();

    return (
        <header>
            <div>{LANGUAGE[lang].logo}</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">{LANGUAGE[lang].navMain}</Link>
                    </li>
                    <li>
                        <Link to="/my-profile">{LANGUAGE[lang].navMyProfile}</Link>
                    </li>
                    <li>
                        <Link to="/create-ad">{LANGUAGE[lang].navCreateAd}</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button onClick={() => {
                    setLightTheme(!lightTheme);
                    dispatch(themeToggle(lightTheme));
                }}>Зміна теми сайту</button>
                <ul>
                    <li>
                        <button onClick={() => dispatch(languageToggle("ukr"))}>Українська</button>
                    </li>
                    <li>
                        <button onClick={() => dispatch(languageToggle("en"))}>English</button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;