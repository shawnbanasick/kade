import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import loadingState from '../../GlobalState/loadingState';

const MajorityCommonVarianceCheckbox = () => {
  const { t } = useTranslation();
  const updateRequireMajorityCommonVariance = loadingState(
    (state) => state.updateRequireMajorityCommonVariance
  );
  let requireMajorityCommonVariance = loadingState((state) => state.requireMajorityCommonVariance);

  const [localStore, setLocalStore] = useState({
    checked: true,
  });

  const toggle = () => {
    requireMajorityCommonVariance = !requireMajorityCommonVariance;
    updateRequireMajorityCommonVariance(requireMajorityCommonVariance);
    setLocalStore({ checked: !localStore.checked });
  };

  const isChecked = localStore.checked;

  return (
    <div className="ml-[395px] text-[18px] mb-2">
      <label className="label cursor-pointer gap-2 justify-start">
        <input type="checkbox" className="checkbox" onChange={toggle} checked={isChecked} />
        <span className="label-text text-[16px]">{t('Require Majority of Common Variance')}</span>
      </label>
    </div>
  );
};

export default MajorityCommonVarianceCheckbox;
