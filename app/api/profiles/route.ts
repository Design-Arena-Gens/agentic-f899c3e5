import { NextResponse } from 'next/server';
import { getBufferProfiles } from '@/lib/buffer';

export async function GET(request: Request) {
  try {
    if (!process.env.BUFFER_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'Buffer access token not configured',
        },
        { status: 400 }
      );
    }

    const profiles = await getBufferProfiles();

    return NextResponse.json({
      success: true,
      profiles,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
