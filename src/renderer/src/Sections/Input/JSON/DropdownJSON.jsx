import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

function formatOptions(rawOptions) {
  return rawOptions.map((value, i) => ({
    key: `${i}key`,
    text: value,
    value: value,
  }));
}

const DropdownJSON = (props) => {
  const { t } = useTranslation();
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateIsLoadJsonQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadJsonQsortsButtonGreen
  );

  const [activeValue, setActiveValue] = useState('');

  const options = formatOptions(props.options);

  const saveDropdownValueToState = (e) => {
    const val = e.target.value;
    setActiveValue(val);
    props.onChangeMessageUpTree(val);
    toast.dismiss();
    updateNotifyDataUploadSuccess(true);
    updateIsLoadJsonQsortsButtonGreen(true);
  };

  return (
    <div role="listbox" className="flex items-center ml-5 bg-gray-300 text-[18px] py-1 pr-2">
      <span className="pl-5 mr-2.5 text-[18px] w-[150px]">
        <b>4.</b>
      </span>
      <select
        value={activeValue}
        onChange={saveDropdownValueToState}
        className="select select-bordered select-sm bg-white text-[18px] w-full max-w-xs"
      >
        <option value="" disabled>
          {t('Select Participant ID')}
        </option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownJSON;
