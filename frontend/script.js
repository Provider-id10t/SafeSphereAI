// ================================
// SafeSphere AI - script.js
// ================================

// -------------------------------
// Weather
// -------------------------------

fetch("http://127.0.0.1:8000/weather")
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

function detectScam() {

    const input = document.getElementById("scamInput");
    const result = document.getElementById("scamResult");

    if (!input.value.trim()) {
        result.innerHTML = "⚠ Please enter a message.";
        return;
    }

    const message = input.value.toLowerCase();

    const keywords = [
        "win",
        "winner",
        "lottery",
        "prize",
        "urgent",
        "click",
        "verify",
        "bank",
        "otp",
        "password",
        "gift",
        "free",
        "account",
        "payment",
        "claim",
        "congratulations",
        "offer",
        "reward",
        "link"
    ];

    let score = 0;

    keywords.forEach(word => {
        if (message.includes(word)) {
            score++;
        }
    });

    if (score >= 5) {

        result.innerHTML = `
            <h3>🔴 Scam Probability: HIGH</h3>
            <p>This message looks suspicious.</p>
            <ul>
                <li>Do not click unknown links.</li>
                <li>Never share your OTP or password.</li>
            </ul>
        `;

    }
    else if (score >= 2) {

        result.innerHTML = `
            <h3>🟡 Scam Probability: MEDIUM</h3>
            <p>Some suspicious keywords were detected.</p>
        `;

    }
    else {

        result.innerHTML = `
            <h3>🟢 Scam Probability: LOW</h3>
            <p>No major scam indicators were found.</p>
        `;

    }
}
// ================================
// SOS Button
// ================================

function showSOS() {

    const message =
`🚨 EMERGENCY CONTACTS

🚓 Police: 112
🚑 Ambulance: 108
🔥 Fire: 101
👩 Women Helpline: 1091
🧒 Child Helpline: 1098

Stay calm and call the appropriate emergency service immediately.`;

    alert(message);

}