import {
  UserOutlined,
  TrophyOutlined,
  PictureOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // hook để điều hướng

  // hàm click
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative w-full h-full min-h-screen font-sans">
      {/* Background */}
      <img
        src="https://standboothvietnam.com/wp-content/uploads/2023/08/gach-op-lat-1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Nội dung */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Section */}
        <div className="flex justify-center items-start p-8 md:p-16">
          <img
            className="w-[20%]"
            src="https://i.postimg.cc/05GDTpgx/logoIcon.png"
            alt="logo"
          />
        </div>

        {/* Right Section */}
        <div className="grid grid-rows-2">
          {/* Top 4 menu */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {/* GIỚI THIỆU */}
            <div
              onClick={() => handleClick("/home")}
              className="flex flex-col items-center justify-center bg-black/40 cursor-pointer p-6"
            >
              <div className="border-icon-text flex flex-col items-center justify-center">
                <div className="bg-red-500 rounded-full p-4 flex items-center justify-center mb-2">
                  <UserOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <span className="text-base md:text-lg font-semibold text-white font-sans">
                  GIỚI THIỆU
                </span>
              </div>
            </div>

            {/* SẢN PHẨM */}
            <div
              onClick={() => handleClick("/products")}
              className="flex flex-col items-center justify-center bg-black/40 cursor-pointer p-6"
            >
              <div className="border-icon-text flex flex-col items-center justify-center">
                <div className="bg-red-500 rounded-full p-4 flex items-center justify-center mb-2">
                  <TrophyOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <span className="text-base md:text-lg font-semibold text-white font-sans">
                  SẢN PHẨM
                </span>
              </div>
            </div>

            {/* THÀNH VIÊN */}
            <div
              onClick={() => handleClick("/members")}
              className="flex flex-col items-center justify-center bg-black/40 cursor-pointer p-6"
            >
              <div className="border-icon-text flex flex-col items-center justify-center">
                <div className="bg-red-500 rounded-full p-4 flex items-center justify-center mb-2">
                  <TeamOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <span className="text-base md:text-lg font-semibold text-white font-sans">
                  THÀNH VIÊN
                </span>
              </div>
            </div>

            {/* LIÊN HỆ */}
            <div
              onClick={() => handleClick("/contact")}
              className="flex flex-col items-center justify-center bg-black/40 cursor-pointer p-6"
            >
              <div className="border-icon-text flex flex-col items-center justify-center">
                <div className="bg-red-500 rounded-full p-4 flex items-center justify-center mb-2">
                  <MailOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <span className="text-base md:text-lg font-semibold text-white font-sans">
                  LIÊN HỆ
                </span>
              </div>
            </div>
          </div>

          {/* Bottom contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-black/80 text-center text-sm md:text-base font-sans">
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-r border-gray-700 text-white">
              <EnvironmentOutlined className="text-xl mb-2" />
              <p>Thôn Tân An - Xã Đông Thụy Anh - tỉnh Hưng Yên</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-r border-gray-700 text-white">
              <PhoneOutlined className="text-xl mb-2" />
              <p>+84901 191 616</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 text-white">
              <MailOutlined className="text-xl mb-2" />
              <p>contact@sm4s.vn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
