import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectToDB from "../db/dbConnect.js";
import productModel from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesFolder = path.join(__dirname, "../images");

const products = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    imageNames: ["p_img1.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestSeller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageNames: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestSeller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageNames: ["p_img3.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestSeller: true
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    imageNames: ["p_img4.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "XXL"],
    bestSeller: true
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    imageNames: ["p_img5.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestSeller: true
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageNames: ["p_img6.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestSeller: true
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageNames: ["p_img7.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageNames: ["p_img8.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    imageNames: ["p_img9.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 110,
    imageNames: ["p_img10.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 120,
    imageNames: ["p_img11.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    imageNames: ["p_img12.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 130,
    imageNames: ["p_img13.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    imageNames: ["p_img14.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 140,
    imageNames: ["p_img15.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    imageNames: ["p_img16.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 150,
    imageNames: ["p_img17.png"],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    imageNames: ["p_img18.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 160,
    imageNames: ["p_img19.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageNames: ["p_img20.png"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 170,
    imageNames: ["p_img21.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Palazzo Pants with Waist Belt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageNames: ["p_img22.png"],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 180,
    imageNames: ["p_img23.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    imageNames: ["p_img24.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 190,
    imageNames: ["p_img25.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageNames: ["p_img26.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 200,
    imageNames: ["p_img27.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    imageNames: ["p_img28.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 210,
    imageNames: ["p_img29.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    imageNames: ["p_img30.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 220,
    imageNames: ["p_img31.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    imageNames: ["p_img32.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 230,
    imageNames: ["p_img33.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    imageNames: ["p_img34.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 240,
    imageNames: ["p_img35.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    imageNames: ["p_img36.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 250,
    imageNames: ["p_img37.png"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    imageNames: ["p_img38.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Printed Plain Cotton Shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 260,
    imageNames: ["p_img39.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    imageNames: ["p_img40.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 270,
    imageNames: ["p_img41.png"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    imageNames: ["p_img42.png"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 280,
    imageNames: ["p_img43.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    imageNames: ["p_img44.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 290,
    imageNames: ["p_img45.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    imageNames: ["p_img46.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 300,
    imageNames: ["p_img47.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 330,
    imageNames: ["p_img48.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 310,
    imageNames: ["p_img49.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Kid Tapered Slim Fit Trouser",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 340,
    imageNames: ["p_img50.png"],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Women Zip-Front Relaxed Fit Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 320,
    imageNames: ["p_img51.png"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  },
  {
    name: "Men Slim Fit Relaxed Denim Jacket",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 350,
    imageNames: ["p_img52.png"],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestSeller: false
  }
];

const seedProducts = async () => {
  try {
    await connectToDB();

    await productModel.deleteMany();
    console.log("Old products deleted");

    for (const item of products) {
      const uploadedImages = [];

      for (const imgName of item.imageNames) {
        const imgPath = path.join(imagesFolder, imgName);
        const uploaded = await uploadOnCloudinary(imgPath);
        uploadedImages.push(uploaded);
      }

      await productModel.create({
        name: item.name,
        description: item.description,
        price: item.price,
        images: uploadedImages,
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes,
        bestSeller: item.bestSeller
      });

      console.log(`Inserted: ${item.name}`);
    }

    console.log("✅ Seeding Completed");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedProducts();
