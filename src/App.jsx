import React, { useState } from 'react';
import LogoGreen from './assets/icon_green.svg';
import LogoWhite from './assets/icon_white.svg';
import bground from './assets/background.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('upload');
  const [resultsData, setResultsData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const navigateToResults = (data) => {
    setResultsData(data);
    setCurrentPage('results');
  };

  const navigateToUpload = () => {
    setCurrentPage('upload');
    setResultsData(null);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      {currentPage === 'upload' ? (
        <UploadPage onNavigate={navigateToResults} />
      ) : (
        <ResultsPage 
          data={resultsData} 
          onNavigate={navigateToUpload} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      )}
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

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const text = await response.text();
        alert(`Prediction failed: ${text}`);
        return;
      }

      const data = await response.json();
      onNavigate(data.results);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3432&auto=format&fit=crop), url(${bground})`,
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
          <p style={{
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 500,
            fontSize: '15px'
          }}>
            AI-Powered Tree Detection from Satellite Images
          </p>
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
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
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
                fontWeight: 500,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {selectedFile.name}
              </p>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview(null);
                }}
                style={{
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: 600,
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
                <svg style={{ width: '100%', height: '100%', color: 'rgba(255, 255, 255, 0.85)', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '8px',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                fontSize: '16px'
              }}>
                Drag & drop your satellite image...
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
                  fontWeight: 600,
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
                JPG or PNG. Max 10MB
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
            fontWeight: 600,
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
          {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {/* Info */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
          <p style={{ margin: '4px 0', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 500 }}>
            Optimal altitude: 220-270 meters
          </p>
          <p style={{ margin: '4px 0', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontWeight: 500 }}>
            Source: Google Earth Pro
          </p>
        </div>
      </div>
    </div>
  );
}

// Results Page Component
function ResultsPage({ data, onNavigate, darkMode, toggleDarkMode }) {
  const [selectedConfidence, setSelectedConfidence] = useState(0.8);
  const currentResult = data?.find(result => result.confidence == selectedConfidence);

  const theme = {
    bg: darkMode ? '#0f172a' : '#f9fafb',
    cardBg: darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.9)',
    cardBgSolid: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#f1f5f9' : '#1f2937',
    textSecondary: darkMode ? '#cbd5e1' : '#6b7280',
    textMuted: darkMode ? '#94a3b8' : '#9ca3af',
    border: darkMode ? 'rgba(71, 85, 105, 0.5)' : '#e5e7eb',
    headerBg: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    accentBg: darkMode ? 'rgba(34, 197, 94, 0.1)' : '#dcfce7',
    summaryBg: darkMode 
      ? 'linear-gradient(to right, rgba(20, 83, 45, 0.3), rgba(21, 128, 61, 0.2))' 
      : 'linear-gradient(to right, #f0fdf4, #d1fae5)',
    summaryBorder: darkMode ? 'rgba(34, 197, 94, 0.3)' : '#bbf7d0',
    infoBg: darkMode ? 'rgba(51, 65, 85, 0.5)' : '#f9fafb'
  };

  const stats = [
    { label: 'Total Trees', value: currentResult?.stats.totaltrees, unit: 'trees', icon: '🌳', desc: 'All detected trees' },
    { label: 'Individual Trees', value: currentResult?.stats.treeclass, unit: 'trees', icon: '🌲', desc: 'Single tree class' },
    { label: 'Tree Clusters', value: currentResult?.stats.treesclass, unit: 'clusters', icon: '🌳🌳', desc: 'Dense tree groups' },
    { label: 'Trees in Clusters', value: currentResult?.stats.treesintreescluster, unit: 'trees', icon: '🌲🌲', desc: 'Trees within clusters' },
    { label: 'Tree Density', value: currentResult?.stats.densitytrees, unit: 'trees/m²', icon: '📏', desc: 'Trees per square meter' },
    { label: 'Green Coverage', value: currentResult?.stats.greencoveragem2, unit: 'm²', icon: '🟢', desc: 'Area covered by trees' }
  ];

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = currentResult.image;
    link.download = `greenvision-conf${selectedConfidence * 100}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, transition: 'background-color 0.3s ease' }}>
      {/* Header */}
      <header style={{
        backgroundColor: theme.headerBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: darkMode ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={darkMode ? LogoWhite : LogoGreen} alt="GreenVision" style={{ height: '40px', width: 'auto', transition: 'opacity 0.3s ease' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleDarkMode}
              style={{
                backgroundColor: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(229, 231, 235, 0.8)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {darkMode ? (
                <svg style={{ width: '20px', height: '20px', color: '#fbbf24' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg style={{ width: '20px', height: '20px', color: '#64748b' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={downloadImage}
              style={{
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
              }}
            >
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: theme.text, margin: '0 0 16px 0', transition: 'color 0.3s ease' }}>
            Analysis Results
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.cardBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '12px',
                boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                borderLeft: '4px solid #22c55e',
                transition: 'all 0.3s ease',
                border: `1px solid ${theme.border}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{stat.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', transition: 'color 0.3s ease' }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: '11px', color: darkMode ? '#64748b' : '#d1d5db', transition: 'color 0.3s ease' }}>
                    {stat.desc}
                  </span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 'bold', color: theme.text, transition: 'color 0.3s ease' }}>
                  {stat.value}
                  <span style={{ fontSize: '14px', color: theme.textMuted, marginLeft: '8px', transition: 'color 0.3s ease' }}>
                    {stat.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: darkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '16px',
          border: `1px solid ${theme.border}`,
          transition: 'all 0.3s ease'
        }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: theme.text, display: 'block', marginBottom: '12px', transition: 'color 0.3s ease' }}>
            Detection Confidence
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {data?.map(result => (
              <button
                key={result.confidence}
                onClick={() => setSelectedConfidence(result.confidence)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: selectedConfidence == result.confidence ? '2px solid #22c55e' : `2px solid ${theme.border}`,
                  backgroundColor: selectedConfidence == result.confidence ? theme.accentBg : theme.cardBgSolid,
                  color: selectedConfidence == result.confidence ? '#16a34a' : theme.textSecondary,
                  fontWeight: selectedConfidence == result.confidence ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}
              >
                {result.confidence * 100}%
              </button>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: theme.textSecondary, marginTop: '8px', margin: '8px 0 0 0', transition: 'color 0.3s ease' }}>
            Lower confidence shows more detections (may include false positives). Higher confidence shows only high-certainty detections.
          </p>
        </div>

        <div style={{
          backgroundColor: theme.cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '12px',
          boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '32px',
          border: `1px solid ${theme.border}`,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: theme.text, margin: 0, transition: 'color 0.3s ease' }}>
              Annotated Image ({(selectedConfidence * 100).toFixed(0)}% Confidence)
            </h3>
            <span style={{ fontSize: '14px', backgroundColor: theme.accentBg, color: '#16a34a', padding: '4px 12px', borderRadius: '9999px', transition: 'background-color 0.3s ease' }}>
              ✓ Analyzed
            </span>
          </div>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: `2px solid ${theme.border}`, transition: 'border-color 0.3s ease' }}>
            <img
              src={currentResult?.image}
              alt="Annotated satellite view"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: theme.infoBg,
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          }}>
            <p style={{ fontSize: '14px', color: theme.text, fontWeight: 500, marginBottom: '8px', transition: 'color 0.3s ease' }}>
              Detection Legend
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '4px', marginRight: '8px' }} />
                <span style={{ color: theme.textSecondary, transition: 'color 0.3s ease' }}>Individual trees</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#eab308', borderRadius: '4px', marginRight: '8px' }} />
                <span style={{ color: theme.textSecondary, transition: 'color 0.3s ease' }}>Tree clusters</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: theme.summaryBg,
          backdropFilter: darkMode ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: darkMode ? 'blur(20px)' : 'none',
          borderRadius: '12px',
          boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          border: `1px solid ${theme.summaryBorder}`,
          marginBottom: '32px',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: theme.text, marginBottom: '12px', transition: 'color 0.3s ease' }}>
            Analysis Summary (Confidence: {(selectedConfidence * 100).toFixed(0)}%)
          </h3>
          <div style={{ color: theme.text, lineHeight: '1.75', transition: 'color 0.3s ease' }}>
            <p style={{ margin: '8px 0' }}>
              Detected <strong>{currentResult?.stats.treeclass} individual trees</strong>
            </p>
            <p style={{ margin: '8px 0' }}>
              Identified <strong>{currentResult?.stats.treesclass} tree clusters</strong> containing <strong>{currentResult?.stats.treesintreescluster} trees</strong>
            </p>
            <p style={{ margin: '8px 0' }}>
              Total tree count: <strong>{currentResult?.stats.totaltrees} trees</strong>
            </p>
            <p style={{ margin: '8px 0' }}>
              Green coverage: <strong>{currentResult?.stats.greencoveragem2} m²</strong>
            </p>
            <p style={{ margin: '8px 0' }}>
              Tree density: <strong>{currentResult?.stats.densitytrees} trees/m²</strong>
            </p>
          </div>
        </div>

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
              fontWeight: 600,
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Analyze Another Image
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: theme.headerBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${theme.border}`,
        marginTop: '64px',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', textAlign: 'center', color: theme.textSecondary, fontSize: '14px', transition: 'color 0.3s ease' }}>
          <p style={{ margin: 0 }}>GreenVision 2025 | Powered by PyTorch & FastAPI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
