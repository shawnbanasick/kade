import LoadExcelT1 from './LoadExcelT1';
import { useTranslation } from 'react-i18next';
import excel1 from '../../images/Excel1.png';

const ExcelT1Card = () => {
  const { t } = useTranslation();

  return (
    <div
      id="ExcelT1CardContainer"
      className="grid grid-flow-row text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="ExcelT1CardMeta" className="bg-white font-sans text-lg font-bold">
        <div
          id="ExcelT1CardLabel"
          className="text-[17px] font-bold"
        >{`1. ${t('Type 1 File (Q sorts in columns)')}`}</div>
      </div>
      <p className="text-[firebrick] text-[14px]">{t(`See the 'Help' section for information`)}</p>
      <div id="ExcelT1ImageContainer" className="bg-white">
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="Excel Type 1 sample"
          src={excel1}
        />
      </div>
      <LoadExcelT1 />
    </div>
  );
};

export default ExcelT1Card;
