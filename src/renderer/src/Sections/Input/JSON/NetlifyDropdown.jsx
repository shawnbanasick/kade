import { useState } from 'react';
import { toast } from 'react-toastify';
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
  const mainDataObjectArray = coreState((state) => state.mainDataObject);

  const mainOptions = [
    { key: 1, text: 'participant ID', value: 'partId' },
    { key: 2, text: 'random ID', value: 'randomId' },
    { key: 3, text: 'url UserCode', value: 'urlUsercode' },
  ];

  const [activeValue, setActiveValue] = useState('');

  const saveDropdownValueToState = (e) => {
    const value = e.target.value;
    setActiveValue(value);

    if (value !== 'randomId' && value !== 'partId' && value !== 'urlUsercode') {
      return;
    }

    props.onChangeMessageUpNetlifyTree(value);
    toast.dismiss();

    const qSortsLoaded = inputState.getState().isLoadNetlifyCsvButtonGreen;

    if (qSortsLoaded) {
      updateNotifyDataUploadSuccess(true);
      updateUserSelectNetlifyPartId(value);

      if (value === 'randomId') {
        const names2 = inputState.getState().csvRandomIdArray;
        const names = checkUniqueParticipantNames(names2);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }

      if (value === 'partId') {
        const names2c = inputState.getState().csvPartIdArray;
        const names = checkUniqueParticipantNames(names2c);
        mainDataObjectArray.forEach((item, index) => {
          item.name = names[index];
        });
        updateMainDataObject([...mainDataObjectArray]);
        updateRespondentNames([...names]);
      }

      if (value === 'urlUsercode') {
        const names2b = inputState.getState().csvUrlUsercodeArray;
        const names = checkUniqueParticipantNames(names2b);
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
