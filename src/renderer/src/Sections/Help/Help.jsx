import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import HelpHome from './HelpHome';
import InputHelpText from './InputHelpText';
import OutputHelpText from './OutputHelpText';
import FactorsHelpText from './FactorsHelpText';
import LoadingsHelpText from './LoadingsHelpText';
import RotationHelpText from './RotationHelpText';
import InputHelpTextJson from './InputHelpTextJson';
import InputHelpTextExcel1 from './InputHelpTextExcel1';
import InputHelpTextExcel2 from './InputHelpTextExcel2';
import InputHelpTextExcel3 from './InputHelpTextExcel3';
import CorrelationsHelpText from './CorrelationsHelpText';
import InputHelpTextPqmethod from './InputHelpTextPqmethod';
import InputHelpTextZip from './InputHelpTextZip';

const tabLabels = [
  'Help-Home',
  'Help-Input',
  'Help-Correlations',
  'Help-Factors',
  'Help-Rotation',
  'Help-Loadings',
  'Help-Output',
];

const Output = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      id="helpSection"
      className="bg-[#d6dbe0] w-[calc(100vw-135px)] box-border h-screen overflow-auto select-all animate-fadeIn"
    >
      <Tabs selectedIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
        {/* Tab Bar */}
        <TabList className="flex flex-wrap border-b border-gray-300 bg-[#d6dbe0]">
          {tabLabels.map((label) => (
            <Tab
              key={label}
              className="px-4 py-2 text-sm font-medium cursor-pointer select-none text-gray-600 border border-transparent hover:text-black focus:outline-none"
              selectedClassName="bg-white border-gray-300 border-b-white rounded-t text-black -mb-px"
            >
              {label}
            </Tab>
          ))}
        </TabList>

        {/* Tab Panels */}
        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <HelpHome />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <InputHelpText />
            <InputHelpTextExcel1 />
            <InputHelpTextExcel2 />
            <InputHelpTextExcel3 />
            <InputHelpTextZip />
            <InputHelpTextJson />
            <InputHelpTextPqmethod />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <CorrelationsHelpText />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <FactorsHelpText />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <RotationHelpText />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <LoadingsHelpText />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pt-[15px] bg-white h-[calc(100vh-48px)] min-w-[calc(100vw-166px)] overflow-auto">
            <OutputHelpText />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Output;
