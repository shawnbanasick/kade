export function sortsDisplayText(mainDataObject) {
    let sortsDisplayText = mainDataObject.map(function(item) {
        return item.name + ": " + item.displaySort;
    });

    return sortsDisplayText;
}
