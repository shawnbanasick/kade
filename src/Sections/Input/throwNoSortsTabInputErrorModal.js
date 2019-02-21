import state from "../../store";

export default function throwNoStatementsInputErrorModal() {
    // catch input error
    state.setState({
        showErrorMessageBar: true,
        errorMessage: `Can't find the "sorts" tab in the Excel File`,
        extendedErrorMessage: `Check the format of the Excel file and try again.`,
        errorStackTrace: "no stack trace available",
        isDataButtonGreen: false,
        notifyDataUploadSuccess: false,
    });
    return null;
}
;

