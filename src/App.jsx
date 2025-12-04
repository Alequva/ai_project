import React, { useState } from 'react';
import LogoGreen from './assets/icon_green.svg';
import LogoWhite from './assets/icon_white.svg';
import bground from './assets/background.jpg';

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

    const mockResults = [
      {
        confidence: 0.2,
        image: preview,
        stats: {
          total_trees: Math.floor(Math.random() * 200) + 150,
          tree_class: Math.floor(Math.random() * 120) + 80,
          trees_class: Math.floor(Math.random() * 15) + 5,
          trees_in_trees_cluster: Math.floor(Math.random() * 80) + 50,
          density_trees: (Math.random() * 0.6 + 0.4).toFixed(2),
          green_coverage_m2: (Math.random() * 40 + 50).toFixed(1)
        }
      },
      {
        confidence: 0.4,
        image: preview,
        stats: {
          total_trees: Math.floor(Math.random() * 180) + 130,
          tree_class: Math.floor(Math.random() * 100) + 70,
          trees_class: Math.floor(Math.random() * 12) + 4,
          trees_in_trees_cluster: Math.floor(Math.random() * 70) + 40,
          density_trees: (Math.random() * 0.5 + 0.35).toFixed(2),
          green_coverage_m2: (Math.random() * 35 + 45).toFixed(1)
        }
      },
      {
        confidence: 0.6,
        image: preview,
        stats: {
          total_trees: Math.floor(Math.random() * 160) + 110,
          tree_class: Math.floor(Math.random() * 90) + 60,
          trees_class: Math.floor(Math.random() * 10) + 3,
          trees_in_trees_cluster: Math.floor(Math.random() * 60) + 35,
          density_trees: (Math.random() * 0.4 + 0.3).toFixed(2),
          green_coverage_m2: (Math.random() * 30 + 40).toFixed(1)
        }
      },
      {
        confidence: 0.8,
        image: preview,
        stats: {
          total_trees: Math.floor(Math.random() * 140) + 90,
          tree_class: Math.floor(Math.random() * 80) + 50,
          trees_class: Math.floor(Math.random() * 8) + 2,
          trees_in_trees_cluster: Math.floor(Math.random() * 50) + 30,
          density_trees: (Math.random() * 0.35 + 0.25).toFixed(2),
          green_coverage_m2: (Math.random() * 25 + 35).toFixed(1)
        }
      },
      {
        confidence: 0.95,
        image: preview,
        stats: {
          total_trees: Math.floor(Math.random() * 120) + 70,
          tree_class: Math.floor(Math.random() * 70) + 40,
          trees_class: Math.floor(Math.random() * 6) + 2,
          trees_in_trees_cluster: Math.floor(Math.random() * 40) + 25,
          density_trees: (Math.random() * 0.3 + 0.2).toFixed(2),
          green_coverage_m2: (Math.random() * 20 + 30).toFixed(1)
        }
      }
    ];

    setIsAnalyzing(false);
    onNavigate(mockResults);
  };

  return (
    <div style={{
      minHeight: '100vh',
      // backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop")',
      backgroundImage: `url(${bground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }} />
      
      {/* Glassmorphism Card */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        padding: '40px',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <img src={LogoGreen} alt="GreenVision" style={{ height: '60px', width: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }} />
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', margin: 0, textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: '500', fontSize: '15px' }}>AI-Powered Tree Detection from Satellite Images</p>
        </div>

        {/* Upload Area */}
        <div
          style={{
            border: isDragging ? '3px dashed rgba(34, 197, 94, 0.8)' : '3px dashed rgba(255, 255, 255, 0.3)',
            backgroundColor: isDragging ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
        >
          {preview ? (
            <div>
              <img 
                src={preview} 
                alt="Preview" 
                style={{ 
                  maxHeight: '192px', 
                  maxWidth: '100%',
                  margin: '0 auto', 
                  borderRadius: '12px', 
                  marginBottom: '16px', 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }} 
              />
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255, 255, 255, 0.95)', 
                marginBottom: '8px', 
                fontWeight: '500',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {selectedFile.name}
              </p>
              <button
                onClick={() => { setSelectedFile(null); setPreview(null); }}
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s'
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div style={{ width: '64px', height: '64px', margin: '0 auto 16px' }}>
                <svg 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    color: 'rgba(255, 255, 255, 0.85)', 
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' 
                  }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.95)', 
                marginBottom: '8px', 
                fontWeight: '600', 
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontSize: '16px'
              }}>
                Drag & drop your satellite image
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(255, 255, 255, 0.8)', 
                marginBottom: '16px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                or
              </p>
              <label style={{ cursor: 'pointer' }}>
                <span style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.9)',
                  color: 'white',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '15px'
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
              <p style={{ 
                fontSize: '12px', 
                color: 'rgba(255, 255, 255, 0.7)', 
                marginTop: '12px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                JPG or PNG • Max 10MB
              </p>
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
            padding: '14px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '16px',
            border: selectedFile && !isAnalyzing ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            cursor: selectedFile && !isAnalyzing ? 'pointer' : 'not-allowed',
            backgroundColor: selectedFile && !isAnalyzing ? 'rgba(22, 163, 74, 0.9)' : 'rgba(255, 255, 255, 0.2)',
            color: selectedFile && !isAnalyzing ? 'white' : 'rgba(255, 255, 255, 0.5)',
            boxShadow: selectedFile && !isAnalyzing ? '0 8px 16px rgba(22, 163, 74, 0.5)' : 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          {isAnalyzing ? '🔄 Analyzing...' : '✨ Analyze Image'}
        </button>

        {/* Info */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'rgba(255, 255, 255, 0.85)'
        }}>
          <p style={{ 
            margin: '4px 0', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: '500'
          }}>
            📍 Optimal altitude: 220-270 meters
          </p>
          <p style={{ 
            margin: '4px 0', 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: '500'
          }}>
            🛰️ Source: Google Earth Pro
          </p>
        </div>
      </div>
    </div>
  );
}

// Results Page Component
function ResultsPage({ data, onNavigate }) {
  // Data is now an array of 5 results with different confidence levels
  // Default to 0.8 confidence (index 3)
  const [selectedConfidence, setSelectedConfidence] = useState(0.8);
  
  // Find the currently selected result
  const currentResult = data.find(result => result.confidence === selectedConfidence);
  
  const stats = [
    { 
      label: 'Total Trees', 
      value: currentResult.stats.total_trees, 
      unit: 'trees', 
      icon: '🌳', 
      desc: 'All detected trees' 
    },
    { 
      label: 'Individual Trees', 
      value: currentResult.stats.tree_class, 
      unit: 'trees', 
      icon: '🌲', 
      desc: 'Single tree class' 
    },
    { 
      label: 'Tree Clusters', 
      value: currentResult.stats.trees_class, 
      unit: 'clusters', 
      icon: '🌿', 
      desc: 'Dense tree groups' 
    },
    { 
      label: 'Trees in Clusters', 
      value: currentResult.stats.trees_in_trees_cluster, 
      unit: 'trees', 
      icon: '🌴', 
      desc: 'Trees within clusters' 
    },
    { 
      label: 'Tree Density', 
      value: currentResult.stats.density_trees, 
      unit: 'trees/m²', 
      icon: '📊', 
      desc: 'Trees per square meter' 
    },
    { 
      label: 'Green Coverage', 
      value: currentResult.stats.green_coverage_m2, 
      unit: 'm²', 
      icon: '🍃', 
      desc: 'Area covered by trees' 
    }
  ];

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = currentResult.image;
    link.download = `greenvision_conf${selectedConfidence}_${Date.now()}.jpg`;
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
            <img src = {LogoGreen} alt="GreenVision" style={{ height: '40px', width: 'auto' }} />
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
        {/* Title with Confidence Selector */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 16px 0' }}>Analysis Results</h2>
          
          
         {/* Statistics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              borderLeft: '4px solid #22c55e',
              transition: 'transform 0.2s',
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
        
        {/* Confidence Selector */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '16px'
          }}>
            <label style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              display: 'block', 
              marginBottom: '12px' 
            }}>
              Detection Confidence
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {data.map((result) => (
                <button
                  key={result.confidence}
                  onClick={() => setSelectedConfidence(result.confidence)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: selectedConfidence === result.confidence ? '2px solid #22c55e' : '2px solid #e5e7eb',
                    backgroundColor: selectedConfidence === result.confidence ? '#dcfce7' : 'white',
                    color: selectedConfidence === result.confidence ? '#16a34a' : '#6b7280',
                    fontWeight: selectedConfidence === result.confidence ? '600' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px'
                  }}
                >
                  {'>'}{(result.confidence * 100).toFixed(0)}%
                </button>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px', margin: '8px 0 0 0' }}>
              💡 Lower confidence shows more detections (may include false positives). Higher confidence shows only high-certainty detections.
            </p>
          </div>
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
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              Annotated Image ({(selectedConfidence * 100).toFixed(0)}% Confidence)
            </h3>
            <span style={{
              fontSize: '14px',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>✓ Analyzed</span>
          </div>
          
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '2px solid #e5e7eb' }}>
            <img 
              src={currentResult.image} 
              alt={`Annotated satellite view at ${selectedConfidence} confidence`}
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
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
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
            📋 Analysis Summary (Confidence: {(selectedConfidence * 100).toFixed(0)}%)
          </h3>
          <div style={{ color: '#374151', lineHeight: '1.75' }}>
            <p style={{ margin: '8px 0' }}>• Detected <strong>{currentResult.stats.tree_class} individual trees</strong></p>
            <p style={{ margin: '8px 0' }}>• Identified <strong>{currentResult.stats.trees_class} tree clusters</strong> containing <strong>{currentResult.stats.trees_in_trees_cluster} trees</strong></p>
            <p style={{ margin: '8px 0' }}>• Total tree count: <strong>{currentResult.stats.total_trees} trees</strong></p>
            <p style={{ margin: '8px 0' }}>• Green coverage: <strong>{currentResult.stats.green_coverage_m2} m²</strong></p>
            <p style={{ margin: '8px 0' }}>• Tree density: <strong>{currentResult.stats.density_trees} trees/m²</strong></p>
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