import styled from 'styled-components';

const RotationDegreeInput = (props) => {
  const saveInputValueToState = (event) => {
    props.onChangeCallback(event);
  };

  return (
    <InputColumn isActive={props.isActive} pressed={props.pressed}>
      <StyledInput
        type="text"
        name={props.name}
        onChange={saveInputValueToState}
        value={props.value}
      />
    </InputColumn>
  );
};

export default RotationDegreeInput;

// 0 2px 2px 0 black
const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  font-size: 18px;
  width: 50px;
  height: 40px;
  border: none;
  padding-right: 1px;
  background-color: ${(props) => (props.isActive ? 'var(--main-theme-color)' : '#d6dbe0')};

  transition-duration: 0.3s;
  transition-property: box-shadow;
  transform: translateZ(0);
  box-shadow:
    inset 0 0 0 4px ${(props) => (props.isActive ? 'var(--main-theme-color)' : '#d6dbe0')},
    0 0 1px 0.6;

  &:hover {
    box-shadow:
      inset 0 0 0 4px #666,
      0 0 1px transparent;
  }
`;

const StyledInput = styled.input`
  width: 35px;
  text-align: right;
  margin: 6px;
  outline: none;
`;

// const StyledLabel = styled.label`
//   margin-left: 4px;
//   text-align: center;
//   padding-right: 1px;
// `;
