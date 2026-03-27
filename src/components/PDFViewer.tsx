import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isOpen, setIsOpen] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.max(1, Math.min(prev + offset, numPages)));
  };

  const changeScale = (delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(prev + delta, 2.0)));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 flex items-center gap-2"
      >
        Xem thông tin chi tiết (PDF)
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <h3 className="text-white font-bold">GenApax HCM - Thông tin chi tiết</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <button onClick={() => changeScale(-0.1)} className="text-white p-1 hover:bg-gray-700 rounded">
              <ZoomOut size={20} />
            </button>
            <span className="text-white text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => changeScale(0.1)} className="text-white p-1 hover:bg-gray-700 rounded">
              <ZoomIn size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <button 
              onClick={() => changePage(-1)} 
              disabled={pageNumber <= 1}
              className="text-white p-1 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white text-sm">
              {pageNumber} / {numPages}
            </span>
            <button 
              onClick={() => changePage(1)} 
              disabled={pageNumber >= numPages}
              className="text-white p-1 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto flex items-start justify-center p-8">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-white">Đang tải PDF...</div>}
          error={<div className="text-red-500">Lỗi tải PDF</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}