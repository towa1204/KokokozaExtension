console.log("helloworld");
applyActiveFunc(["isFixTab", "isKeepFullScreen"]);

// popupで設定が変更されたときの処理
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    applyActiveFunc([request.key]);
    sendResponse();
});

// ストレージから値を取り出してチェックボックスがチェックされているとき，その機能を適用
function applyActiveFunc(keys) {
    chrome.storage.local.get(keys, function(data) {
        keys.forEach(key => {
            if (key === "isFixTab" && data[key]) {
                // タブ固定の機能が設定有効なときの処理
                applyFixTab();
            } else if (key === "isKeepFullScreen" && data[key]) {
                // フルスクリーン固定の機能が設定有効なときの処理
            }
        });
    });
}

// タブ固定処理の関数
function applyFixTab() {
    console.log("タブ固定したよ!");
}