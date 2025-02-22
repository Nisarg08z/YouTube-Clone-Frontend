import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileSelect, acceptedFileTypes = {} }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      
      setFilePreview(URL.createObjectURL(file)); // Generate preview
      setIsUploaded(true); // Hide upload box

      if (onFileSelect) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const removeFile = () => {
    setFilePreview(null);
    setIsUploaded(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    multiple: false,
  });

  return (
    <div className="w-full">
      {!isUploaded ? (
        <div
          {...getRootProps()}
          className="w-full h-40 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center text-center p-4 cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
        >
          <input {...getInputProps()} />
          <div className="text-gray-300">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mb-2">
              📤
            </div>
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>
                <span className="text-teal-400">Click to upload</span> or drag
                and drop
              </p>
            )}
            <p className="text-xs">
              {Object.keys(acceptedFileTypes).includes("image/*")
                ? "SVG, PNG, JPG, GIF, WEBP"
                : "MP4, MOV, AVI, MKV"}{" "}
              (max. 800x400px)
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center">
          {Object.keys(acceptedFileTypes).includes("video/*") ? (
            <video className="max-w-full max-h-40 rounded-lg" controls>
              <source src={filePreview} type="video/mp4" />
            </video>
          ) : (
            <img
              src={filePreview}
              alt="File Preview"
              className="max-w-full max-h-40 rounded-lg"
            />
          )}
          <div className="flex items-center gap-3 mt-2">
            <p className="text-green-400">File uploaded successfully!</p>
            <button
              onClick={removeFile}
              className="text-red-400 hover:text-red-500 transition"
            >
              ❌ Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
