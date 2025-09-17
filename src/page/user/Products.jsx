import React from "react";
import { Card } from "antd";
import { UserOutlined, TrophyOutlined, ProjectOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const Products = () => {
  const features = [
    { icon: <UserOutlined />, title: "GIỚI THIỆU" },
    { icon: <TrophyOutlined />, title: "THÀNH TỰU" },
    { icon: <ProjectOutlined />, title: "DỰ ÁN ĐÃ LÀM" },
    { icon: <MailOutlined />, title: "LIÊN HỆ" },
  ];

  const contacts = [
    { icon: <EnvironmentOutlined />, text: "Tầng 4, Tòa nhà số 97 - 99 Láng Hạ, Đống Đa, Hà Nội (Tòa nhà Petrowaco)" },
    { icon: <PhoneOutlined />, text: "+84901 191 616" },
    { icon: <MailOutlined />, text: "contact@sm4s.vn" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[80vh]">
        <div className="md:w-1/2 flex flex-col justify-center items-start p-8 bg-black bg-opacity-50">
          <p className="text-white text-lg mb-2">Xin chào, tôi là</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">James Willians Rex</h1>
          <p className="text-red-500 text-lg">Nhà thiết kế đồ họa và web</p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/your-hero-image.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            hoverable
            className="bg-black bg-opacity-50 text-center flex flex-col justify-center items-center py-12 rounded-lg"
          >
            <div className="text-3xl text-red-500 mb-2">{feature.icon}</div>
            <p className="text-white font-semibold">{feature.title}</p>
          </Card>
        ))}
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8 bg-gray-800">
        {contacts.map((contact, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="text-2xl text-white mb-2">{contact.icon}</div>
            <p className="text-white">{contact.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
