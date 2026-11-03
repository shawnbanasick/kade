import React, { useState } from 'react';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const ProjectNameInput = (props) => {
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
    <div className="flex h-50">
      <div
        className={`flex flex-col items-left justify-center text-black text-[20px] font-bold gap-3 `}
      >
        <label htmlFor="projectNameInput" className="text-[20px] text-left text-black font-bold">
          Project Name:
        </label>
        <input
          className={`text-[20px] h-[30px] w-[250px] p-2  text-black bg-white border border-black rounded-sm`}
          onChange={(e) => handleChange(e)}
          label="Project Name:"
          id="projectNameInput"
          placeholder={'my project'}
          value={projectName}
        />
      </div>
    </div>
  );
};

export default ProjectNameInput;
