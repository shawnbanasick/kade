import React from 'react';
import { toast } from 'react-toastify';
import { Dropdown } from 'semantic-ui-react';
import { view, store } from '@risingstack/react-easy-state';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const localStore = store({
  options: [],
  activeValue: '',
});

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

  const saveDropdownValueToState = (event, data) => {
    localStore.activeValue = data.value;
    props.onChangeMessageUpTree(data.value);
    toast.dismiss();
    inputState.notifyDataUploadSuccess = true;
    inputState.isLoadJsonQsortsButtonGreen = true;
  };

  const options = formatOptions(props.options);
  localStore.options = options;
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
