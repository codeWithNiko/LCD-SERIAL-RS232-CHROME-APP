/**
 * Created by nikoladrangovski on 1/18/17.
 */

// create array buffer from string
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// find ports and create select dropdown
var onGetDevices = function (ports) {
    var select = document.getElementById("selectNumber");
    for (var i = 0; i < ports.length; i++) {

        var opt = ports[i].path;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
};
chrome.serial.getDevices(onGetDevices);

var connectionID = '';
$("#connectTo").click(function () {
    var port = $('#selectNumber').val();
    chrome.serial.connect(port, info);

});
var info = function (result) {

    console.log(result)
    $("#portInfo").append("<p>BITRATE: " + result.bitrate + "</p>" +
        "<p>CONNECTION ID: " + result.connectionId + "</p>" + "<p>Find rest of the object in console</p>");
    connectionID = result.connectionId;
};
$("#send").click(function () {

    var string1 = $("#row1").val();
    var string2 = $("#row2").val();

    var row1 = editString(string1);
    var row2 = editString(string2);
    var concat = row1 + row2;

    // send the signal to LCD
    chrome.serial.send(connectionID, str2ab("                                                                                "), function () {
        chrome.serial.send(connectionID, str2ab(concat), function (data) {
            console.log(data);
        });
    });
    //  chrome.serial.connect(port, info);
});

// edit the string so it will fit 20 spaces per row
function editString(string) {
    if (string.length > 20) {
        string = jQuery.trim(string).substring(0, 20)
    } else {
        var fillEmpty = 20 - string.length;
        for (var i = 0; i < fillEmpty; i++) {
            string += ' ';
        }
    }
    return string
}