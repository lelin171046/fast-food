import React, { useState } from "react";
import Cover from "../../Component/Shared/Cover";
import oderCover from "../../assets/shop/banner2.jpg";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../../Component/Shared/FoodCard";
import { useParams } from "react-router-dom";
// import FoodCard from "../../Component/FoodCard"; // Make sure this is importe
import { Helmet } from 'react-helmet';


const OrderFood = () => {
  const [menu] = useMenu();
  const categories = ["Salad", "Pizza", "Soups", "Desserts", "Drinks"];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category)
  const [activeTab, setActiveTab] = useState(initialIndex);

  // Filter menu items dynamically
  const filteredMenu = {
    Salad: menu.filter((item) => item.category === "salad"),
    Pizza: menu.filter((item) => item.category === "pizza"),
    Soups: menu.filter((item) => item.category === "soup"),
    Desserts: menu.filter((item) => item.category === "dessert"),
    Drinks: menu.filter((item) => item.category === "drink"),
  };

  return (
    <div>

<Helmet>
                <title>Fast Food | Menu</title>
            </Helmet>
      <Cover img={oderCover} title={"Order Your Food Now"} />

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`pb-2 text-lg font-semibold ${
              activeTab === category
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenu[activeTab].map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderFood;
