import {useEffect, useState} from "react";

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(null);

    useEffect(() => {
        const updateScrollPosition = (e) => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener("scroll", updateScrollPosition);

        return () => {
            window.removeEventListener("scroll", updateScrollPosition);
        }
    }, []);

    return scrollPosition;
};