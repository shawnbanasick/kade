import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

function formatOptions(rawOptions) {
  const formattedOptions = [];
  for (let i = 0; i < rawOptions.length; i += 1) {
    const tempObj = {};
    const value = rawOptions[i];
    tempObj.key = [`${i}key`];
    tempObj.text = value;
    tempObj.value = value;
    formattedOptions.push(tempObj);
  }
  return formattedOptions;
}

const DropdownJSON = (props) => {
  const { t } = useTranslation();
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateIsLoadJsonQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadJsonQsortsButtonGreen
  );

  const [localStore, setLocalStore] = useState({
    options: [],
    activeValue: '',
  });

  const options = formatOptions(props.options);
  localStore.options = options;

  const saveDropdownValueToState = (event, data) => {
    setLocalStore({ options: options, activeValue: data.value });
    props.onChangeMessageUpTree(data.value);
    toast.dismiss();
    updateNotifyDataUploadSuccess(true);
    updateIsLoadJsonQsortsButtonGreen(true);
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
