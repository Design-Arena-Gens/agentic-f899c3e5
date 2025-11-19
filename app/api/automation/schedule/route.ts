import { NextResponse } from 'next/server';

// Store for scheduled jobs (in production, use a database or job queue)
let scheduledJobs: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { schedule } = body; // cron format or interval in minutes

    // In a production environment, you would:
    // 1. Store this in a database
    // 2. Use a job queue like Bull or Agenda
    // 3. Set up actual cron jobs

    scheduledJobs.push({
      id: Date.now().toString(),
      schedule,
      createdAt: new Date().toISOString(),
      status: 'active',
    });

    return NextResponse.json({
      success: true,
      message: 'Automation scheduled',
      job: scheduledJobs[scheduledJobs.length - 1],
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

export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    jobs: scheduledJobs,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('id');

  if (jobId) {
    scheduledJobs = scheduledJobs.filter(job => job.id !== jobId);
  } else {
    scheduledJobs = [];
  }

  return NextResponse.json({
    success: true,
    message: 'Job(s) deleted',
  });
}
