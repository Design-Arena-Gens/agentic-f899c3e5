import axios from 'axios';

export interface FraudTopic {
  title: string;
  description: string;
  statistics: string[];
  preventionTips: string[];
}

export async function researchDigitalFrauds(): Promise<FraudTopic[]> {
  // Simulated research data about digital frauds in India
  // In production, this could scrape real news sources or use APIs
  const fraudTopics: FraudTopic[] = [
    {
      title: "UPI Payment Fraud",
      description: "Scammers trick users into sharing UPI PINs or scanning malicious QR codes leading to unauthorized transactions.",
      statistics: [
        "₹95,000 Cr+ lost to UPI fraud in 2023",
        "3.5 lakh+ cases reported annually",
        "40% increase in UPI-related fraud cases"
      ],
      preventionTips: [
        "Never share your UPI PIN with anyone",
        "Verify merchant QR codes before scanning",
        "Enable transaction alerts",
        "Use only official payment apps"
      ]
    },
    {
      title: "Phishing and Fake Websites",
      description: "Fraudsters create fake banking websites and send phishing emails to steal login credentials and personal information.",
      statistics: [
        "60% of cybercrimes involve phishing",
        "₹1.25 lakh average loss per victim",
        "500+ fake banking websites detected monthly"
      ],
      preventionTips: [
        "Check website URLs carefully",
        "Look for HTTPS and security certificates",
        "Don't click suspicious email links",
        "Enable two-factor authentication"
      ]
    },
    {
      title: "Job Offer Scams",
      description: "Fake recruiters promise high-paying jobs and extract registration fees or personal documents from job seekers.",
      statistics: [
        "25,000+ job scam complaints in 2023",
        "Average loss of ₹50,000 per victim",
        "LinkedIn and WhatsApp are primary channels"
      ],
      preventionTips: [
        "Verify company details independently",
        "Never pay for job offers",
        "Research recruiter credentials",
        "Report suspicious job posts"
      ]
    },
    {
      title: "Investment and Ponzi Schemes",
      description: "Fraudulent investment platforms promise high returns but are designed to steal money from investors.",
      statistics: [
        "₹50,000 Cr+ lost to investment frauds",
        "Trading app scams increased 300%",
        "Cryptocurrency frauds doubled in 2023"
      ],
      preventionTips: [
        "Verify SEBI registration",
        "Be skeptical of guaranteed returns",
        "Research company background thoroughly",
        "Consult financial advisors"
      ]
    },
    {
      title: "Social Media Account Hacking",
      description: "Hackers compromise social media accounts to scam contacts by requesting money or spreading malware.",
      statistics: [
        "45% of Indians experienced account hacking",
        "WhatsApp hacking cases up 200%",
        "Average scam amount: ₹30,000"
      ],
      preventionTips: [
        "Use strong unique passwords",
        "Enable two-factor authentication",
        "Don't share OTPs with anyone",
        "Verify money requests directly"
      ]
    },
    {
      title: "Loan App Frauds",
      description: "Predatory loan apps charge exorbitant interest rates and harass borrowers using personal data.",
      statistics: [
        "1,000+ illegal loan apps identified",
        "59% interest rates charged illegally",
        "₹500 Cr+ extorted through harassment"
      ],
      preventionTips: [
        "Use only RBI-approved lending apps",
        "Read terms and conditions carefully",
        "Check app permissions",
        "Report harassment to cybercrime"
      ]
    },
    {
      title: "SIM Swap Fraud",
      description: "Fraudsters port victim's mobile number to their SIM card to access banking and OTP-based services.",
      statistics: [
        "15,000+ SIM swap fraud cases reported",
        "Banks lost ₹300 Cr+ to SIM swap attacks",
        "Average time to detect: 48 hours"
      ],
      preventionTips: [
        "Set up SIM swap alerts",
        "Use app-based authentication",
        "Report SIM issues immediately",
        "Link Aadhaar with mobile number"
      ]
    },
    {
      title: "E-commerce Fraud",
      description: "Fake online stores and sellers deceive customers with counterfeit products or non-delivery of goods.",
      statistics: [
        "₹2,000 Cr+ lost to e-commerce fraud",
        "35% increase in fake websites",
        "1 in 5 online shoppers scammed"
      ],
      preventionTips: [
        "Shop from verified sellers only",
        "Check reviews and ratings",
        "Use secure payment methods",
        "Report fraudulent listings"
      ]
    }
  ];

  // Randomly select 1-2 topics for each automation run
  const selectedTopics = fraudTopics
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 1);

  return selectedTopics;
}

export function generatePostContent(topic: FraudTopic): string {
  const post = `🚨 ALERT: ${topic.title} in India

${topic.description}

📊 Key Statistics:
${topic.statistics.map(stat => `• ${stat}`).join('\n')}

🛡️ How to Protect Yourself:
${topic.preventionTips.map(tip => `✓ ${tip}`).join('\n')}

Stay Safe! Share this to spread awareness.

#CyberSecurity #DigitalIndia #FraudAwareness #StaySafeOnline #CyberCrime`;

  return post;
}
