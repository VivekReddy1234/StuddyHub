import React, { useState, useRef } from 'react';
import { FileUp, Check, X, Loader2 } from 'lucide-react';

const PdfUploader = ({ onUploadComplete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setUploadError('Please select a PDF file');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('Please select a PDF file');
      return;
    }
    
    if (!title.trim()) {
      setUploadError('Please enter a title');
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pdf_uploads'); // Replace with your Cloudinary upload preset
      
      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload`, // Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      
      // Call the callback with the uploaded data
      onUploadComplete({
        title,
        description,
        pdfUrl: data.secure_url,
        publicId: data.public_id,
      });
      
      setUploadSuccess(true);
      
      // Reset form after successful upload
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setFile(null);
        setUploadSuccess(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload PDF. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">Upload PDF Document</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter document title"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter document description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-1">
            PDF Document
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="pdf-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                >
                  <span>Upload a PDF</span>
                  <input
                    id="pdf-upload"
                    name="pdf-upload"
                    type="file"
                    className="sr-only"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF up to 10MB</p>
            </div>
          </div>
          {file && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        
        {uploadError && (
          <div className="text-red-500 text-sm mt-2 flex items-center">
            <X className="mr-1 h-4 w-4" />
            {uploadError}
          </div>
        )}
        
        {uploadSuccess && (
          <div className="text-green-500 text-sm mt-2 flex items-center">
            <Check className="mr-1 h-4 w-4" />
            PDF uploaded successfully!
          </div>
        )}
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Uploading...
              </>
            ) : (
              'Upload PDF'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PdfUploader;