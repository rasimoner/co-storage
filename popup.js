let changeColor = document.getElementById("changeColor");

const extensionDocument = document;

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});


function setPageBackgroundColor(){
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });

    console.log('reads',sessionStorage)

    return Object.entries(sessionStorage);

    console.log({ document })
    let groupNames = extensionDocument.getElementById("group-names");

    let changeColor2 = extensionDocument.getElementById("changeColor");

    console.log("groupNames", groupNames)
    console.log("changeColor2", changeColor2)

    sessionEntries.forEach(entry => {
        let parsed = "";
        if (entry[1].includes('{')) parsed = JSON.parse(entry[1]);
        if (!parsed) return;

        let result = Object.keys(parsed)?.map((key) => [String(key), parsed[key]]);

        let title = result?.[0]?.[0];
        let values = result?.[0]?.[1];


    });

    let configGroupName = 'SharedConfigurations'; // group names lookuptan gelen grup başlık adı
    let configItemName = `ConfigurationService_getConfigurations__[${configGroupName}]`;
    let gettingItem = sessionStorage.getItem(configItemName);


    sessionStorage.setItem(configItemName, '{"sharedConfigurations":{"additionalValueMustDiagnosticCodes":["07.02.1","20.01","21.01"],"allowExaminationDocumentSelectionOnEpicrisisCreate":false,"departmentAuthorityCode":"Yetki.Veri.Bolum","enableESignerDBLogging":true,"enableIncludeToEpicrisisUnsignedForms":false,"enablePrintButtonForForms":true,"featuredMonitoringFormCodes":["U07.3"],"floorAuthorityCode":"Yetki.Veri.Kat","generalPhysicalExaminationRequired":true,"isEnableAddingLabOrderDespiteOfRepeatedOnUss":false,"isEnableAddingRadOrderDespiteOfRepeatedOnTeletip":true,"key":"SharedConfigurations","prescriptionPermission":15,"pusulaWebAPIAnonymousUsername":"comed.doktor","reviewOfSystemGeneralRequired":false,"stockWarehouseAuthorityCode":"Yetki.Veri.Depo","temporaryTransferPropertyType":"HASTATRANSFER_Testssss"}}');
}

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor
        
    },(res) => {
        const storage = res?.[0]?.result;

        console.log('res',storage);

        let groupNames = extensionDocument.getElementById("group-names");

        let changeColor2 = extensionDocument.getElementById("changeColor");

        console.log("groupNames", groupNames)
        console.log("changeColor2", changeColor2)
    });
});


function myFunction() {
    let sessionEntries = Object.entries(sessionStorage);

    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    document.body.appendChild(x);

    sessionEntries.forEach(entry => {
        let parsed = JSON.parse(entry[1]);
        let result = Object.keys(parsed).map((key) => [String(key), parsed[key]]);

        let title = result?.[0]?.[0];
        let values = result?.[0]?.[1];

        for (let item in values) {
            var z = document.createElement("option");
            z.setAttribute(values[item], values[item]);
            var t = document.createTextNode(values[item]);
            z.appendChild(t);
            document.getElementById("mySelect").appendChild(z);
        }

        console.log("title", title);
        // groupName?.options = title;
        console.log("values", values);

    });
}


