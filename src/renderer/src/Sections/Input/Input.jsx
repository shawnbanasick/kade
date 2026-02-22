import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import inputState from '../GlobalState/inputState';
import JsonPanel from './JsonPanel';
import ExcelPanel from './ExcelPanel';
import Excel3Panel from './KandedPanel';
import PQMethodPanel from './PQMethodPanel';
import KadeZipPanel from './KadeZipPanel';
import DemoDataPanel from './DemoDataPanel';
import CsvPanel from './CsvPanel';
import { useTranslation } from 'react-i18next';

function Input() {
  const showNotification = inputState((state) => state.notifyDataUploadSuccess);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const inputActiveTab = inputState((state) => state.inputActiveTab);
  const updateInputActiveTab = inputState((state) => state.updateInputActiveTab);

  // put here to be able to use React hook for t
  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(t('File Load Success'));
    await updateNotifyDataUploadSuccess(false);
  };

  const { t } = useTranslation();

  // Handler for tab clicks
  const handleTabClick = (tabId) => {
    updateInputActiveTab(tabId);
  };

  const tabs = [
    {
      title: t('XLSX'),
      content: <ExcelPanel />,
    },
    {
      title: 'KADE XLSX',
      content: <Excel3Panel />,
    },
    {
      title: 'KADE ZIP',
      content: <KadeZipPanel />,
    },
    {
      title: 'CSV',
      content: <CsvPanel />,
    },
    {
      title: 'EQ Web Sort',
      content: <JsonPanel />,
    },
    {
      title: t('PQMethod'),
      content: <PQMethodPanel />,
    },
    {
      title: t('Demo Data'),
      content: <DemoDataPanel />,
    },
  ];

  if (showNotification) {
    notify();
  }

  return (
    <React.Fragment>
      <ToastContainer transition={Zoom} />
      <div
        className={`
        bg-white
        w-[calc(100vw-135px)]
        box-border
        h-full
        overflow-auto
        transition-[visibility,opacity]
        duration-500
        text-black
        text-[clamp(1rem,1.5vw,1.1rem)] 
      `}
      >
        <div className="tabs tabs-box flex bg-grey-button h-full rounded-none">
          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab1' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[0].title}
            onClick={() => handleTabClick('tab1')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[0].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab2' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[1].title}
            onClick={() => handleTabClick('tab2')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[1].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab3' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[2].title}
            onClick={() => handleTabClick('tab3')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[2].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab4' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[3].title}
            onClick={() => handleTabClick('tab4')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[3].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab5' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[4].title}
            onClick={() => handleTabClick('tab5')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[4].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab6' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[5].title}
            onClick={() => handleTabClick('tab6')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[5].content}</div>

          <input
            type="radio"
            name="my_tabs_6"
            className={`tab basis-[9vw] text-[clamp(1rem,1.5vw,1.1rem)]  hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] ${inputActiveTab === 'tab7' ? 'tab-active bg-primary-button text-black' : 'bg-grey-button'}`}
            aria-label={tabs[6].title}
            onClick={() => handleTabClick('tab7')}
          />

          <div className="tab-content bg-base-100 border-base-300 p-6">{tabs[6].content}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Input;
