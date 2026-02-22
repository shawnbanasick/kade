import React from 'react';
import UserTextInput from './UserTextInput';
import UserSelectionSwitch from './UserSelectionSwitch';
import { useTranslation } from 'react-i18next';

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <span className="text-[22px] select-none">{t('General')}</span>
      <hr className="w-full mb-[15px]" />

      <div className="flex items-center mb-3 pl-2.5">
        <div className="select-none text-base">{`1. ${t('Include legend with visualization')}?`}</div>
        <UserSelectionSwitch name="willIncludeLegend" value="willIncludeLegend" toggle={true} />
      </div>

      <div className="flex items-center mb-3 pl-2.5">
        <div className="select-none text-base">{`2. ${t('Prepend statement numbers')}?`}</div>
        <UserSelectionSwitch
          name="willPrependStateNums"
          value="willPrependStateNums"
          toggle={false}
        />
      </div>

      <div className="flex items-center mb-3 pl-2.5">
        <div className="select-none text-base">{`3. ${t('Display only statement numbers')}?`}</div>
        <UserSelectionSwitch
          name="willDisplayOnlyStateNums"
          value="willDisplayOnlyStateNums"
          toggle={false}
        />
      </div>

      <div className="flex items-center mb-3 pl-2.5">
        <div className="select-none text-base">{`4. ${t('Add custom names to factor visualizations')}?`}</div>
        <UserSelectionSwitch name="willAddCustomNames" value="willAddCustomNames" toggle={false} />
      </div>

      <div className="mt-2.5">
        <UserTextInput
          name={'customFactorNames'}
          label="names"
          placeholder={t('Input custom factor names separated by commas')}
          width={750}
          left={28}
        />
      </div>
    </React.Fragment>
  );
};

export default GeneralOptionsPanel;
