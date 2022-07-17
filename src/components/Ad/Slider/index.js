import { useState } from "react";

const CONTAINER_WIDTH = 450;

let Slider = function({children}) {
    let [translateX, setTranslateX] = useState(0);

    return (
        <div className="slider">
            <div className="slider__slider-conteiner"
                 style={{
                     transform: `translateX(-${translateX}px)`
                 }}>
                {children}
            </div>
            <button className="slider__button slider__button--left"
                    onClick={() => {
                        if(translateX == 0) {
                            setTranslateX(CONTAINER_WIDTH * (children.length - 1))
                        } else {
                            setTranslateX(translateX - CONTAINER_WIDTH)
                        }
                    }}>
                <span className="visually-hidden">left</span>
            </button>
            <button className="slider__button slider__button--right"
                    onClick={() => {
                        if(translateX == CONTAINER_WIDTH * (children.length - 1)) {
                            setTranslateX(0);
                        } else {
                            setTranslateX(translateX + CONTAINER_WIDTH)
                        }
                    }}>
                <span className="visually-hidden">right</span>
            </button>
        </div>
    );
};

export default Slider;