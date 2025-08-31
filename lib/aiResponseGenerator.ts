import { Email } from './types';

export class AIResponseGenerator {
  static generateResponse(currentEmail: Email, conversationHistory: Email[]): string {
    const isFirstResponse = conversationHistory.length <= 1;
    
    if (isFirstResponse) {
      return this.generateFirstResponse(currentEmail);
    } else {
      return this.generateFollowUpResponse(currentEmail, conversationHistory);
    }
  }
  
  private static generateFirstResponse(email: Email): string {
    // Extract potential property mentions
    const propertyMatch = email.subject.match(/(\d+\s+\w+\s+(Street|Avenue|Road|Drive|Lane|Boulevard)|[A-Z][a-z]+\s+(Street|Avenue|Road|Drive|Lane|Boulevard))/i);
    const propertyName = propertyMatch ? propertyMatch[0] : 'the property';
    
    return `Thank you for your interest in ${propertyName}! 

I'd be happy to provide more information and schedule a viewing at your convenience. 

Could you please let me know:
1. What specific questions do you have about ${propertyName}?
2. What days/times work best for a viewing?
3. How many bedrooms/bathrooms are you looking for?

I'll follow up with detailed information and available viewing times.

Best regards,
Your Real Estate Team`;
  }
  
  private static generateFollowUpResponse(email: Email, history: Email[]): string {
    // Simple logic for follow-ups - in a real system, you'd use AI here
    const lastOurEmail = history.filter(e => e.from.includes('@gmail.com')).pop();
    
    if (email.text.toLowerCase().includes('thank you') || email.text.toLowerCase().includes('thanks')) {
      return `You're very welcome! 

I'm here to help with any other questions you might have about the property or the buying process.

Would you like to schedule a virtual tour first, or would you prefer an in-person viewing?

Best regards,
Your Real Estate Team`;
    }
    
    if (email.text.toLowerCase().includes('when') || email.text.toLowerCase().includes('available')) {
      return `I have several time slots available for viewings:

This week:
- Thursday: 2 PM - 5 PM
- Friday: 9 AM - 4 PM
- Saturday: 10 AM - 3 PM

Next week:
- Monday through Friday: 9 AM - 5 PM

Would any of these times work for you? Alternatively, I can arrange a virtual tour if you'd prefer to see the property sooner.

Best regards,
Your Real Estate Team`;
    }
    
    if (email.text.toLowerCase().includes('price') || email.text.toLowerCase().includes('how much')) {
      return `The current asking price is $525,000. 

This includes:
- All kitchen appliances (refrigerator, dishwasher, oven, microwave)
- Washer and dryer
- Central air conditioning and heating
- Recently updated roof (2022)

The price is negotiable within reason, and we're offering a 2-1 buy-down option for qualified buyers.

Would you like me to send the complete listing details with all features and floor plans?

Best regards,
Your Real Estate Team`;
    }
    
    // Default follow-up response
    return `Thank you for your follow-up message!

I'd be happy to help with any additional questions you have or schedule that viewing for you.

Could you please clarify what specific information you're looking for, or let me know what times would work best for a viewing?

Looking forward to helping you find your perfect home!

Best regards,
Your Real Estate Team`;
  }
}