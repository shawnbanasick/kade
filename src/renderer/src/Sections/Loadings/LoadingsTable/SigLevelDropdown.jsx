import { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import loadingState from '../../GlobalState/loadingState';

// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]
const sigOptions = [
  {
    key: '99.99',
    value: 3.891,
    text: 'P < 0.0001', // text: "99.99%"
  },
  {
    key: '99.95',
    value: 3.481,
    text: 'P < 0.0005', // text: "99.95%"
  },
  {
    key: '99.9',
    value: 3.291,
    text: 'P < 0.001', // text: "99.9%"
  },
  {
    key: '99.5',
    value: 2.807,
    text: 'P < 0.005', // text: "99.5%"
  },
  {
    key: '99',
    value: 2.575,
    text: 'P < 0.01', // text: "99%"
  },
  {
    key: '95',
    value: 1.96,
    text: 'P < 0.05', // text: "95%"
  },
  {
    key: '90',
    value: 1.645,
    text: 'P < 0.1', // text: "90%"
  },
  {
    key: '85',
    value: 1.44,
    text: 'P < 0.15', // text: "85%"
  },
  {
    key: '80',
    value: 1.28,
    text: 'P < 0.2', // text: "80%"
  },
  {
    key: 'Com',
    value: 'majority',
    text: 'Maj. Com. Var.',
  },
];

const SigLevelDropdown = () => {
  const [localStore, setLocalStore] = useState({ value: 1.96 });

  const updateUserSelectedSigLevel = loadingState((state) => state.updateUserSelectedSigLevel);
  const updateAutoflagButtonColor = loadingState((state) => state.updateAutoflagButtonColor);

  const handleChange = (e, { value }) => {
    setLocalStore({ value: value });
    updateUserSelectedSigLevel(value);
    updateAutoflagButtonColor('orange');
  };

  return (
    <Dropdown
      className="autoflagDropdown"
      onChange={handleChange}
      defaultValue={localStore.value}
      openOnFocus
      button
      simple
      item
      options={sigOptions}
    />
  );
};

export default SigLevelDropdown;

/*
'Significance Threshold'
https://www.slideshare.net/zoubamohamed/table-values

99.99 = 3.891
99.9 = 3.291
99 = 2.575
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

98 = 2.33


  <Dropdown placeholder={ "?" } defaultValue={ 7 }  openOnFocus={ true } button simple item options={ options }

pqmethod = loading 'significant at p<.05'


.67	1.28	1.65	1.96	2.33	2.58	2.81	3.10	3.30	3.49	3.73	3.91


<div role="listbox" aria-expanded="false" class="ui button item simple dropdown" tabindex="0" style="border: 1px solid black; height: 50px;"><div class="text" role="alert" aria-live="polite" aria-atomic="true">P &lt; 0.05</div><i aria-hidden="true" class="dropdown icon"></i><div class="menu transition"><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.0001</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.0005</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.001</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.005</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.01</span></div><div role="option" aria-checked="true" aria-selected="true" class="active selected item" style="pointer-events: all;"><span class="text">P &lt; 0.05</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.1</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.15</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.2</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Majority of Common Variance</span></div></div></div>

*/
