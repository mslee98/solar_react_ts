import React from 'react';

/** 코드 스플릿팅을 위한 라이브버리
 * loadable을 사용하면 알아서 스플릿팅하고 알아서 불러온다.
 */
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const Main = loadable(() => import('@layouts/Main'));
const Webgl = loadable(() => import('@pages/Webgl'));
const MapPopup = loadable(() => import('@components/MapPopup'))


const App = () => {

    return (
        /**
         * Switch 말 그대로 하나만 킬수 있도록 하는 React-router이다.
         * url주소가 login이라면 Login 컴포넌트만 혹은 signup이라면 SignUp컴포넌트를 보여주며
         * url주소가 "/" 이런식으로 오면 Login 페이지를 올 수 있게끔 해줌
         */
        <>
            <Switch>
                <Redirect exact path="/" to="/solar" />
                {/* <Route path="/solar" component={Main} /> */}
            </Switch>

            <MapPopup />
            <Webgl />
        </>


    )
}

export default App;