import { Link } from "react-router-dom"

const LANGUAGE = {
    ukr: {
        logo: "Супер логотип",
        navMain: "Головна",
        navMyProfile: "Мій профіль",
        navCreateAd: "Нове оголошення",
        loginPage: "Сторінка логіна",
        login: "Логін",
        password: "Пароль",
        yourLogin: "Твій логін",
        yourPassword: "Твій пароль",
        enter: "Увійти",
        registration: "Реєстрація",
        passwordChange: "Зміна пароля",
        registrationForm: "Форма реєстрації",
        repeatThePassword: "Повторити пароль",
        register: "Зареєструвати",
        passwordChangeForm: "Форма зміни пароля",
        newPassword: "Новий пароль",
        change: "Змінити",
        registerError: "Упс..., якась помилка, спробуй інший логін",
        advertisement: "Оголошення",
        adListAnonHidden: `Щоб побачити оголошення потрібно ${<Link to="/login">зайти</Link>} в систему`,
        price: "Ціна",
        search: "Пошук"
    },
    en: {
        logo: "Super logo",
        navMain: "Main",
        navMyProfile: "My profile",
        navCreateAd: "New advertisement",
        loginPage: "Login page",
        login: "Login",
        password: "Password",
        yourLogin: "Your login",
        yourPassword: "Your password",
        enter: "Enter",
        registration: "Registration",
        passwordChange: "Password change",
        registrationForm: "Registration form",
        repeatThePassword: "Repeat the password",
        register: "Register",
        passwordChangeForm: "Password change form",
        newPassword: "New password",
        change: "Change",
        registerError: "Oops..., some error, try another login",
        advertisement: "Advertisement",
        adListAnonHidden: `You need to ${<Link to="/login">log in</Link>} to see the ad`,
        price: "Price",
        search: "Search"
    }
}

export default LANGUAGE;