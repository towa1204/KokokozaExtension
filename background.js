// Wrap in an onInstalled callback in order to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
    // Page actions are disabled by default and enabled on select tabs
    chrome.action.disable();
  
    // Clear all rules to ensure only our expected rules are set
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      // Declare a rule to enable the action on https://www.nhk.or.jp/kokokoza/* pages
      let kokokozaRule = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlMatches: 'https://www.nhk.or.jp/kokokoza/*'},
          })
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      };
  
      // Finally, apply our new array of rules
      let rules = [kokokozaRule];
      chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});