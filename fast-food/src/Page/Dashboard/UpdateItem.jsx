import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxios from "../../Hooks/useAxios";
import { useLoaderData, useParams, } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const img_hosting_key = import.meta.env.VITE_Image_Key;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateItem = () => {

 const { id } = useParams(); // get id from URL
  const axiosSecure = useAxios();
  const axiosPublic = useAxiosPublic();

  const [item, setItem] = useState();
  const { register, handleSubmit, reset } = useForm();

  // ✅ Load the item by ID
  useEffect(() => {
    axiosSecure.get(`/menu/${id}`)
      .then(res => {
        setItem(res.data);
        // populate form with existing values
        reset(res.data);
        console.log(item)
      })
      .catch(err => {
        console.error("Failed to load item:", err);
      });
  }, [id, axiosSecure, reset]);



  const onSubmit = async data => {
    console.log(data)

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: { 'content-type': 'multipart/form-data' }
    });
    console.log(res.data)

    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      }
      //
      const menuRes = await axiosSecure.patch(`/menu/${id}`, menuItem);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else('try again')
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <div className="text-center text-xl">
        <h2>Update Your Item</h2>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          Recipe Name
        </label>
        <input
        defaultValue={name}
          id="name"
          name="name"
          type="text"
          {...register('name', { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="flex justify-between gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
            Category
          </label>
          <select {...register('category')} className="w-full select select-success px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" >
            <option disabled={true}>Select Category</option>
            <option value={'salad'}>Salad</option>
            <option value={'pizza'}>Pizza</option>
            <option value={'soup'}>Soup</option>
            <option value={'dessert'}>Dessert</option>
            <option value={'salad'}>Salad</option>
            <option value={'drinks'}>Drinks</option>

          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            {...register('price')}
            name="price"
            type="number"

            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="details">
          Recipe Detail
        </label>
        <textarea
          {...register('recipe')}
          id="details"
          name="details"

          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          {...register('image')}
          required

          className="w-full text-sm  text-gray-600 file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-orange-100 file:text-indigo-700
          hover:file:bg-orange-100"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-400 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
      >
        Update Item
      </button>
    </form>
  );
};

export default UpdateItem;