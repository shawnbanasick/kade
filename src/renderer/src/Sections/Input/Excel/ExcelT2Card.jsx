import LoadExcelT2 from './LoadExcelT2';
import { useTranslation } from 'react-i18next';
import excel2 from '../../images/Excel2.png';

const ExcelT2Card = () => {
  const [t] = useTranslation();

  return (
    <div
      id="ExcelT2CardContainer"
      className="grid grid-flow-row text-black ml-10 justify-items-center items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="ExcelT2CardMeta" className="bg-white font-sans text-lg font-bold">
        <div
          id="ExcelT2CardLabel"
          className="text-[17px] font-bold"
        >{`2. ${t('Type 2 File (Q sorts in rows)')}`}</div>
      </div>
      <p style={{ color: 'firebrick', fontSize: 14 }}>
        {t(`See the 'Help' section for information`)}
      </p>
      <div id="ExcelT2ImageContainer" className="bg-white">
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="Excel Type 2 sample"
          src={excel2}
        />
      </div>
      <LoadExcelT2 />
    </div>
  );
};

export default ExcelT2Card;
