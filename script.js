let currentMonument = "";
let currentUser = localStorage.getItem("currentUser");
let collectedMonuments = [];

const monuments = {
    "증심사": {
        period: "통일신라",
        location: "광주 동구",
        rarity:"⭐⭐⭐⭐⭐ ",
        description: "무등산 서쪽 기슭에 자리한 광주의 대표적인 불교 사찰이다. 통일신라시대 철감국사 도윤이 창건한 것으로 알려져 있으며, 증심사에는 철조비로자나불좌상 등 여러 문화유산이 남아 있다.",
        image: "https://dh.aks.ac.kr/~metaArchive/gwangju/2023/증심사_취백루/증심사_취백루.jpg"
    },

    "충효동 왕버들군": {
        period: "경관",
        location:"광주 북구 충효동",
        rarity:"⭐⭐⭐⭐",
        description: "광주호 동쪽 호안과 충효동 마을 사이에 자리한 왕버들나무들이다. 광주 지역의 역사와 전통적인 마을 경관을 보여주는 문화유산이다." ,
        image: "http://dh.aks.ac.kr/~gwangju/wiki/images/3/3b/왕버들나무1.jpg"  
    },

    "충장사": {
        period: "조선",
        location: "광주 북구",
        rarity: "⭐⭐⭐⭐",
        description: "임진왜란과 관련된 의병장 충장공 김덕령 장군을 기리기 위해 세워진 사우이다.",
        image: "https://dh.aks.ac.kr/~gwangju/wiki/images/0/0c/광주_충장사-입구-대동문화재단_보유사진.jpg"
    },

    "무양서원": {
        period: "일제강점기",
        location: "광주 광산구 월계동",
        rarity:"⭐⭐⭐⭐",
        description:"광주광역시 광산구에 자리한 서원이다. 1927년 탐진 최씨 문중에서 세웠으며, 최사전·최윤덕·최부·유희춘·나덕헌 등 다섯 선현을 배향하고 있다. 광주의 옛 이름인 '무진'과 볕을 뜻하는 '양'에서 이름이 유래했다.",
        image: "http://digerati.aks.ac.kr/DhLab/2022/gwangju/image/icon/photo/icon-무양서원_전경.jpg",
    },

    "양림역사문화마을": {
        period: "근대",
        location: "광주 남구 양림동",
        rarity: "⭐⭐⭐⭐⭐",
        description: "광주 남구 양림동에 자리한 역사문화마을이다. 근대 서양식 건축물과 전통 한옥, 선교 관련 문화유산이 함께 남아 있어 광주의 근대 역사와 문화가 형성되는 과정을 살펴볼 수 있다.",
        image: "http://dh.aks.ac.kr/~gwangju/wiki/images/5/57/양림역사문화마을_입구.jpg",
    }

};

function discoverMonument(name) {
    currentMonument = name;
    const monument = monuments[name];
    document.getElementById("discovery").style.display = "block";
    document.getElementById("monumentName").textContent = name;
    document.getElementById("monumentPeriod").textContent = "시대: " + monument.period;
    document.getElementById("monumentLocation").textContent = "위치: " + monument.location;
    document.getElementById("monumentRarity").textContent = "희귀도: " + monument.rarity;
    document.getElementById("monumentDescription").textContent = monument.description;
}

function collectMonument() {
        if(!currentUser) {
            alert("먼저 로그인해주세요.");
            return;
        }
    
    if(collectedMonuments.includes(currentMonument)) {
    alert("이미 수집한 거다....");
    document.getElementById("discovery").style.display = "none";
    return;
    }

    collectedMonuments.push(currentMonument);
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[currentUser].collection = collectedMonuments;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    updateCollection();

    document.getElementById("discovery").style.display = "none";

    currentMonument = "";
}

function showDetail(name) {
    const monument = monuments[name];
    document.getElementById("detail").style.display = "block";
    document.getElementById("detailName").textContent = name;
    document.getElementById("detailPeriod").textContent = " 시대: " + monument.period;
    document.getElementById("detailLocation").textContent = " 위치: " + monument.location;
    document.getElementById("detailRarity").textContent = " 희귀도: " + monument.rarity;
    document.getElementById("detailDescription").textContent = monument.description;
}

function closeDetail() {
    document.getElementById("detail").style.display = "none";
}

function updateCollection() {
    const collectionCount = document.getElementById("collectionCount");
    collectionCount.textContent = "수집 : " + collectedMonuments.length + " / " + Object.keys(monuments).length;

    const collectionMessage = document.getElementById("collectionMessage");

    if (collectedMonuments.length === 0) {
        collectionMessage.textContent = "아직 문화재 남아있다잉!!! 🌱";
    } else if (collectedMonuments.length === 1) {
        collectionMessage.textContent = " 고작 모은게 한 개? 에휴 🔎";
    } else if (collectedMonuments.length === 2) {
        collectionMessage.textContent = " 이제야 2개? 빨랑빨랑 움직여서 모아! 🔥";
    } else if (collectedMonuments.length === 3) {
        collectionMessage.textContent = "이제야 절반 넘었다. 🌿";
    } else if (collectedMonuments.length === 4) {
        collectionMessage.textContent = " 앞으로 1개 남았다....ㄷㄷ 🏘️";
    } else if (collectedMonuments. length === 5) {
        collectionMessage.textContent = "전부 모으다니... 넌 역사 천재라 불릴 만 하군! 👑";
    }

    const collectionList = document.getElementById("collectionList");
    collectionList.innerHTML = "";

    for ( const name in monuments) {
        const monument = monuments[name];
        if ( collectedMonuments.includes(name)) {
            collectionList.innerHTML += `
                 <div class="card" onclick="showDetail('${name}')">
                     <div class="card-image">
                         <img src="${monument.image}">
                     </div>
                 </div>
            `;
        } else {
            collectionList.innerHTML += `
                 <div class="card unknown-card">
                     <div class="unknown">
                        ???
                     </div>
                 </div>

            `;
        }
    }

}
updateCollection();

function resetCollection() {
    if(!currentUser) {
        return;
    }

    collectedMonuments = [];

    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[currentUser].collection = [];

    localStorage.setItem(
        "users",
        JSON.stringify(users)    
    );

    updateCollection();
}

function showSignup() {
    const id = document.getElementById("loginId").value;
    const password = document.getElementById("loginPassword").value;
    if (!id || !password) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[id]) {
        alert("이미 존재하는 아이디입니다.");
        return;
    }
    users[id] = {
        password: password,
        collection: []
    };

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("loginMessage").textContent = " 회원가입 완료! 이제 로그인해주세요";
    document.getElementById("loginPassword").value = "";
}

function login() {
    const id = document.getElementById("loginId").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if(!users[id]) {
        document.getElementById("loginMessage").textContent ="존재하지 않는 아이디입니다.";
        return;
    }

    if (users[id].password !== password) {
        document.getElementById("loginMessage").textContent = "비밀번호가 틀렸습니다.";
        return;
    }

    currentUser = id;
    localStorage.setItem("currentUser", currentUser);

    document.getElementById( "loginScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    collectedMonuments = users[id].collection || [];

    updateCollection();
}

function logout() {
    localStorage.removeItem("currentUser");

    currentUser = null;
    collectedMonuments = [];

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
}

if (currentUser) {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[currentUser]) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        collectedMonuments = users[currentUser].collection || [];

        updateCollection();
    } else {
        localStorage.removeItem("currentUser");
        currentUser = null;
        collectedMonuments = [];
    }
}

const mapArea = document.getElementById("mapArea");
const mapContent = document.getElementById("mapContent");

let isDragging = false;

let startX = 0;
let startY = 0;

let mapX = -350;
let mapY = -250;

mapArea.addEventListener("pointerdown", function(event) {
     isDragging = true;

     startX = event.clientX - mapX;
     startY = event.clientY - mapY;
});

mapArea.addEventListener("pointermove", function(event) {
    if (!isDragging) {
        return;
    }

    mapX = event.clientX - startX;
    mapY = event.clientY - startY;

    mapContent.style.left = mapX + "px";
    mapContent.style.top = mapY + "px";
});

mapArea.addEventListener("pointerup", function() {
    isDragging = false;
});

mapArea.addEventListener("pointercancel", function() {
    isDragging = false;
});

function toggleCollection() {
    const collectionBook = document.getElementById("collectionBook");

    if (collectionBook.style.display === "block" || collectionBook.style.display === "") {
        collectionBook.style.display = "none";
    } else {
        collectionBook.style.display = "block";
    }
}