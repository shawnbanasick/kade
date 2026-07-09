import downloadSvgImage from './downloadSvgImage';
import downloadPngImage from './downloadPngImage';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import downloadScreeDrawio from './downloadScreeDrawIo';
import coreState from '../../GlobalState/coreState';
import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

const DownloadSvgButtons = ({ data, means, p95, showMeans, showP95, numFacs }) => {
  const { t } = useTranslation();
  const projectName = coreState((state) => state.projectName) ?? '';

  // ─── NEW HANDLER ────────────────────────────────────────────────────────────
  const downloadAsDrawio = async () => {
    const drawioXml = await downloadScreeDrawio({
      data,
      means,
      p95,
      showMeans,
      showP95,
      numFacs,
    });

    const filename = `KADE_${projectName}_${t('Scree Plot')}_${getDateTime()}`;
    const defaultPath = `${filename}.drawio`;

    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(drawioXml).buffer;

    const filepath = await window.electronAPI?.showSaveDrawioDialog?.(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      await window.electronAPI.saveSVG(arrayBuffer, filepath);
    } catch (error) {
      console.error('Failed to save .drawio file:', error);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 mb-20">
      <GeneralButton
        className="bg-grey-button"
        id="downloadPngButtonScree"
        onClick={downloadPngImage}
      >
        <div className="flex flex-row items-center h-7.5 gap-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t('Download PNG')}
        </div>
      </GeneralButton>
      <GeneralButton
        id="downloadSvgButtonScree"
        className="bg-grey-button"
        onClick={downloadSvgImage}
      >
        <div className="flex flex-row items-center h-7.5 gap-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t('Download SVG')}
        </div>
      </GeneralButton>
      <GeneralButton
        className="bg-grey-button"
        id="downloadDrawIoButtonScree"
        onClick={downloadAsDrawio}
      >
        <div className="flex flex-row items-center h-7.5 gap-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t('Download Draw.io')}
        </div>
      </GeneralButton>
    </div>
  );
};
export default DownloadSvgButtons;
