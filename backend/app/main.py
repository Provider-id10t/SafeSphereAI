from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="SafeSphere AI",
    description="AI-powered Emergency Assistance Platform",
    version="1.0"
)

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "https://provider-id10t.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "SafeSphere AI",
        "version": "1.0",
        "status": "Running"
    }


@app.get("/weather")
def weather():
    return {
        "city": "Delhi",
        "temperature": "34°C",
        "condition": "Sunny"
    }


@app.get("/emergency")
def emergency():
    return {
        "Police": "112",
        "Ambulance": "108",
        "Fire": "101",
        "Women Helpline": "1091",
        "Child Helpline": "1098"
    }


class ScamMessage(BaseModel):
    message: str


@app.post("/detect-scam")
def detect_scam(data: ScamMessage):

    message = data.message.lower()

    keywords = [
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
    ]

    score = sum(1 for word in keywords if word in message)

    if score >= 5:
        return {
            "level": "HIGH",
            "advice": "⚠ High Risk Scam. Do NOT click links or share OTP, passwords or banking details."
        }

    elif score >= 2:
        return {
            "level": "MEDIUM",
            "advice": "⚠ Suspicious message detected. Verify the sender before replying."
        }

    return {
        "level": "LOW",
        "advice": "✅ No obvious scam indicators found. Stay cautious online."
    }