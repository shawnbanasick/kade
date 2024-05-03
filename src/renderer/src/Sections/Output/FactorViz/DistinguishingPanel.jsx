import styled from 'styled-components';
import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import { Form, Radio } from 'semantic-ui-react';
import UserNumberInput from './UserNumberInput';
import ColorSelector from './ColorSelector2';
import UserSelectionSwitch from './UserSelectionSwitch';
import vizState from '../../GlobalState/vizState';
import { useTranslation } from 'react-i18next';
import getVizState from '../../GlobalState/getVizState';

const styles = {
  width: 150
};

const styles2 = {
  display: 'flex',
  marginTop: 15,
  marginRight: 5,
  fontSize: 16,
  userSelect: 'none',
  textAlign: 'center'
};

const localStore = store({ showDistinguishingAs: 'symbol' });

function handleChange(e, { value }) {
  // getState
  const factorVizOptionsHolder = getVizState('factorVizOptionsHolder');

  localStore.showDistinguishingAs = value;
  factorVizOptionsHolder.showDistinguishingAs = value;
  vizState.factorVizOptionsHolder = factorVizOptionsHolder;
  vizState.updateFactorVisualizationsButtonColor = 'orange';
}

const DistinguishingPanel = () => {
  const { t } = useTranslation();
  const colorTrans = `${t('Color')} - 05:`;

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: 'none' }}>
        {t('Distinguishing and Consensus Statements')}
      </span>
      <hr style={{ width: '100%', marginBottom: 5 }} />
      <OptionStatementRow>
        <OptionStatementText>{`13. ${t('Indicate distinguishing')}?`}</OptionStatementText>
        <UserSelectionSwitch
          name="willIndicateDistinguishing"
          value="willIndicateDistinguishing"
          toggle
        />
        <HolderDiv>
          <Form style={styles2}>
            <Form.Field>{t('with')}</Form.Field>
            <Form.Field>
              <Radio
                style={{ marginLeft: 16, fontSize: 16 }}
                label={t('Symbol')}
                name="radioGroup1"
                value="symbol"
                checked={localStore.showDistinguishingAs === 'symbol'}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                style={{ marginLeft: 16, fontSize: 16 }}
                label={colorTrans}
                name="radioGroup1"
                value="distinguishingColor"
                checked={localStore.showDistinguishingAs === 'distinguishingColor'}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </HolderDiv>
        <ColorSelector
          id="distinguishingIndicator05"
          style={{ marginLeft: 5 }}
          defaultColor={'#ededed'}
        />
        <OptionStatementText style={{ marginLeft: 5, marginRight: 5 }}>01:</OptionStatementText>
        <ColorSelector
          id="distinguishingIndicator01"
          style={{ marginLeft: 5 }}
          defaultColor={'#bdbdbd'}
        />
      </OptionStatementRow>
      <OptionStatementRow>
        <OptionStatementText2>
          {`-- ${t('Adjust distinguishing statement indicator size')}?`}
        </OptionStatementText2>
        <UserSelectionSwitch
          name="willAdjustDistIndicatorSize"
          value="willAdjustDistIndicatorSize"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={'willAdjustDistIndicatorSizeBy'}
            lowerLimit={1}
            upperLimit={200}
            value={12}
            step={0.5}
          />
        </div>
      </OptionStatementRow>
      {/* <OptionStatementRow>
        <OptionStatementText2>
          {`-- ${t("Display distinguishing statement comparison triangles")}?`}
        </OptionStatementText2>
        <UserSelectionSwitch
          name="willDisplayDistingCompareSymbols"
          value="willDisplayDistingCompareSymbols"
          toggle
        />
      </OptionStatementRow> */}
      <OptionStatementRow>
        <OptionStatementText>
          {`14. ${t('Display consensus statement indicator color')}?`}
        </OptionStatementText>
        <UserSelectionSwitch
          name="willDisplayConsensusStates"
          value="willDisplayConsensusStates"
          toggle={false}
        />
        <OptionStatementText style={{ marginRight: 10 }}>{`${t('Color')}: `}</OptionStatementText>
        <ColorSelector id="consensusIndicator" defaultColor={'#d9effe'} />
      </OptionStatementRow>
    </div>
  );
};

export default view(DistinguishingPanel);

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 16px;
  user-select: none;
`;

const OptionStatementText2 = styled.div`
  font-size: 16px;
  user-select: none;
  padding-left: 10px;
`;

const HolderDiv = styled.div`
  label {
    padding-left: 18px !important;
    padding-top: 3px;
  }
`;
