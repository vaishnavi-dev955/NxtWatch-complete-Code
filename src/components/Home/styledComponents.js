import styled from 'styled-components'

export const FullContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: ${props => (props.isDarkBtnTheme ? '#0f0f0f' : '#cccccc')};
`
export const BannerElement = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  margin: 20px;
  width: 80vw;
  height: 40vh;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`
