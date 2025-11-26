import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function UploadImage({ onChange }) {
  const [preview, setPreview] = useState(null);

  const handleSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file); // gửi thẳng File lên FE state
  };

  return (
    <label className="border rounded-lg w-40 h-40 flex items-center justify-center cursor-pointer relative overflow-hidden">
      {preview ? <img src={preview} className="w-full h-full object-cover" /> : <PlusOutlined />}
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleSelect}
      />
    </label>
  );
}
