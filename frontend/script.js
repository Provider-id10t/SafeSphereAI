// ================================
// SafeSphere AI - script.js
// ================================
const API = "https://safesphereai.onrender.com";
// -------------------------------
// Weather
// -------------------------------

fetch(`${API}/weather`)
    .then(response => response.json())
    .then(data => {

        document.getElementById("weather").innerHTML = `
            <b>📍 City:</b> ${data.city}<br>
            <b>🌡 Temperature:</b> ${data.temperature}<br>
            <b>☁ Condition:</b> ${data.condition}
        `;

    })
    .catch(() => {

        document.getElementById("weather").innerHTML =
            "Unable to load weather.";

    });


// -------------------------------
// First Aid Assistant
// -------------------------------

function showFirstAid(type) {

    let title = "";
    let icon = "";
    let body = "";

    switch (type) {

        case "burn":

            title = "Burns";
            icon = "🔥";

            body = `
            <h3>Immediate Steps</h3>
            <ul>
                <li>✅ Cool the burn under running water for 20 minutes.</li>
                <li>✅ Remove rings or tight clothing.</li>
                <li>❌ Do NOT apply toothpaste, butter or ice.</li>
                <li>❌ Do NOT burst blisters.</li>
                <li>🚨 Visit a hospital if the burn is severe.</li>
            </ul>
            `;

            break;

        case "bleeding":

            title = "Bleeding";
            icon = "🩸";

            body = `
            <h3>Immediate Steps</h3>
            <ul>
                <li>✅ Apply firm pressure using a clean cloth.</li>
                <li>✅ Raise the injured limb if possible.</li>
                <li>❌ Don't remove the cloth if soaked.</li>
                <li>🚨 Seek medical help for heavy bleeding.</li>
            </ul>
            `;

            break;

        case "snake":

            title = "Snake Bite";
            icon = "🐍";

            body = `
            <h3>Immediate Steps</h3>
            <ul>
                <li>✅ Keep the victim calm.</li>
                <li>✅ Keep the bitten limb still.</li>
                <li>❌ Do NOT cut the wound.</li>
                <li>❌ Do NOT suck the venom.</li>
                <li>🚨 Go to the nearest hospital immediately.</li>
            </ul>
            `;

            break;

        case "fracture":

            title = "Fracture";
            icon = "🦴";

            body = `
            <h3>Immediate Steps</h3>
            <ul>
                <li>✅ Immobilize the injured limb.</li>
                <li>✅ Apply a splint if trained.</li>
                <li>❌ Don't try to straighten the bone.</li>
                <li>🚨 Visit a hospital immediately.</li>
            </ul>
            `;

            break;

        case "cpr":

            title = "CPR";
            icon = "❤️";

            body = `
            <h3>Emergency CPR</h3>
            <ul>
                <li>✅ Call emergency services immediately.</li>
                <li>✅ Push hard and fast in the center of the chest.</li>
                <li>✅ Continue until medical help arrives.</li>
            </ul>
            `;

            break;
    }

    // If you're using a modal
    const modal = document.getElementById("firstAidModal");

    if (modal) {
        document.getElementById("modalTitle").innerHTML = title;
        document.getElementById("modalIcon").innerHTML = icon;
        document.getElementById("modalBody").innerHTML = body;

        modal.style.display = "flex";
    }
    // Otherwise show inside the page
    else {
        document.getElementById("firstAidResult").innerHTML = `
            <h3>${icon} ${title}</h3>
            ${body}
        `;
    }

}


// -------------------------------
// Close Modal
// -------------------------------

function closeModal() {

    const modal = document.getElementById("firstAidModal");

    if (modal) {
        modal.style.display = "none";
    }

}

window.onclick = function (event) {

    const modal = document.getElementById("firstAidModal");

    if (modal && event.target === modal) {
        modal.style.display = "none";
    }

};


// -------------------------------
// AI Scam Detector
// -------------------------------

const API = "https://safesphereai.onrender.com";

async function detectScam() {

    const input = document.getElementById("scamInput");
    const result = document.getElementById("scamResult");

    if (!input.value.trim()) {
        result.innerHTML = "⚠ Please enter a message.";
        return;
    }

    result.innerHTML = "🔍 Analyzing message...";

    try {

        const response = await fetch(`${API}/detect-scam`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: input.value
            })

        });

        const data = await response.json();

        let color = "green";

        if (data.level === "HIGH")
            color = "red";
        else if (data.level === "MEDIUM")
            color = "orange";

        result.innerHTML = `
            <h3 style="color:${color};">
                Scam Probability: ${data.level}
            </h3>

            <p>${data.advice}</p>
        `;

    }

    catch (error) {

        result.innerHTML = `
            ❌ Unable to connect to the SafeSphere AI server.
        `;

        console.error(error);

    }

}
