import styled from '@emotion/styled';

export const LeftMenu = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 90px;
    height: 100%;
    background: #1a1c22;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;

    ul {

        li {
            color: #393b40;
            display: inline-block;
            width: 100%;
            height: 100px;
            margin-bottom: 1rem;

              &:first-of-type {
                margin-top: 10px;
              }

              &.on {
                color: #1fcb4f !important;

                svg path {
                    fill: #1fcb4f !important;
                }

              }

            a {
                /* a 태그 스타일 */
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;

                svg path {
                    fill: #1fcb4f !important;
                }

              }

            .menu-tit {
                display: block;
             }
        }

    }
`;