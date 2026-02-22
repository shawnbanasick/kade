import FirebaseButton from './FirebaseButton';
import SheetsButton from './SheetsButton';
import NetlifyButton from './NetlifyButton';

const DatabaseSelectButtons = () => {
  return (
    <div className="flex mt-1 mb-2 w-[800px] justify-start">
      <FirebaseButton />
      <SheetsButton />
      <NetlifyButton />
    </div>
  );
};

export default DatabaseSelectButtons;
