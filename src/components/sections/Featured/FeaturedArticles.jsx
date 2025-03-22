import React from "react";
import PaperLogo from "../../../assets/paper_logo.jpg";

const domains = [
  {
    name: "Artificial Intelligence",
    description: "Best Papers in Artificial Intelligence Domain",
    papers: ["Title of Paper 1", "Title of Paper 2"],
  },
  {
    name: "Strategic Management",
    description: "Best Papers in Strategic Management Domain",
    papers: ["Title of Paper 1", "Title of Paper 2"],
  },
  {
    name: "DevOps",
    description: "Best Papers in DevOps Domain",
    papers: ["Title of Paper 1", "Title of Paper 2"],
  },
];

const FeaturedArticles = () => {
  return (
    <div className="max-w-6xl mt-10 mx-auto p-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-900">
          Featured Papers in Domain
        </h2>
        <p className="text-gray-600 text-md mt-2">
          Research papers featured every month <br /> with the most popular/trending
          domains
        </p>
      </div>

      {/* Featured Papers Section */}
      <div className="mt-12 grid gap-8">
        {domains.map((domain, index) => (
          <div
            key={index}
            className="grid grid-cols-[250px_auto] items-start gap-4"
          >
            {/* Left Section - Domain Title */}
            <div>
              <h3 className="text-2xl pr-4 font-medium text-gray-800">
                {domain.name}
              </h3>
              <p className="text-gray-500 pr-4 text-sm">{domain.description}</p>
            </div>

            {/* Right Section - Papers */}
            <div className="grid grid-cols-3 gap-4">
              {domain.papers.map((title, i) => (
                <div
                  key={i}
                  className="bg-white shadow-sm rounded-lg p-3 text-center  cursor-pointer"
                >
                  <a href="">
                    <img
                      className="rounded-lg w-full h-28 object-cover"
                      src={PaperLogo}
                      alt={title}
                    />
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      {title}
                    </p>
                  </a>
                </div>
              ))}
              {/* More Card */}
             {/* More Card with Transparent Overlay */}
            <div className="relative bg-white shadow-sm rounded-lg p-3 text-center cursor-pointer overflow-hidden">
                <a href="">
                    {/* Paper Logo Image */}
                    <img className="rounded-lg w-full h-28 object-cover" src={PaperLogo} alt="More" />
                    
                    {/* Semi-Transparent Overlay */}
                    <div className="absolute inset-0 bg-gray-700 opacity-50"></div>

                    {/* "More" Text (Above the Overlay) */}
                    <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                        More...
                    </p>
                </a>
            </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
