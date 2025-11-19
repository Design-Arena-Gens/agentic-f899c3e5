'use client';

import { useState } from 'react';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const runAutomation = async () => {
    setIsRunning(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/automation/run', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}>
            🚨 Digital Fraud Research Automation
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Automated system to research digital frauds in India, generate awareness posts with images, and schedule them to Buffer
          </p>
        </div>

        {/* Main Control Panel */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          marginBottom: '30px',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
          }}>
            Control Panel
          </h2>

          <button
            onClick={runAutomation}
            disabled={isRunning}
            style={{
              background: isRunning ? '#ccc' : 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
              color: 'white',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              if (!isRunning) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            {isRunning ? '⏳ Running Automation...' : '▶️ Run Automation Now'}
          </button>

          {isRunning && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#f0f9ff',
              border: '2px solid #0ea5e9',
              borderRadius: '8px',
              color: '#0369a1',
            }}>
              <p style={{ margin: 0, fontWeight: '600' }}>
                🔄 Processing... Researching frauds, generating posts and images...
              </p>
            </div>
          )}

          {error && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: '#fef2f2',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              color: '#991b1b',
            }}>
              <p style={{ margin: 0, fontWeight: '600' }}>❌ Error: {error}</p>
            </div>
          )}
        </div>

        {/* Results Display */}
        {results && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
            }}>
              ✅ Automation Results
            </h2>

            <div style={{
              marginBottom: '20px',
              padding: '16px',
              background: '#f0fdf4',
              border: '2px solid #22c55e',
              borderRadius: '8px',
            }}>
              <p style={{
                margin: 0,
                color: '#166534',
                fontWeight: '600',
                fontSize: '18px',
              }}>
                Successfully processed {results.results?.length || 0} fraud topic(s)
              </p>
            </div>

            {results.results?.map((result: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  marginBottom: '16px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              >
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '12px',
                }}>
                  {result.topic}
                </h3>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                }}>
                  <span style={{
                    padding: '4px 12px',
                    background: result.status === 'success' ? '#22c55e' : result.status === 'preview' ? '#3b82f6' : '#ef4444',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}>
                    {result.status === 'success' ? '✓ Posted to Buffer' : result.status === 'preview' ? '👁 Preview Mode' : '⚠ Error'}
                  </span>

                  {result.bufferId && (
                    <span style={{
                      color: '#6b7280',
                      fontSize: '14px',
                    }}>
                      ID: {result.bufferId}
                    </span>
                  )}
                </div>

                {result.content && (
                  <div style={{
                    marginTop: '12px',
                    padding: '16px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                  }}>
                    <pre style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '14px',
                      color: '#374151',
                      margin: 0,
                    }}>
                      {result.content}
                    </pre>
                  </div>
                )}

                {result.error && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '14px',
                    marginTop: '8px',
                  }}>
                    Error: {result.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '30px',
          marginTop: '30px',
          color: 'white',
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}>
            📋 How It Works
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            <li style={{ marginBottom: '12px', fontSize: '16px' }}>
              <strong>1. Research:</strong> Analyzes current digital fraud trends in India
            </li>
            <li style={{ marginBottom: '12px', fontSize: '16px' }}>
              <strong>2. Generate Content:</strong> Creates awareness posts with statistics and prevention tips
            </li>
            <li style={{ marginBottom: '12px', fontSize: '16px' }}>
              <strong>3. Create Images:</strong> Generates eye-catching graphics for each fraud type
            </li>
            <li style={{ marginBottom: '12px', fontSize: '16px' }}>
              <strong>4. Post to Buffer:</strong> Schedules content to your Buffer account
            </li>
          </ul>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
          }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              <strong>⚙️ Configuration:</strong> Set your BUFFER_ACCESS_TOKEN and BUFFER_PROFILE_ID in environment variables to enable auto-posting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
