document.addEventListener("DOMContentLoaded", function() {
    const communityView = document.getElementById("communityBuyerView");
    const bulkView = document.getElementById("bulkBuyerView");

    const btnComm1 = document.getElementById("btnCommunity_inCommunity");
    const btnBulk1 = document.getElementById("btnBulk_inCommunity");
    const btnComm2 = document.getElementById("btnCommunity_inBulk");
    const btnBulk2 = document.getElementById("btnBulk_inBulk");

    function showCommunity() {
        if (communityView) communityView.style.display = "block";
        if (bulkView) bulkView.style.display = "none";
    }

    function showBulk() {
        if (communityView) communityView.style.display = "none";
        if (bulkView) bulkView.style.display = "block";
    }

    if (btnComm1) btnComm1.addEventListener("click", showCommunity);
    if (btnComm2) btnComm2.addEventListener("click", showCommunity);
    if (btnBulk1) btnBulk1.addEventListener("click", showBulk);
    if (btnBulk2) btnBulk2.addEventListener("click", showBulk);
});
