import styled from 'styled-components'

export const LeftContainer = styled.div`
  width: 15vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: space-around;
  background-color: ${props => (props.isDarkBtnTheme ? '#231f20' : '#ffffff')};
`

export const ListContainer1 = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
export const Listitem = styled.li`
  display: flex;
`
