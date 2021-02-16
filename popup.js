// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setPageBackgroundColor,
    });
});

// The body of this function will be execuetd as a content script inside the
// current page
async function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({color}) => {
        document.body.style.backgroundColor = color;
    });

    // let asd = sessionStorage as [name: string]: any; 
    let result = Object.keys(sessionStorage).map((key) => [String(key), sessionStorage[key]]);
    let result2 = Object.entries(sessionStorage)
    console.log("result2",result2);
    
    result2.forEach(element => {
        console.log("element", element);
    });
    let test = 'ConfigurationService_getConfigurations__["SharedConfigurations"]';
    let gettingItem = sessionStorage.getItem(test)

    sessionStorage.setItem(test, '{"sharedConfigurations":{"additionalValueMustDiagnosticCodes":["07.02.1","20.01","21.01"],"allowExaminationDocumentSelectionOnEpicrisisCreate":false,"departmentAuthorityCode":"Yetki.Veri.Bolum","enableESignerDBLogging":true,"enableIncludeToEpicrisisUnsignedForms":false,"enablePrintButtonForForms":true,"featuredMonitoringFormCodes":["U07.3"],"floorAuthorityCode":"Yetki.Veri.Kat","generalPhysicalExaminationRequired":true,"isEnableAddingLabOrderDespiteOfRepeatedOnUss":false,"isEnableAddingRadOrderDespiteOfRepeatedOnTeletip":true,"key":"SharedConfigurations","prescriptionPermission":15,"pusulaWebAPIAnonymousUsername":"comed.doktor","reviewOfSystemGeneralRequired":false,"stockWarehouseAuthorityCode":"Yetki.Veri.Depo","temporaryTransferPropertyType":"HASTATRANSFER_Testssss"}}');
}


