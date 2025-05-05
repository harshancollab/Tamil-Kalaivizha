import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CertificateTempt = () => {
  const [design, setDesign] = useState({
    pageStyle: 'landscape',
    width: 297,  
    height: 210,
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    certificateType: 'participation', 
    title: {
      text: 'Certificate for participate',
      x: 96,
      y: 96,
      font: 'Times',
      size: 18
    },
    name: {
      x: 100,
      y: 106,
      font: 'Times',
      size: 14
    },
    item: {
      x: 100, 
      y: 138,
      font: 'Times',
      size: 12
    },
    category: {
      x: 100,
      y: 130,
      font: 'Times',
      size: 12
    },
    grade: {
      x: 100,
      y: 146,
      font: 'Times',
      size: 12
    },
    class: {
      x: 100,
      y: 122,
      font: 'Times',
      size: 12
    },
    school: {
      x: 100,
      y: 114,
      font: 'Times',
      size: 12
    },
    festName: 'Tamil Kalaivizha'
  });

  // Certificate data for preview
  const [certificateData, setCertificateData] = useState({
    studentName: 'Max',
    item: 'Story writing',
    category: 'Junior Category',
    grade: 'A',
    class: 'Class 8',
    school: 'Secondary School'
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Function to update design element
  const updateDesignElement = (element, property, value) => {
    setDesign(prev => ({
      ...prev,
      [element]: {
        ...prev[element],
        [property]: value
      }
    }));
  };

  // Function to update basic design properties
  const updateBasicDesign = (property, value) => {
    setDesign(prev => ({
      ...prev,
      [property]: value
    }));
  };

  // Function to update margin properties
  const updateMargin = (property, value) => {
    setDesign(prev => ({
      ...prev,
      margins: {
        ...prev.margins,
        [property]: parseInt(value)
      }
    }));
  };

  // Function to handle window resize
  const handleResize = () => {
    if (canvasRef.current && containerRef.current) {
      renderPreview();
    }
  };

  // Add resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate PDF preview on canvas
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      renderPreview();
    }
  }, [design, certificateData]);

  // Preview rendering function
  const renderPreview = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size based on container size and design aspect ratio
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight || 500; // Default height if not set by container
    
    const designAspectRatio = design.width / design.height;
    let canvasWidth, canvasHeight;
    
    // Make canvas fit within container while maintaining aspect ratio
    if (containerWidth / containerHeight > designAspectRatio) {
      // Container is wider than needed
      canvasHeight = Math.min(containerHeight, 600); // Cap at 600px height
      canvasWidth = canvasHeight * designAspectRatio;
    } else {
      // Container is taller than needed
      canvasWidth = containerWidth;
      canvasHeight = canvasWidth / designAspectRatio;
    }
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Draw certificate content
    const scaleX = canvas.width / design.width;
    const scaleY = canvas.height / design.height;
    
    // Draw border with margins
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.strokeRect(
      design.margins.left * scaleX,
      design.margins.top * scaleY,
      canvas.width - (design.margins.left + design.margins.right) * scaleX,
      canvas.height - (design.margins.top + design.margins.bottom) * scaleY
    );
    
    drawCertificateContent(ctx, canvas);
  };

  // Draw certificate content on canvas
  const drawCertificateContent = (ctx, canvas) => {
    const scaleX = canvas.width / design.width;
    const scaleY = canvas.height / design.height;
    
    // Apply certificate type-specific styling
    let titleText = design.title.text;
    if (design.certificateType === 'Allparticipation') {
      titleText = 'Certificate of Participation';
    } else if (design.certificateType === 'A Grade') {
      titleText = 'Certificate of A Grade';
    } else if (design.certificateType === 'A Grade & B Grade') {
      titleText = 'Certificate of A Grade & B Grade';
    } else if (design.certificateType === 'appreciation') {
      titleText = 'Certificate of Appreciation';
    } else if (design.certificateType === 'excellence') {
      titleText = 'Certificate of Excellence';
    }
    
    // Draw fest name
    ctx.font = `bold ${design.title.size * 1.2 * scaleY}px ${design.title.font}`;
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(design.festName, canvas.width / 2, design.title.y * scaleY - 30);
    
    // Draw title
    ctx.font = `bold ${design.title.size * scaleY}px ${design.title.font}`;
    ctx.fillText(titleText, canvas.width / 2, design.title.y * scaleY);
    
    // Draw student name
    ctx.font = `bold ${design.name.size * scaleY}px ${design.name.font}`;
    ctx.fillText(certificateData.studentName, canvas.width / 2, design.name.y * scaleY);
    
    // Draw other certificate data
    ctx.font = `${design.item.size * scaleY}px ${design.item.font}`;
    ctx.textAlign = 'center';
    
    ctx.fillText(`Event: ${certificateData.item}`, canvas.width / 2, design.item.y * scaleY);
    ctx.fillText(`Grade: ${certificateData.grade}`, canvas.width / 2, design.grade.y * scaleY);
    ctx.fillText(`Class: ${certificateData.class}`, canvas.width / 2, design.class.y * scaleY);
    ctx.fillText(`School: ${certificateData.school}`, canvas.width / 2, design.school.y * scaleY);
    
    // Draw signature lines
    const signatureY = canvas.height - (design.margins.bottom * scaleY) - (20 * scaleY);
    const leftSigX = design.margins.left * scaleX + (30 * scaleX);
    const rightSigX = canvas.width - (design.margins.right * scaleX) - (30 * scaleX);
    
    ctx.beginPath();
    ctx.moveTo(leftSigX, signatureY);
    ctx.lineTo(leftSigX + (50 * scaleX), signatureY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(rightSigX - (50 * scaleX), signatureY);
    ctx.lineTo(rightSigX, signatureY);
    ctx.stroke();
    
    ctx.font = `${10 * scaleY}px ${design.item.font}`;
    ctx.fillText('Principal', leftSigX + (25 * scaleX), signatureY + (10 * scaleY));
    ctx.fillText('Director', rightSigX - (25 * scaleX), signatureY + (10 * scaleY));
  };

  // Generate PDF function
  const generatePDF = () => {
    // Create PDF with custom dimensions
    const doc = new jsPDF({
      orientation: design.pageStyle === 'landscape' ? 'l' : 'p',
      unit: 'mm',
      format: [design.width, design.height]
    });

    // Add border with margins
    doc.setLineWidth(0.5);
    doc.rect(
      design.margins.left,
      design.margins.top,
      doc.internal.pageSize.getWidth() - (design.margins.left + design.margins.right),
      doc.internal.pageSize.getHeight() - (design.margins.top + design.margins.bottom)
    );
    
    // Get certificate title based on type
    let titleText = design.title.text;
    if (design.certificateType === 'Allparticipation') {
      titleText = 'Certificate of Participation';
    } else if (design.certificateType === 'A Grade') {
      titleText = 'Certificate of A Grade';
    } else if (design.certificateType === 'A Grade & B Grade') {
      titleText = 'Certificate of A Grade & B Grade';
    } else if (design.certificateType === 'appreciation') {
      titleText = 'Certificate of Appreciation';
    } else if (design.certificateType === 'excellence') {
      titleText = 'Certificate of Excellence';
    }
    
    // Add fest name
    doc.setFont(design.title.font, 'bold');
    doc.setFontSize(design.title.size + 2);
    doc.text(design.festName, doc.internal.pageSize.getWidth() / 2, design.title.y - 30, { align: 'center' });
    
    // Add title
    doc.setFontSize(design.title.size);
    doc.text(titleText, doc.internal.pageSize.getWidth() / 2, design.title.y, { align: 'center' });
    
    // Add student name
    doc.setFontSize(design.name.size);
    doc.text(certificateData.studentName, doc.internal.pageSize.getWidth() / 2, design.name.y, { align: 'center' });
    
    // Add other details
    doc.setFontSize(design.item.size);
    doc.setFont(design.item.font, 'normal');
    
    doc.text(`Event: ${certificateData.item}`, doc.internal.pageSize.getWidth() / 2, design.item.y, { align: 'center' });
    doc.text(`Grade: ${certificateData.grade}`, doc.internal.pageSize.getWidth() / 2, design.grade.y, { align: 'center' });
    doc.text(`Class: ${certificateData.class}`, doc.internal.pageSize.getWidth() / 2, design.class.y, { align: 'center' });
    doc.text(`School: ${certificateData.school}`, doc.internal.pageSize.getWidth() / 2, design.school.y, { align: 'center' });
    
    // Add signature lines
    const signatureY = doc.internal.pageSize.getHeight() - design.margins.bottom - 20;
    doc.line(design.margins.left + 30, signatureY, design.margins.left + 80, signatureY);
    doc.line(doc.internal.pageSize.getWidth() - design.margins.right - 80, signatureY, doc.internal.pageSize.getWidth() - design.margins.right - 30, signatureY);
    
    doc.text('Principal', design.margins.left + 55, signatureY + 10, { align: 'center' });
    doc.text('Director', doc.internal.pageSize.getWidth() - design.margins.right - 55, signatureY + 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`${certificateData.studentName}-certificate.pdf`);
  };

  // Generate bulk certificates
  const generateBulkCertificates = (students) => {
    // Example students array format:
    // [{ studentName: 'Name', item: 'Event', category: 'Category', grade: 'Grade', class: 'Class', school: 'School' }, ...]
    
    // Create PDF with custom dimensions
    const doc = new jsPDF({
      orientation: design.pageStyle === 'landscape' ? 'l' : 'p',
      unit: 'mm',
      format: [design.width, design.height]
    });
    
    // Get certificate title based on type
    let titleText = design.title.text;
    if (design.certificateType === 'Allparticipation') {
      titleText = 'Certificate of Participation';
    } else if (design.certificateType === 'A Grade') {
      titleText = 'Certificate of A Grade';
    } else if (design.certificateType === 'A Grade & B Grade') {
      titleText = 'Certificate of A Grade & B Grade';
    } else if (design.certificateType === 'appreciation') {
      titleText = 'Certificate of Appreciation';
    } else if (design.certificateType === 'excellence') {
      titleText = 'Certificate of Excellence';
    }
   
    students.forEach((student, index) => {
      if (index > 0) {
        doc.addPage();
      }
      
      // Add border with margins
      doc.setLineWidth(0.5);
      doc.rect(
        design.margins.left,
        design.margins.top,
        doc.internal.pageSize.getWidth() - (design.margins.left + design.margins.right),
        doc.internal.pageSize.getHeight() - (design.margins.top + design.margins.bottom)
      );
      
      // Add fest name
      doc.setFont(design.title.font, 'bold');
      doc.setFontSize(design.title.size + 2);
      doc.text(design.festName, doc.internal.pageSize.getWidth() / 2, design.title.y - 30, { align: 'center' });
      
      // Add title
      doc.setFontSize(design.title.size);
      doc.text(titleText, doc.internal.pageSize.getWidth() / 2, design.title.y, { align: 'center' });
      
      // Add student name
      doc.setFontSize(design.name.size);
      doc.text(student.studentName, doc.internal.pageSize.getWidth() / 2, design.name.y, { align: 'center' });
      
      // Add other details
      doc.setFontSize(design.item.size);
      doc.setFont(design.item.font, 'normal');
      
      doc.text(`Event: ${student.item}`, doc.internal.pageSize.getWidth() / 2, design.item.y, { align: 'center' });
      doc.text(`Grade: ${student.grade}`, doc.internal.pageSize.getWidth() / 2, design.grade.y, { align: 'center' });
      doc.text(`Class: ${student.class}`, doc.internal.pageSize.getWidth() / 2, design.class.y, { align: 'center' });
      doc.text(`School: ${student.school}`, doc.internal.pageSize.getWidth() / 2, design.school.y, { align: 'center' });
      
      // Add signature lines
      const signatureY = doc.internal.pageSize.getHeight() - design.margins.bottom - 20;
      doc.line(design.margins.left + 30, signatureY, design.margins.left + 80, signatureY);
      doc.line(doc.internal.pageSize.getWidth() - design.margins.right - 80, signatureY, doc.internal.pageSize.getWidth() - design.margins.right - 30, signatureY);
      
      doc.text('Principal', design.margins.left + 55, signatureY + 10, { align: 'center' });
      doc.text('Director', doc.internal.pageSize.getWidth() - design.margins.right - 55, signatureY + 10, { align: 'center' });
    });
    
    // Save the PDF
    doc.save(`bulk-certificates.pdf`);
  };

  // Save template settings to backend
  const saveTemplate = () => {
    // Here you would make an API call to save the design
    console.log('Saving template:', design);
    alert('Template saved successfully!');
  };

  // Handle preset paper sizes
  const handlePaperSizeChange = (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      // Keep current values
      return;
    }
    
    // Set standard paper sizes (in mm)
    switch(value) {
      case 'a4':
        if (design.pageStyle === 'landscape') {
          updateBasicDesign('width', 297);
          updateBasicDesign('height', 210);
        } else {
          updateBasicDesign('width', 210);
          updateBasicDesign('height', 297);
        }
        break;
      case 'a5':
        if (design.pageStyle === 'landscape') {
          updateBasicDesign('width', 210);
          updateBasicDesign('height', 148);
        } else {
          updateBasicDesign('width', 148);
          updateBasicDesign('height', 210);
        }
        break;
      case 'letter':
        if (design.pageStyle === 'landscape') {
          updateBasicDesign('width', 279);
          updateBasicDesign('height', 216);
        } else {
          updateBasicDesign('width', 216);
          updateBasicDesign('height', 279);
        }
        break;
      default:
        break;
    }
  };

  // Update orientation and adjust width/height accordingly
  const handleOrientationChange = (e) => {
    const newOrientation = e.target.value;
    updateBasicDesign('pageStyle', newOrientation);
    
    // Swap width and height when orientation changes
    updateBasicDesign('width', design.height);
    updateBasicDesign('height', design.width);
  };

  return (
    <div className="certificate-generator max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Certificate Template Designer</h2>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="design-panel w-full lg:w-1/3 bg-gray-100 p-4 rounded shadow-md">
          <h3 className="text-lg font-bold mb-4">Design Settings</h3>
          
          <div className="mb-4">
            <label className="block mb-2">Fest Name:</label>
            <input 
              type="text" 
              value={design.festName} 
              onChange={(e) => updateBasicDesign('festName', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Certificate Type:</label>
            <select 
              value={design.certificateType} 
              onChange={(e) => updateBasicDesign('certificateType', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Allparticipation">All Participation</option>
              <option value="A Grade">A Grade</option>
              <option value="A Grade & B Grade">A Grade & B Grade</option>
              <option value="appreciation">Appreciation</option>
              <option value="excellence">Excellence</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Paper Size:</label>
            <select 
              onChange={handlePaperSizeChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="a4">A4</option>
              <option value="a5">A5</option>
              <option value="letter">Letter</option>
              <option value="custom">Custom Size</option>
            </select>
            
            <div className="flex gap-2 mt-2">
              <div className="w-1/2">
                <label className="block text-sm">Width (mm):</label>
                <input 
                  type="number" 
                  value={design.width} 
                  onChange={(e) => updateBasicDesign('width', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm">Height (mm):</label>
                <input 
                  type="number" 
                  value={design.height} 
                  onChange={(e) => updateBasicDesign('height', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Page Orientation:</label>
            <select 
              value={design.pageStyle} 
              onChange={handleOrientationChange}
              className="w-full p-2 border rounded"
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Margins (mm):</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm">Top:</label>
                <input 
                  type="number" 
                  value={design.margins.top} 
                  onChange={(e) => updateMargin('top', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Right:</label>
                <input 
                  type="number" 
                  value={design.margins.right} 
                  onChange={(e) => updateMargin('right', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Bottom:</label>
                <input 
                  type="number" 
                  value={design.margins.bottom} 
                  onChange={(e) => updateMargin('bottom', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Left:</label>
                <input 
                  type="number" 
                  value={design.margins.left} 
                  onChange={(e) => updateMargin('left', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            {design.certificateType === 'custom' && (
              <input 
                type="text" 
                value={design.title.text} 
                onChange={(e) => updateDesignElement('title', 'text', e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            )}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm">X Position:</label>
                <input 
                  type="number" 
                  value={design.title.x} 
                  onChange={(e) => updateDesignElement('title', 'x', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Y Position:</label>
                <input 
                  type="number" 
                  value={design.title.y} 
                  onChange={(e) => updateDesignElement('title', 'y', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Size:</label>
                <input 
                  type="number" 
                  value={design.title.size} 
                  onChange={(e) => updateDesignElement('title', 'size', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Name Position:</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm">X Position:</label>
                <input 
                  type="number" 
                  value={design.name.x} 
                  onChange={(e) => updateDesignElement('name', 'x', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Y Position:</label>
                <input 
                  type="number" 
                  value={design.name.y} 
                  onChange={(e) => updateDesignElement('name', 'y', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Size:</label>
                <input 
                  type="number" 
                  value={design.name.size} 
                  onChange={(e) => updateDesignElement('name', 'size', parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={saveTemplate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Template
            </button>
            <button 
              onClick={generatePDF}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Generate PDF
            </button>
          </div>
        </div>
        
        <div className="preview-panel w-full lg:w-2/3">
          <h3 className="text-lg font-bold mb-4">Certificate Preview</h3>
          <div 
            ref={containerRef} 
            className="canvas-container border rounded p-2 bg-white h-96 flex items-center justify-center shadow-md"
          >
            <canvas 
              ref={canvasRef} 
              className="max-w-full max-h-full"
            />
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Test Certificate Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Student Name:</label>
                <input 
                  type="text" 
                  value={certificateData.studentName} 
                  onChange={(e) => setCertificateData({...certificateData, studentName: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Event:</label>
                <input 
                  type="text" 
                  value={certificateData.item} 
                  onChange={(e) => setCertificateData({...certificateData, item: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Grade:</label>
                <input 
                  type="text" 
                  value={certificateData.grade} 
                  onChange={(e) => setCertificateData({...certificateData, grade: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Class:</label>
                <input 
                  type="text" 
                  value={certificateData.class} 
                  onChange={(e) => setCertificateData({...certificateData, class: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">School:</label>
                <input 
                  type="text" 
                  value={certificateData.school} 
                  onChange={(e) => setCertificateData({...certificateData, school: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTempt;


