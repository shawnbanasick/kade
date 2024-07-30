import { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';

const styles = {
  display: 'flex',
  marginTop: 15,
  fontSize: 20,
  userSelect: 'none',
};

const CustomFileNameLocation = () => {
  const { t } = useTranslation();
  const factorVizOptionsHolder = vizState((state) => state.factorVizOptionsHolder);
  const updateFactorVizOptionsHolder = vizState((state) => state.updateFactorVizOptionsHolder);
  const updateFactorVisualizationsButtonColor = vizState(
    (state) => state.updateFactorVisualizationsButtonColor
  );
  const [localStore, setLocalStore] = useState({ customFileNameLocation: '' });

  function handleChange(e, { value }) {
    setLocalStore({ customFileNameLocation: value });
    factorVizOptionsHolder.customFileNameLocation = value;
    updateFactorVizOptionsHolder(factorVizOptionsHolder);
    updateFactorVisualizationsButtonColor('orange');
  }

  // todo - fix this checked setting
  return (
    <HolderDiv>
      <Form style={styles}>
        <Form.Field>{t('Custom name position')}</Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t('Prepend')}
            name="radioGroup"
            value="prepend"
            checked={localStore.customFileNameLocation === 'prepend'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t('Append')}
            name="radioGroup"
            value="append"
            checked={localStore.customFileNameLocation === 'append'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            style={{ marginLeft: 16, fontSize: 20 }}
            label={t('Replace')}
            name="radioGroup"
            value="replace"
            checked={localStore.customFileNameLocation === 'replace'}
            onChange={handleChange}
          />
        </Form.Field>
      </Form>
    </HolderDiv>
  );
};
export default CustomFileNameLocation;

/*
.ui.radio.checkbox label {
    padding-left: 18px !important;
}
*/

const HolderDiv = styled.div`
  label {
    padding-left: 18px !important;
  }
`;
