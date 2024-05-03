import React from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'semantic-ui-react';
import { view, store } from '@risingstack/react-easy-state';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import getCoreState from '../../GlobalState/getCoreState';
import coreState from '../../GlobalState/coreState';
import checkUniqueParticipantNames from '../logic/checkUniqueParticipantNames';

const localStore = store({
  options: [
    { key: 1, text: 'participant ID', value: 'partId' },
    { key: 2, text: 'random ID', value: 'randomId' },
    { key: 3, text: 'url UserCode', value: 'urlUsercode' }
  ],
  activeValue: ''
});

const DropdownJSON = (props) => {
  const { t } = useTranslation();

  const saveDropdownValueToState = (event, data) => {
    let value = data.value;
    localStore.activeValue = value;

    console.log('value', value);

    if (value !== 'randomId' && value !== 'partId' && value !== 'urlUsercode') {
      return;
    }

    props.onChangeMessageUpSheetsTree(value);
    toast.dismiss();
    inputState.notifyDataUploadSuccess = true;
    inputState.isLoadSheetsCsvButtonGreen = true;
    inputState.userSelectSheetsPartId = value;

    let qSortsLoaded = getInputState('isLoadSheetsCsvButtonGreen');
    if (qSortsLoaded) {
      let mainDataObjectArray = getCoreState('mainDataObject');

      if (value === 'randomId') {
        let names2 = getInputState('csvRandomIdArray');
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        coreState.mainDataObject = [...mainDataObjectArray];
        coreState.respondentNames = [...names];
      }

      if (value === 'partId') {
        let names2 = getInputState('csvPartIdArray');
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        coreState.mainDataObject = [...mainDataObjectArray];
        coreState.respondentNames = [...names];
      }
      if (value === 'urlUsercode') {
        let names2 = getInputState('csvUrlUsercodeArray');
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        coreState.mainDataObject = [...mainDataObjectArray];
        coreState.respondentNames = [...names];
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
export default view(DropdownJSON);
