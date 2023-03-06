let OSType = document.getElementById("OSType");
let OSVersion = document.getElementById("version")

let OSTypeSelection;

let noSel = new Option('-- select an option --', '');

let windows7 = new Option('Windows 7', 'Win7');
let windows8 = new Option('Windows 8', 'Win8');
let windows81 = new Option('Windows 8.1', 'Win8.1');
let windows10 = new Option('Windows 10', 'Win10');
let windows11 = new Option('Windows 11', 'Win11');

let windowsServer2003 = new Option('Windows Server 2003', 'WinServ2003');
let windowsServerHome2007 = new Option('Windows Server Home 2007', 'WinServ2007');
let windowsServer2008 = new Option('Windows Server 2008', 'WinServ2008');
let windowsServerHome2011 = new Option('Windows Server Home 2011', 'WinServ2011');
let windowsServer2012 = new Option('Windows Server 2012', 'WinServ2012');
let windowsServer2016 = new Option('Windows Server 2016', 'WinServ2016');
let windowsServer2022 = new Option('Windows Server 2022', 'WinServ2022');

let output = document.getElementById("output");

const unchangedVersions = ["Win7", "Win8", "Win8.1", "Win10", "Win11", "WinServ2003", "WinServ2007", "WinServ2008", "WinServ2011", "WinServ2012", "WinServ2016", "WinServ2022"]



function init() {
    OSVersion.hidden = true;
};


function showInputs(OSTypeSelection) {
    if(OSTypeSelection != "") {
        OSVersion.hidden = false;
    };
};

function refreshOutput(OSVersionShort) {
    let out = OSVersionShort;
    output.innerHTML = out;
};

OSType.addEventListener("change", function() {
    let OSTypeSelection = this.value;
    showInputs(OSTypeSelection);
    changeAvailableVersions(OSTypeSelection);
});

function changeAvailableVersions(OSTypeSelection) {
    for(let i = OSVersion.length; i > 0; i--) {
        OSVersion.remove(0);
    };
    if(OSTypeSelection == "Win") {
        OSVersion.add(noSel, undefined);
        OSVersion.add(windows7, undefined);
        OSVersion.add(windows8, undefined);
        OSVersion.add(windows81, undefined);
        OSVersion.add(windows10, undefined);
        OSVersion.add(windows11, undefined);
    };
    if(OSTypeSelection == "WinServ") {
        OSVersion.add(noSel, undefined);
        OSVersion.add(windowsServer2003, undefined);
        OSVersion.add(windowsServerHome2007, undefined);
        OSVersion.add(windowsServer2008, undefined);
        OSVersion.add(windowsServerHome2011, undefined);
        OSVersion.add(windowsServer2012, undefined);
        OSVersion.add(windowsServer2016, undefined);
        OSVersion.add(windowsServer2022, undefined);
    };
};

OSVersion.addEventListener("change", function() {
    if(unchangedVersions.includes(OSVersion.value)) {
        refreshOutput(OSVersion.value);
    };
});
