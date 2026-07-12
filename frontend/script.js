// ======================================
// SafeSphere AI - script.js
// ======================================

// ---------- Backend URL ----------
const API = "https://safesphereai.onrender.com";

// ======================================
// Load Data After Page Loads
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    loadWeather();
    loadEmergencyNumbers();
});

// ======================================
// Weather
// ======================================

async function loadWeather() {

    const weather = document.getElementById("weather");

    if (!weather) return;

    weather.innerHTML = "🌤 Loading weather...";

    try {

        const response = await fetch(`${API}/weather`);

        if (!response.ok) {
            throw new Error("Unable to fetch weather");
        }

        const data = await response.json();

        weather.innerHTML = `
            <b>📍 City:</b> ${data.city}<br>
            <b>🌡 Temperature:</b> ${data.temperature}<br>
            <b>☁ Condition:</b> ${data.condition}
        `;

    } catch (error) {

        console.error(error);

        weather.innerHTML = `
            ❌ Unable to load weather.
        `;

    }

}

// ======================================
// Emergency Numbers
// ======================================

async function loadEmergencyNumbers() {

    const emergency = document.getElementById("emergency");

    if (!emergency) return;

    emergency.innerHTML = "☎ Loading emergency numbers...";

    try {

        const response = await fetch(`${API}/emergency`);

        const data = await response.json();

        emergency.innerHTML = `
            🚓 <b>Police:</b> ${data.Police}<br><br>
            🚑 <b>Ambulance:</b> ${data.Ambulance}<br><br>
            🔥 <b>Fire:</b> ${data.Fire}<br><br>
            👩 <b>Women Helpline:</b> 1091<br><br>
            👶 <b>Child Helpline:</b> 1098
        `;

    } catch (error) {

        console.error(error);

        emergency.innerHTML = "Unable to load emergency numbers.";

    }

}

// ======================================
// First Aid Assistant
// ======================================

function showFirstAid(type) {

    let title = "";
    let icon = "";
    let body = "";

    switch (type) {

        case "burn":
            title = "Burns";
            icon = "🔥";
            body = `
            <ul>
                <li>✅ Cool under running water for 20 minutes.</li>
                <li>✅ Remove rings or tight clothing.</li>
                <li>❌ Do NOT apply toothpaste or butter.</li>
                <li>🚨 Seek medical help if severe.</li>
            </ul>`;
            break;

        case "bleeding":
            title = "Bleeding";
            icon = "🩸";
            body = `
            <ul>
                <li>✅ Apply firm pressure.</li>
                <li>✅ Elevate the injured limb.</li>
                <li>🚨 Call emergency services if bleeding doesn't stop.</li>
            </ul>`;
            break;

        case "snake":
            title = "Snake Bite";
            icon = "🐍";
            body = `
            <ul>
                <li>✅ Keep the victim calm.</li>
                <li>✅ Keep the bitten limb still.</li>
                <li>❌ Don't cut or suck the wound.</li>
                <li>🚨 Reach the nearest hospital immediately.</li>
            </ul>`;
            break;

        case "fracture":
            title = "Fracture";
            icon = "🦴";
            body = `
            <ul>
                <li>✅ Immobilize the injured limb.</li>
                <li>❌ Don't try to straighten the bone.</li>
                <li>🚨 Visit a hospital immediately.</li>
            </ul>`;
            break;

        case "cpr":
            title = "CPR";
            icon = "❤️";
            body = `
            <ul>
                <li>✅ Call emergency services.</li>
                <li>✅ Push hard and fast in the center of the chest.</li>
                <li>✅ Continue until help arrives.</li>
            </ul>`;
            break;
    }

    const modal = document.getElementById("firstAidModal");

    if (modal) {

        document.getElementById("modalTitle").innerHTML = title;
        document.getElementById("modalIcon").innerHTML = icon;
        document.getElementById("modalBody").innerHTML = body;

        modal.style.display = "flex";

    }

}

// ======================================
// Close Modal
// ======================================

function closeModal() {

    document.getElementById("firstAidModal").style.display = "none";

}

window.onclick = function (event) {

    const modal = document.getElementById("firstAidModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};

// ======================================
// AI Scam Detector
// ======================================

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

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        let color = "green";
        let emoji = "🟢";

        if (data.level === "HIGH") {

            color = "red";
            emoji = "🔴";

        } else if (data.level === "MEDIUM") {

            color = "orange";
            emoji = "🟠";

        }

        result.innerHTML = `
            <h3 style="color:${color}">
                ${emoji} Scam Probability: ${data.level}
            </h3>

            <p>${data.advice}</p>
        `;

    }

    catch (error) {

        console.error(error);

        result.innerHTML = `
            ❌ Unable to connect to SafeSphere AI server.
        `;

    }

}