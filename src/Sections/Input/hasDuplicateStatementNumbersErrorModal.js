import state from "../../store";

export default function hasDuplicateStatementNumbersErrorModal() {
    // let errorMessage;
    // if (message) {
    //     errorMessage = message;
    // } else {
    //     errorMessage = `There are Q sorts with duplicate statement numbers`;
    // }
    // catch input error
    state.setState({
        showErrorMessageBar: true,
        extendedErrorMessage: `The Q sort may have duplicate numbers, or non-numeric characters. Check the format of the file and try again.`,
        errorStackTrace: "no stack trace available",
        isDataButtonGreen: false,
        notifyDataUploadSuccess: false
    });
    return null;
}
