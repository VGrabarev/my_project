import { useSelector } from "react-redux";
import { useRef } from "react";
import Header from "../Header/index.js";
import Main from "../Main/index.js";
import Footer from "../Footer/index.js";

let App = function() {
    let theme = useSelector((state) => state.siteSettings.theme);
    let app = useRef();

    return (
        <div className={`app ${theme === "dark" ? "app--dark" : ""}`}
             ref={app}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default App;