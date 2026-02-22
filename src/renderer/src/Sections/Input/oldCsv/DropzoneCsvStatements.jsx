import Dropzone from 'react-dropzone';
import state from '../../../store';

const handleDropRejected = (...args) => console.log('reject', args);

function handleDrop(acceptedFiles) {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileAsBinaryString = reader.result;
        const lines = fileAsBinaryString.split(/[\r\n]+/g);
        const lines2 = lines.filter((e) => e === 0 || e);

        if (lines2.length === 0) {
          throw new Error("Can't find any statements in the file!");
        }

        state.setState({
          statements: lines2,
        });
      } catch (error) {
        state.setState({
          csvErrorMessage1: error.message,
          showCsvErrorModal: true,
        });
      }
    };
    reader.onabort = () => {
      state.setState({
        excelErrorMessage1: 'The file reader aborted the load process!',
        showExcelErrorModal: true,
      });
    };
    reader.onerror = () => {
      state.setState({
        excelErrorMessage1: 'The file reader encountered an error!',
        showExcelErrorModal: true,
      });
    };
    reader.readAsBinaryString(file);
  });
}

const FileUpload = () => {
  return (
    <div className="grid items-center justify-items-center h-[120px] w-[280px]">
      <Dropzone onDrop={handleDrop} multiple={false} onDropRejected={handleDropRejected}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="border-2 border-blue-600 h-[60px] w-[280px] px-[10px] pt-[25px] pb-0 text-center font-[Helvetica,sans-serif]"
          >
            <input {...getInputProps()} />
            Drag a file here or
            <br /> click to load.
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
