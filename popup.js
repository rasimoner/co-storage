let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    });
});

async function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color;
    });

    let sessionEntries = Object.entries(sessionStorage)
    let groupName = document.getElementById('groupNames');

    sessionEntries.forEach(entry => {
        let parsed = JSON.parse(entry[1]);
        let result = Object.keys(parsed).map((key) => [String(key), parsed[key]]);

        let title = result?.[0]?.[0];
        let values = result?.[0]?.[1];
        console.log("title", title);
        // groupName.options = title;
        console.log("values", values);

    });
    let test = 'ConfigurationService_getConfigurations__["SharedConfigurations"]';
    let gettingItem = sessionStorage.getItem(test)

    sessionStorage.setItem(test, '{"sharedConfigurations":{"additionalValueMustDiagnosticCodes":["07.02.1","20.01","21.01"],"allowExaminationDocumentSelectionOnEpicrisisCreate":false,"departmentAuthorityCode":"Yetki.Veri.Bolum","enableESignerDBLogging":true,"enableIncludeToEpicrisisUnsignedForms":false,"enablePrintButtonForForms":true,"featuredMonitoringFormCodes":["U07.3"],"floorAuthorityCode":"Yetki.Veri.Kat","generalPhysicalExaminationRequired":true,"isEnableAddingLabOrderDespiteOfRepeatedOnUss":false,"isEnableAddingRadOrderDespiteOfRepeatedOnTeletip":true,"key":"SharedConfigurations","prescriptionPermission":15,"pusulaWebAPIAnonymousUsername":"comed.doktor","reviewOfSystemGeneralRequired":false,"stockWarehouseAuthorityCode":"Yetki.Veri.Depo","temporaryTransferPropertyType":"HASTATRANSFER_Testssss"}}');
}

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


