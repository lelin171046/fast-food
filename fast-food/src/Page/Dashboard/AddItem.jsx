import { useState } from "react";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast"

const img_hosting_key = import.meta.env.VITE_Image_Key;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddItem = () => {

  const { register, handleSubmit , reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios()
  



  const onSubmit = async data => {
    console.log(data)

    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {'content-type': 'multipart/form-data'}
    });
    console.log(res.data)

    if(res.data.success){
      const menuItem = {
        name : data.name,
        category: data.category,
        price : parseFloat(data.price),
        recipe : data.recipe,
        image : res.data.data.display_url,
      }
      //
      const menuRes = await axiosPublic.post('/menu', menuItem);
      console.log(menuRes.data)

      if(menuRes.data.insertedId){
        toast.success('Successfully created!');
        alert('')
        // reset()
        
        
      }
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <div className="text-center text-xl">
        <h2>Add Your Item</h2>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
          Recipe Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          {...register('name',{required: true})}
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

          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItem;