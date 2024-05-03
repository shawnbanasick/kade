import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const TranslationAttribution = () => {
  const { t } = useTranslation();

  return (
    <TranslationAttContainer>{`${t('Translation')}  ${t('translator')}`}</TranslationAttContainer>
  );
};

export default TranslationAttribution;

const TranslationAttContainer = styled.div`
  display: flex;
  height: 22px;
  font-size: 20px;
  width: 80%;
  line-height: 1.5em;
  justify-content: center;
  align-items: center;
  grid-area: translation;
  margin-top: 10px;
`;
