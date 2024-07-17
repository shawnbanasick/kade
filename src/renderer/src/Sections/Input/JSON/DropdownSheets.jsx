import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'semantic-ui-react';
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

  const [localStore, setLocalStore] = useState({
    options: mainOptions,
    activeValue: '',
  });

  const saveDropdownValueToState = (event, data) => {
    let value = data.value;
    setLocalStore({ options: mainOptions, activeValue: value });

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
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }

      if (value === 'partId') {
        let names2 = inputState((state) => state.csvPartIdArray);
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }
      if (value === 'urlUsercode') {
        let names2b = inputState((state) => state.csvUrlUsercodeArray);
        let names = checkUniqueParticipantNames(names2b);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }
    }
  };

  return (
    <div role="listbox" style={{ marginLeft: 20 }}>
      <span style={{ marginRight: 10, fontSize: 20 }}>
        <b>4.</b> ID:{' '}
      </span>
      <Dropdown
        placeholder={t('Select Participant ID')}
        onChange={saveDropdownValueToState}
        openOnFocus
        scrolling
        value={localStore.activeValue}
        button
        options={localStore.options}
      />
    </div>
  );
};
export default DropdownJSON;
