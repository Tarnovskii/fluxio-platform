import {useCallback, useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";

export const useModal = ({Component, isOpenByDefault = false}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpenByDefault)

    const currentModalId = useMemo(() => {
       return `${Math.round(Math.random() * Date.now())}_${Component.name}`
    } ,[])

    const modalRoot = useMemo(() => {
        const _element = document.createElement('dialog');

        _element.setAttribute('id', currentModalId)

        _element.setAttribute('open', 'true');

        return _element
    }, [currentModalId])

    const PortalComponent = useCallback((props) => {
        return createPortal(<Component {...props}/>, modalRoot)
    }, [Component, currentModalId, modalRoot])


    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
            document.body.appendChild(modalRoot)
        } else if (modalRoot) {
            document.body.style.overflow = ''
            modalRoot.remove();
        }

        return () => {
            if (modalRoot) {
                document.body.style.overflow = ''
                modalRoot.remove();
            }
        };
    }, [isModalOpen, currentModalId])

    return [PortalComponent, setIsModalOpen];
}