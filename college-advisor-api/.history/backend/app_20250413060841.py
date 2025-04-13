from fastapi import FastAPI, Request
from pydantic import BaseModel
from backend.model_utils import evaluate_college

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

class CollegeRequest(BaseModel):
    colleges: list
    major: str
    income_tier: int
    is_user_in_state: bool
    parent_loans: bool
    weight_qol: float
    weight_roi: float

@app.post("/recommend")
async def recommend_college(request: CollegeRequest):
    result = evaluate_college(
        college_list=request.colleges,
        major=request.major,
        income_tier=request.income_tier,
        is_user_in_state=request.is_user_in_state,
        parent_loans=request.parent_loans,
        weight_qol=request.weight_qol,
        weight_roi=request.weight_roi
    )
    return result


@app.get("/")
def home():
    return {"message": "College Advisor API is running!"}
