
document.getElementById("form1").addEventListener("submit", async function(e) {
    e.preventDefault();

    const driveType = document.getElementById("driveType").value;
    const district = document.getElementById("district").value;

    // Collect all visible inputs automatically
    const section = document.getElementById("section-" + driveType);
    const inputs = section.querySelectorAll("input");

    let data = {};
    inputs.forEach(input => {
        data[input.id] = input.value ? Number(input.value) : 0;
    });

    const body = {
        district,
        driveType,
        data
    };

    const res = await fetch("http://localhost:8000/api/drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const out = await res.json();
    console.log(out);
    alert(out.message);
});




