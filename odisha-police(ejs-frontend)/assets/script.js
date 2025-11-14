let allDrives = [];
let allMonthly = [];

async function loadDemoData() {
    try {
        let demoDrives = await fetch("data/drives.json").then(res => res.json());
        let demoSummary = await fetch("data/summary.json").then(res => res.json());

        let localDrives = JSON.parse(localStorage.getItem("drives")) || [];
        let localSummary = JSON.parse(localStorage.getItem("monthlySummary")) || [];

        allDrives = [...demoDrives, ...localDrives];
        allMonthly = [...demoSummary, ...localSummary];

        loadDashboardTables();
        loadChart();

    } catch {
        allDrives = JSON.parse(localStorage.getItem("drives")) || [];
        allMonthly = JSON.parse(localStorage.getItem("monthlySummary")) || [];

        loadDashboardTables();
        loadChart();
    }
}

loadDemoData();



/* ======================================================
   SAVE FORM 1 (DYNAMIC DRIVE SECTIONS)
====================================================== */

const form1 = document.getElementById("form1");

if (form1) {
    form1.addEventListener("submit", e => {
        e.preventDefault();

        const district = document.getElementById("district").value;
        const driveType = document.getElementById("driveType").value;

        let entry = { district, driveType, date: new Date().toISOString().slice(0,10) };

        // ---- Collect fields based on selected drive section ----
        const activeSection = document.getElementById(`section-${driveType}`);
        const inputs = activeSection.querySelectorAll("input");

        inputs.forEach(input => {
            entry[input.id] = input.value;
        });

        // store
        let existing = JSON.parse(localStorage.getItem("drives")) || [];
        existing.push(entry);
        localStorage.setItem("drives", JSON.stringify(existing));

        alert("Drive Report Submitted Successfully!");

        form1.reset();

        document.querySelectorAll(".drive-section").forEach(sec => sec.style.display = "none");
    });
}



/* ======================================================
   SAVE FORM 2 DATA
====================================================== */

const form2 = document.getElementById("form2");

if (form2) {
    form2.addEventListener("submit", function (e) {
        e.preventDefault();

        let entry = {
            district: document.getElementById("district2").value,
            month: document.getElementById("month").value,
            ipc: document.getElementById("ipc_convictions").value,
            sll: document.getElementById("sll_convictions").value,
            nonmv: document.getElementById("nonmv_convictions").value,
            dd: document.getElementById("dd_convictions").value,
            remarks: document.getElementById("remarks").value
        };

        let existing = JSON.parse(localStorage.getItem("monthlySummary")) || [];
        existing.push(entry);
        localStorage.setItem("monthlySummary", JSON.stringify(existing));

        alert("Form 2 submitted successfully!");
        form2.reset();
    });
}



/* ======================================================
   LOAD BOTH TABLES IN DASHBOARD
====================================================== */

function loadDashboardTables() {
    loadDriveTable();
    loadSummaryTable();
}

function loadDriveTable() {
    let tbody = document.querySelector("#dataTable tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    allDrives.forEach(d => {

        // Build dynamic details for each field
        let details = "";
        Object.keys(d).forEach(key => {
            if (key !== "district" && key !== "driveType" && key !== "date") {
                details += `<b>${key.replace(/_/g, " ").toUpperCase()}:</b> ${d[key]} <br>`;
            }
        });

        tbody.innerHTML += `
            <tr>
                <td>${d.district}</td>
                <td>${d.driveType.replace(/_/g, " ").toUpperCase()}</td>
                <td>${d.date}</td>
                <td>${details}</td>
            </tr>
        `;
    });
}



function loadSummaryTable() {
    let tbody = document.querySelector("#summaryTable tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    allMonthly.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.district}</td>
                <td>${s.month}</td>
                <td>${s.ipc}</td>
                <td>${s.sll}</td>
                <td>${s.nonmv}</td>
                <td>${s.dd}</td>
            </tr>
        `;
    });
}



/* ======================================================
   FILTER BOTH TABLES
====================================================== */

function applyFilter() {
    let district = document.getElementById("filterDistrict").value;
    let month = document.getElementById("filterMonth").value;

    let driveTbody = document.querySelector("#dataTable tbody");
    let summaryTbody = document.querySelector("#summaryTable tbody");

    driveTbody.innerHTML = "";
    summaryTbody.innerHTML = "";

    // Filter drives
    let filteredDrives = allDrives.filter(d => {
        let m1 = district ? d.district === district : true;
        let m2 = month ? d.date.startsWith(month) : true;
        return m1 && m2;
    });

    filteredDrives.forEach(d => {
        driveTbody.innerHTML += `
            <tr>
                <td>${d.district}</td>
                <td>${d.driveType}</td>
                <td>${Object.values(d).join(", ")}</td>
                <td>${d.date}</td>
            </tr>
        `;
    });

    // Filter Form-2 Monthly Summary
    let filteredSummary = allMonthly.filter(s => {
        let m1 = district ? s.district === district : true;
        let m2 = month ? s.month === month : true;
        return m1 && m2;
    });

    filteredSummary.forEach(s => {
        summaryTbody.innerHTML += `
            <tr>
                <td>${s.district}</td>
                <td>${s.month}</td>
                <td>${s.ipc}</td>
                <td>${s.sll}</td>
                <td>${s.nonmv}</td>
                <td>${s.dd}</td>
            </tr>
        `;
    });

    loadChart(filteredDrives);
}



/* ======================================================
   CHART – BASED ON DRIVES ONLY
====================================================== */

function loadChart(data) {
    let drives = data || allDrives;
    let ctx = document.getElementById("barChart");
    if (!ctx) return;

    let labels = drives.map(d => d.driveType);
    let counts = drives.map(d => Object.keys(d).length); // simple measure

    if (window.barChartInstance) window.barChartInstance.destroy();

    window.barChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Drive Entries",
                data: counts
            }]
        }
    });
}
