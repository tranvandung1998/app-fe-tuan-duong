import { useMutation, useQuery } from "@tanstack/react-query";
import { createNavbar, getNavbar, createTypes, getTypes, createFullProduct } from "../api/products";
import { message, Button, Input, Select, Steps } from "antd";
import { useState } from "react";
import UploadImages from "../component/UploadImages";
import Upload10Images from "../component/Upload10Images";
import { supabase } from "../../lib/supabaseClient";

export default function CreateProducts() {
  const [currentStep, setCurrentStep] = useState(0);

  // --- NAVBAR ---
  const [name, setName] = useState("");

  // --- TYPE ---
  const [nameType, setNameType] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  // --- PRODUCT + DETAIL ---
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [typeId, setTypeId] = useState(null);
  const [productImage, setProductImage] = useState(null); // 1 ảnh chính
  const [detailDescription, setDetailDescription] = useState("");
  const [detailImages, setDetailImages] = useState(Array(10).fill(null)); // 10 ô


  const uploadFile = async (file, folder) => {
    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(`${folder}/${fileName}`, file);
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(`${folder}/${fileName}`);
    return data.publicUrl;
  };


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

  const { mutate: createFull, isLoading: creatingFull } = useMutation({
    mutationFn: createFullProduct,
    onSuccess: () => {
      message.success("Tạo sản phẩm + chi tiết thành công");
      // reset form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setTypeId(null);
      setProductImage(null);
      setDetailDescription("");
      setDetailImages(Array(10).fill(null));
      setCurrentStep(3);
    },
    onError: () => message.error("Tạo sản phẩm + chi tiết thất bại"),
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

  const handleCreateFullProduct = async () => {
    try {
      console.log("Click submit", { productImage, detailImages, productName, productPrice });

      if (!productName.trim()) return message.warning("Tên sản phẩm không được để trống");
      if (!productPrice) return message.warning("Giá sản phẩm không được để trống");
      if (!typeId) return message.warning("Chọn loại sản phẩm");
      if (!productImage) return message.warning("Vui lòng chọn ảnh sản phẩm");
      if (detailImages.every((img) => img === null)) return message.warning("Vui lòng chọn ít nhất 1 ảnh chi tiết");

      message.loading({ content: "Đang upload ảnh...", key: "upload" });

      const productUrl = await uploadFile(productImage, "products");

      const detailUrls = [];
      for (const file of detailImages) {
        if (file) {
          const url = await uploadFile(file, "details");
          detailUrls.push(url);
        }
      }

      message.success({ content: "Upload xong", key: "upload" });

      // gửi JSON về BE
      createFull({
        name: productName,
        price: Number(productPrice),
        type_id: typeId,
        description: productDescription || "",
        product_images: productUrl,
        detail_description: detailDescription,
        detail_images: detailUrls,
      });
    } catch (err) {
      console.error(err);
      message.error("Upload ảnh thất bại");
    }
  };

  // ===== Steps UI =====
  const steps = [
    {
      title: "Danh mục",
      content: (
        <div className="max-w-md">
          <Input placeholder="Tên danh mục" value={name} onChange={(e) => setName(e.target.value)} className="mb-2" />
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
          <Input placeholder="Tên loại" value={nameType} onChange={(e) => setNameType(e.target.value)} className="mb-2" />
          <Select
            placeholder="Chọn danh mục cha"
            className="w-full mb-2"
            value={categoryId}
            onChange={(val) => setCategoryId(val)}
            options={listNav.map((n) => ({ label: n.name, value: n.id }))}
          />
          <Button type="primary" loading={creatingType} onClick={handleCreateType}>
            Lưu loại
          </Button>
        </div>
      ),
    },
    {
      title: "Sản phẩm + Chi tiết",
      content: (
        <div className="max-w-md">
          <Input placeholder="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} className="mb-2" />
          <Input placeholder="Giá sản phẩm" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="mb-2" />
          <Input placeholder="Mô tả sản phẩm" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="mb-2" />

          <Select
            placeholder="Chọn loại sản phẩm"
            className="w-full mb-2"
            value={typeId}
            onChange={(val) => setTypeId(val)}
            options={listTypes.map((t) => ({ label: t.name, value: t.id }))}
          />

          {/* Upload 1 ảnh product */}
          <UploadImages
            multiple={false}
            onChange={(file) => setProductImage(file)}
          />



          {/* Chi tiết */}
          <Input.TextArea placeholder="Chi tiết sản phẩm" value={detailDescription} onChange={(e) => setDetailDescription(e.target.value)} className="mb-2" />

          {/* 10 ô upload ảnh chi tiết */}
          <Upload10Images
            multiple={false}
            value={detailImages}
            onChange={(newFiles) => setDetailImages(newFiles)}
          />


          <Button type="primary" htmlType="button" loading={creatingFull} onClick={handleCreateFullProduct}>
            Lưu sản phẩm + chi tiết
          </Button>

        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-green-700">Quy trình tạo sản phẩm</h1>
      <Steps current={currentStep} className="mb-6" items={steps.map((s) => ({ title: s.title }))} />
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">{steps[currentStep]?.content}</div>
      <div className="flex justify-between max-w-md">
        <Button disabled={currentStep === 0} onClick={() => setCurrentStep((prev) => prev - 1)}>Quay lại</Button>
        <Button disabled={currentStep === steps.length - 1} onClick={() => setCurrentStep((prev) => prev + 1)}>Tiếp tục</Button>
      </div>
    </div>
  );
}
