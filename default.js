let OSType = document.getElementById("OSType");
let OSVersion = document.getElementById("version");
let OSEdition = document.getElementById("edition");
let PV = document.getElementById("PV");
let ServerIndex = document.getElementById("ServerIndex");

let OSTypeSelection;
let out;

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

let OSXBeta = new Option('MacOS Public Beta - Kodiak', 'MacOSBeta');
let OSX100 = new Option('MacOS 10.0 - Cheetah', 'Macos10.0');
let OSX101 = new Option('MacOS 10.1 - Puma', 'MacOS10.1');
let OSX102 = new Option('MacOS 10.2 - Jaguar', 'MacOS10.2');
let OSX103 = new Option('MacOS 10.3 - Panther', 'MacOS10.3');
let OSX104 = new Option('MacOS 10.4 - Tiger', 'MacOS10.4');
let OSX105 = new Option('MacOS 10.5 - Leopard', 'MacOS10.5');
let OSX106 = new Option('MacOS 10.6 - Snow Leopard', 'MacOS10.6');
let OSX107 = new Option('MacOS 10.7 - Lion', 'MacOS10.7');
let OSX108 = new Option('MacOS 10.8 - Mountain Lion', 'MacOS10.8');
let OSX109 = new Option('MacOS 10.9 - Mavericks', 'MacOS10.9');
let OSX1010 = new Option('MacOS 10.10 - Yosemite', 'MacOS10.10');
let OSX1011 = new Option('MacOS 10.11 - El Capitan', 'MacOS10.11');
let OSX1012 = new Option('MacOS 10.12 - Sierra', 'MacOS10.12');
let OSX1013 = new Option('MacOS 10.13 - High Sierra', 'MacOS10.13');
let OSX1014 = new Option('MacOS 10.14 - Mojave', 'MacOS10.14');
let OSX1015 = new Option('MacOS 10.15 - Catalina', 'MacOS10.15');
let OSX11 = new Option('MacOS 11 - Big Sur', 'MacOS11');
let OSX12 = new Option('MacOS 12 - Monterey', 'MacOS12');
let OSX13 = new Option('MacOS 13 - Ventura', 'MacOS13');


let output = document.getElementById("output");



function init() {
    OSVersion.hidden = true;
    OSEdition.hidden = true;
};


function showInputs(OSTypeSelection) {
    if(OSTypeSelection != "") {
        OSVersion.hidden = false;
    };
};

function refreshOutput() {
    if(OSEdition.value == "") {
        let out = OSVersion.value + '-' + PV.value + '-' + ServerIndex.value;
        output.innerHTML = out;
    } else {
        let out = OSVersion.value + '-' + OSEdition.value + '-' + PV.value + '-' + ServerIndex.value;
        output.innerHTML = out;
    }
};

OSType.addEventListener("change", function() {
    let OSTypeSelection = OSType.value;
    showInputs(OSTypeSelection);
    changeAvailableVersions(OSTypeSelection);
});

OSVersion.addEventListener("change", function() {
    if(OSVersion.value != "") {
        OSEdition.hidden = false;
    };
    refreshOutput();
});

OSEdition.addEventListener("change", function() {
    refreshOutput();
});

PV.addEventListener("change", function() {
    refreshOutput();
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
    if(OSTypeSelection == "OSX") {
        OSVersion.add(noSel, undefined);
        OSVersion.add(OSXBeta, undefined);
        OSVersion.add(OSX100, undefined);
        OSVersion.add(OSX101, undefined);
        OSVersion.add(OSX102, undefined);
        OSVersion.add(OSX103, undefined);
        OSVersion.add(OSX104, undefined);
        OSVersion.add(OSX105, undefined);
        OSVersion.add(OSX106, undefined);
        OSVersion.add(OSX107, undefined);
        OSVersion.add(OSX108, undefined);
        OSVersion.add(OSX109, undefined);
        OSVersion.add(OSX1010, undefined);
        OSVersion.add(OSX1011, undefined);
        OSVersion.add(OSX1012, undefined);
        OSVersion.add(OSX1013, undefined);
        OSVersion.add(OSX1014, undefined);
        OSVersion.add(OSX1015, undefined);
        OSVersion.add(OSX11, undefined);
        OSVersion.add(OSX12, undefined);
        OSVersion.add(OSX13, undefined);
    };
};

OSVersion.addEventListener("change", function() {
    refreshOutput();
});
