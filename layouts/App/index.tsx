import React, {FC, MouseEventHandler, SyntheticEvent, createContext, useCallback, useMemo, useReducer, useRef, useState} from 'react';

/** 코드 스플릿팅을 위한 라이브버리
 * loadable을 사용하면 알아서 스플릿팅하고 알아서 불러온다.
 */
import loadable from '@loadable/component';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Content, FooterDiv, MainContent, SideBar, TopMenuNav, TopMenuNavUl } from '@layouts/App/style';
import { JsxElement } from 'typescript';
import Modal from '@components/Modal';
import Workspace from '@pages/Workspace';
import WebGLCanvas from '@pages/WebGLCanvas';

const Webgl = loadable(() => import('@pages/Webgl'));
const MapPopup = loadable(() => import('@components/MapPopup'))
// const Modal = loadable(() => import('@components/Modal'))

export const ON_MAP_CLICK = 'ON_MAP_CLICK';

export const WebGLContext = createContext({
    imgUrl: '',
    weatherData: {
        base: '',
        cod: 0,
        clouds: {
            all: 0
        },
        coord: {
            lat: 0,
            lon: 0,
        },
        main: {
            feels_like: 0,
            humidity: 0,
            pressure: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
        },
        name: '',
        visibility: 0,
        weather: [],
        wind: {
            speed: 0,
            deg: 0,
        }
    },
    dispatch: ({}) => {}
    // dispatch: (action: {type: string; payload/?: any}) => {},
});

// useReducer에 사용 될 초기 데이터
const initialState = {
    imgUrl: '',
    weatherData: {},
}

const reducer = (state: any, action: any):any => {

    console.log("3333",state);

    switch(action.type) {
        case ON_MAP_CLICK : {
            console.log("action", action)
            return {
                ...state,
                imgUrl: action.imgUrl,
                weatherData: action.weatherData,
            }
        }
    }
}

const App = () => {

    //지도 초기 위도/경도 설정
    const [latLng, setLatlng] = useState([]);

    const [state, dispatch] = useReducer(reducer, initialState);
    const { imgUrl, weatherData } = state;

    const value = useMemo( () => ({
        imgUrl, weatherData, dispatch
    }), [imgUrl, weatherData])

    const [modalState, setModelState] = useState([]);
    const [showCreateNavModel, setShowCreateNavModel] = useState(false);
    const [showCreateMouseRightModal, setShowCreateMouseRightModal] = useState(false);
    const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
    const [mouseEvent, setMouseEvent] = useState();

    // const onNavClick = useCallback(() => {
    //     if(showCreateMouseRightModal) {
    //         setShowCreateMouseRightModal((prev) => !prev)
    //     }

    //     setShowCreateNavModel((prev) => !prev)
    // }, [])
    
    const onClickRightMouse = useCallback((e: any) => {
        e.preventDefault();

        setMouseEvent(e);
        setShowCreateMouseRightModal((prev) => !prev);
    },[])
    
    const onCloseModal = useCallback(() => {
        // setShowCreateNavModel(false);
        setShowCreateMouseRightModal(false)
    }, []);

    const onCreateNewWorkspace = useCallback(() => {
        console.log("new workspace");
        setShowCreateWorkspace(true);
    }, [])


    return (
        <>
            <Switch>
                <Redirect exact path="/" to="/solarEdit" />
                {/* <Route path="/solar" component={Main} /> */}
            </Switch>

            {/* Header----------------------------------------------------------------- */}
            <TopMenuNav>
                <TopMenuNavUl>
                    {/* <li onClick={onNavClick}>menu1</li>
                    <li onClick={onNavClick}>menu2</li>
                    <li onClick={onNavClick}>menu3</li>
                    <li onClick={onNavClick}>menu4</li>
                    <li onClick={onNavClick}>menu5</li>
                    <li onClick={onNavClick}>menu6</li>
                    <li onClick={onNavClick}>menu7</li>
                    <li onClick={onNavClick}>menu8</li>
                    <li onClick={onNavClick}>menu9</li>
                    <li onClick={onNavClick}>menu10</li>
                    <li onClick={onNavClick}>menu11</li> */}
                </TopMenuNavUl>
            </TopMenuNav>
            {/* Header----------------------------------------------------------------- */}

            {/* SideBar----------------------------------------------------------------- */}
            <SideBar onClick={onCloseModal}>&nbsp;</SideBar>
            {/* SideBar----------------------------------------------------------------- */}

            <MainContent onClick={onCloseModal} onContextMenu={onClickRightMouse}>

                <Workspace show={showCreateWorkspace} >
                    <WebGLCanvas />
                </Workspace>
                <Modal show={showCreateMouseRightModal} onCloseModal={onCloseModal} mouseEvent={mouseEvent}>
                    <ul>
                        <li onClick={onCreateNewWorkspace}>새 텍스트 파일</li>
                        <li onClick={onCreateNewWorkspace}>새 파일...</li>
                        <li onClick={onCreateNewWorkspace}>새 창</li>
                        <li onClick={onCreateNewWorkspace}>파일 열기...</li>
                        <li onClick={onCreateNewWorkspace}>폴더 열기...</li>
                    </ul>
                </Modal>

            </MainContent>



            {/* Footer----------------------------------------------------------------- */}
            <FooterDiv onClick={onCloseModal}>&nbsp;</FooterDiv>
            {/* Footer----------------------------------------------------------------- */}

{/* 
            <WebGLContext.Provider value={value}>
                <MapPopup latLng={[37,127]} />
                <Webgl />
            </WebGLContext.Provider>            */}
        </>
    )
}

export default App;
{/* <Webgl imgUrl={imgUrl} weatherData={weatherData}/> */}