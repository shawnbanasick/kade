import styled from 'styled-components';

import React from 'react';
import UserTextInput from './UserTextInput';
import UserSelectionSwitch from './UserSelectionSwitch';
import CustomFileNameLocation from './CustomFileNameLocation';
import { useTranslation } from 'react-i18next';

const DistinguishingPanel = () => {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: 'none' }}>{t('Downloads')}</span>
      <hr style={{ width: '100%', marginBottom: 15 }} />
      <OptionStatementRow>
        <OptionStatementText>
          {`15. ${t('Add custom name to visualization downloads')}?`}
        </OptionStatementText>
        <UserSelectionSwitch
          name="willAddCustomNameToDownload"
          value="willAddCustomNameToDownload"
          toggle={false}
        />
      </OptionStatementRow>
      <div>
        <UserTextInput
          name={'customDownloadFileNames'}
          label="names"
          placeholder={t('Input custom file name')}
          width={600}
        />
      </div>
      <CustomFileNameLocation />
    </div>
  );
};

export default DistinguishingPanel;

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 16px;
  user-select: none;
`;
