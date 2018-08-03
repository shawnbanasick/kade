import * as XLSX from "xlsx";
import store from '../../../store';
import { formatExcelType1ForDisplay } from "./formatExcelType1ForDisplay";

export function parseExcelType1(acceptedFiles) {
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        var tester,
            tester2,
            tester3,
            tester4;
        var tempArray = [];
        var allWorksheets = [];
        var data,
            workbook,
            worksheet,
            sheet_name_list;
        var hasSortsWorksheet = false;
        var hasStatementsWorksheet = false;
        var filetype = "user-input"; // EXCEL TYPE 1


        reader.onload = function(e) {
            data = e.target.result;
            workbook = XLSX.read(data, {
                type: "binary"
            });

            // iterate through every sheet and pull values
            sheet_name_list = workbook.SheetNames;

            try {
                sheet_name_list.forEach(function(y) {
                    y = y.toLowerCase();
                    /* iterate through sheets */
                    worksheet = workbook.Sheets[y];
                    if (y === "sorts" || y === "qsorts" || y === "q-sorts") {
                        hasSortsWorksheet = true;
                        tester = XLSX.utils.sheet_to_csv(worksheet);
                        tester2 = tester.split(/\n/);

                        if (filetype === "user-input") {
                            // max participants 200 artificial limit
                            for (var i = 1; i < 200; i++) {
                                tester3 = tester2[i].split(",");
                                tempArray.push(tester3);
                            }
                        } else if (filetype === "unforced") {
                            tester3 = tester2.filter(Boolean);
                            tempArray.push(tester3);
                        }
                    } else if (y === "statements" || y === "statement") {
                        hasStatementsWorksheet = true;
                        tempArray = [];
                        tester4 = XLSX.utils.sheet_to_json(worksheet);
                        tempArray.push(tester4);
                    }
                    allWorksheets.push(tempArray);
                }); // end iteration of for each

                if (hasSortsWorksheet === false) {
                    throw new Error("Can't find the 'sorts' worksheet!");
                }
                if (hasStatementsWorksheet === false) {
                    throw new Error("Can't find the 'statements' worksheet!");
                }
                formatExcelType1ForDisplay(allWorksheets);
                store.setState({dataOrigin: "excel"});

            // manage error messages
            } catch (error) {
                // set error message
                store.setState({
                    excelErrorMessage1: error.message,
                    showExcelErrorModal: true,
                });
            }
        }; // end reader on load


        reader.onabort = () => {
            console.log("file reading was aborted");
            store.setState({
                excelErrorMessage1: "The file reader aborted the load process!",
                showExcelErrorModal: true,
            });
        }
        reader.onerror = () => {
            console.log("The file reader encountered an error");
            store.setState({
                excelErrorMessage1: "The file reader encountered an error!",
                showExcelErrorModal: true,
            });
        }


        reader.readAsBinaryString(file);
    });

}
