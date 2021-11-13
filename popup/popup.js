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
        })
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