export function checkIfOnline() {
    let isOnline;
    if (window.location.protocol === "file:") {
        isOnline = false;
    } else {
        isOnline = true;
    }
    return isOnline;
}
