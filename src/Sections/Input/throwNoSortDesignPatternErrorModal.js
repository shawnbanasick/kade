import state from "../../store";

export default function throwNoSortDesignErrorModal(message) {
    let errorMessage;
    if (message) {
        errorMessage = message;
    } else {
        errorMessage = `Can't find the Q Sort Design in the Excel File`;
    }
    // catch input error
    state.setState({
        showErrorMessageBar: true,
        errorMessage,
        extendedErrorMessage: `Check the format of the file and try again.`,
        errorStackTrace: "no stack trace available",
        isDataButtonGreen: false,
        notifyDataUploadSuccess: false
    });
    return null;
}
