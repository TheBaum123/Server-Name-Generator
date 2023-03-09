// declaring a variable for every i/o
let OSType = document.getElementById("OSType");
let OSVersion = document.getElementById("version");
let OSVersionCustom = document.getElementById("customVersion")
let OSEdition = document.getElementById("edition");
let PV = document.getElementById("PV");
let ServerIndex = document.getElementById("ServerIndex");
let showEdition = document.getElementById("showEdition");
let output = document.getElementById("output");

// declaring some variables that were needed for this to work for some reason last time i checked
let OSTypeSelection;
let out;

// declaring selection options for OS versions
    // Windows versions
let windows7 = new Option('Windows 7', 'Win7');
let windows8 = new Option('Windows 8', 'Win8');
let windows81 = new Option('Windows 8.1', 'Win8.1');
let windows10 = new Option('Windows 10', 'Win10');
let windows11 = new Option('Windows 11', 'Win11');

    // Windows server versions
let windowsServer2003 = new Option('Windows Server 2003', 'WinServ2003');
let windowsServerHome2007 = new Option('Windows Server Home 2007', 'WinServ2007');
let windowsServer2008 = new Option('Windows Server 2008', 'WinServ2008');
let windowsServerHome2011 = new Option('Windows Server Home 2011', 'WinServ2011');
let windowsServer2012 = new Option('Windows Server 2012', 'WinServ2012');
let windowsServer2016 = new Option('Windows Server 2016', 'WinServ2016');
let windowsServer2022 = new Option('Windows Server 2022', 'WinServ2022');

    // OSX versions
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

// declaring selection options for Windows standard editions
let starterEdition = new Option('Starter Edition', 'Starter');
let homeBasicEdition = new Option('Home Basic Edition', 'HomeBasic');
let homePremium = new Option('Home Premium Edition', 'HomePrem');
let professional = new Option('Professional Edition', 'Pro');
let enterprise = new Option('Enterprise Edition', 'Ent');
let ultimate = new Option('Ultimate Edition', 'Ult');
let core = new Option('Core Edition', 'Core');
let standard = new Option('Standard Edition', 'Std');
let home = new Option('Home Edition', 'Home');
let education = new Option('Education Edition', 'Edu');
let enterpriseLTSC = new Option('Enterprise LTSC Edition', 'EntLTSC');
let professionalWorkstations = new Option('Professional for Workstations Edition', 'ProWork');
let professionalEducation = new Option('Professional Education Edition', 'ProEdu');

// declaring selection options for windows server editions
let webEdition = new Option('Web Edition', 'Web');
let datacenter = new Option('Datacenter Edition', 'DC');
let storageServer = new Option('Storage Server Edition', 'Sto');
let applianceEdition = new Option('Appliance Edition', 'Apls');
let itanium = new Option('Itanium Edition', 'Itanium');
let foundation = new Option('Foundation Edition', 'Fdn');
let hpcEdition = new Option('HPC Edition', 'HPC');
let essential = new Option('Essential Edition', 'Esntl');
let azureDatacenter = new Option('Azure Datacenter edition', 'AzureDC');



// hide elements that have to be hidden on page load
function init() {
    OSVersion.hidden = true;
    OSVersionCustom.hidden = true;
    OSEdition.hidden = true;
    showEdition.hidden = true;
};


// refresh the output with selected elements in name
function refreshOutput() {
    if(OSVersion.value == 'custom') {
        let out = OSVersionCustom.value + '-' + PV.value + '-' + ServerIndex.value;
        output.innerHTML = out;
    } else {
        if(OSEdition.value != "" && showEdition.checked && OSVersion.value.startsWith("Win")) {
            let out = OSVersion.value + '-' + OSEdition.value + '-' + PV.value + '-' + ServerIndex.value;
            output.innerHTML = out;
        } else {
            let out = OSVersion.value + '-' + PV.value + '-' + ServerIndex.value;
            output.innerHTML = out;
        };
    };
};


// add event listeners to inputs to refresh the ouput on change
// OS type to know which versions to show
OSType.addEventListener("change", function() {
    let OSTypeSelection = OSType.value;
    // deselect OS version
    OSVersion.value = "";
    // show OS version input if OS type is selected
    if(OSTypeSelection != "") {
        OSVersion.hidden = false;
    };
    // call function to change the selection of versions to the ones available for the currently selected OS
    changeAvailableVersions(OSTypeSelection);
});

// OS version to know which operating system speciffically is used
OSVersion.addEventListener("change", function() {
    // show and hide the custom version input
    if(OSVersion.value == "custom") {
        OSVersionCustom.hidden = false;
    } else {
        OSVersionCustom.hidden = true;
    };
    // show the checkbox to include the edition in the name and the input to chose the edition if the OS version starts with Win and isn't Windows Server 2007 or 2011
    if(OSVersion.value.startsWith("Win") && OSVersion.value != "WinServ2007" && OSVersion.value != "WinServ2011") {
        showEdition.hidden = false;
        OSEdition.hidden = false;
        changeAvailableEditions();
    } else {
        // else hide the input and the checkbox
        OSEdition.hidden = true;
        showEdition.hidden = true;
    };
    refreshOutput();
});

// OS Edition listener currently only to refresh the output
OSEdition.addEventListener("change", function() {
    refreshOutput();
});

// physical container or vm listener currently only to refresh the output
PV.addEventListener("change", function() {
    refreshOutput();
});

// Server index listener currently only to refresh the output
ServerIndex.addEventListener("change", function() {
    refreshOutput();
});

// show edition to show the edition when the checkbox is checked
showEdition.addEventListener("change", function() {
    // check if the OS Edition should take an input and call the function to set the options for the editions
    if(OSVersion.value.startsWith("Win") && showEdition.checked) {
        OSEdition.hidden = false;
        changeAvailableEditions();
    }
    // if the os edition should not be shown, hide the selection input for it
    else {
        OSEdition.hidden = true;
    }
    refreshOutput();
});

// refresh on custom version
OSVersionCustom.addEventListener("change", function() {
    refreshOutput();
});

// function change the OS version selection to the correct ones
function changeAvailableVersions(OSTypeSelection) {
    // clear all version selection options
    for(let i = OSVersion.length - 2; i > 0; i--) {
        OSVersion.remove(2);
    };
    // add the options for windows if windows is selected as the OS type
    if(OSTypeSelection == "Win") {
        OSVersion.add(windows7, undefined);
        OSVersion.add(windows8, undefined);
        OSVersion.add(windows81, undefined);
        OSVersion.add(windows10, undefined);
        OSVersion.add(windows11, undefined);
    };
    // add the options for windows server if windows server is selected as the OS type
    if(OSTypeSelection == "WinServ") {
        OSVersion.add(windowsServer2003, undefined);
        OSVersion.add(windowsServerHome2007, undefined);
        OSVersion.add(windowsServer2008, undefined);
        OSVersion.add(windowsServerHome2011, undefined);
        OSVersion.add(windowsServer2012, undefined);
        OSVersion.add(windowsServer2016, undefined);
        OSVersion.add(windowsServer2022, undefined);
    };
    // add the options for OSX if OSX is selected as the OS type
    if(OSTypeSelection == "OSX") {
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

// function to change the OS editions selection to the correct ones when windows is selected
function changeAvailableEditions() {
    // clear all edition selection options
    for(let i = OSEdition.length - 1; i > 0; i--) {
        OSEdition.remove(1);
    };
    // add the editions for windows 7 as options if it is the selected version
    if(OSVersion.value == "Win7") {
        OSEdition.add(starterEdition, undefined);
        OSEdition.add(homeBasicEdition, undefined);
        OSEdition.add(homePremium, undefined);
        OSEdition.add(professional, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(ultimate, undefined);
    };
    // add the editions for windows 8 as options if it is the selected version
    if(OSVersion.value == "Win8") {
        OSEdition.add(core, undefined);
        OSEdition.add(professional, undefined);
        OSEdition.add(enterprise, undefined);
    };
    // add the editions for windows 8.1 as options if it is the selected version
    if(OSVersion.value == "Win8.1") {
        OSEdition.add(standard, undefined);
        OSEdition.add(professional, undefined);
        OSEdition.add(enterprise, undefined);
    };
    // add the editions for windows 10 as options if it is the selected version
    if(OSVersion.value == "Win10") {
        OSEdition.add(home, undefined);
        OSEdition.add(professional, undefined);
        OSEdition.add(education, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(enterpriseLTSC, undefined);
        OSEdition.add(professionalWorkstations, undefined);
    };
    // add the editions for windows 11 as options if it is the selected version
    if(OSVersion.value == "Win11") {
        OSEdition.add(home, undefined);
        OSEdition.add(professional, undefined);
        OSEdition.add(professionalWorkstations, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(education, undefined);
        OSEdition.add(professionalEducation, undefined);
    };
    if(OSVersion.value == "WinServ2003") {
        OSEdition.add(webEdition, undefined);
        OSEdition.add(standard, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(datacenter, undefined);
        OSEdition.add(storageServer, undefined);
        OSEdition.add(applianceEdition, undefined);
    };
    if(OSVersion.value == "WinServ2008") {
        OSEdition.add(webEdition, undefined);
        OSEdition.add(standard, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(datacenter, undefined);
        OSEdition.add(itanium, undefined);
        OSEdition.add(foundation, undefined);
        OSEdition.add(hpcEdition, undefined);
    };
    if(OSVersion.value == "WinServ2012") {
        OSEdition.add(webEdition, undefined);
        OSEdition.add(standard, undefined);
        OSEdition.add(enterprise, undefined);
        OSEdition.add(datacenter, undefined);
    };
    if(OSVersion.value == "WinServ2016") {
        OSEdition.add(standard, undefined);
        OSEdition.add(datacenter, undefined);
    };
    if(OSVersion.value == "WinServ2022") {
        OSEdition.add(standard, undefined);
        OSEdition.add(datacenter, undefined);
        OSEdition.add(azureDatacenter, undefined);
    };
};