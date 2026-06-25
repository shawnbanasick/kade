import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const SortsDisplayList = (props) => {
  return (
    <div className="flex pl-8 pt-4 overflow-y-auto h-[calc(100vh-160px)]">
      <ul>
        {props.sortsDisplayText.map(function (listValue, index) {
          return (
            <div key={uuidv4()}>
              <h3 className="font-bold whitespace-pre" key={listValue['key']}>
                {props.respondentNames[index]}
              </h3>
              {listValue['sortArray'].map(function (item, index2) {
                if (index2 === 0) {
                  return (
                    <li
                      key={`${listValue['key']}_${index2}`}
                      className="font-bold list-none whitespace-pre font-['Courier_New'] underline"
                    >
                      {item}
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={`${listValue['key']}_${index2}_99`}
                      className="whitespace-pre font-['Courier_New'] font-bold list-none"
                    >
                      {item}
                    </li>
                  );
                }
              })}
              <br />
              <br />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SortsDisplayList;
