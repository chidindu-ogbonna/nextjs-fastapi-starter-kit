from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from backend.api.deps import get_user_via_api_key
from backend.models import Message
from backend.utils import generate_test_email, send_email

router = APIRouter()


@router.post(
    "/test-email/",
    dependencies=[Depends(get_user_via_api_key)],
    status_code=201,
)
def test_email(email_to: EmailStr) -> Message:
    """
    Test emails.
    """
    email_data = generate_test_email(email_to=email_to)
    send_email(
        email_to=email_to,
        subject=email_data.subject,
        html_content=email_data.html_content,
    )
    return Message(message="Test email sent")


@router.get("/health-check/")
async def health_check() -> bool:
    return True
