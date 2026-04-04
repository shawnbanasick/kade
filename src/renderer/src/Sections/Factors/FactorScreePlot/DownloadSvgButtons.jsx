import downloadSvgImage from './downloadSvgImage';
import downloadPngImage from './downloadPngImage';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const DownloadSvgButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center mt-[60px] ml-[50px] mb-[200px]">
      <GeneralButton
        id="downloadSvgButtonScree"
        className="bg-grey-button mr-[20px]!"
        onClick={downloadSvgImage}
      >
        <div className="flex flex-row items-center h-[30px] gap-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t('Download SVG Image')}
        </div>
      </GeneralButton>
      <GeneralButton
        className="bg-grey-button ml-[20px]!"
        id="downloadPngButtonScree"
        onClick={downloadPngImage}
      >
        <div className="flex flex-row items-center h-[30px] gap-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t('Download PNG Image')}
        </div>
      </GeneralButton>
    </div>
  );
};
export default DownloadSvgButtons;
