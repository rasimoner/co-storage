let changeColor = document.getElementById("changeColor");
const extensionDocument = document;

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

function setPageBackgroundColor(){
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
    return Object.entries(sessionStorage);
}

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor
        
    },(res) => {
        const sessionEntries = res?.[0]?.result;
        let groupNames = extensionDocument.getElementById("group-names");
        let parameterNames = extensionDocument.getElementById("parameter-names");

        sessionEntries.forEach(entry => {
            let parsed = "";
            if (entry[1].includes('{')) parsed = JSON.parse(entry[1]);
            if (!parsed) return;

            let result = Object.keys(parsed)?.map((key) => [String(key), parsed[key]]);

            let title = result?.[0]?.[0];
            let values = result?.[0]?.[1];

            if (title) {
                let optionElement = document.createElement("option");
                optionElement.setAttribute(title, title);
                let textNode = document.createTextNode(title);
                if (!optionElement.contains(textNode)) optionElement.appendChild(textNode);
                if (!groupNames.contains(optionElement)) groupNames.appendChild(optionElement);
            }

            for (const [key, value] of Object.entries(values)) {
                console.log(`${key}: ${value}`);
                let optionElement = document.createElement("option");
                optionElement.setAttribute(key, key);
                let textNode = document.createTextNode(key);
                console.log("test", optionElement.attributes.getNamedItem(key).value)

                    // let isExist = parameterNames.childNodes[0].isSameNode()?.some(x=>x.attributes?.getNamedItem(key).value == key);
                    // if (!isExist) {
                        optionElement.appendChild(textNode);
                        parameterNames.appendChild(optionElement);
                    // }
            }

            console.log("title", title)
            console.log("values", values)

            let configGroupName = 'SharedConfigurations'; // group names lookuptan gelen grup başlık adı
            let configItemName = `ConfigurationService_getConfigurations__[${configGroupName}]`;
            let gettingItem = sessionStorage.getItem(configItemName);


            sessionStorage.setItem(configItemName, '{"sharedConfigurations":{"additionalValueMustDiagnosticCodes":["07.02.1","20.01","21.01"],"allowExaminationDocumentSelectionOnEpicrisisCreate":false,"departmentAuthorityCode":"Yetki.Veri.Bolum","enableESignerDBLogging":true,"enableIncludeToEpicrisisUnsignedForms":false,"enablePrintButtonForForms":true,"featuredMonitoringFormCodes":["U07.3"],"floorAuthorityCode":"Yetki.Veri.Kat","generalPhysicalExaminationRequired":true,"isEnableAddingLabOrderDespiteOfRepeatedOnUss":false,"isEnableAddingRadOrderDespiteOfRepeatedOnTeletip":true,"key":"SharedConfigurations","prescriptionPermission":15,"pusulaWebAPIAnonymousUsername":"comed.doktor","reviewOfSystemGeneralRequired":false,"stockWarehouseAuthorityCode":"Yetki.Veri.Depo","temporaryTransferPropertyType":"HASTATRANSFER_Testssss"}}');

        });
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


