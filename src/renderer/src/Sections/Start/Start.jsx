import './anchorStyling.css';
import heroImage from '../../assets/kade-hero-image.png';
import TranslationAttribution from './TranslationAttribution';
import { useTranslation } from 'react-i18next';

const linkDivClasses =
  'grid [align-items:center] justify-center h-[100px] w-[380px] text-[22px] mr-[3px] mb-[3px] text-center select-none leading-[1.2]';

const Start = () => {
  const { t } = useTranslation();

  return (
    <div className="box-border grid grid-cols-4 text-black mt-[50px] [grid-template-rows:430px_10px_10px_100px_40px_20px_170px_1fr] [grid-template-areas:'row1_row1_row1_row1''weblinkRow_weblinkRow_weblinkRow_weblinkRow''rule_rule_rule_rule''linkboxRow1_linkboxRow1_linkboxRow2_linkboxRow2''linkboxRow3_linkboxRow3_linkboxRow4_linkboxRow4''rule2_rule2_rule2_rule2''translation_translation_translation_translation'] justify-items-center items-center bg-white font-[Helvetica,sans-serif] text-[18px] w-[calc(100vw-135px)] max-h-full overflow-auto select-none animate-fadeIn">
      {/* Hero Image */}
      <div className="grid items-center justify-center [grid-area:row1]">
        <img src={heroImage} alt="Kade image" className="w-[600px]" />
      </div>

      {/* Website Links heading 
      <div className="[grid-area:weblinkRow] w-[80%] flex items-end">
        <div className="text-black w-[150px]">{`${t('Website Links')}:`}</div>
        </div>*/}
      <hr className="[grid-area:rule] w-[80%] ml-4" />

      {/* Link Box 1 */}
      <div className={`[grid-area:linkboxRow1] ${linkDivClasses}`}>
        <a
          className="sixth before after"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/shawnbanasick/kade"
        >
          Home Page
        </a>
      </div>

      {/* Link Box 2 */}
      <div className={`[grid-area:linkboxRow2] ${linkDivClasses}`}>
        <a
          className="sixth before after"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/shawnbanasick/kade/wiki"
        >
          User Manual
        </a>
      </div>

      {/* Link Box 3 */}
      <div className={`[grid-area:linkboxRow3] ${linkDivClasses}`}>
        <a
          className="sixth before after"
          target="_blank"
          rel="noopener noreferrer"
          href="https://shawnBanasick.github.io/ken-q-analysis/index.html"
        >
          Ken-Q Analysis <br />
          Web Application
        </a>
      </div>

      {/* Link Box 4 */}
      <div className={`[grid-area:linkboxRow4] ${linkDivClasses} !h-[50px]`}>
        <a
          className="sixth before after"
          target="_blank"
          rel="noopener noreferrer"
          href="https://shawnbanasick.github.io/ken-q-data/index.html"
        >
          Ken-Q Data
        </a>
      </div>

      {/* Rule 2 */}
      <hr className="[grid-area:rule2] mt-[50px] w-[80%]" />

      {/* Translation */}
      <div className="[grid-area:translation]">
        <TranslationAttribution />
      </div>
    </div>
  );
};

export default Start;
