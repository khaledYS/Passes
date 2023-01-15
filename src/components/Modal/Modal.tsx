import { AnimatePresence, motion } from "framer-motion";
import { Children, cloneElement, FC, ReactElement, ReactNode } from "react";
import { createPortal, render } from "react-dom";

interface ModalProps {
    children: ReactElement,
    isShowing: Boolean
}
 
const Modal= ({children, isShowing}:ModalProps) => {
    return createPortal(
        <>
            <AnimatePresence>
                {isShowing && children}
            </AnimatePresence>
        </>,
        document.body
    )
}
 
export default Modal;