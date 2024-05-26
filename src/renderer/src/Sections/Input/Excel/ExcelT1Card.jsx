import styled from 'styled-components';
// import LoadExcelT1 from './LoadExcelT1';
import { useTranslation } from 'react-i18next';
import excel1 from '../../images/Excel1.png';

const ExcelT1Card = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardMeta>
        <CardLabel>{`1. ${t('Type 1 File (Q sorts in columns)')}`}</CardLabel>
      </CardMeta>
      <p
        style={{
          color: 'firebrick',
          fontSize: 14,
        }}
      >
        {t(`See the 'Help' section for information`)}
      </p>
      <Image>
        <img
          style={{
            width: '250px',
            height: '165px',
            outline: '1px solid lightgray',
          }}
          alt="Excel Type 1 sample"
          src={excel1}
        />
      </Image>
      {/* <LoadExcelT1 /> */}
    </Card>
  );
};

export default ExcelT1Card;

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
