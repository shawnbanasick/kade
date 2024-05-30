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
  const updateUserSelectNetlifyPartId = inputState((state) => state.updateUserSelectNetlifyPartId);
  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  const updateRespondentNames = coreState((state) => state.updateRespondentNames);
  let mainDataObjectArray = coreState((state) => state.mainDataObject);
  // let mainDataObjectArray = getCoreState('mainDataObject');

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
    setLocalStore({
      options: mainOptions,
      activeValue: value,
    });
    // localStore.activeValue = value;

    if (value !== 'randomId' && value !== 'partId' && value !== 'urlUsercode') {
      return;
    }

    props.onChangeMessageUpNetlifyTree(value);
    toast.dismiss();
    // inputState.isLoadNetlifyCsvButtonGreen = true;

    let qSortsLoaded = inputState((state) => state.isLoadNetlifyCsvButtonGreen);
    // let qSortsLoaded = getInputState('isLoadNetlifyCsvButtonGreen');

    if (qSortsLoaded) {
      updateNotifyDataUploadSuccess(true);
      updateUserSelectNetlifyPartId(value);
      // inputState.notifyDataUploadSuccess = true;
      // inputState.userSelectNetlifyPartId = value;

      if (value === 'randomId') {
        let names2 = inputState((state) => state.csvRandomIdArray);
        // let names2 = getInputState('csvRandomIdArray');
        let names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });

        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
        // coreState.mainDataObject = [...mainDataObjectArray];
        // coreState.respondentNames = [...names];
      }

      if (value === 'partId') {
        let names2c = inputState((state) => state.csvPartIdArray);
        // let names2c = getInputState('csvPartIdArray');
        let names = checkUniqueParticipantNames(names2c);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
        // coreState.mainDataObject = [...mainDataObjectArray];
        // coreState.respondentNames = [...names];
      }
      if (value === 'urlUsercode') {
        let names2b = inputState((state) => state.csvUrlUsercodeArray);
        // let names2b = getInputState('csvUrlUsercodeArray');
        let names = checkUniqueParticipantNames(names2b);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
        // coreState.mainDataObject = [...mainDataObjectArray];
        // coreState.respondentNames = [...names];
      }
    }

    // isLoadSheetsCsvButtonGreen
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
