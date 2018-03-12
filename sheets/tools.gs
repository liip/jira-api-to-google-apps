// Useful functions

// Create a sheet
function createSheet(sheetName) {
  var newSheet = activeSpreadsheet.getSheetByName(sheetName);

  if (newSheet != null) {
    activeSpreadsheet.deleteSheet(newSheet);
  }

  newSheet = activeSpreadsheet.insertSheet();
  newSheet.setName(sheetName);

  return newSheet;
}

// Add a menu option to refresh without opening the code
function addMenu() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Refresh",
    functionName : "onOpen"
  },
  {
    name : "Clean Items Sheet",
    functionName : "cleanItemsSheet"
  }];

  sheet.addMenu("SYNC", entries);
};

// Clean the items sheet
function cleanItemsSheet() {
  cleanSheet("Items");

  itemsSheet.getRange("A1").setValue("Key");
  itemsSheet.getRange("B1").setValue("Created");
  itemsSheet.getRange("C1").setValue("Status");
  itemsSheet.getRange("D1").setValue("Last Update");
};

// Clean a sheet
function cleanSheet(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.getRange('A1:Z1000').clearContent();
};
