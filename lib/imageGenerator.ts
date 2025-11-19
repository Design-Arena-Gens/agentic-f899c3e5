import { FraudTopic } from './research';

export async function generateImage(topic: FraudTopic): Promise<string> {
  // Generate SVG-based image
  const width = 1200;
  const height = 630;

  const titleWords = topic.title.split(' ');
  let titleLine1 = '';
  let titleLine2 = '';

  if (titleWords.length > 2) {
    titleLine1 = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
    titleLine2 = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');
  } else {
    titleLine1 = topic.title;
  }

  // Wrap description text
  const descWords = topic.description.split(' ');
  const descLines: string[] = [];
  let currentLine = '';
  const maxCharsPerLine = 65;

  for (const word of descWords) {
    if ((currentLine + word).length > maxCharsPerLine && currentLine.length > 0) {
      descLines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim()) {
    descLines.push(currentLine.trim());
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF416C;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF4B2B;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- Warning Triangle -->
      <polygon points="120,80 180,180 60,180" fill="none" stroke="white" stroke-width="8"/>
      <rect x="115" y="100" width="10" height="40" fill="white"/>
      <rect x="115" y="150" width="10" height="10" fill="white"/>

      <!-- Title -->
      <text x="220" y="120" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white">
        ${titleLine1}
      </text>
      ${titleLine2 ? `<text x="220" y="180" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="white">${titleLine2}</text>` : ''}

      <!-- Subtitle -->
      <text x="60" y="260" font-family="Arial, sans-serif" font-size="32" fill="white">
        🇮🇳 Digital Fraud Alert - India
      </text>

      <!-- Description Box -->
      <rect x="60" y="310" width="${width - 120}" height="240" fill="rgba(255, 255, 255, 0.95)" rx="10"/>

      <!-- Description Text -->
      ${descLines.map((line, i) => `
        <text x="90" y="${360 + i * 40}" font-family="Arial, sans-serif" font-size="24" fill="#333">
          ${line}
        </text>
      `).join('')}

      <!-- Stats -->
      <text x="90" y="${360 + descLines.length * 40 + 40}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FF416C">
        📊 ${topic.statistics[0]}
      </text>

      <!-- Footer -->
      <rect y="${height - 60}" width="${width}" height="60" fill="rgba(255, 255, 255, 0.9)"/>
      <text x="${width / 2}" y="${height - 25}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#333" text-anchor="middle">
        Stay Safe Online | Report Fraud: cybercrime.gov.in
      </text>
    </svg>
  `;

  // Return base64 encoded SVG
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export async function generateImageWithAI(topic: FraudTopic): Promise<string> {
  // This function can be used with DALL-E if OpenAI API key is available
  // For now, we'll use the canvas-based image generator
  const prompt = `Create a professional social media post image about ${topic.title} in India.
  Include warning symbols, Indian flag colors, and cybersecurity themes.
  Modern, clean design with red and white color scheme.`;

  // Return a data URL or external URL when using AI image generation
  return prompt; // Placeholder for AI implementation
}
