import ClearProjectModal from './ClearProjectModal';
import { useTranslation } from 'react-i18next';

const ClearProject = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col pt-[50px] pr-[100px] pl-[100px] items-center bg-white font-[Helvetica,sans-serif] text-[18px] w-[calc(100vw-135px)] box-border max-h-[calc(100vh-22px)] overflow-hidden select-none animate-fadeIn">
      <h1>{t('Clear Project')}</h1>
      <h2>
        {t('Click this button to begin a new project')} <br />
        <br />
        {t('This will clear all data and analysis from the current project')} <br />
        <br />
        {t('This action cannot be reversed')}
      </h2>
      <br />
      <br />
      <ClearProjectModal />
    </div>
  );
};

export default ClearProject;
