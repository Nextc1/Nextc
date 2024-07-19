"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import data from "../../data/fund.json";
import Loading from "@/components/Loading";
import Btn from "@/components/Btn";

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

const RaiseFund: React.FC = () => {
  const [fundData, setFundData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const PAGE_SIZE = 9;

  const fetchProjects = async () => {
    setLoading(true); // Start loading
    // Simulate an async operation, e.g., fetching data
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate fetch delay

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedProjects = data.slice(startIndex, endIndex);

    setFundData(paginatedProjects);
    setLoading(false); // End loading
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage]); // Re-fetch when currentPage changes

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full bg-black text-white py-[5rem] px-[2rem]">
        <div className="text-center my-10 text-4xl font-bold">
          Explore Projects
        </div>
        <div className="w-full flex flex-wrap gap-5 justify-center">
          {fundData.map((project) => (
            <div className="card glass w-96" key={project.id}>
              <figure>
                <img src={project.project_image} alt={project.project_name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.project_name}</h2>
                <p>{project.company_name}</p>
                <div className="card-actions justify-end">
                  <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                    Explore More
                  </button>
                </div>
              </div>
            </div>
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

export default RaiseFund;
