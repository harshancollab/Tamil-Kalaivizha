import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CertificateGenerator = () => {

  const [design, setDesign] = useState({
    pageStyle: 'landscape',
    width: 297,  // Default A4 landscape width in mm
    height: 210, // Default A4 landscape height in mm
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
    festName: ' Tamil Kalaivizha',
    background: null,
    logo: null
  });

  // Certificate data for preview
  const [certificateData, setCertificateData] = useState({
    studentName: 'Max',
    item: 'Stroy writing',
    category: 'Junior Category',
    grade: 'A',
    class: 'Class 8',
    school: ' Secondary School'
  });

  const canvasRef = useRef(null);

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

  // Generate PDF preview on canvas
  useEffect(() => {
    if (canvasRef.current) {
      renderPreview();
    }
  }, [design, certificateData]);

  // Preview rendering function
  const renderPreview = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size based on design width and height, while maintaining proportions
    const maxPreviewWidth = 800;
    const maxPreviewHeight = 600;
    
    let previewWidth, previewHeight;
    
    if (design.width / design.height > maxPreviewWidth / maxPreviewHeight) {
      // Width limited
      previewWidth = maxPreviewWidth;
      previewHeight = (design.height / design.width) * maxPreviewWidth;
    } else {
      // Height limited
      previewHeight = maxPreviewHeight;
      previewWidth = (design.width / design.height) * maxPreviewHeight;
    }
    
    canvas.width = previewWidth;
    canvas.height = previewHeight;
    
    // Draw background if exists
    if (design.background) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawCertificateContent(ctx, canvas);
      };
      img.src = design.background;
    } else {
      // Draw border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 5;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      drawCertificateContent(ctx, canvas);
    }
  };

  // Draw certificate content on canvas
  const drawCertificateContent = (ctx, canvas) => {
    const scaleX = canvas.width / design.width;
    const scaleY = canvas.height / design.height;
    
    // Draw fest name
    ctx.font = `bold ${design.title.size * 1.2 * scaleY}px ${design.title.font}`;
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(design.festName, canvas.width / 2, design.title.y * scaleY - 30);
    
    // Draw title
    ctx.font = `bold ${design.title.size * scaleY}px ${design.title.font}`;
    ctx.fillText(design.title.text, canvas.width / 2, design.title.y * scaleY);
    
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
    
    // Draw logo if exists
    if (design.logo) {
      const img = new Image();
      img.onload = () => {
        const logoSize = 60 * scaleY;
        ctx.drawImage(img, 40 * scaleX, 40 * scaleY, logoSize, logoSize);
      };
      img.src = design.logo;
    }
  };

  // Generate PDF function
  const generatePDF = () => {
    // Create PDF with custom dimensions
    const doc = new jsPDF({
      orientation: design.pageStyle === 'landscape' ? 'l' : 'p',
      unit: 'mm',
      format: [design.width, design.height]
    });

    // Add background if exists
    if (design.background) {
      doc.addImage(design.background, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    } else {
      // Add border
      doc.setLineWidth(0.5);
      doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
    }
    
    // Add logo if exists
    if (design.logo) {
      doc.addImage(design.logo, 'PNG', 20, 20, 25, 25);
    }
    
    // Add fest name
    doc.setFont(design.title.font, 'bold');
    doc.setFontSize(design.title.size + 2);
    doc.text(design.festName, doc.internal.pageSize.getWidth() / 2, design.title.y - 30, { align: 'center' });
    
    // Add title
    doc.setFontSize(design.title.size);
    doc.text(design.title.text, doc.internal.pageSize.getWidth() / 2, design.title.y, { align: 'center' });
    
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
    const signatureY = doc.internal.pageSize.getHeight() - 40;
    doc.line(40, signatureY, 90, signatureY);
    doc.line(doc.internal.pageSize.getWidth() - 90, signatureY, doc.internal.pageSize.getWidth() - 40, signatureY);
    
    doc.text('Principal', 65, signatureY + 10, { align: 'center' });
    doc.text('Director', doc.internal.pageSize.getWidth() - 65, signatureY + 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`${certificateData.studentName}-certificate.pdf`);
  };

  // Handle file upload for background image
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBasicDesign('background', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBasicDesign('logo', event.target.result);
      };
      reader.readAsDataURL(file);
    }
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
    
    students.forEach((student, index) => {
      if (index > 0) {
        doc.addPage();
      }
      
      // Add background if exists
      if (design.background) {
        doc.addImage(design.background, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      } else {
        // Add border
        doc.setLineWidth(0.5);
        doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
      }
      
      // Add logo if exists
      if (design.logo) {
        doc.addImage(design.logo, 'PNG', 20, 20, 25, 25);
      }
      
      // Add fest name
      doc.setFont(design.title.font, 'bold');
      doc.setFontSize(design.title.size + 2);
      doc.text(design.festName, doc.internal.pageSize.getWidth() / 2, design.title.y - 30, { align: 'center' });
      
      // Add title
      doc.setFontSize(design.title.size);
      doc.text(design.title.text, doc.internal.pageSize.getWidth() / 2, design.title.y, { align: 'center' });
      
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
      const signatureY = doc.internal.pageSize.getHeight() - 40;
      doc.line(40, signatureY, 90, signatureY);
      doc.line(doc.internal.pageSize.getWidth() - 90, signatureY, doc.internal.pageSize.getWidth() - 40, signatureY);
      
      doc.text('Principal', 65, signatureY + 10, { align: 'center' });
      doc.text('Director', doc.internal.pageSize.getWidth() - 65, signatureY + 10, { align: 'center' });
    });
    
    // Save the PDF
    doc.save(`bulk-certificates.pdf`);
  };

  // Save template settings to backend
  const saveTemplate = () => {
    // Here you would make an API call to save the design
    console.log('Saving template:', design);
    alert('Template saved successfully!');
    
    // Example API call
    // axios.post('/api/certificate-templates', design)
    //   .then(response => alert('Template saved successfully!'))
    //   .catch(error => console.error('Error saving template:', error));
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
    <div className="certificate-generator">
      <h2>Certificate Template Designer</h2>
      
      <div className="flex flex-row gap-4">
        <div className="design-panel w-1/3 bg-gray-100 p-4 rounded">
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
              <div>
                <label className="block text-sm">Width (mm):</label>
                <input 
                  type="number" 
                  value={design.width} 
                  onChange={(e) => updateBasicDesign('width', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
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
            <label className="block mb-2">Title:</label>
            <input 
              type="text" 
              value={design.title.text} 
              onChange={(e) => updateDesignElement('title', 'text', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex gap-2">
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
            <div className="flex gap-2">
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
          
          <div className="mb-4">
            <label className="block mb-2">Background Image:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleBackgroundUpload}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Logo:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex gap-2 mt-4">
           
            <button 
              onClick={generatePDF}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Generate PDF
            </button>
          </div>
      
        </div>
        
        <div className="preview-panel w-2/3">
          <h3 className="text-lg font-bold mb-4">Certificate Preview</h3>
          <div className="canvas-container border rounded p-2 bg-white">
            <canvas 
              ref={canvasRef} 
              className="w-full"
            />
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Test Certificate Data</h3>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
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

export default CertificateGenerator;