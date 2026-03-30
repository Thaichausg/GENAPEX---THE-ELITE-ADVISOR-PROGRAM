import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Download, Maximize2, Minimize2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isOpen, setIsOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth - 64);
        }
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setScale(1.0);
  }

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.max(1, Math.min(prev + offset, numPages)));
  };

  const changeScale = (delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(prev + delta, 3.0)));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = 'GenApax_HCM.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 flex items-center gap-2"
      >
        <Download size={18} />
        Xem thông tin chi tiết (PDF)
      </button>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="bg-gray-900 p-3 lg:p-4 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-white font-bold text-sm lg:text-base">GenApax HCM - Thông tin chi tiết</h3>
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <button 
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Tải file</span>
          </button>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1.5">
            <button onClick={() => changeScale(-0.25)} className="text-white p-1.5 hover:bg-gray-700 rounded">
              <ZoomOut size={18} />
            </button>
            <span className="text-white text-xs min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => changeScale(0.25)} className="text-white p-1.5 hover:bg-gray-700 rounded">
              <ZoomIn size={18} />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1.5">
            <button 
              onClick={() => changePage(-1)} 
              disabled={pageNumber <= 1}
              className="text-white p-1.5 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-white text-xs min-w-[60px] text-center">
              {pageNumber} / {numPages}
            </span>
            <button 
              onClick={() => changePage(1)} 
              disabled={pageNumber >= numPages}
              className="text-white p-1.5 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button 
            onClick={toggleFullscreen}
            className="text-white p-1.5 hover:bg-gray-700 rounded-lg"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white p-1.5 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto flex items-start justify-center p-2 lg:p-8 bg-gray-800">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-center">
                <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Đang tải PDF...</p>
              </div>
            </div>
          }
          error={
            <div className="text-red-500 text-center p-8">
              <p className="text-xl mb-2">Lỗi tải PDF</p>
              <p className="text-sm text-gray-400">Vui lòng thử lại hoặc tải file về máy</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            width={Math.min(containerWidth, 800)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl"
          />
        </Document>
      </div>
    </div>
  );
}