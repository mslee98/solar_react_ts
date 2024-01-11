import React, { FC, useCallback, useState } from 'react';


interface WorkspaceProps {
    show: boolean;
    children: JSX.Element;
}

const Workspace: FC<WorkspaceProps> = ({show, children}) => {


    const [currentTab, setCurrentTab] = useState(0);

    const menuArr = [
        {name: 'Tab1', content:'첫번째 탭이에요 👼'},
        {name: 'Tab2', content:'두번째 탭이에요 😇'},
        {name: 'Tab3', content:'세번째 탭인데요 😊'}
      ]
    
      const selectMenuHandler = useCallback((index: number) => {
        setCurrentTab(index)
      }, [])

      // 여기서 생각 많이해봐야할듯?
      // 지금 보면 새 창으로 새로운 Workspace를 만든거잖아?
      // 즉 다른 창들은 모두 각각 단일의 workspace가 됨// 모든 workspace를 1개씩만 보여준다고 가정해서 진행해봐야 할 것 같음

      //그러면 일단 DB구성도 해야할듯한데 Backend 어떡하냐 ㅋㅋㅋㅋㅋㅋ
      //https://velog.io/@ony/ReactCss-%ED%83%AD-%EB%A7%8C%EB%93%A4%EA%B8%B0-styled-components
      //이것도 좋은 방법이긴 한데 내가 볼 땐 나는 workspace/:workspace이름으로 승부봐야함 이거 일단 DB쪽도 알아보자
      //지금 만들어야하는건 워크스페이스 생성

    if(!show) return;

    return (
        <>
            <div style={{width:'100%', position: 'relative'}}>
                <div style={{
                    position: 'fixed',
                    width: '100%',
                    height: '35px',
                    backgroundColor: '#303033',
                    zIndex: 10,
                }}>new workspace1</div>
                <div style={{position:'relative', backgroundColor: 'gray', width: '100%', height: '100%'}}>
                    {children}
                </div>
            </div>
            
        </>
    )
}

export default Workspace;