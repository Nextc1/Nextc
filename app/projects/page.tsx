"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import data from "../../data/fund.json";
import Link from "next/link";
import { HiCreditCard } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";

interface Project {
  id: string;
  project_name: string;
  project_image: string;
  carbon_credits: number;
  emission_reduction: number;
  amount_for_raise: number;
  company_name: string;
  location: string;
  timer: {
    start_date: string;
    end_date: string;
    ended: boolean;
  };
  status: string;
}

function getData() {
  const response = data;
  return response;
}

const Projects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedStatus, setSelectedStatus] = useState("active"); // State to hold the selected status

  const projectData = getData().filter((project) => {
    if (selectedStatus === "active") return project.status === "active";
    if (selectedStatus === "upcoming") return project.status === "upcoming";
    if (selectedStatus === "done") return project.status === "done";
    return true; // Default case to handle unexpected values
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectData.length / itemsPerPage);

  return (
    <>
      <div className="w-full bg-black text-white py-[5rem] px-[2rem]">
        <div className="text-center my-10 text-4xl font-bold">
          Explore Projects
        </div>
        <div className="text-end my-[3rem]">
          <select
            className="select select-bordered w-[8rem] bg-black text-white border border-white outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="active">active</option>
            <option value="upcoming">upcoming</option>
            <option value="done">done</option>
          </select>
        </div>
        <div className="w-full flex flex-wrap gap-5 justify-evenly">
          {currentItems.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              className="w-[350px] group relative block overflow-hidden rounded-lg shadow-lg transition duration-500 hover:shadow-xl text-white border border-white"
              key={project.id}
            >
              <img
                src={project.project_image}
                alt={project.project_name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative bg-black p-6 text-white">
                <span className="whitespace-nowrap badge badge-secondary px-3 py-1.5 text-xs font-medium">
                  {" "}
                  {project.status}{" "}
                </span>

                <h3 className="mt-4 text-lg font-medium">
                  {project.project_name}
                </h3>

                <p className="mt-1.5 text-sm">$ {project.amount_for_raise}</p>

                <div className="card-actions justify-end">
                  <div className="badge badge-outline flex gap-2">
                    <HiCreditCard />
                    {project.carbon_credits}
                  </div>
                  <div className="badge badge-outline flex gap-2">
                    <FaLocationDot />
                    {project.location}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-[3rem]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
