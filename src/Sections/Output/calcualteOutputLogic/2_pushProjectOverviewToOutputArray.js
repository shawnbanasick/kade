import state from "../../../store";
import currentDate1 from "../../../Utils/currentDate1";
import currentTime1 from "../../../Utils/currentTime1";

const pushProjectHistoryToOutputArray = function() {
    const sheetNames = [];
    const output = [];

    const newSheet = {
        sheetid: "Project Overview",
        headers: false
    };
    sheetNames.push(newSheet);

    const sheetNamesXlsx = ["Project Overview"];
    const dataXlsx = [];

    // todo - check to see what this settings is used for? necessary?
    const settings = [];
    const spacer = ["", ""];

    const projectName = state.getState("projectName");
    const projectNameArray = ["Project Name", projectName];
    settings.push(spacer, projectNameArray, spacer);
    dataXlsx.push(spacer, projectNameArray, spacer);

    const totalStatements = state.getState("numStatements").toString();
    const totalNumberStatementArray = [
        "Total Number of Statements",
        totalStatements
    ];
    settings.push(totalNumberStatementArray, spacer);
    dataXlsx.push(totalNumberStatementArray, spacer);

    const qSortPattern3 = state.getState("qSortPattern");
    const qSortPattern2 = qSortPattern3.join();
    const qSortPattern = ["Q-sort Design", qSortPattern2];
    settings.push(qSortPattern, spacer);
    dataXlsx.push(qSortPattern, spacer);

    const totalSorts = state.getState("numQsorts").toString();
    const totalSortsArray = ["Total Number of Q-sorts", totalSorts];
    settings.push(totalSortsArray, spacer);
    dataXlsx.push(totalSortsArray, spacer);

    // get project history
    const list = state.getState("projectHistoryArray");
    // let items = list.childNodes;
    settings.push(["Analysis Process", ""]);
    dataXlsx.push(["Analysis Process", ""]);

    for (let i = 0; i < list.length; i++) {
        settings.push(["", list[i]]);
        dataXlsx.push(["", list[i]]);
    }

    const autoFlagHistory = state.getState("autoFlagHistory"); 
    settings.push(spacer, autoFlagHistory);
    dataXlsx.push(spacer, autoFlagHistory);

    const distStateUpperValueText = state.getState("distStateUpperValueText");
    const distStateLowerValueText = state.getState("distStateLowerValueText");
    settings.push(spacer, ["Distinguishing statements threshold 1:", distStateUpperValueText]);
    dataXlsx.push(spacer, ["Distinguishing statements threshold 1:", distStateUpperValueText]);
    settings.push(spacer, ["Distinguishing statements threshold 2:", distStateLowerValueText]);
    dataXlsx.push(spacer, ["Distinguishing statements threshold 2:", distStateLowerValueText]);

    const timeCompleted = `${currentDate1()  } at ${  currentTime1()}`;
    settings.push(spacer, ["Analysis completed on:", timeCompleted]);
    dataXlsx.push(spacer, ["Analysis completed on:", timeCompleted]);

    const version = state.getState("version");
    settings.push(spacer, ["KADE Version Number: ", version]);
    dataXlsx.push(spacer, ["KADE Version Number: ", version]);

    const colSizes = [
        [
            {
                wch: 40
            },
            {
                wch: 70
            }
        ]
    ];

    const outputData = [];
    outputData.push(dataXlsx);

    output.push(settings);

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushProjectHistoryToOutputArray;
