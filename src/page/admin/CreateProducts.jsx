import { useMutation, useQuery } from '@tanstack/react-query';
import { createNavbar, getNavbar, createTypes, createProduct, getTypes, createProductDetail } from '../../api/products';
import { message, Button, Input, Select } from 'antd';
import { useState } from 'react';
import UploadImages from '../../../src/component/UploadImages'

export default function CreateProducts() {
  const [name, setName] = useState('');
  const [nameType, setNameType] = useState('');
  const [categoryId, setCategoryId] = useState(null);

  // State cho sản phẩm
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [typeId, setTypeId] = useState(null);

  // State cho chi tiết sản phẩm
  const [detailProductName, setDetailProductName] = useState('');
  const [productDetail, setProductDetail] = useState('');
  const [detailImages, setDetailImages] = useState([]);

  // ======= Tạo navbar =======
  const { mutate, isLoading: isCreatingNav } = useMutation({
    mutationFn: createNavbar,
    onSuccess: () => {
      message.success('Tạo danh mục thành công');
      setName('');
    },
    onError: () => {
      message.error('Tạo danh mục thất bại');
    },
  });

  const handleCreateNav = () => {
    if (!name.trim()) return message.warning('Tên danh mục không được để trống');
    mutate({ name });
  };

  // Danh sách nav (danh mục cha)
  const { data } = useQuery({
    queryKey: ['navbar'],
    queryFn: getNavbar,
  });
  const listNav = data?.data || [];

  // ======= Tạo loại sản phẩm =======
  const { mutate: mutateType, isLoading: isCreatingType } = useMutation({
    mutationFn: createTypes,
    onSuccess: () => {
      message.success('Tạo loại sản phẩm thành công');
      setNameType('');
      setCategoryId(null);
    },
    onError: () => {
      message.error('Tạo loại sản phẩm thất bại');
    },
  });

  const handleCreateTypes = () => {
    if (!nameType.trim()) return message.warning('Tên loại sản phẩm không được để trống');
    if (!categoryId) return message.warning('Vui lòng chọn danh mục cha');
    mutateType({
      name: nameType,
      category_id: categoryId,
    });
  };

  // Lấy danh sách loại sản phẩm để chọn khi tạo sản phẩm
  const { data: typesData } = useQuery({
    queryKey: ['types'],
    queryFn: getTypes,
  });
  const listTypes = typesData?.data || [];

  // ======= Tạo sản phẩm =======
  const { mutate: mutateProduct, isLoading: isCreatingProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success('Tạo sản phẩm thành công');
      setProductName('');
      setProductPrice('');
      setProductImage('');
      setProductDescription('');
      setTypeId(null);
    },
    onError: () => {
      message.error('Tạo sản phẩm thất bại');
    },
  });

  const handleCreateProduct = () => {
    if (!productName.trim()) return message.warning('Tên sản phẩm không được để trống');
    if (!productPrice) return message.warning('Giá sản phẩm không được để trống');
    if (!typeId) return message.warning('Vui lòng chọn loại sản phẩm');

    mutateProduct({
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      type_id: typeId,
    });
  };

  // ======= Tạo chi tiết sản phẩm =======
  const { mutate: mutateProductDetail, isLoading: isCreatingDetail } = useMutation({
    mutationFn: createProductDetail,
    onSuccess: () => {
      message.success('Thêm chi tiết sản phẩm thành công');
      setDetailProductName('');
      setProductDetail('');
      setDetailImages([]);
    },
    onError: () => {
      message.error('Thêm chi tiết sản phẩm thất bại');
    },
  });

  const handleCreateProductDetail = () => {
    if (!detailProductName.trim()) return message.warning('Tên sản phẩm không được để trống');
    if (!productDetail.trim()) return message.warning('Chi tiết sản phẩm không được để trống');

    mutateProductDetail({
      product_name: detailProductName, // phải trùng với name sản phẩm đã tạo
      detail: productDetail,
      images: detailImages, // tên trường backend nhận là 'images'
    });

  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Tạo Sản Phẩm</h1>

      {/* Tạo navbar */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Tạo danh mục sản phẩm</h2>
        <div className="flex gap-3 max-w-md">
          <Input
            placeholder="Nhập tên danh mục"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="primary" loading={isCreatingNav} onClick={handleCreateNav}>
            Lưu
          </Button>
        </div>
      </div>

      {/* Tạo loại sản phẩm */}
      <div className="mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-2">Tạo loại sản phẩm</h2>
        <Input
          className="mb-2"
          placeholder="Nhập tên loại sản phẩm"
          value={nameType}
          onChange={(e) => setNameType(e.target.value)}
        />
        <Select
          placeholder="Chọn danh mục cha"
          className="w-full mb-2"
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
          options={listNav.map((nav) => ({
            label: nav.name,
            value: nav.id,
          }))}
        />
        <Button type="primary" loading={isCreatingType} onClick={handleCreateTypes}>
          Lưu
        </Button>
      </div>

      {/* Tạo sản phẩm */}
      <div className="max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Tạo sản phẩm</h2>
        <Input
          className="mb-2"
          placeholder="Tên sản phẩm"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          className="mb-2"
          placeholder="Giá sản phẩm"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <UploadImages
          multiple
          onChange={(images) => {
            // Backend hiện tại expects product_images: string[]
            const imgs = images.map((img) => img.includes(',') ? img.split(',')[1] : img);
            setDetailImages(imgs);
          }}
        />

        <Input
          className="mb-2"
          placeholder="Mô tả sản phẩm"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <Select
          placeholder="Chọn loại sản phẩm"
          className="w-full mb-2"
          value={typeId}
          onChange={(value) => setTypeId(value)}
          options={listTypes.map((type) => ({
            label: type.name,
            value: type.id,
          }))}
        />
        <Button type="primary" loading={isCreatingProduct} onClick={handleCreateProduct}>
          Lưu sản phẩm
        </Button>
      </div>

      {/* Tạo chi tiết sản phẩm */}
      <div className="max-w-md">
        <h2 className="text-lg font-semibold mb-2">Tạo chi tiết sản phẩm</h2>
        <Input
          className="mb-2"
          placeholder="Tên sản phẩm (đã tạo)"
          value={detailProductName}
          onChange={(e) => setDetailProductName(e.target.value)}
        />
        <Input.TextArea
          className="mb-2"
          placeholder="Chi tiết sản phẩm"
          value={productDetail}
          onChange={(e) => setProductDetail(e.target.value)}
        />
        <UploadImages
          multiple
          onChange={(images) => {
            const imgs = images.map((img) => img.split(',')[1] || img);
            setDetailImages(imgs);
          }}
        />
        <Button type="primary" loading={isCreatingDetail} onClick={handleCreateProductDetail}>
          Lưu chi tiết sản phẩm
        </Button>
      </div>
    </div>
  );
}
