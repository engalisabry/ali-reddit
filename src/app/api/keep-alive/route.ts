import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { success: false, error: 'Supabase configuration missing' },
      { status: 500 },
    );
  }

  try {
    // Simplified ping to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to ping Supabase: ${response.status}`);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Keep-alive error:', error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
