import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await getProductDetail({ id: Number(id) });
        setProduct(res.data[0] || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  console.log("Product state:", product);

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  // Sử dụng slide_image nếu images không có
  const imagesArray =
    product.images?.length > 0
      ? product.images
      : product.slide_image
      ? Object.values(product.slide_image).filter(Boolean)
      : [];

  return (
    <div className="p-4">
      ádhadhajskdhjakshdbjkasblfhjashnfjkhlmakfajklsdksadjsakdbsajcbn cnc sndb sbdjsbdjksabdjsabdjksabdjkbdjkasbdk
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {imagesArray.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name}-${idx}`}
            className="w-full h-48 object-cover rounded"
            onError={(e) =>
              (e.currentTarget.src =
                "https://image.plo.vn/1200x630/Uploaded/2025/obflucp/2014_04_03/82801_20140402170734_JETO.jpg")
            }
          />
        ))}
      </div>
    </div>
  );
}
