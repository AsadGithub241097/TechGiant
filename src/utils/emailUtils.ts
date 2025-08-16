/**
 * Utility functions for email functionality
 */

// Company email for consultations
const CONSULTATION_EMAIL = 'info@techgiant.com'; // Replace with your actual email

/**
 * Creates a mailto link for free consultation requests
 * @param service - The service type (e.g., 'Development', 'VAPT', 'Marketing')
 * @param source - The source component (e.g., 'Hero', 'Services', 'Projects')
 * @returns mailto URL with pre-filled subject and body
 */
export const createConsultationEmail = (
  service: string = 'Development',
  source: string = 'Website'
): string => {
  const subject = encodeURIComponent(`Free Consultation Request - ${service} Services`);
  
  const body = encodeURIComponent(`Hi Tech Giant Team,

I hope this email finds you well. I am interested in learning more about your ${service.toLowerCase()} services and would like to request a free consultation.

Here are some details about my requirements:

📋 Project Details:
• Service needed: ${service}
• Project type: [Please describe your project]
• Timeline: [When do you need this completed?]
• Budget range: [Your budget range]

📞 Contact Information:
• Name: [Your full name]
• Company: [Your company name]
• Phone: [Your phone number]
• Best time to call: [Preferred time]

📝 Additional Information:
[Please share any additional details about your project, specific requirements, or questions you have]

I look forward to discussing how Tech Giant can help bring my project to life. Please let me know your availability for a consultation call.

Thank you for your time and I look forward to hearing from you soon!

Best regards,
[Your name]

---
This email was sent from Tech Giant's ${service} page - ${source} section.`);

  return `mailto:${CONSULTATION_EMAIL}?subject=${subject}&body=${body}`;
};

/**
 * Opens the default email client with pre-filled consultation request
 * @param service - The service type
 * @param source - The source component
 */
export const openConsultationEmail = (
  service: string = 'Development',
  source: string = 'Website'
): void => {
  const mailtoUrl = createConsultationEmail(service, source);
  window.location.href = mailtoUrl;
};

/**
 * Alternative function that opens email in a new window/tab
 * Useful for some browsers or email clients
 */
export const openConsultationEmailNewWindow = (
  service: string = 'Development',
  source: string = 'Website'
): void => {
  const mailtoUrl = createConsultationEmail(service, source);
  window.open(mailtoUrl, '_self');
};
