import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import coreState from '../GlobalState/coreState';
import createPQMethodDAT from './createPqmethodDat';
import * as FileSaver from 'file-saver';
import DatIcon from '../images/DAT_Icon.svg';
import cloneDeep from 'lodash/cloneDeep';

const ExportDatButton = () => {
  const { t } = useTranslation();

  const mainDataObject2 = coreState((state) => state.mainDataObject);
  const mainDataObject = cloneDeep(mainDataObject2);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const projectName = coreState((state) => state.projectName);
  const statements = coreState((state) => state.statements);
  const respondentNames = coreState((state) => state.respondentNames);

  const handleOnClick = async () => {
    let datString = createPQMethodDAT(
      mainDataObject,
      multiplierArray,
      projectName,
      statements.length,
      respondentNames
    );

    var blob = new Blob([datString], {
      type: 'text/plain;charset=ascii',
    });
    FileSaver.saveAs(blob, `${projectName.substring(0, 8)}.DAT`);
  };

  return (
    <GeneralButton
      className="min-w-[180px] mr-5 bg-grey-button h-[50px] hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]"
      onClick={handleOnClick}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-4">
        <div className="flex justify-center items-center mr-2.5 ml-0">
          <img src={DatIcon} className="h-[40px]" alt="CSV Icon" />
        </div>
        <p>{t('Q sorts')}</p>
      </div>
    </GeneralButton>
  );
};

export default ExportDatButton;
