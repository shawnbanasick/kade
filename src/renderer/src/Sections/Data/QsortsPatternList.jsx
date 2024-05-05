import styled from 'styled-components';

const StatementList = (props) => {
  let mapKey = 1;
  return (
    <CustomUl>
      {props.texts.map((listValue) => (
        <li key={mapKey++}>{listValue}</li>
      ))}
    </CustomUl>
  );
};

export default StatementList;

const CustomUl = styled.ul`
  list-style-type: none;
  text-align: right;
  width: 167px;
  padding-left: 5px !important;
`;
