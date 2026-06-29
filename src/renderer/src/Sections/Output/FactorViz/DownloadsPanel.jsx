import UserTextInput from './UserTextInput';
import UserSelectionSwitch from './UserSelectionSwitch';
import CustomFileNameLocation from './CustomFileNameLocation';
import { useTranslation } from 'react-i18next';

const DownloadsPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-7.5">
      <span className="text-[22px] select-none">{t('Downloads')}</span>
      <hr className="w-full mb-3.75" />
      <div className="flex items-center mb-3 pl-2.5">
        <div className="select-none text-base">
          {`15. ${t('Add custom name to visualization downloads')}?`}
        </div>
        <UserSelectionSwitch
          name="willAddCustomNameToDownload"
          value="willAddCustomNameToDownload"
          toggle={false}
        />
      </div>
      <div>
        <UserTextInput
          name={'customDownloadFileNames'}
          label="names"
          placeholder={t('Input custom file name')}
          width={600}
        />
      </div>
      <CustomFileNameLocation />
    </div>
  );
};

export default DownloadsPanel;
