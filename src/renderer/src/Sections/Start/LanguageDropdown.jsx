import { useState } from 'react';
import i18n from 'i18next';

const options = [
  { key: 'language1', text: 'Chinese', value: 'cn' },
  { key: 'language2', text: 'English', value: 'en' },
  { key: 'language3', text: 'French', value: 'fr' },
  { key: 'language4', text: 'German', value: 'de' },
  { key: 'language5', text: 'Japanese', value: 'jp' },
  { key: 'language6', text: 'Korean', value: 'kr' },
  { key: 'language7', text: 'Spanish', value: 'es' },
];

const LanguageDropdown = () => {
  const [activeValue, setActiveValue] = useState('');

  const changeLanguage = (e) => {
    const val = e.target.value;
    console.log(val);
    setActiveValue(val);
    i18n.changeLanguage(val);
  };

  return (
    <select
      value={activeValue}
      onChange={changeLanguage}
      className="select select-bordered bg-white text-[14px] w-full max-w-xs"
    >
      <option value="" disabled>
        Select User Interface Language
      </option>
      {options.map((opt) => (
        <option key={opt.key} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
