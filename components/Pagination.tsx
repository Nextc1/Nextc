import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="join">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        // disabled={currentPage === 1}
        className="join-item btn"
      >
        «
      </button>
      <span className="join-item btn">
        {" "}
        Page {currentPage} of {totalPages}{" "}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        // disabled={currentPage === totalPages}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
