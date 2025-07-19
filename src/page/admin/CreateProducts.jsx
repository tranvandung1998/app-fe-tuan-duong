import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../../api/products';
import { message, Button, Input } from 'antd';
import { useState } from 'react';

export default function CreateProducts() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success('Product created successfully');
      setName('');
      setPrice('');
      setDescription('');
    },
    onError: (err) => {
      console.error(err);
      message.error('Failed to create product');
    },
  });

  const handleSubmit = () => {
    console.log(2222);
    
    if (!name.trim()) return message.warning('Name is required');
    if (!price.trim() || isNaN(price)) return message.warning('Valid price is required');

    mutate({
      subcategory_id: 1, // tạm cứng, có thể dùng select dropdown sau
      name,
      price: parseInt(price, 10),
      description,
      images: ['san1.jpg', 'san2.jpg'], // tạm cứng, sau thay bằng upload thực tế
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <div className="flex flex-col gap-3 max-w-md">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input.TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <Button type="primary" loading={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
