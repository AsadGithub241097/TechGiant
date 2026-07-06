/**
 * Utility functions for email functionality
 */

export const CONSULTATION_EMAIL = 'Info@tech-giant.in';

const encodeMailto = (subject: string, body: string, to = CONSULTATION_EMAIL): string =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

/** Gmail web compose — works in browser (same idea as WhatsApp wa.me links). */
export const getGmailComposeUrl = (
  subject: string,
  body: string,
  to: string = CONSULTATION_EMAIL,
): string => {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
};

/** Programmatic mailto click — desktop mail apps. */
export const openMailtoLink = (mailtoUrl: string): void => {
  const link = document.createElement('a');
  link.href = mailtoUrl;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Opens a pre-filled email compose screen.
 * Primary: Gmail in a new tab (reliable in browser / dev preview).
 * Fallback: native mailto if the tab is blocked.
 */
export const openEmailCompose = (
  subject: string,
  body: string,
  to: string = CONSULTATION_EMAIL,
): void => {
  const gmailUrl = getGmailComposeUrl(subject, body, to);
  const mailtoUrl = encodeMailto(subject, body, to);

  const tab = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (!tab) {
    openMailtoLink(mailtoUrl);
  }
};

/**
 * Simple VAPT consultation request (footer / general pages).
 */
const generalVaptEmail = {
  subject: 'VAPT Consultation Request',
  body: `Hello Tech Giant Team,

I would like to speak with a VAPT consultant about cybersecurity services for my organization.

Name:
Company:
Phone:
Brief requirement:

Thank you.`,
};

export const createGeneralVaptConsultationEmail = (): string =>
  encodeMailto(generalVaptEmail.subject, generalVaptEmail.body);

/**
 * Pre-filled VAPT consultation request when the user is on the VAPT page.
 */
const vaptPageEmail = {
  subject: 'VAPT Consultation Request',
  body: `Hi Tech Giant Team,

I am interested in your VAPT (Vulnerability Assessment and Penetration Testing) services and would like to schedule a consultation.

Organization details:
• Company name:
• Industry:
• Systems / applications to assess:

Scope of interest:
[ ] Web application penetration testing
[ ] Network vulnerability assessment
[ ] Cloud security assessment
[ ] Security Operations Center (SOC)
[ ] Incident response & forensics
[ ] Compliance support (ISO 27001, etc.)

Timeline:
Budget range:
Preferred contact method:

Additional notes:

---
Sent from the Tech Giant VAPT page.`,
};

export const createVaptPageConsultationEmail = (): string =>
  encodeMailto(vaptPageEmail.subject, vaptPageEmail.body);

/** Opens mail client — general pages ask for a VAPT consultant; VAPT page uses detailed template. */
export const openVaptConsultationEmail = (fromVaptPage: boolean): void => {
  const email = fromVaptPage ? vaptPageEmail : generalVaptEmail;
  openEmailCompose(email.subject, email.body);
};

export type DevelopmentEmailSection =
  | 'Hero'
  | 'Services'
  | 'Process'
  | 'Support'
  | 'Projects'
  | 'Project Inquiry';

const developmentContactBlock = `Contact Information:
• Name:
• Company:
• Phone:
• Email:
• Best time to call:`;

export const getDevelopmentConsultationEmailParts = (
  section: DevelopmentEmailSection,
  projectName?: string,
): { to: string; subject: string; body: string } => {
  const project = projectName?.trim() || 'your project';

  const templates: Record<
    DevelopmentEmailSection,
    { subject: string; body: string }
  > = {
    Hero: {
      subject: 'Development Consultation Request',
      body: `Hi Tech Giant Team,

I visited your Development page and would like a free consultation about building a digital product.

Project overview:
• What I want to build:
• Target users / audience:
• Timeline:
• Budget range:

${developmentContactBlock}

---
Sent from Tech Giant Development page — Hero section.`,
    },
    Services: {
      subject: 'Development Services Inquiry',
      body: `Hi Tech Giant Team,

I am interested in your web development services and would like to discuss my requirements.

Services of interest (please check):
[ ] Custom websites
[ ] E-commerce solutions
[ ] Mobile applications
[ ] Backend development
[ ] Performance optimization
[ ] Security & maintenance

Project details:
• Description:
• Timeline:
• Budget range:

${developmentContactBlock}

---
Sent from Tech Giant Development page — Services section.`,
    },
    Process: {
      subject: 'Development Project — Process Consultation',
      body: `Hi Tech Giant Team,

I would like to start a development project and learn more about your process (discovery, design, build, launch, support).

Project summary:
• Project type:
• Key features needed:
• Preferred launch date:
• Budget range:

${developmentContactBlock}

---
Sent from Tech Giant Development page — Development Process section.`,
    },
    Support: {
      subject: 'Development Support & Maintenance Inquiry',
      body: `Hi Tech Giant Team,

I am looking for ongoing development support, maintenance, or enhancements for my product.

Current setup:
• Existing website / app URL:
• Technology stack (if known):
• Support needed (bug fixes, updates, new features, etc.):

${developmentContactBlock}

---
Sent from Tech Giant Development page — Support section.`,
    },
    Projects: {
      subject: 'Start a Development Project',
      body: `Hi Tech Giant Team,

I reviewed your portfolio and would like to start a similar development project with Tech Giant.

Project vision:
• What I want to build:
• Reference / inspiration (optional):
• Timeline:
• Budget range:

${developmentContactBlock}

---
Sent from Tech Giant Development page — Portfolio section.`,
    },
    'Project Inquiry': {
      subject: `Development Inquiry — ${project}`,
      body: `Hi Tech Giant Team,

I saw your "${project}" project on the Development page and would like to discuss building something similar.

What I need:
• Project goals:
• Must-have features:
• Timeline:
• Budget range:

${developmentContactBlock}

---
Sent from Tech Giant Development page — ${project} portfolio item.`,
    },
  };

  const { subject, body } = templates[section];
  return { to: CONSULTATION_EMAIL, subject, body };
};

export const createDevelopmentConsultationEmail = (
  section: DevelopmentEmailSection,
  projectName?: string,
): string => {
  const { subject, body } = getDevelopmentConsultationEmailParts(section, projectName);
  return encodeMailto(subject, body);
};

/** Opens Gmail compose (or mail app fallback) with Development context pre-filled. */
export const openDevelopmentConsultationEmail = (
  section: DevelopmentEmailSection,
  projectName?: string,
): void => {
  const { to, subject, body } = getDevelopmentConsultationEmailParts(section, projectName);
  openEmailCompose(subject, body, to);
};

/**
 * Creates a mailto link for free consultation requests (Marketing, etc.)
 */
export const createConsultationEmail = (
  service: string = 'Development',
  source: string = 'Website',
): string => {
  const { subject, body } = getConsultationEmailParts(service, source);
  return encodeMailto(subject, body);
};

const getConsultationEmailParts = (
  service: string,
  source: string,
): { subject: string; body: string } => {
  const subject = `Free Consultation Request - ${service} Services`;
  const body = `Hi Tech Giant Team,

I hope this email finds you well. I am interested in learning more about your ${service.toLowerCase()} services and would like to request a free consultation.

Here are some details about my requirements:

Project Details:
• Service needed: ${service}
• Project type:
• Timeline:
• Budget range:

Contact Information:
• Name:
• Company:
• Phone:
• Best time to call:

Additional Information:


Thank you for your time. I look forward to hearing from you.

Best regards,
[Your name]

---
This email was sent from Tech Giant's ${service} page - ${source} section.`;

  return { subject, body };
};

export const openConsultationEmail = (
  service: string = 'Development',
  source: string = 'Website',
): void => {
  const { subject, body } = getConsultationEmailParts(service, source);
  openEmailCompose(subject, body);
};

export const openConsultationEmailNewWindow = openConsultationEmail;
