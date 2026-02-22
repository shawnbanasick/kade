import { useTranslation } from 'react-i18next';
import LoadCsvQsorts from './LoadCsvQsorts';
import excel2 from '../../images/Excel2.png';

const CsvSortsCard = () => {
  const { t } = useTranslation();

  return (
    <div
      id="CsvSortsCardContainer"
      className="grid grid-flow-row text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="CsvSortsCardMeta" className="bg-white font-sans text-lg font-bold">
        <div id="CsvSortsCardLabel" className="text-[17px] font-bold">
          2. {t('Load CSV Q Sorts Data File')}
        </div>
      </div>
      <div id="CsvSortsImageContainer">
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="Excel Type 2 sample"
          src={excel2}
        />
      </div>
      <LoadCsvQsorts />
    </div>
  );
};
export default CsvSortsCard;
