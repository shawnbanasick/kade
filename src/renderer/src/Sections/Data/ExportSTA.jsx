import GeneralButton from '../../Utils/GeneralButton';
import coreState from '../GlobalState/coreState';
import { useTranslation } from 'react-i18next';
import * as FileSaver from 'file-saver';
import StaIcon from '../images/STA_Icon.svg';

const ExportStaButton = () => {
  const { t } = useTranslation();

  const projectName = coreState((state) => state.projectName);
  const statements = coreState((state) => state.statements);

  const handleOnClick = async () => {
    // Create statements.txt
    let statementsString = '';
    statements.forEach((statement) => {
      statementsString += statement + '\n';
    });

    const blob = new Blob([statementsString], {
      type: 'text/plain;charset=ascii',
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.STA`);
  };

  return (
    <GeneralButton
      className="min-w-[180px] mr-5 bg-grey-button h-[50px] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]"
      onClick={handleOnClick}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-4 ">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <div className="text-xl font-medium">{t('Statements')}</div>
      </div>
    </GeneralButton>
  );
};

export default ExportStaButton;
