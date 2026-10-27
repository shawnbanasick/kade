import LoadPQMethodStaFile from './LoadPQMethodStaFile';
import { useTranslation } from 'react-i18next';
import quinceImage1 from '../../images/pqMethod-input-sta.png';

const PQMethodStaCard = () => {
  const { t } = useTranslation();

  return (
    <div
      id="pqmethodStaContainer"
      className="grid grid-flow-row justify-items-center text-black items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="pqmethodStaCardMeta" className="bg-white font-sans text-lg font-bold">
        <div id="ExcelT1CardLabel">1. {t('Load Statements (STA File)')}</div>
      </div>
      <div id="ExcelT1ImageContainer" className="bg-white">
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="statement text"
          src={quinceImage1}
        />
      </div>
      <LoadPQMethodStaFile />
    </div>
  );
};

export default PQMethodStaCard;
