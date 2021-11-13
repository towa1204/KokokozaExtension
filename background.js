// 拡張機能がインストールされたとき
chrome.runtime.onInstalled.addListener(() => {
    enablePageAction();
    initStorage(["isFixTab", "isKeepFullScreen"])
});

// NHK高校講座のページのみactionを可能にする
function enablePageAction() {
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
}

// popupのチェックボックスの変数と値の初期化
function initStorage(keys) {
    keys.forEach(key => {
        // チェックボックスがチェックされていない状態で初期化
        chrome.storage.local.set({[key] : false}, function(){});
    })
}