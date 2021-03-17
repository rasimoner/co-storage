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

            let test01 = '{"applicationConfigurations":{"enableDicomUpload":false,"enableExtendedPharmacy":true,"enablePacs":false,"enableVNA":false,"key":"ApplicationConfigurations","screenTimeout":0}}';
            let test02 = '{"dieteticConfigurations":{"enableBulkDietRegistration":true,"enableOnlyDateForDietOrder":true,"key":"DieteticConfigurations"}}';
            let test03 = '{"documentConfigurations":{"anamnesis":"anamnesis","apacheTwoDocDeathRate":"apache_two_expected_death_rate","apacheTwoDocDeathRateCorrected":"apache_two_diagnostic_death_rate","apacheTwoDocScore":"apache_two_score","apacheTwoDocument":"apache_two","biopsyReport":"biopsy_report","classification":"classification","consultation":"consultation","controlNotes":"control_notes","councilDecisionForm":"council_decision_form","dailyMonitorNote":"hastanin_durumu","diseaseSeverityScoringDoc":"disease_severity_scoring","emergencyServiceNurseMonitor":"acil_servis_hemsire_izlem","enableDocumentDateLimitedByVisit":true,"enableExaminationDocumentButton":false,"enableExaminationDocumentPaymentInquiry":true,"enableToGetEpicrisisDocumentUpdated":true,"ensureEpicrisisDocumentOnExaminationSign":false,"epicrisis":"epicrisis","glasgowDocEngine":"gks_motor","glasgowDocEyes":"gks_goz","glasgowDocument":"glasgow_koma_skoru","glasgowDocVerbal":"gks_konusma","glasgowPediatricDocEngine":"gks_motor","glasgowPediatricDocEyes":"gks_goz","glasgowPediatricDocument":"glasgow_koma_skoru_pediatrik","glasgowPediatricDocVerbal":"gks_konusma_pediatrik","inpatientObservationNotesDoc":"gunluk_takip_notu","intensiveCareLevel":"yogun_bakim_seviye","isVentilationNeed":"ventilasyon_ihtiyaci","key":"DocumentConfigurations","lossDismissedForm":"nurse_observation_note","measurement":"measurement","msoRequest":"mso_request","nurseObservationNote":"nurse_observation_note","nutritionalRiscScreening":"nutrional_risc_screening","painQuestionnaireForm":"pain_questionnaire_form","preOpAssessment":"preoperative_assessment_form","prismDocDeathRate":"prism_expected_dead_rate","prismDocScore":"prism_prism_score","prismDocument":"prism","requireDefinitiveDiagnosisOnDocumentProcessSign":false,"sepsisCondition":"sepsis_durumu","septicShock":"septik_sok","skinPrickTest":"skin_prick_test","snapTwoDocPeScore":"snap_two_pe_score","snapTwoDocScore":"snap_two_score","snapTwoDocument":"snap_two","transferDischarge":"transfer_discharge","transferExitus":"eksitus_formu","transferInHospital":"transfer_in_hospital","transferOutOfHospital":"transfer_out_of_hospital","transferTreatmentRefuse":"transfer_treatment_refuse"}}';
            let test04 = '{"medicalConfigurations":{"bunLoginTestId":"130","bunOutputTestId":"3962","canPhysiciansTakeTheEmergencyProtocols":true,"defaultOperationRoomAppointmentTime":20,"defaultPersonnelAppointmentTime":20,"enableAnesthetistRequirement":false,"enableAuthorizationSeeCalendarPersonnels":false,"enableDoctorPatientCardSetDefaultPageDocuments":true,"enableDoctorTasksTableDenseView":true,"enablePatientCardRightMenuLayout":true,"enablePatientStockAddInteractionInquiry":true,"enableSimpleRelativeWidgetOnExamination":false,"enableSurgeryAppointmentsInCalendar":true,"enableToCreateServicesBasedOnIcdAfterAddIcd":true,"enableUpdateEpicrisisAfterDischarged":true,"fillEpicrisisDayPeriodForInPatient":1,"fillEpicrisisDayPeriodForOutPatientAndDailyPatient":10,"incompleteOrderDischargeControl":3,"key":"MedicalConfigurations","latencyTimeToGetWaitingTasks":15,"pendingExaminationDocumentLimitForSignature":100,"poolOperationAnesthesiologist":"Anestezi","pregnancyDiagnosisCodes":["Z33","15","O00"],"preventZDiagnosesFromBeingAddedAlone":false,"sendNotificationToCashDeskForChangingVisitType":false,"sufficientDayCountToGetInPatientVisitsAccordingToTheirRelations":1,"usePRMAppointments":false,"warningMedicationsOnlyPatientDischarge":true}}';
            let test05 = '{"orderConfigurations":{"careDocument":"care_order_extension","chooseAlternativeOnOutOfStockProduct":true,"countOfHourAddedTreatmentStartDate":0,"createBloodGroupTestLabOrderForEveryVisit":true,"createPlanStepsWithinShiftHours":true,"disableActionBarButtonsForEpicrisisDocumentSigned":false,"enableAmountAfterPlanUsageForTaskSubject":true,"enableBloodBankIntegration":false,"enableControlDietForFirstMedicationOrder":true,"enableDecimalAmount":false,"enableDieticianApproval":true,"enableFilterFromAndToDateRules":false,"enableIPAC":true,"enableMedStationStockSource":true,"enableMultipleDrugExecutedButton":false,"enableOrderHistoryDefaultFilterState":0,"enablePeriodicOrder":false,"enablePharmacyApproveForUrgentOrder":false,"enablePusulaBloodBankIntegration":true,"enableUsingProductNameForOrderTitle":true,"floorsWhichDoNotRequirePharmacyApproval":[25],"hourAddedTreatmentStartDateRequestHistory":11,"howManyHoursAgoNursePlanningValue":24,"ipacApprovalAgeLimit":10,"ipacBranchId":52,"ipacNonApprovalBranches":[38,72],"ipacNonWorkingHourControlType":2,"ipacWorkingHourControlType":2,"ipacWorkingHours":[8,18],"key":"OrderConfigurations","laboratoryDocument":"laboratory_order_extension","latencyTimeToExecuteMedicationTask":120,"latencyTimeToReviewMedicationTask":60,"maxVerbalOrderCountPerVisit":0,"medicationDocument":"medication_order_extension","medicationOrderDefaultEndHour":0,"medicationOrderDefaultStartHour":0,"nutritionDocument":"nutrition_order_extension","operationDocument":"operation_order_extension","pathologyDocument":"pathology_order_extension","pendingTimeScaleToPlanTask":2880,"pyxisOverwriteDailyPatientDepartments":[],"pyxisOverwriteInPatientDepartments":[83,86],"pyxisOverwriteOutPatientDepartments":[83,86],"radiologyDocument":"radiology_order_extension","requireExaminationDocumentForOutPatientOrder":true,"requireExplanationOnOutOfStockProduct":true,"sendToNurseNotificationForShift":true,"standardEtudeHours":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"standardMedicationHours":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"standardNutritionHours":[8,10,12,15,18,21],"toleranceToGiveMedicationOrderEarly":180,"toleranceToGiveMedicationOrderLate":15,"transfusionDocument":"transfusion_order_extension","useShiftStartAndEndHourAtFilter":true,"useShiftStartHourAtLiquidBalanceMonitoring":false,"vademecumApplicationId":"f25aa2214fd9a55ac92e9131eed0cc00","vademecumPassword":"Ca#xH#87s@NaBA8U","vademecumProductFrameUrl":"https://iframe.vademecumonline.com.tr/product/{0}?token={1}","vademecumSandboxUrl":"https://vapi.vademecumonline.com.tr/v1","vademecumUsername":"pusula"}}';
            let test06 = '{"pathologyConfigurations":{"activeInternalLabIntegrationPointCode":"virapis","branchId":90,"enableExternalPathologyLabs":false,"enableInternalPathologyLabs":true,"enableOrdersSentToExternalPathologyLabs":false,"enableQuickApproveForPCodeOrderProcedures":false,"enableSendNotificationForApprovedOrder":false,"integrationMorphologyCodeForHasNeoplasm":"0000/0","integrationReportFileTypeCode":"PAT","integrationReportFolderCode":"PAT","key":"PathologyConfigurations","pCodeOrderProceduresHasNeoplasm":false,"pCodeOrderProceduresHasNeoplasmMorphologyCode":"morphology.0000/0","pCodeOrderProceduresPreparatCode":"preparate.7","sendDirectlyToInternalLabWhenPathologyOrderCreated":false,"showOnlyInternalPathologyLabsReport":false}}';
            let test07 = '{"pharmacyConfigurations":{"antibioticStartReasonRequired":false,"enableAllowedInpatientStateControlForApprovedTasks":true,"enableExtendedPatientStockNotSelectedIfNoDrug":true,"enableExtendedTransferButton":true,"enablePassExplanationForProductionOrder":false,"enablePatientStockDonationButtonVisible":false,"enablePrintBarcodeQuestionForExtendedApprovedOrTransferButton":true,"enableResidueModelVisible":true,"enableStockExpirationDateControl":true,"enableUndoPendingTaskForSkipDismissedProducts":true,"key":"PharmacyConfigurations","lateApprovedHourTimeForTasks":1,"warningTimeToOwnerBy":15}}';
            let test08 = '{"sharedConfigurations":{"additionalValueMustDiagnosticCodes":["07.02.1","20.01","21.01"],"allowExaminationDocumentSelectionOnEpicrisisCreate":false,"departmentAuthorityCode":"Yetki.Veri.Bolum","enableESignerDBLogging":true,"enableIncludeToEpicrisisUnsignedForms":false,"enablePrintButtonForForms":true,"featuredMonitoringFormCodes":["U07.3"],"floorAuthorityCode":"Yetki.Veri.Kat","generalPhysicalExaminationRequired":true,"isEnableAddingLabOrderDespiteOfRepeatedOnUss":false,"isEnableAddingRadOrderDespiteOfRepeatedOnTeletip":true,"key":"SharedConfigurations","prescriptionPermission":15,"pusulaWebAPIAnonymousUsername":"comed.doktor","reviewOfSystemGeneralRequired":false,"stockWarehouseAuthorityCode":"Yetki.Veri.Depo","temporaryTransferPropertyType":"HASTATRANSFER_Testssss"}}';
            let test09 = '{"taskConfigurations":{"enableCancelledActivityStateForMedicationOrderTasks":true,"key":"TaskConfigurations","latencyTimeToPostponeTask":540,"reverseActivityStateStartCondition":false,"undoPlanButtonVisibleForFirstTask":false}}';            
            let test10 = '{"transfusionConfigurations":{"enableOrderTransfusionForm":true,"erythrocyteSuspensionKCode":"2","key":"TransfusionConfigurations"}}';
            let test11 = '{"prmConfigurations":{"allPRMTaskTypes":[80,83,81,84,82,85,86],"appointmentResourceBlockMinute":10,"defaultAppointmentClosingTaskPool":"PRM","defaultAppointmentRemindingTaskMarginHours":24,"defaultAppointmentRemindingTaskPool":"PRM","defaultPatientContactCancellationTaskPool":"PRM-PatientContactCancellation","defaultPatientGuidanceTaskPool":"PRM","defaultPatientTrackingTaskPool":"PRM","defaultPreAppointmentTaskPool":"PRM","doctorMounthlyPlanClosingQuota":5000,"isMernisCheckAllowed":true,"key":"PRMConfigurations","patientValidationSMSCodeValidityMinute":3,"requiredPatientFields":["firstName","lastName","gender","identityNumber","passportNumber","type"],"resourcePlanMinuteInterval":10,"taskCreationDueDateMarginHours":1,"useTenantPatientIdForTrackingsAndGuidances":false}}';

            sessionStorage.setItem(configItemName, test1);

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
