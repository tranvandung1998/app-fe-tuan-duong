import { useState } from "react";

export default function UploadImages({ multiple = false, onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleSelect = (e) => {
    const files = Array.from(e.target.files); // File[]
    onChange(files); // Trả File[] cho parent

    // Preview
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" multiple={multiple} onChange={handleSelect} className="border p-2 rounded" />

      <div className="flex gap-2 flex-wrap">
        {previews.map((url, idx) => (
          <img key={idx} src={url} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded border" />
        ))}
      </div>
    </div>
  );
}
