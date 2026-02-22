import kadeZip from '../../images/kadeZip.png';
import LoadKadeZip from './LoadKadeZip';
import { useTranslation } from 'react-i18next';

const ZipDataCard = () => {
  const { t } = useTranslation();

  return (
    <div
      id="zipDataCard"
      className="grid grid-flow-row text-black ml-10 justify-items-center items-center bg-white border-2 border-gray-400 h-[340px] w-90 rounded-[5px]"
    >
      <div id="zipDataCardMeta" className="bg-white font-sans text-lg font-bold">
        <div id="zipDataCardLabel" className="text-[17px] font-bold">
          1. {t('KADE Zip File')}
        </div>
      </div>
      <div>
        <img
          className="w-[250px] h-[165px] outline-[1px] outline-lightgray"
          alt="KADE Zip File"
          src={kadeZip}
        />
      </div>
      <LoadKadeZip />
    </div>
  );
};
export default ZipDataCard;
