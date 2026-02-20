import { useState, useRef, useEffect } from 'react';
import loadingState from '../../GlobalState/loadingState';

const sigOptions = [
  { key: '99.99', value: 3.891, text: 'P < 0.0001' },
  { key: '99.95', value: 3.481, text: 'P < 0.0005' },
  { key: '99.9', value: 3.291, text: 'P < 0.001' },
  { key: '99.5', value: 2.807, text: 'P < 0.005' },
  { key: '99', value: 2.575, text: 'P < 0.01' },
  { key: '95', value: 1.96, text: 'P < 0.05' },
  { key: '90', value: 1.645, text: 'P < 0.1' },
  { key: '85', value: 1.44, text: 'P < 0.15' },
  { key: '80', value: 1.28, text: 'P < 0.2' },
  { key: 'Com', value: 'majority', text: 'Maj. Com. Var.' },
];

const SigLevelDropdown = () => {
  const [localStore, setLocalStore] = useState({ value: 1.96 });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const updateUserSelectedSigLevel = loadingState((state) => state.updateUserSelectedSigLevel);
  const updateAutoflagButtonColor = loadingState((state) => state.updateAutoflagButtonColor);

  const handleChange = (value) => {
    setLocalStore({ value });
    updateUserSelectedSigLevel(value);
    updateAutoflagButtonColor('bg-[orange]');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = sigOptions.find((o) => o.value === localStore.value);

  return (
    <div style={{ height: '30px', position: 'relative' }} ref={dropdownRef}>
      <button
        style={{
          height: '30px',
          fontSize: '14px',
          border: '3px solid red',
          background: 'white',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0 8px',
          whiteSpace: 'nowrap',
          fontWeight: '500',
          boxSizing: 'border-box',
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
      >
        {selectedOption?.text}
        <svg
          style={{ width: '12px', height: '12px', marginLeft: '4px' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            zIndex: 50,
            top: '100%',
            left: 0,
            margin: 0,
            padding: 0,
            background: 'white',
            border: '1px solid #d1d5db',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            listStyle: 'none',
            minWidth: '100%',
          }}
        >
          {sigOptions.map((option) => (
            <li
              key={option.key}
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                background: option.value === localStore.value ? '#dbeafe' : 'white',
                fontWeight: option.value === localStore.value ? '600' : 'normal',
                color: '#000',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  option.value === localStore.value ? '#dbeafe' : 'white';
                e.currentTarget.style.color = '#000';
              }}
              onClick={() => handleChange(option.value)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
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
