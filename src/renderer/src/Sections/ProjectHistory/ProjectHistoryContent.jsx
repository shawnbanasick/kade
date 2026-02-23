import { useTranslation } from 'react-i18next';
import projectHistoryState from '../GlobalState/projectHistoryState';

const ProjectHistoryContent = () => {
  const { t } = useTranslation();

  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);

  let mapCounter = 1;

  return (
    <div className="grid grid-rows-[100px_1fr] grid-cols-1 text-black justify-items-start items-center box-border bg-white pb-[10px] pt-[10px] font-[Helvetica,sans-serif] text-[18px]">
      <div className="text-[28px]  ml-[50px] h-[35px] w-[400px]">{t('Project Log')}</div>
      <ol className="text-[20px] list-decimal ml-[70px] leading-[2em] w-[900px]">
        {projectHistoryArray.map((listValue) => (
          <li key={mapCounter++}>{listValue.logMessage}</li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectHistoryContent;
