import styled from 'styled-components';
// import LoadExcelT2 from './LoadExcelT2';
import { useTranslation } from 'react-i18next';
import excel2 from '../../images/Excel2.png';

const ExcelT2Card = () => {
  const [t] = useTranslation();

  return (
    <Card>
      <CardMeta>
        <CardLabel>{`1. ${t('Type 2 File (Q sorts in rows)')}`}</CardLabel>
      </CardMeta>
      <p style={{ color: 'firebrick', fontSize: 14 }}>
        {t(`See the 'Help' section for information`)}
      </p>
      <Image>
        <img
          style={{
            width: '250px',
            height: '165px',
            outline: '1px solid lightgray',
          }}
          alt="Excel Type 2 sample"
          src={excel2}
        />
      </Image>
      {/* <LoadExcelT2 /> */}
    </Card>
  );
};

export default ExcelT2Card;

const Card = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  height: 340px;
  width: 320px;
  border: 2px solid darkgray;
  border-radius: 5px;
`;

const Image = styled.div`
  background-color: white;
`;

const CardMeta = styled.div`
  background-color: white;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

const CardLabel = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
`;
