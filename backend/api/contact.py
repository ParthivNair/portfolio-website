from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import Dict, Any
import logging
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class ContactFormData(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Name must be at least 2 characters")
    email: EmailStr = Field(..., description="Must be a valid email address")
    subject: str = Field(..., min_length=5, max_length=200, description="Subject must be at least 5 characters")
    message: str = Field(..., min_length=10, max_length=2000, description="Message must be at least 10 characters")

class ContactResponse(BaseModel):
    message: str
    status: str

async def send_email(contact_data: ContactFormData) -> bool:
    """
    Send email using SendGrid API.
    Falls back to console logging if SendGrid is not configured.
    """
    try:
        # Get SendGrid API key from environment
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        recipient_email = os.environ.get('RECIPIENT_EMAIL', 'parthivnair1@gmail.com')
        sender_email = os.environ.get('SENDER_EMAIL', 'noreply@parthivnair.com')
        
        if not sendgrid_api_key:
            # Fallback to console logging if SendGrid not configured
            logger.warning("SendGrid API key not found. Logging to console instead.")
            print("\n" + "="*50)
            print("📧 NEW CONTACT FORM SUBMISSION")
            print("="*50)
            print(f"Name: {contact_data.name}")
            print(f"Email: {contact_data.email}")
            print(f"Subject: {contact_data.subject}")
            print(f"Message: {contact_data.message}")
            print("="*50 + "\n")
            logger.info(f"Contact form submission from {contact_data.name} ({contact_data.email})")
            return True
        
        # Create SendGrid client
        sg = SendGridAPIClient(api_key=sendgrid_api_key)
        
        # Create email content
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">📧 New Contact Form Submission</h1>
                <p style="margin: 10px 0 0; opacity: 0.9;">From your portfolio website</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-left: 4px solid #667eea; border-right: 4px solid #667eea;">
                <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Details</h2>
                    <p style="margin: 15px 0;"><strong style="color: #667eea;">Name:</strong> {contact_data.name}</p>
                    <p style="margin: 15px 0;"><strong style="color: #667eea;">Email:</strong> {contact_data.email}</p>
                    <p style="margin: 15px 0;"><strong style="color: #667eea;">Subject:</strong> {contact_data.subject}</p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message:</h3>
                    <div style="background: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
                        <p style="line-height: 1.6; color: #475569; margin: 0; white-space: pre-wrap;">{contact_data.message}</p>
                    </div>
                </div>
            </div>
            
            <div style="background: #1e293b; color: white; padding: 25px; border-radius: 0 0 10px 10px; text-align: center;">
                <p style="margin: 0; opacity: 0.8; font-size: 14px;">
                    💡 Reply directly to this email to respond to {contact_data.name}
                </p>
                <p style="margin: 10px 0 0; opacity: 0.6; font-size: 12px;">
                    Sent from your portfolio contact form • {sender_email}
                </p>
            </div>
        </div>
        """
        
        # Create the email message
        message = Mail(
            from_email=sender_email,
            to_emails=recipient_email,
            subject=f"Portfolio Contact: {contact_data.subject}",
            html_content=html_content
        )
        
        # Set reply-to address to the person who submitted the form
        message.reply_to = contact_data.email
        
        # Send email
        response = sg.send(message)
        
        if response.status_code == 202:
            logger.info(f"Email sent successfully to {recipient_email} from {contact_data.name} ({contact_data.email})")
            return True
        else:
            logger.error(f"SendGrid returned status code: {response.status_code}")
            return False
            
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        # Still log to console as fallback
        print(f"\n❌ Email failed, logging instead:")
        print(f"From: {contact_data.name} ({contact_data.email})")
        print(f"Subject: {contact_data.subject}")
        print(f"Message: {contact_data.message}\n")
        return False

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactFormData) -> Dict[str, Any]:
    """
    Handle contact form submissions with validation
    """
    try:
        # Send email (mock function)
        email_sent = await send_email(contact_data)
        
        if not email_sent:
            raise HTTPException(
                status_code=500,
                detail="Failed to send email. Please try again later."
            )
        
        return {
            "message": "Thank you! Your message has been sent successfully. I'll get back to you soon.",
            "status": "success"
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Unexpected error in contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )

@router.get("/contact/health")
async def contact_health():
    """Health check endpoint for contact API"""
    return {"status": "Contact API is healthy"} 