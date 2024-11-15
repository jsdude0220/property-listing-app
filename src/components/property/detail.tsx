"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PropertyDetail = ({ id }: { id: number }) => {
  const router = useRouter();
  const [property, setProperty] = useState<any | null>(null); // Initialize state for the property

  useEffect(() => {
    axios
      .get("/get/property", { params: { propertyId: id } })
      .then((res) => {
        if (res.data.length > 0) {
          setProperty(res.data[0]);
        } else {
          setProperty(null);
        }
      })
      .catch(() => {
        setProperty(null);
      });
  }, [id]);

  if (!property) {
    return (
      <div className="text-center py-10">Loading or No Property Found</div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="space-y-4 w-full">
          <h1 className="text-3xl font-semibold text-gray-800">
            Property Detail - ID: {property.id}
          </h1>

          <div className="bg-gray-100 p-4 rounded-lg flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col space-y-4">
              <p className="text-xl font-semibold text-gray-600">
                <strong>Address:</strong> {property.address}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Price:</strong> ${property.price.toLocaleString()}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Type:</strong> {property.type}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Square Footage:</strong> {property.squareFootage} sq ft
              </p>
              <p className="text-lg text-gray-700">
                <strong>Number Of Bedrooms:</strong> {property.bedrooms}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Number Of Bathrooms:</strong> {property.bathrooms}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Date Listed:</strong>{" "}
                {new Date(property.dateListed).toLocaleDateString()}
              </p>
            </div>
            <div>
              <img
                src="/house.jpeg" // Replace with the property image URL
                alt={`Image of ${property.address}`}
                className="w-[350px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
