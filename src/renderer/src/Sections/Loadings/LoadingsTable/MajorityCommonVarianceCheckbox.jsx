import { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
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
    <CommonVarianceDiv>
      <Checkbox
        label={t('Require Majority of Common Variance')}
        onChange={toggle}
        checked={isChecked}
      />
    </CommonVarianceDiv>
  );
};

export default MajorityCommonVarianceCheckbox;

const CommonVarianceDiv = styled.div`
  font-size: 21px;
  margin-left: 395px;
`;
