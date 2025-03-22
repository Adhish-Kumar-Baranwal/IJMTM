import React from "react";
import { Link } from "react-router-dom"; // Import Link
import AuthorImg from "../../../assets/ivana-square.jpg";
import AuthorImg2 from "../../../assets/bruce-mars.jpg";
import AuthorImg3 from "../../../assets/ivana-squares.jpg";

const FeaturedAuthor = () => {
  return (
    <>
      <div className="text-center mt-12 pt-10">
        <h2 className="text-4xl font-semibold">Featured Authors</h2>
        <p className="text-gray-600 text-md mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Exercitationem saepe iusto earum?</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="border max-w-[350px] min-h-[450px] p-5 my-16 mx-6 flex-1 flex flex-col justify-center items-center text-center rounded">
          <img src={AuthorImg} alt="Author Image" className="w-50 h-50 mb-4 rounded-full" />
          <h2 className="text-xl font-bold">Author1</h2>
          <p className="text-gray-600">Author1 Description</p>
          <Link to="/author">Click Here for More</Link>
        </div>
        <div className="border max-w-[350px] min-h-[450px] p-5 my-16 mx-6 flex-1 flex flex-col justify-center items-center text-center rounded">
          <img src={AuthorImg2} alt="Author Image" className="w-50 h-50 mb-4 rounded-full" />
          <h2 className="text-xl font-bold">Author2</h2>
          <p className="text-gray-600">Author2 Description</p>
          <Link to="/author">Click Here for More</Link>
        </div>
        <div className="border max-w-[350px] min-h-[450px] p-5 my-16 mx-6 flex-1 flex flex-col justify-center items-center text-center rounded">
          <img src={AuthorImg3} alt="Author Image" className="w-50 h-50 mb-4 rounded-full" />
          <h2 className="text-xl font-bold">Author3</h2>
          <p className="text-gray-600">Author3 Description</p>
          <Link to="/author">Click Here for More</Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedAuthor;
