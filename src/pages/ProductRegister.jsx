import React, { useState } from "react";
import { imageUpload } from "../api/uploader";
import useProducts from "../hooks/useProducts";

export default function ProductRegister() {
  const [product, setProduct] = useState();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      handleFileChange(files);
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (files) => {
    files[0] && setFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    imageUpload(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("Product has been registered Successfully");
              setTimeout(() => {
                setSuccess(null);
              }, 3000);
            },
          }
        );
      })
      .finally(() => setIsLoading(false));
  };

  const textInputStyle =
    "border border-slate-300 p-2 focus:outline-none mb-4 w-full";
  return (
    <section className="mb-12 flex flex-col items-center px-1">
      <h1 className="mb-5 text-2xl">New Product Register</h1>
      <div className="mb-10 flex h-96 w-full items-center justify-center">
        {!file && (
          <div className="flex h-96 max-h-full w-80 items-center justify-center bg-neutral-700 text-xl text-white">
            Image
          </div>
        )}
        {file && (
          <img
            src={file && URL.createObjectURL(file)}
            alt="img"
            className="max-h-full"
          />
        )}
      </div>
      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span>Product Image</span>
          <input
            type="file"
            className={textInputStyle}
            onChange={handleChange}
            accept="image/*"
            required
            name="file"
          />
        </label>
        <label className="flex flex-col">
          <span>Product Name</span>
          <input
            type="text"
            className={textInputStyle}
            name="name"
            required
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span>Price</span>
          <input
            type="text"
            className={textInputStyle}
            name="price"
            required
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span>Category</span>
          <select
            name="category"
            id="category"
            className={textInputStyle}
            onChange={handleChange}
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span>Description</span>
          <input
            type="text"
            className={textInputStyle}
            name="description"
            required
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          <span>Option (Division by comma)</span>
          <input
            type="text"
            className={textInputStyle}
            name="options"
            required
            onChange={handleChange}
          />
        </label>
        <button
          className="w-full  bg-neutral-700 py-4 text-white"
          disabled={isLoading}
        >
          {success ? <p>{success}</p> : isLoading ? "Uploading" : "Register"}
        </button>
      </form>
    </section>
  );
}
