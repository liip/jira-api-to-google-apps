// Main script

var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

// Main variables
var jiraBaseUrl, filterUrl, filterId, fetchArgs;

// New sheets to be created
var configurationSheet, itemsSheet;

// Launch all the different operations
function onOpen() {
  itemsSheet = createSheet("Items");
  configurationSheet = createSheet("Configuration");

  initiateVariables();

  cleanItemsSheet();

  configurationSheet.getRange("A1").setValue("Filter Id");
  configurationSheet.getRange("B1").setValue(filterId);

  addMenu();

  refreshDataFromJira();
}

// Refresh issues from JIRA
function refreshDataFromJira() {
  var filterId = configurationSheet.getRange("B1").getValue();
  var httpResponse = UrlFetchApp.fetch(filterUrl + filterId + "&expand=changelog&maxResults=100", fetchArgs);

  if (httpResponse) {
    switch(httpResponse.getResponseCode()){
      case 200:
        try {
          var data = JSON.parse(httpResponse.getContentText());

          if(data && data.issues) {
            var itemsRange = itemsSheet.getRange(2, 1, data.issues.length, 4);

            for (i = 0; i < data.issues.length; i++) {
              var item = data.issues[i];

              itemsRange.getCell(i + 1, 1).setValue("=HYPERLINK(\"" + jiraBaseUrl + "browse/" + item.key + "\",\"" + item.key + "\")");
              itemsRange.getCell(i + 1, 2).setValue(new Date(item.fields.created));
              itemsRange.getCell(i + 1, 3).setValue(item.fields.status.name);
              itemsRange.getCell(i + 1, 4).setValue(new Date(item.fields.updated));
            }
          }
        }
        catch (e) {
          SpreadsheetApp.getUi().alert("An error occurred while getting, parsing or filling the data :(");
        }

        break;
    }
  }
}
