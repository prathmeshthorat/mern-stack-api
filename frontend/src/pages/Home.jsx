import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BASE_URL } from "../EnvConfig.js";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + "/books")
      .then((response) => {
        setBooks(response.data.response);
        setLoading(false);
        console.log("Books loaded: ", books);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl my-8">Books List</h2>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="text-3 my-4 ">
            <table className="w-full border-separate border-spacing-1">
              <thead>
                <tr>
                  <th className="border border-slate-600 rounded-md">No</th>
                  <th className="border border-slate-600 rounded-md">Title</th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Author
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Publish Year
                  </th>
                  <th className="border border-slate-600 rounded-md">
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {book.title}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {book.author}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {book.publishYear}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/book/details/${book._id}`}>
                          <BsInfoCircle className="text-2xl text-green-800" />
                        </Link>
                        <Link to={`/book/edit/${book._id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-600" />
                        </Link>
                        <Link to={`/book/delete/${book._id}`}>
                          <MdOutlineDelete className="text-2xl text-red-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
