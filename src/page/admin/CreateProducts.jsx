import { useMutation, useQuery } from '@tanstack/react-query';
import { createNavbar, getNavbar, createTypes } from '../../api/products';
import { message, Button, Input, Select } from 'antd';
import { useState } from 'react';

export default function CreateProducts() {
  const [name, setName] = useState('');
  const [nameType, setNameType] = useState('');
  const [categoryId, setCategoryId] = useState(null); // lưu danh mục được chọn

  // Tạo navbar
  const { mutate, isLoading: isCreatingNav } = useMutation({
    mutationFn: createNavbar,
    onSuccess: () => {
      message.success('Tạo danh mục thành công');
      setName('');
    },
    onError: (err) => {
      console.error(err);
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
  const listNav = data?.data;
  console.log(listNav);
    

  // Tạo loại sản phẩm
  const { mutate: mutateType, isLoading: isCreatingType } = useMutation({
    mutationFn: createTypes,
    onSuccess: () => {
      message.success('Tạo loại sản phẩm thành công');
      setNameType('');
      setCategoryId(null);
    },
    onError: (err) => {
      console.error(err);
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
          <Button
            type="primary"
            loading={isCreatingNav}
            onClick={handleCreateNav}
          >
            Lưu
          </Button>
        </div>
      </div>

      {/* Tạo loại sản phẩm */}
      <div className="max-w-md">
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
          options={
            Array.isArray(listNav)
              ? listNav.map((nav) => ({
                  label: nav.name,
                  value: nav.id,
                }))
              : []
          }
        />
        <Button
          type="primary"
          loading={isCreatingType}
          onClick={handleCreateTypes}
        >
          Lưu
        </Button>
      </div>

      {/* tao san pham */}
      
    </div>
  );
}
