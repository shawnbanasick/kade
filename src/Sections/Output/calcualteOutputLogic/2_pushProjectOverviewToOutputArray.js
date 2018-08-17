import store from "../../store";
import currentDate1 from "../../Utils/currentDate1";
import currentTime1 from "../../Utils/currentTime1";

const pushProjectHistoryToOutputArray = function() {
    let sheetNames = [];
    let output = [];

    let newSheet = {
        sheetid: "Project Overview",
        headers: false
    };
    sheetNames.push(newSheet);

    let sheetNamesXlsx = ["Project Overview"];
    let dataXlsx = [];

    // todo - check to see what this settings is used for? necessary?
    let settings = [];
    let spacer = ["", ""];

    let projectName = store.getState("projectName");
    let projectNameArray = ["Project Name", projectName];
    settings.push(spacer, projectNameArray, spacer);
    dataXlsx.push(spacer, projectNameArray, spacer);

    let totalStatements = store.getState("numStatements").toString();
    let totalNumberStatementArray = [
        "Total Number of Statements",
        totalStatements
    ];
    settings.push(totalNumberStatementArray, spacer);
    dataXlsx.push(totalNumberStatementArray, spacer);

    let qSortPattern3 = store.getState("qSortPattern");
    let qSortPattern2 = qSortPattern3.join();
    let qSortPattern = ["Q-sort Design", qSortPattern2];
    settings.push(qSortPattern, spacer);
    dataXlsx.push(qSortPattern, spacer);

    let totalSorts = store.getState("numQsorts").toString();
    let totalSortsArray = ["Total Number of Q-sorts", totalSorts];
    settings.push(totalSortsArray, spacer);
    dataXlsx.push(totalSortsArray, spacer);

    // get project history
    let list = store.getState("projectHistoryArray");
    //let items = list.childNodes;
    settings.push(["Analysis Process", ""]);
    dataXlsx.push(["Analysis Process", ""]);

    for (let i = 0; i < list.length; i++) {
        settings.push(["", list[i]]);
        dataXlsx.push(["", list[i]]);
    }

    let autoFlagHistory = store.getState("autoFlagHistory");
    settings.push(spacer, autoFlagHistory);
    dataXlsx.push(spacer, autoFlagHistory);

    let timeCompleted = currentDate1() + " at " + currentTime1();
    settings.push(spacer, ["Analysis completed on:", timeCompleted]);
    dataXlsx.push(spacer, ["Analysis completed on:", timeCompleted]);

    let version = store.getState("version");
    settings.push(spacer, ["Ken-Q Analysis Version Number: ", version]);
    dataXlsx.push(spacer, ["Ken-Q Analysis Version Number: ", version]);

    let colSizes = [
        [
            {
                wch: 40
            },
            {
                wch: 70
            }
        ]
    ];

    let outputData = [];
    outputData.push(dataXlsx);

    output.push(settings);

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushProjectHistoryToOutputArray;
