import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Download, ArrowLeft, Printer } from 'lucide-react';

function CertificatePage() {
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const [certificateData, setCertificateData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('certificateData');
    if (data) {
      setCertificateData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: 1123,
        height: 794,
      });

      const link = document.createElement('a');
      link.download = `certificate_${certificateData.certificate_id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating certificate image:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!certificateData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .certificate {
            box-shadow: none !important;
            border: 8px solid #001f3f !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            margin: 0 !important;
            page-break-inside: avoid;
          }
          .no-print {
            display: none !important;
          }
          .certificate * {
            color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 no-print">
          <button
            onClick={() => navigate('/form')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Form
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handlePrint}
              className="flex items-center bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center bg-yellow-500 text-blue-900 px-6 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              {downloading ? 'Downloading...' : 'Download PNG'}
            </button>
          </div>
        </div>

        <div
          ref={certificateRef}
          className="certificate bg-white border-8 border-blue-900 rounded-lg shadow-2xl mx-auto relative overflow-hidden"
          style={{ width: '1123px', height: '794px', maxWidth: '100%', aspectRatio: '1123/794' }}
        >
          {/* Subtle Background Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-blue-900/5"></div>

          {/* Gold Ribbon Banner */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold text-2xl font-['Playfair_Display'] shadow-lg border-2 border-yellow-600 clip-path-polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 25% 100%, 25% 75%, 0% 75%)">
            Certificate of Excellence
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center h-full px-12 py-8 relative z-10">
            <div className="text-center mb-12 mt-20">
              <p className="text-blue-900 text-xl mb-6 font-sans leading-relaxed">
                This certificate is proudly presented to
              </p>
              <h2 className="text-7xl font-bold text-yellow-600 mb-6 font-['Dancing_Script'] tracking-wide leading-tight">
                {certificateData.full_name}
              </h2>
              <p className="text-blue-900 text-xl mb-8 font-sans leading-relaxed">
                for outstanding achievement in
              </p>
              <h3 className="text-4xl font-bold text-blue-900 mb-12 font-['Playfair_Display']">
                {certificateData.domain}
              </h3>
            </div>

            {/* Certificate Details */}
            <div className="grid grid-cols-2 gap-12 w-full max-w-2xl mb-12">
              <div className="text-center">
                <p className="text-sm text-yellow-600 uppercase tracking-wide font-semibold mb-2">Certificate ID</p>
                <p className="text-xl font-bold text-blue-900">{certificateData.certificate_id}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-yellow-600 uppercase tracking-wide font-semibold mb-2">Issue Date</p>
                <p className="text-xl font-bold text-blue-900">{certificateData.issue_date}</p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between items-end w-full max-w-4xl mt-auto pb-8">
              <div className="text-center">
                <div className="border-b-2 border-yellow-500 w-48 mb-2"></div>
                <p className="text-sm text-blue-900 font-semibold">Director</p>
              </div>
              <div className="text-center">
                <div className="border-b-2 border-yellow-500 w-48 mb-2"></div>
                <p className="text-sm text-blue-900 font-semibold">Instructor</p>
              </div>
            </div>
            <p className="text-center text-blue-900 text-lg font-sans">
              Date of Issuance: {certificateData.issue_date}
            </p>

            {/* Gold Seal */}
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm border-4 border-yellow-700 shadow-lg z-20">
              CERTIFIED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
