document.addEventListener("DOMContentLoaded", function () {
    loadVisitorList();

    // 방문자 목록 초기화 버튼 클릭 이벤트
    document.getElementById("resetButton").addEventListener("click", function () {
        if (confirm("정말로 방문자 목록을 초기화하시겠습니까?")) {
            resetVisitorList();
        }
    });
});

// 방문자 목록 초기화 함수
function resetVisitorList() {
    localStorage.removeItem("visitors");
    alert("방문자 목록이 초기화되었습니다.");
    loadVisitorList();
}

// 방문자 목록 로드 함수
function loadVisitorList() {
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    let table = document.getElementById("visitorTable").getElementsByTagName("tbody")[0];
    table.innerHTML = "";

    visitors.forEach(visitor => {
        let newRow = table.insertRow();
        newRow.insertCell(0).textContent = visitor.name;
        newRow.insertCell(1).textContent = visitor.studentId;
        newRow.insertCell(2).textContent = visitor.entryTime;
        newRow.insertCell(3).textContent = visitor.exitTime || "";
    });
}
