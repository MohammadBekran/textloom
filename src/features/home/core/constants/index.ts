export const TEMPLATES = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        <h1 style="font-size: 24px; color: #1a73e8;">Software Development Proposal</h1>
        <p><strong>Prepared by:</strong> [Your Name]</p>
        <p><strong>Date:</strong> [Insert Date]</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;">
        <h2 style="font-size: 20px; color: #555;">Introduction</h2>
        <p>[Provide an introduction to the proposal]</p>
        <h2 style="font-size: 20px; color: #555;">Objectives</h2>
        <ul style="margin-left: 20px;">
          <li>[Objective 1]</li>
          <li>[Objective 2]</li>
        </ul>
        <h2 style="font-size: 20px; color: #555;">Deliverables</h2>
        <p>[Outline key deliverables]</p>
        <h2 style="font-size: 20px; color: #555;">Timeline</h2>
        <p>[Provide an estimated timeline]</p>
        <h2 style="font-size: 20px; color: #555;">Budget</h2>
        <p>[Outline the proposed budget]</p>
      </div>
    `,
  },
  {
    id: "project-proposal",
    label: "Project development proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <div style="font-family: Georgia, serif; font-size: 16px; line-height: 1.8; color: #333;">
        <h1 style="font-size: 24px; text-align: center; color: #00796b;">Project Development Proposal</h1>
        <p><em>Prepared by:</em> [Your Name]</p>
        <p><em>Date:</em> [Insert Date]</p>
        <hr style="margin: 20px 0; border: none; border-top: 2px dashed #aaa;">
        <h2 style="font-size: 20px;">Overview</h2>
        <p>[Provide an overview of the project]</p>
        <h2 style="font-size: 20px;">Goals</h2>
        <ul style="margin-left: 20px; list-style-type: disc;">
          <li>[Goal 1]</li>
          <li>[Goal 2]</li>
        </ul>
        <h2 style="font-size: 20px;">Milestones</h2>
        <p>[Describe key milestones]</p>
        <h2 style="font-size: 20px;">Budget</h2>
        <p>[Specify the budget for the project]</p>
      </div>
    `,
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        <p>[Your Name]</p>
        <p>[Your Position]</p>
        <p>[Your Company]</p>
        <p>[Your Address]</p>
        <p>[City, State, ZIP]</p>
        <p style="margin: 20px 0;"><strong>Date:</strong> [Insert Date]</p>
        <p>[Recipient Name]</p>
        <p>[Recipient Position]</p>
        <p>[Recipient Company]</p>
        <p>[Recipient Address]</p>
        <p>[City, State, ZIP]</p>
        <p>Dear <strong>[Recipient Name]</strong>,</p>
        <p style="margin: 20px 0;">[Body of the letter]</p>
        <p>Sincerely,</p>
        <p><strong>[Your Name]</strong></p>
      </div>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        <h1 style="font-size: 28px; color: #1a73e8; margin-bottom: 5px;">[Your Name]</h1>
        <p style="margin-bottom: 20px; color: #555;">[Your Contact Information]</p>
        <h2 style="font-size: 20px; color: #555; margin-top: 20px;">Objective</h2>
        <p>[Your career objective]</p>
        <h2 style="font-size: 20px; color: #555;">Experience</h2>
        <p><strong>[Job Title]</strong> - [Company Name]</p>
        <p style="margin-bottom: 20px;">[Description of your role]</p>
        <h2 style="font-size: 20px; color: #555;">Education</h2>
        <p>[Degree] - [Institution Name]</p>
        <h2 style="font-size: 20px; color: #555;">Skills</h2>
        <ul style="margin-left: 20px;">
          <li>[Skill 1]</li>
          <li>[Skill 2]</li>
        </ul>
      </div>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div style="font-family: Times New Roman, serif; font-size: 16px; line-height: 1.6; color: #333;">
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State, ZIP]</p>
        <p>[Date]</p>
        <p>[Recipient Name]</p>
        <p>[Recipient Title]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p>Dear [Recipient Name],</p>
        <p style="margin: 20px 0;">[Body of the letter]</p>
        <p>Sincerely,</p>
        <p><strong>[Your Name]</strong></p>
      </div>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State, ZIP]</p>
        <p style="margin-bottom: 20px;">[Date]</p>
        <p>Dear <strong>[Recipient Name]</strong>,</p>
        <p style="margin: 20px 0;">[Body of the letter]</p>
        <p>Sincerely,</p>
        <p><strong>[Your Name]</strong></p>
      </div>
    `,
  },
] as const;
