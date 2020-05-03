function printData(datacollection, id) {
    document.getElementById(id).value = JSON.stringify(datacollection.serialize(), null, 4);
}
function printText(text, id) {
    document.getElementById(id).value = text;
}