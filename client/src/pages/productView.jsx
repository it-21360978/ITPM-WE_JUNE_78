import { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductReview from '../components/productReview';

export default function ProductView() {
  const { id } = useParams(); // Assuming you have a route parameter for product ID
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3030/product/${id}`)
      .then(response => {
        setProduct(response.data.product); // Assuming your API returns product data in response.data.product
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]); // Fetch data when 'id' parameter changes

  if (!product) {
    return <div>Loading...</div>;
  }

  const { URL, Description, Price , size, color , ProductName,Brand } = product;

  return (
    <div className="bg-white lg:px-10">
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            {URL.length > 0 && (
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] relative">
                <img
                  src={URL}
                  className="h-full w-full object-cover object-center"
                />
                <button className="absolute top-10 right-10 transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                  3D
                </button>
              </div>
            )}
            {/* <div className="flex flex-wrap space-x-5 justify-center">
              {URL.map((item, index) => (
                <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
              <h1 className="text-5xl lg:text-4xl font-bold text-gray-900">{ProductName}</h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">{Brand}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                <p className='font-semibold'>RS. {Price}</p>
                <p className='text-green-600 font-semibold'>Stock available</p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={Price} readOnly />
                  <p className="opacity-50 text-sm">{Price} Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{Price} Reviews</p>
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </div>

            {/* Description and details */}
            <div >
              <div className="mt-10">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Description</h3>
                <p className="text-base text-gray-900">{Description}</p>
              </div>
{/* 
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{details}</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Ratings and Reviews */}
        <ProductReview />
      </div>
    </div>
  );
}
