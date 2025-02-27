import React, { useState } from "react";
import { Link } from "react-router-dom";

const Box = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: "IIT", name: "IIT-JEE", price: "$50", img: "https://i.pinimg.com/736x/40/af/09/40af0927b6f03ac0c8c7c68eb36e631f.jpg" },
    { id: "JAVA", name: "JAVA AND DSA", price: "$50", img: "https://user-images.githubusercontent.com/102843159/211679770-ba6259bb-e87b-4932-b59c-f283d2628d7b.jpg" },
    { id: "CPP", name: "C++ AND DSA", price: "$50", img: "https://repository-images.githubusercontent.com/403817624/3d10f761-1027-4d0a-9906-48361e466d87" }
  ];

  return (
    <div className="min-h-screen bg-white text-black flex justify-center items-center flex-col md:flex-row p-6">
      {/* Sidebar with course buttons */}
      <div className="w-full md:w-1/4 p-4 bg-gray-900 rounded-md">
        <h2 className="text-xl font-bold mb-4">COURSES</h2>
        {courses.map((course) => (
          <button
            key={course.id}
            className={`w-full p-2 my-2 text-lg font-semibold border rounded-md transition ${
              selectedCourse === course.id ? "bg-blue-500 text-white" : "bg-gray-700"
            }`}
            onClick={() => setSelectedCourse(course.id)}
          >
            {course.name}
          </button>
        ))}
      </div>

      {/* Course Details */}
      <div className="w-full md:w-3/4 flex justify-center items-center">
        {selectedCourse ? (
          courses
            .filter((course) => course.id === selectedCourse)
            .map((course) => (
              <div key={course.id} className="bg-orange-300 p-6 rounded-md shadow-lg text-center">
                <h3 className="text-2xl font-bold">{course.name}</h3>
                <p className="text-lg my-2">{course.price}</p>
                <img className="mx-auto w-64 h-40 object-cover rounded-md" src={course.img} alt={course.name} />
                <div className="mt-4 space-x-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md">Buy</button>
                  <Link to={`/trial/${course.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Trial Video
                  </Link>
                  <Link to={`/detail/${course.id}`} className="px-4 py-2 bg-yellow-500 text-black rounded-md">
                    Know More
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <p className="text-lg">Select a course to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Box;
