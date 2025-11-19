import { NextResponse } from 'next/server';
import { researchDigitalFrauds, generatePostContent } from '@/lib/research';
import { generateImage } from '@/lib/imageGenerator';
import { sendToBuffer } from '@/lib/buffer';

export async function POST(request: Request) {
  try {
    console.log('Starting automation...');

    // Step 1: Research digital frauds
    const fraudTopics = await researchDigitalFrauds();
    console.log(`Researched ${fraudTopics.length} fraud topics`);

    const results = [];

    // Step 2: Generate posts and images for each topic
    for (const topic of fraudTopics) {
      console.log(`Processing topic: ${topic.title}`);

      // Generate post content
      const postContent = generatePostContent(topic);

      // Generate image
      const imageDataUrl = await generateImage(topic);

      // Send to Buffer
      if (process.env.BUFFER_ACCESS_TOKEN && process.env.BUFFER_PROFILE_ID) {
        try {
          const bufferResponse = await sendToBuffer(postContent, imageDataUrl);
          results.push({
            topic: topic.title,
            status: 'success',
            bufferId: bufferResponse.id,
          });
          console.log(`Posted to Buffer: ${topic.title}`);
        } catch (bufferError: any) {
          results.push({
            topic: topic.title,
            status: 'buffer_error',
            error: bufferError.message,
          });
          console.error(`Buffer error for ${topic.title}:`, bufferError.message);
        }
      } else {
        // If Buffer not configured, save locally for preview
        results.push({
          topic: topic.title,
          status: 'preview',
          content: postContent,
          hasImage: true,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Automation completed',
      results,
    });
  } catch (error: any) {
    console.error('Automation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'Use POST to run the automation',
    endpoint: '/api/automation/run',
  });
}
