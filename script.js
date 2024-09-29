document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("showEntryForm").addEventListener("click", function () {
        document.getElementById("entryForm").classList.toggle("hidden");
        document.getElementById("exitForm").classList.add("hidden");
    });

    document.getElementById("showExitForm").addEventListener("click", function () {
        document.getElementById("exitForm").classList.toggle("hidden");
        document.getElementById("entryForm").classList.add("hidden");
    });

    // 입장 처리
    document.getElementById("entryDataForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("entryName").value;
        let studentId = document.getElementById("entryStudentId").value;
        let currentTime = new Date().toLocaleString();

        let newVisitor = {
            name: name,
            studentId: studentId,
            entryTime: currentTime,
            exitTime: null
        };

        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
        visitors.push(newVisitor);
        localStorage.setItem("visitors", JSON.stringify(visitors));

        document.getElementById("entryDataForm").reset();
        alert("입장 완료!");
    });

    // 퇴장 처리
    document.getElementById("checkExit").addEventListener("click", function () {
        let exitName = document.getElementById("exitName").value;
        let exitStudentId = document.getElementById("exitStudentId").value;
        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

        let visitorIndex = visitors.findIndex(visitor => visitor.name === exitName && visitor.studentId === exitStudentId && visitor.exitTime === null);

        if (visitorIndex !== -1) {
            document.getElementById("exitButton").classList.remove("hidden");
            document.getElementById("message").classList.add("hidden");
            document.getElementById("exitButton").onclick = function () {
                markExit(visitorIndex);
            };
        } else {
            document.getElementById("message").textContent = "일치하는 방문자 정보가 없습니다.";
            document.getElementById("message").classList.remove("hidden");
        }
    });

    function markExit(index) {
        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
        visitors[index].exitTime = new Date().toLocaleString();
        localStorage.setItem("visitors", JSON.stringify(visitors));

        alert("퇴장 완료!");
        document.getElementById("exitDataForm").reset();
        document.getElementById("exitButton").classList.add("hidden");
    }
});
