import React, { FC, VFC } from 'react';
import styled from '@emotion/styled';


interface Props {
    show: boolean;
    children: JSX.Element;
    onCloseModal: () => void;
    mouseEvent?: MouseEvent
}

const Modal: FC<Props> = ({show, children, onCloseModal, mouseEvent}) => {
    
    if(!show) return null;

    let [x,y] = [0,0]

    if(mouseEvent !== undefined) {
        console.log(mouseEvent)
        console.log("Right mouse position : ",mouseEvent.clientX,mouseEvent.clientY);

        [x,y] = [mouseEvent.clientX, mouseEvent.clientY]
    }

    return (
        <StyledModal x={x} y={y} >{children}</StyledModal>
    )
}



export default Modal;

interface StyledProps {
    x: number,
    y: number,
}

const StyledModal = styled.div<StyledProps>`
    position: absolute;
    background-color: #303033;
    width: 220px;
    color: lightgray;
    border-radius: 5px;
    z-index:5;
    top: ${({ y }) => `${y < 600 ? y -35 : y - 200}px`};
    left: ${({ x }) => `${x < 2200 ? x-40 : x - 250}px}`};
    box-shadow:
        0 15px 35px rgba(50,50,90,0.1),
        0 5px 15px rgba(0,0,0,0.07);
        
    ul {
        
        li {
            margin-left: 10px;
            margin-right: 10px;
            padding:2px;
            border-left: 3px solid transparent;
            transition: ease .2s;
            border-bottom: 1px solid lightgray;
            &:last-child {
                border-bottom: none;
            }

            &:hover {

                border-radius: 5px;
                background: #aba9a9;
                // border-left: 3px solid #9C27B0;
            }
        }

    }


`