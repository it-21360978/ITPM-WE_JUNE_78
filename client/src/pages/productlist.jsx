
import React, { useState, useEffect} from 'react';
import axios from 'axios';



 function Plist() {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  
  
  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    axios.get('http://localhost:3030/products').then((res) => {
      if (res.data.success) {
        setProducts(res.data.existingProducts);
      }
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3030/product/delete/${id}`).then((res) => {
      alert('Delete Successfully');
      retrieveProducts();
    });
  };

  const filterData = (products, searchKey) => {
    const result = products.filter(
      (product) =>
      product.ProductName.toLowerCase().includes(searchKey) ||
      product.Brand.toLowerCase().includes(searchKey) ||
      product.Category.toLowerCase().includes(searchKey) ||
      product.Type.toLowerCase().includes(searchKey) ||
      product.size.toLowerCase().includes(searchKey) ||
      product.Price.toLowerCase().includes(searchKey) 
    );
    setProducts(result);
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get('http://localhost:3030/products').then((res) => {
      if (res.data.success) {
        filterData(res.data.existingTickets, searchKey);
      }
    });
    setSearchKey(searchKey);
  };

 


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h3 className="text-3xl font-bold dark:text-white" style={{ marginLeft: '20px' }}>
            Product List
          </h3>
        </div>

      { /* <div className="col-lg-3 mt-2 mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            value={searchKey}
            onChange={handleSearchArea}
          />
        </div>*/}
      </div>
   <div  > 
      <div><center>
        <h4  class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
       <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"> Total Products:  {products.length}</mark></h4>
      </center></div>

<br></br>
<div  className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="mx-4"> {/* Add margin to the left and right of the table */}
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Brand
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Garment Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Description
                </th> */}
                <th scope="col" className="px-6 py-3">
                    Picture URL
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="  text-gray-900  dark:text-white text-center ">{product.ProductName}</td>
                    <td className=" text-center px-1 py-5">{product.Brand}</td>
                    <td className=" text-center px-1 py-5" >{product.color}</td>
                    <td className=" text-center px-1 py-5">{product.Quantity}</td>
                    <td className=" text-center px-1 py-5">{product.Category}</td>
                    <td className=" text-center px-1 py-5">{product.Type}</td>
                    <td className=" text-center px-1 py-5">{product.size}</td>
                    <td className=" text-center px-1 py-5">{product.Price}</td>
                    {/* <td className=" text-center px-1 py-5">{product.Description}</td> */}
                    <td className="px-1 py-5">{product.URL}</td>
                    <td className="">
                        <a className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            href="#"
                            onClick={() => onDelete(product._id)}>Delete</a>
                    </td>
                    <td className="px-6 py-4">
                        <a href={`/pedit/${product._id}`} style={{ textDecoration: 'none' }} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-red-700 dark:focus:ring-green-900">
                            Update
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


    <br></br><br></br>
     
    </div>
  </div>   
</div>      


 
  
   )
 }

 export default Plist;