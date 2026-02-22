import { useTranslation } from 'react-i18next';
import netlifyImage from '../../images/netlify-sorts-data-image.png';

const NetlifyCard = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-flow-row justify-items-center items-center bg-white h-[300px] w-[280px] border-2 border-[darkgray] rounded-[5px]">
      <div className="bg-white font-[Helvetica,sans-serif] text-[18px] font-bold">
        <div className="font-[Helvetica,sans-serif] text-[18px] font-bold">
          2. {t('Load Netlify CSV File')}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white w-[275px] h-[175px]">
          <img
            style={{ width: '250px', height: '165px' }}
            alt="Q sorts sample"
            src={netlifyImage}
          />
        </div>
      </div>
    </div>
  );
};

export default NetlifyCard;
