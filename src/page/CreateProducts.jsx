import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNavbar,
  getNavbar,
  createTypes,
  createProduct,
  getTypes,
  createProductDetail,
} from "../api/products";
import { message, Button, Input, Select, Steps } from "antd";
import { useState } from "react";
import UploadImages from "../component/UploadImages";

export default function CreateProducts() {
  const [currentStep, setCurrentStep] = useState(0);

  // --- NAVBAR ---
  const [name, setName] = useState("");

  // --- TYPE ---
  const [nameType, setNameType] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  // --- PRODUCT ---
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [typeId, setTypeId] = useState(null);
  const [productImages, setProductImages] = useState([]);

  // --- PRODUCT DETAIL ---
  const [detailProductName, setDetailProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [detailImages, setDetailImages] = useState([]);

  // ===== Query Data =====
  const { data: navData, refetch: refetchNav } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });
  const listNav = navData?.data || [];

  const { data: typesData, refetch: refetchTypes } = useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });
  const listTypes = typesData?.data || [];

  // ===== Mutations =====
  const { mutate: createNav, isLoading: creatingNav } = useMutation({
    mutationFn: createNavbar,
    onSuccess: () => {
      message.success("Tạo danh mục thành công");
      setName("");
      refetchNav();
      setCurrentStep(1);
    },
    onError: () => message.error("Tạo danh mục thất bại"),
  });

  const { mutate: createType, isLoading: creatingType } = useMutation({
    mutationFn: createTypes,
    onSuccess: () => {
      message.success("Tạo loại sản phẩm thành công");
      setNameType("");
      setCategoryId(null);
      refetchTypes();
      setCurrentStep(2);
    },
    onError: () => message.error("Tạo loại sản phẩm thất bại"),
  });

  const { mutate: createProd, isLoading: creatingProd } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Tạo sản phẩm thành công");
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setTypeId(null);
      setProductImages([]);
      setCurrentStep(3);
    },
    onError: () => message.error("Tạo sản phẩm thất bại"),
  });

  const { mutate: createDetail, isLoading: creatingDetail } = useMutation({
    mutationFn: createProductDetail,
    onSuccess: () => {
      message.success("Thêm chi tiết sản phẩm thành công");
      setDetailProductName("");
      setProductDetail("");
      setDetailImages([]);
    },
    onError: () => message.error("Thêm chi tiết sản phẩm thất bại"),
  });

  // ===== Handlers =====
  const handleCreateNav = () => {
    if (!name.trim()) return message.warning("Tên danh mục không được để trống");
    createNav({ name });
  };

  const handleCreateType = () => {
    if (!nameType.trim()) return message.warning("Tên loại không được để trống");
    if (!categoryId) return message.warning("Vui lòng chọn danh mục cha");
    createType({ name: nameType, category_id: categoryId });
  };

  const handleCreateProduct = () => {
    if (!productName.trim()) return message.warning("Tên sản phẩm không được để trống");
    if (!productPrice) return message.warning("Giá sản phẩm không được để trống");
    if (!typeId) return message.warning("Chọn loại sản phẩm");
    if (!productImages.length) return message.warning("Vui lòng chọn ảnh sản phẩm");

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("type_id", typeId.toString());
    formData.append("description", productDescription || "");

    productImages.forEach((file) => formData.append("image", file)); // multiple files

    createProduct(formData);
  };


  const handleCreateDetail = () => {
    if (!detailProductName.trim()) return message.warning("Tên sản phẩm không được để trống");
    if (!productDetail.trim()) return message.warning("Chi tiết sản phẩm không được để trống");
    createDetail({
      product_name: detailProductName,
      detail: productDetail,
      images: detailImages,
    });
  };

  // ===== Steps UI =====
  const steps = [
    {
      title: "Danh mục",
      content: (
        <div className="max-w-md">
          <Input
            placeholder="Nhập tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2"
          />
          <Button type="primary" loading={creatingNav} onClick={handleCreateNav}>
            Lưu danh mục
          </Button>
        </div>
      ),
    },
    {
      title: "Loại sản phẩm",
      content: (
        <div className="max-w-md">
          <Input
            placeholder="Tên loại sản phẩm"
            value={nameType}
            onChange={(e) => setNameType(e.target.value)}
            className="mb-2"
          />
          <Select
            placeholder="Chọn danh mục cha"
            className="w-full mb-2"
            value={categoryId}
            onChange={(val) => setCategoryId(val)}
            options={listNav.map((n) => ({ label: n.name, value: n.id }))}
          />
          <Button type="primary" loading={creatingType} onClick={handleCreateType}>
            Lưu loại sản phẩm
          </Button>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      content: (
        <div className="max-w-md">
          <Input
            placeholder="Tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Giá sản phẩm"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Mô tả sản phẩm"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="mb-2"
          />
          <Select
            placeholder="Chọn loại sản phẩm"
            className="w-full mb-2"
            value={typeId}
            onChange={(val) => setTypeId(val)}
            options={listTypes.map((t) => ({ label: t.name, value: t.id }))}
          />
          <UploadImages
            multiple
            onChange={(files) => setProductImages(files)} // files là File[]
          />

          <Button type="primary" loading={creatingProd} onClick={handleCreateProduct}>
            Lưu sản phẩm
          </Button>
        </div>
      ),
    },
    {
      title: "Chi tiết sản phẩm",
      content: (
        <div className="max-w-md">
          <Input
            placeholder="Tên sản phẩm (đã tạo)"
            value={detailProductName}
            onChange={(e) => setDetailProductName(e.target.value)}
            className="mb-2"
          />
          <Input.TextArea
            placeholder="Chi tiết sản phẩm"
            value={productDetail}
            onChange={(e) => setProductDetail(e.target.value)}
            className="mb-2"
          />
          <UploadImages
            multiple
            onChange={(imgs) => {
              const formatted = imgs.map((img) => img.split(",")[1] || img);
              setDetailImages(formatted);
            }}
          />
          <Button type="primary" loading={creatingDetail} onClick={handleCreateDetail}>
            Lưu chi tiết
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-green-700">Quy trình tạo sản phẩm</h1>
      <Steps current={currentStep} className="mb-6" items={steps.map((s) => ({ title: s.title }))} />

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        {steps[currentStep].content}
      </div>

      <div className="flex justify-between max-w-md">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
}
