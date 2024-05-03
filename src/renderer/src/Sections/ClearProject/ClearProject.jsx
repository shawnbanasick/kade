import { view } from '@risingstack/react-easy-state';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import ClearProjectModal from './ClearProjectModal';
import { useTranslation } from 'react-i18next';

const ClearProject = () => {
  const { t } = useTranslation();

  return (
    <MainContent>
      <h1>{t('Clear Project')}</h1>
      <h2>
        {t('Click this button to begin a new project')} <br />
        <br />
        {t('This will clear all data and analysis from the current project')} <br />
        <br />
        {t('This action cannot be reversed')}
      </h2>
      <br />
      <br />
      <ClearProjectModal />
    </MainContent>
  );
};

export default view(ClearProject);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
  justify-items: center;
  align-items: center;
  background-color: white;
  visibility: ${(props) => (props.view ? 'hidden' : 'visible')};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 135px);
  box-sizing: border-box;
  max-height: calc(100vh - 22px);
  overflow: hidden;
  user-select: none;
`;
