import React, { useState } from "react";
import { Carousel, Image, Modal } from "antd";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!product) return <p className="text-center mt-10 text-red-500">Không tìm thấy sản phẩm</p>;

  const images = product.detail_images?.length
    ? product.detail_images
    : [product.product_images]; // fallback 1 ảnh chính

  const openModal = (index) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Carousel chính */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Carousel autoplay dots={true}>
          {images.map((url, idx) => (
            <div key={idx}>
              <img
                src={url}
                alt={`${product.name}-${idx}`}
                className="w-full h-96 object-cover"
                onError={(e) => e.currentTarget.src = product.product_images}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((url, idx) => (
          <div key={idx} className="flex-shrink-0 cursor-pointer" onClick={() => openModal(idx)}>
            <Image
              src={url}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: "6px" }}
              preview={false}
            />
          </div>
        ))}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-pink-500 text-2xl font-semibold mb-1">{Number(product.price).toLocaleString()} ₫/tháng</p>
        {product.size && <p className="text-gray-600 mb-1">Diện tích: {product.size} m²</p>}
        {product.location && <p className="text-gray-700 mb-1">Vị trí: {product.location}</p>}
        {product.project && <p className="text-blue-600 mb-1">Dự án: {product.project}</p>}
        {product.updatedAt && <p className="text-gray-500">Cập nhật: {product.updatedAt}</p>}
      </div>

      {/* Mô tả chi tiết */}
      {product.detail_description && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
          <p className="text-gray-700">{product.detail_description}</p>
        </div>
      )}

      {/* Modal full màn hình */}
{/* Modal full màn hình */}
<Modal
  open={isModalOpen}
  footer={null}
  onCancel={() => setIsModalOpen(false)}
  width="90%"
  style={{ top: 20 }}
  bodyStyle={{ padding: 0, backgroundColor: "#000" }}
  centered
>
  <Carousel initialSlide={currentSlide} dots={true} autoplay>
    {images.map((url, idx) => (
      <div
        key={idx}
        className="flex justify-center items-center h-[80vh] bg-black"
      >
        <img
          src={url}
          alt={`${product.name}-${idx}`}
          className="max-h-full max-w-full object-contain"
          onError={(e) => (e.currentTarget.src = product.product_images)}
        />
      </div>
    ))}
  </Carousel>
</Modal>

    </div>
  );
}
