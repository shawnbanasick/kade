import React, { useState } from 'react';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const ProjectNameInput = () => {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const updateHasAddedProjectName = inputState((state) => state.updateHasAddedProjectName);
  const updateProjectName = coreState((state) => state.updateProjectName);

  const handleChange = (e) => {
    const projectName = e.target.value;
    let hasAddedProjectName = false;
    if (projectName.length > 0) {
      hasAddedProjectName = true;
    }
    setProjectName(projectName);
    updateHasAddedProjectName(hasAddedProjectName);
    updateProjectName(projectName);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="projectNameInput" className="ml-9 text-[20px] text-left text-black font-bold">
        Project Name:
      </label>
      <div
        className={`flex flex-row row-start-2 items-center text-black text-[20px] font-bold pl-[5px] mb-[10px] gap-3 `}
      >
        3.
        <input
          className={`text-[20px] h-[30px] w-[355px] p-2 m-[3px] text-black bg-white border border-black rounded-sm`}
          onChange={(e) => handleChange(e)}
          label="Project Name:"
          id="projectNameInput"
          placeholder={t('Input Project Name')}
          value={projectName}
        />
      </div>
    </div>
  );
};

export default ProjectNameInput;
