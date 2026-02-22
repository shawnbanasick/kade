import { useTranslation } from 'react-i18next';

const TranslationAttribution = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-[22px] text-[20px] w-[80%] leading-[1.5em] justify-center items-center grid-area-translation mt-2.5">
      {`${t('Translation')}  ${t('translator')}`}
    </div>
  );
};

export default TranslationAttribution;
