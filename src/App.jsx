import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('upload');
  const [resultsData, setResultsData] = useState(null);

  const navigateToResults = (data) => {
    setResultsData(data);
    setCurrentPage('results');
  };

  const navigateToUpload = () => {
    setCurrentPage('upload');
    setResultsData(null);
  };

  return (
    <>
      {currentPage === 'upload' && <UploadPage onNavigate={navigateToResults} />}
      {currentPage === 'results' && <ResultsPage data={resultsData} onNavigate={navigateToUpload} />}
    </>
  );
}

// Upload Page Component
function UploadPage({ onNavigate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPG or PNG image');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults = {
      originalImage: preview,
      annotatedImage: preview,
      treeCount: Math.floor(Math.random() * 150) + 50,
      individualTrees: Math.floor(Math.random() * 100) + 30,
      clusters: Math.floor(Math.random() * 10) + 3,
      estimatedInClusters: Math.floor(Math.random() * 50) + 20,
      density: (Math.random() * 0.5 + 0.3).toFixed(2),
      coverage: (Math.random() * 30 + 40).toFixed(1),
      processingTime: (Math.random() * 2 + 1).toFixed(2)
    };

    setIsAnalyzing(false);
    onNavigate(mockResults);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f766e 0%, #059669 50%, #10b981 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '40px',
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#22c55e',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>GreenVision</h1>
          </div>
          <p style={{ color: '#6b7280', margin: 0 }}>AI-Powered Tree Detection from Satellite Images</p>
        </div>

        {/* Upload Area */}
        <div
          style={{
            border: isDragging ? '4px dashed #22c55e' : '4px dashed #d1d5db',
            backgroundColor: isDragging ? '#f0fdf4' : 'transparent',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
        >
          {preview ? (
            <div>
              <img src={preview} alt="Preview" style={{ maxHeight: '192px', margin: '0 auto', borderRadius: '8px', marginBottom: '16px' }} />
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{selectedFile.name}</p>
              <button
                onClick={() => { setSelectedFile(null); setPreview(null); }}
                style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div style={{ width: '64px', height: '64px', margin: '0 auto 16px' }}>
                <svg style={{ width: '100%', height: '100%', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p style={{ color: '#374151', marginBottom: '8px', fontWeight: '500' }}>Drag & drop your satellite image</p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>or</p>
              <label style={{ cursor: 'pointer' }}>
                <span style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}>
                  Browse Files
                </span>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/jpeg,image/png"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
              </label>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>JPG or PNG • Max 10MB</p>
            </>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
          style={{
            width: '100%',
            marginTop: '24px',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            cursor: selectedFile && !isAnalyzing ? 'pointer' : 'not-allowed',
            backgroundColor: selectedFile && !isAnalyzing ? '#16a34a' : '#d1d5db',
            color: selectedFile && !isAnalyzing ? 'white' : '#9ca3af',
            boxShadow: selectedFile && !isAnalyzing ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s'
          }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {/* Info */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
          <p style={{ margin: '4px 0' }}>📍 Optimal altitude: 220-270 meters</p>
          <p style={{ margin: '4px 0' }}>🛰️ Source: Google Earth Pro</p>
        </div>
      </div>
    </div>
  );
}

// Results Page Component
function ResultsPage({ data, onNavigate }) {
  const stats = [
    { label: 'Total Trees', value: data.treeCount, unit: 'trees', icon: '🌳', desc: 'Individual + Estimated' },
    { label: 'Individual Trees', value: data.individualTrees, unit: 'detected', icon: '🌲', desc: 'Clearly visible trees' },
    { label: 'Tree Clusters', value: data.clusters, unit: 'clusters', icon: '🌿', desc: 'Dense tree groups' },
    { label: 'Estimated in Clusters', value: data.estimatedInClusters, unit: 'trees', icon: '🌴', desc: 'Approximate count' },
    { label: 'Tree Density', value: data.density, unit: 'trees/m²', icon: '📊', desc: 'Trees per square meter' },
    { label: 'Green Coverage', value: data.coverage, unit: '%', icon: '🍃', desc: 'Area covered by trees' }
  ];

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = data.annotatedImage;
    link.download = 'greenvision_annotated_' + Date.now() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={onNavigate}
              style={{
                marginRight: '16px',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              margin: 0
            }}>
              <span style={{ fontSize: '28px', marginRight: '8px' }}>🌳</span>
              GreenVision
            </h1>
          </div>
          <button
            onClick={downloadImage}
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>Analysis Results</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>Processing completed in {data.processingTime}s</p>
        </div>

        {/* Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              borderLeft: '4px solid #22c55e'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{stat.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block'
                  }}>{stat.label}</span>
                  <span style={{ fontSize: '11px', color: '#d1d5db' }}>{stat.desc}</span>
                </div>
              </div>
              <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937' }}>
                {stat.value}
                <span style={{ fontSize: '14px', color: '#9ca3af', marginLeft: '8px' }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Image Display */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Annotated Satellite Image</h3>
            <span style={{
              fontSize: '14px',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>✓ Analyzed</span>
          </div>
          
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
            <img src={data.annotatedImage} alt="Annotated satellite view" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '14px', color: '#374151', fontWeight: '500', marginBottom: '8px' }}>Detection Legend:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '4px', marginRight: '8px' }}></span>
                <span style={{ color: '#6b7280' }}>Individual trees</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#eab308', borderRadius: '4px', marginRight: '8px' }}></span>
                <span style={{ color: '#6b7280' }}>Tree clusters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{
          background: 'linear-gradient(to right, #f0fdf4, #d1fae5)',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          border: '1px solid #bbf7d0',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>📋 Analysis Summary</h3>
          <div style={{ color: '#374151', lineHeight: '1.75' }}>
            <p style={{ margin: '8px 0' }}>• Detected <strong>{data.individualTrees} individual trees</strong> that are clearly separable</p>
            <p style={{ margin: '8px 0' }}>• Identified <strong>{data.clusters} dense clusters</strong> containing approximately <strong>{data.estimatedInClusters} trees</strong></p>
            <p style={{ margin: '8px 0' }}>• Total estimated tree count: <strong>{data.treeCount} trees</strong></p>
            <p style={{ margin: '8px 0' }}>• Green coverage represents <strong>{data.coverage}%</strong> of the analyzed area</p>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onNavigate}
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            Analyze Another Image
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        marginTop: '64px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px 20px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          <p style={{ margin: 0 }}>GreenVision © 2025 • Powered by PyTorch & FastAPI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;