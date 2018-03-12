// Configure main parameters

function initiateVariables() {
  // JIRA main url
  jiraBaseUrl = "https://YOUR_OWN_JIRA_URL.com";

  // Url for JIRA's REST API for issues
  filterUrl = jiraBaseUrl + "/rest/api/2/search?expand=changelog&jql=filter=";

  // The filter you created in JIRA, find the id in the url
  filterId = "YOUR_OWN_FILTER_ID";

  // To be sent while authenticating
  fetchArgs = {
    contentType: "application/json",
    // Basic access authentication, to be generated on your own (for example thanks to https://www.blitter.se/utils/basic-authentication-header-generator/)
    headers: {"Authorization":"Basic YOUR_OWN_BASIC_AUTHENTICATION"},
    muteHttpExceptions : true
  };
}
