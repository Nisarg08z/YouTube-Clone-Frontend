import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileSelect, acceptedFileTypes = {}, disabled }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setFilePreview(URL.createObjectURL(file));
      setIsUploaded(true);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const removeFile = () => {
    setFilePreview(null);
    setIsUploaded(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    disabled,
  });

  return (
    <div className="w-full">
      {!isUploaded ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 bg-[#2c2c2c] hover:bg-[#333] transition ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center animate-fade-in">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mb-2">
              📁
            </div>
            <p>{isDragActive ? "Drop the file here..." : "Click or drag to upload"}</p>
            <p className="text-xs text-gray-500 mt-1">
              Supported: SVG, PNG, JPG, GIF, WEBP / MP4, MOV
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4 space-y-2 animate-fade-in">
          {acceptedFileTypes["video/*"] ? (
            <video className="w-full max-h-40 rounded-lg" controls src={filePreview} />
          ) : (
            <img src={filePreview} alt="Preview" className="max-h-40 rounded-lg" />
          )}
          <div className="text-green-400">File uploaded successfully</div>
          <button
            onClick={removeFile}
            className="text-red-400 hover:text-red-500 transition"
          >
            ❌ Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
