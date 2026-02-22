import UserNumberInput from './UserNumberInput';
import UserSelectionSwitch from './UserSelectionSwitch';
import { useTranslation } from 'react-i18next';

const CardSettingsPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-[30px]">
      <span className="text-[22px] select-none">{t('Cards')}</span>
      <hr className="w-full mb-[15px]" />

      <div className="flex items-center mb-3 pl-2.5">
        <div className="text-base select-none">{`5. ${t('Adjust card height')}?`}</div>
        <UserSelectionSwitch
          name="willAdjustCardHeight"
          value="willAdjustCardHeight"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={'willAdjustCardHeightBy'}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </div>

      <div className="flex items-center mb-3 pl-2.5">
        <div className="text-base select-none">{`6. ${t('Adjust card width')}?`}</div>
        <UserSelectionSwitch
          name="willAdjustCardWidth"
          value="willAdjustCardWidth"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={'willAdjustCardWidthBy'}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </div>

      <div className="flex items-center mb-3 pl-2.5">
        <div className="text-base select-none">{`7. ${t('Adjust font size')}?`}</div>
        <UserSelectionSwitch
          name="willAdjustCardFontSize"
          value="willAdjustCardFontSize"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={'willAdjustCardFontSizeBy'}
            lowerLimit={5}
            upperLimit={80}
            value={13}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSettingsPanel;
