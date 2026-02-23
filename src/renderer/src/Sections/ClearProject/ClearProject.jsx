import ClearProjectModal from './ClearProjectModal';
import { useTranslation } from 'react-i18next';

const ClearProject = () => {
  const { t } = useTranslation();

  return (
    // <div className="bg-white border-4 border-t-18 border-grey-button h-screen w-full">

    <div className="flex flex-col text-black border-4 border-t-18 border-grey-button h-screen pt-[50px] pr-[100px] pl-[100px] items-center bg-white font-[Helvetica,sans-serif] text-[18px] w-[calc(100vw-135px)] box-border overflow-hidden select-none animate-fadeIn">
      <div className="text-5xl font-bold">{t('Clear Project')}</div>
      <div className="text-2xl font-bold mt-18">
        {t('To clear your project from KADE click on View in the top menu then Force Reload')}{' '}
        <br />
        <br />
        {t('This will clear all data and analysis from KADE')} <br />
        <br />
        {t('This action cannot be reversed')}
      </div>
      <br />
      <br />
      {/* <ClearProjectModal /> */}
    </div>
  );
};

export default ClearProject;
