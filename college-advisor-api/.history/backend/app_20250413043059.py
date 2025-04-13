from fastapi import FastAPI, Request
from pydantic import BaseModel
from model_utils import evaluate_college

app = FastAPI()

class CollegeRequest(BaseModel):
    colleges: list
    major: str
    income_tier: int
    is_user_in_state: bool
    parent_loans: bool
    weight_qol: float
    weight_roi: float

@app.post("/recommend_college")
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

app = FastAPI()

@app.get("/")
def home():
    return {"message": "College Advisor API is running!"}
