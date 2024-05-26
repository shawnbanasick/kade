import styled from 'styled-components';

import React from 'react';
import UserTextInput from './UserTextInput';
import UserSelectionSwitch from './UserSelectionSwitch';
import { useTranslation } from 'react-i18next';

const styles = {
  fontSize: 22,
  userSelect: 'none',
};

const GeneralOptionsPanel = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <span style={styles}>{t('General')}</span>
      <hr style={{ width: '100%', marginBottom: 15 }} />
      <OptionStatementRow>
        <OptionStatementText>{`1. ${t('Include legend with visualization')}?`}</OptionStatementText>
        <UserSelectionSwitch name="willIncludeLegend" value="willIncludeLegend" toggle={true} />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`2. ${t('Prepend statement numbers')}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willPrependStateNums"
          value="willPrependStateNums"
          toggle={false}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>{`3. ${t('Display only statement numbers')}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willDisplayOnlyStateNums"
          value="willDisplayOnlyStateNums"
          toggle={false}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText>
          {`4. ${t('Add custom names to factor visualizations')}?`}
        </OptionStatementText>
        <UserSelectionSwitch name="willAddCustomNames" value="willAddCustomNames" toggle={false} />
      </OptionStatementRow>
      <div style={{ marginTop: 10 }}>
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

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  user-select: none;
  font-size: 16px;
`;
