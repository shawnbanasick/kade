import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { view, store } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import loadingState from '../../GlobalState/loadingState';
import { useTranslation } from 'react-i18next';

const localStore = store({
  checked: true
});

const MajorityCommonVarianceCheckbox = () => {
  const { t } = useTranslation();

  const toggle = () => {
    let requireMajorityCommonVariance = loadingState.requireMajorityCommonVariance;
    requireMajorityCommonVariance = !requireMajorityCommonVariance;
    loadingState.requireMajorityCommonVariance = requireMajorityCommonVariance;

    localStore.checked = !localStore.checked;
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

export default view(MajorityCommonVarianceCheckbox);

const CommonVarianceDiv = styled.div`
  font-size: 21px;
  margin-left: 395px;
`;
