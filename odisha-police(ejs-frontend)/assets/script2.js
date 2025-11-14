document.getElementById("form2").addEventListener("submit", async function (e) {
    e.preventDefault();

    const district = document.getElementById("district2").value;
    const month = document.getElementById("month").value;
    const remarks = document.getElementById("remarks").value;

    // Collect all inputs from the page
    const inputs = document.querySelectorAll("#form2 input, #form2 textarea");

    let data = {};

    inputs.forEach(input => {
        if (input.id !== "district2" && input.id !== "month" && input.id !== "remarks") {
            data[input.id] = input.value;
        }
    });

    const body = {
        district,
        month,
        data,
        remarks
    };

    const res = await fetch("http://localhost:8000/api/convictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const out = await res.json();
    alert(out.message);
    console.log(out);
});
