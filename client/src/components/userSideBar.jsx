import React ,{useState} from 'react';
import { Link } from "react-router-dom";


export default function userSideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState("Dashboard");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen((prevState) => !prevState);
    };
  
    const toggleUserMenu = () => {
      setUserMenuOpen((prevState) => !prevState);
    };
  
    const handleSidebarItemClick = (item) => {
      setSelectedContent(item);
    };
  
    return (
      <>
    
        <div  className="block lg:hidden mt-0 p-3">
            <button
                  onClick={toggleSidebar}
                  className="flex float-right p-2 items-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Toggle Sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
            </div>

        {/** side nav */}
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }  border-r border-gray-200 sm:translate-x-0 bg-orange-900 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-orange-900 text-white">
            <ul className="space-y-2 font-medium">
              <li
                className={`px-4 py-2 transition-colors duration-300 cursor-pointer hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 ${selectedContent === "Dashboard" ? 'text-black bg-gray-100' : ''}`}
                onClick={() => handleSidebarItemClick("Dashboard")}
              >
                <Link to=''>Dashboard</Link>
              </li>
              <li
                className={`px-4 py-2 transition-colors duration-300 cursor-pointer hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 ${selectedContent === "users" ? 'text-black bg-gray-100' : ''}`}
                onClick={() => handleSidebarItemClick("users")}
              >
                <Link to= ''>Users</Link>
              </li>
              <li
                className={`px-4 py-2 transition-colors duration-300 cursor-pointer hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 ${selectedContent === "payments" ? 'text-black bg-gray-100' : ''}`}
                onClick={() => handleSidebarItemClick("payments")}
              >
                <Link to= ''>Payments</Link>
              </li>
              <li
                className={`px-4 py-2 transition-colors duration-300 cursor-pointer hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 ${selectedContent === "Stock" ? 'text-black bg-gray-100' : ''}`}
                onClick={() => handleSidebarItemClick("Stock")}
              >
                <Link to=''>Stock</Link>
              </li>
            </ul>

       {/* User Div */}
    <div className="absolute bottom-0 left-0 w-full pb-8 mx-6 pt-6 flex justify-start items-center space-x-2">
      <div>
        <img src="https://i.ibb.co/54vKnF3/Ellipse-3.png" alt="avatar" />
      </div>
      <div className="flex flex-col justify-start items-start space-y-1">
        <p className="cursor-pointer text-base leading-4 text-white">David Hulk</p>
        <p className="cursor-pointer text-xs leading-3 text-indigo-200">david@alphahulk.com</p>
      </div>
    </div>
  </div>
         
        </aside>

        {/** main content */}
        <div className="p-4 mt-14 sm:ml-64">
          {/* Conditional rendering based on selectedContent state */}
          {selectedContent === "Dashboard" && (
            <div>
              {/* Dashboard component */}
              <h2>Dashboard Component</h2>
              
            </div>
          )}
          {selectedContent === "users" && (
            <div>
              {/* user component */}
              <h2>users Component</h2>
              
            </div>
          )}
          {selectedContent === "payments" && (
            <div>
              {/* payment component */}
              <h2>payment Component</h2>
            </div>
          )}
          {selectedContent === "Stock" && (
            <div>
              {/* stock component */}
              <h2>Stock Component</h2>
            </div>
          )}
        </div>
      </>
  );
}
