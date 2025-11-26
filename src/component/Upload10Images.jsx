import { PlusOutlined } from "@ant-design/icons";
import React from "react";

export default function Upload10Images({ value, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: 10 }).map((_, index) => {
        const file = value[index];
        return (
          <label key={index} className="border rounded-lg w-24 h-24 cursor-pointer relative overflow-hidden flex items-center justify-center">
            {file ? (
              <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <PlusOutlined />
                <span className="text-xs">Thêm</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                const newFiles = [...value];
                newFiles[index] = file;
                onChange(newFiles);
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

