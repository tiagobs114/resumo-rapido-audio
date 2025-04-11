
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDFFromContent = async (title: string, content: string): Promise<Blob> => {
  // Create a temporary container to render the content
  const container = document.createElement('div');
  
  // Apply styling for PDF rendering
  container.style.padding = '40px';
  container.style.maxWidth = '800px';
  container.style.margin = '0 auto';
  container.style.fontFamily = 'Arial, sans-serif';
  
  // Use line breaks instead of rendering raw HTML for safety
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="font-size: 24px; margin-bottom: 10px;">${title}</h1>
      <p style="color: #666; font-size: 12px;">Gerado em ${new Date().toLocaleDateString()} por Resumo Rápido</p>
    </div>
    <div style="line-height: 1.6;">
      ${content.replace(/\n/g, '<br/>')}
    </div>
  `;
  
  // Temporarily append the container to the document
  document.body.appendChild(container);
  
  try {
    // Use html2canvas to capture the rendered content
    const canvas = await html2canvas(container, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    });
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let firstPage = true;
    
    // Add image to PDF (potentially across multiple pages)
    while (heightLeft > 0) {
      if (!firstPage) {
        pdf.addPage();
      } else {
        firstPage = false;
      }
      
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );
      
      heightLeft -= pageHeight;
      position -= pageHeight;
      
      if (heightLeft < 0) {
        break;
      }
    }
    
    // Generate PDF blob
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } finally {
    // Clean up: remove the temporary container
    document.body.removeChild(container);
  }
};

export const downloadPDF = async (title: string, content: string): Promise<void> => {
  try {
    const pdfBlob = await generatePDFFromContent(title, content);
    
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `${title.replace(/\s+/g, '_')}.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
