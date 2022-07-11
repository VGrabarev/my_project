import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LANGUAGE from "../../language/index.js";


let Login = function() {
    let dispatch = useDispatch();
    let login = useRef("");
    let password = useRef("");

    return (
        <h2>Login</h2>
    );
};

export default Login;