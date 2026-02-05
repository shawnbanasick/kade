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
    <React.Fragment>
      <div className={`flex flex-row items-center text-[20px] font-bold pl-[5px] mb-[10px] gap-3 `}>
        3.
        <input
          className={`text-[20px] h-[30px] w-[355px] p-2 m-[3px] text-black bg-white border border-black rounded-sm`}
          onChange={(e) => handleChange(e)}
          label="Project Name:"
          placeholder={t('Input Project Name')}
          value={projectName}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectNameInput;
