import styled from '@emotion/styled';



// position: relative를 사용하는 이유는 TopMenu를 구성할 때 absolute기준이 그 범위로 잡히기 때문임
// 로고나 이런거처럼 사용할거면 relative사용하는게 맞긴 한듯 
export const TopMenuNav = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #303033;
  width: 100%;
  height:35px;
  border-bottom: 1px solid floralwhite
  }
`;

export const TopMenuNavUl = styled.ul`
  display: flex;
  color: white;
  font-weight: 700;

  li {
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      background-color: #3d3d94;
      color: gray;
    }
  }
`

// Sidebar의 경우 고정적이기 때문에 TomMenu fixed이렇게 되어있을 때 겹치는 만큼 padding-top으로 내려주던가 한다고 함
// 지금 보면 height가 1209인데 이거 border 1px 때문에 어쩔수없는듯?
export const SideBar = styled.div`
  position: fixed;
  top:35px;
  width: 40px;
  background-color: #303033;
  height: 1209px;
  border-right: 1px solid floralwhite;
  border-left: none;
  
`
export const FooterDiv = styled.div`
  background-color: #303033;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height:35px;
  border-top: 1px solid floralwhite;
`

export const MainContent = styled.div`
  position: relative;
  display: flex;
  top: 35px;
  left: 40px;
  background-color: black;
  width: 2519px;
  height: 1209px;
`

// export const SideBarSub = styled.div`
//   position: fixed;
//   top: 35px;
//   left: 39px;
//   background-color: red;
//   width: 250px;
//   height: 1209px;
//   border: 1px solid floralwhite;
// `

export const Content = styled.div`
  position:relative;
  background-color: red;
  width: 100%;

  &::after {
    position:absolute;
    right:0px;
    content: '';
    width: 2px;
    height: 100%;
    background-color: floralwhite;
    cursor: col-resize;
  }


`