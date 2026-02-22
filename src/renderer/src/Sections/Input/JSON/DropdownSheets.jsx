import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';
import checkUniqueParticipantNames from '../logic/checkUniqueParticipantNames';

const DropdownJSON = (props) => {
  const { t } = useTranslation();
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateIsLoadSheetsCsvButtonGreen = inputState(
    (state) => state.updateIsLoadSheetsCsvButtonGreen
  );
  const updateUserSelectSheetsPartId = inputState((state) => state.updateUserSelectSheetsPartId);
  const qSortsLoaded = inputState((state) => state.isLoadSheetsCsvButtonGreen);
  const mainDataObjectArray = coreState((state) => state.mainDataObject);
  const names2 = inputState((state) => state.csvRandomIdArray);
  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  const updateRespondentNames = coreState((state) => state.updateRespondentNames);

  const mainOptions = [
    { key: 1, text: 'participant ID', value: 'partId' },
    { key: 2, text: 'random ID', value: 'randomId' },
    { key: 3, text: 'url UserCode', value: 'urlUsercode' },
  ];

  const [activeValue, setActiveValue] = useState('');

  const saveDropdownValueToState = (e) => {
    const value = e.target.value;
    setActiveValue(value);

    console.log('value', value);

    if (value !== 'randomId' && value !== 'partId' && value !== 'urlUsercode') {
      return;
    }

    props.onChangeMessageUpSheetsTree(value);
    toast.dismiss();

    updateNotifyDataUploadSuccess(true);
    updateIsLoadSheetsCsvButtonGreen(true);
    updateUserSelectSheetsPartId(value);

    if (qSortsLoaded) {
      if (value === 'randomId') {
        const names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }

      if (value === 'partId') {
        const csvPartIdArray = inputState.getState().csvPartIdArray;
        const names = checkUniqueParticipantNames(csvPartIdArray);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }

      if (value === 'urlUsercode') {
        const csvUrlUsercodeArray = inputState.getState().csvUrlUsercodeArray;
        const names = checkUniqueParticipantNames(csvUrlUsercodeArray);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }
    }
  };

  return (
    <div role="listbox" className="flex items-center ml-5">
      <span className="mr-2.5 text-[20px]">
        <b>4.</b> ID:{' '}
      </span>
      <select
        value={activeValue}
        onChange={saveDropdownValueToState}
        className="select select-bordered select-sm bg-white text-[14px] w-full max-w-xs"
      >
        <option value="" disabled>
          {t('Select Participant ID')}
        </option>
        {mainOptions.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownJSON;
