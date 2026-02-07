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
        <div className="flex justify-center items-center mr-2.5 ml-0">
          <img src={StaIcon} className="h-[40px]" alt="CSV Icon" />
        </div>
        <p>{t('Statements')}</p>
      </div>
    </GeneralButton>
  );
};

export default ExportStaButton;
