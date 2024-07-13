import { Dropdown } from 'semantic-ui-react';

import i18n from 'i18next';

const options = [
  {
    key: 'language1',
    text: 'Chinese',
    value: 'cn',
  },
  {
    key: 'language2',
    text: 'English',
    value: 'en',
  },
  {
    key: 'language3',
    text: 'French',
    value: 'fr',
  },
  {
    key: 'language4',
    text: 'German',
    value: 'de',
  },
  {
    key: 'language5',
    text: 'Japanese',
    value: 'jp',
  },
  {
    key: 'language6',
    text: 'Korean',
    value: 'kr',
  },
  {
    key: 'language7',
    text: 'Spanish',
    value: 'es',
  },
];

const languageDropdown = () => {
  const changeLanguage = (event, data) => {
    console.log(data.value);
    i18n.changeLanguage(data.value);
  };

  return (
    <Dropdown
      placeholder={'Select User Interface Language'}
      onChange={changeLanguage}
      openOnFocus
      scrolling
      button
      options={options}
    />
  );
};

export default languageDropdown;
