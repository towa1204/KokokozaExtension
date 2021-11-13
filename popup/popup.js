$(function() {
    loadStorageData(["isFixTab", "isKeepFullScreen"]);
    addClickEventListeners(["isFixTab", "isKeepFullScreen"]);
});

function addClickEventListeners(keys) {
    keys.forEach(key => {
        // チェックボックス部分がクリックされたとき
        $('#' + key).click(function() {
            // チェックボックスの状態をストレージに保存
            chrome.storage.local.set({[key] : $('#' + key).prop('checked')}, function(){});

            // 開いているウィンドウのアクティブなタブのページにメッセージを送信 値の変更を通知
            chrome.tabs.query({active : true, currentWindow : true}, function(tabs) {
                // {key : チェックボックスのid}でどのチェックボックスが変更されたかを渡す
                chrome.tabs.sendMessage(tabs[0].id, { key: key }, function(){});
            });
        });
    });
}

// ストレージに格納されているチェックボックスの値を取得し反映する関数
function loadStorageData(keys) {
    chrome.storage.local.get(keys, function(data) {
        keys.forEach(key => {
            $('#' + key).prop("checked", data[key]);
        });
    });
}