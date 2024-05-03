import styled from "styled-components";

const LoadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding-right: 15px;
  padding-left: 15px;
  width: fit-content;
  text-align: center;
  font-size: calc() (10px + 1vw);
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  cursor: pointer;
  background: #d6dbe0;
  text-decoration: none;
  color: black;

  transition-duration: 0.3s;
  transition-property: box-shadow;
  transform: translateZ(0);
  box-shadow: inset 0 0 0 4px
      ${props => (props.isActive ? "var(--main-theme-color)" : "#d6dbe0")},
    0 0 1px 0.6;
  background-color: ${props =>
    props.isActive ? "var(--main-theme-color)" : "#d6dbe0"};

  box-shadow: ${props =>
    props.isActive
      ? "inset 0 0 0 2px #666, 0 0 1px transparent"
      : "inset 0 0 0 0px #666, 0 0 0px transparent"};

  &:hover {
    box-shadow: inset 0 0 0 4px #666, 0 0 1px transparent;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    opacity: 0.6;
  }
`;

export default LoadButton;
