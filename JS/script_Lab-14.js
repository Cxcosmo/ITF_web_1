const welcome = document.getElementById("welcome");
const welcome_list = [
"Nice to meet you!",
"Welcome!",
"Have a nice day!"
]

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

let welcomeIndex = 0;

async function start() {
    while (true) {
        welcome.innerText = welcome_list[welcomeIndex];
        welcomeIndex++;
        if (welcomeIndex >= welcome_list.length) {
            welcomeIndex = 0;
        }
        await sleep(8000);
    }
}

start();

const username = document.getElementById("username");
const profile = document.getElementById("profile");

const usernameForm = document.getElementById("usernameForm");
const profileForm = document.getElementById("profileForm");

usernameForm.onsubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    username.innerText = form.get("username");
};
profileForm.onsubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    profile.src = form.get("imageUrl");
};

const phoneTableBody = document.getElementById("phoneTableBody");
const phoneNumberForm = document.getElementById("phoneNumberForm");
const convertButton = document.getElementById("convertButton");

const PHONES = [
    {
        name: "Meaw",
        phone: "0900796515",
    },
];

function updatePhoneData() {
    phoneTableBody.innerHTML = PHONES.map((p, idx) => 
    `<tr>
        <td>
            ${idx + 1}
        </td>
        <td class="middle">
            ${p.name}
        </td>
        <td>
            ${p.phone}
        </td>
    </tr>`
    ).join("");
}

phoneNumberForm.onsubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    PHONES.push({
        name: form.get("name"),
        phone: form.get("phone"),
    });
    updatePhoneData();
};

updatePhoneData();

function convertJSONtoCSV(jsonData) {
    const headers = Object.keys(jsonData[0]);

    let csvContent = headers.join(",") + "\n";

    jsonData.forEach((row) => {
        let values = headers.map((header) => {
            let cellValue =
                row[header] === null || row[header] === undefined
                    ? ""
                    : row[header];
            cellValue = cellValue.toString().replace(/"/g, '""');
            return `"${cellValue}"`;
        });
        csvContent += values.join(",") + "\n";
    });

    return csvContent;
}

convertButton.onclick = (e) => {
    e.preventDefault();

    const csvContent = convertJSONtoCSV(PHONES);
    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    window.open(url);
};