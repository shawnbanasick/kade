import LoadPQMethodData from './LoadPQMethodData';
import { useTranslation } from 'react-i18next';
import sortsImage from '../../images/pqMethod-input-sorts.png';

const PQMethodQsortsCard = () => {
  const { t } = useTranslation();

  return (
    <div
      id="pqmethodQsortsContainer"
      className="grid grid-flow-row text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="pqmethodQsortsCardMeta" className="bg-white font-sans text-lg font-bold">
        <div id="PQMethodQsortsCardLabel">2. {t('Load Q Sorts (DAT File)')}</div>
      </div>
      <div id="PqmethodImageContainer" className="bg-white">
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="Q sorts sample"
          src={sortsImage}
        />
      </div>
      <LoadPQMethodData />
    </div>
  );
};

export default PQMethodQsortsCard;
