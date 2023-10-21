import { Inter } from "@next/font/google";
import axios from "axios";
import DesignLayout from "../containers/Layout/DesignLayout";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const baseURL = "https://handdnn2icom.wptangtoc-ols.com"; // Đường dẫn đến cửa hàng của bạn
  const consumerKey = "ck_98ba4f1e83558ff674d93a0d73a843562ab33be8";
  const consumerSecret = "cs_1749e17653181c484a7e1a21ad057e4ca3c00096";
  const WooCommerce = axios.create({
    baseURL: `${baseURL}/wp-json/wc/v3`,
    auth: {
      username: consumerKey,
      password: consumerSecret,
    },
  });
  // Lấy danh sách sản phẩm
  async function getAllProducts() {
    try {
      const response = await WooCommerce.get("/products");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      throw error;
    }
  }

  useEffect(() => {
    getAllProducts().then((pro) => console.log(pro));
  }, []);
  return <DesignLayout />;
}
