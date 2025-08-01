import Header from "../navbar/Header";
import {
  InboxIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState, useRef } from "react";
import Footer from "../navbar/Footer";
import { href, redirect, useLocation, useSearchParams } from "react-router-dom";
import Transitions from "../components/Transitions";
import { API_BASE_URL } from "../config";

function Minimalist() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState(location.state || {});
  const pdfRef = useRef();

  useEffect(() => {
    const share = searchParams.get('share');
    if ((!location.state || Object.keys(location.state).length === 0) && share) {
      fetch(`${API_BASE_URL}/api/portfolio-share/${share}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.data) setUserData(data.data);
        });
    } else if (!location.state || Object.keys(location.state).length === 0) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/user`);
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setUserData(data);
            console.log("Fetching Done");
          }
        } catch (error) {
          console.error("Error fetching user Data: ", error);
        }
      };

      fetchUserData();
    }
  }, [location.state, searchParams]);
  return (
    <>
      <Header pdfRef={pdfRef} fileName={`${userData.fullName || 'Portfolio'}-Minimalist.pdf`} userData={userData} templateName="Minimalist" />

      <div ref={pdfRef}>
        <div className="flex flex-col items-center justify-center mt-5 mb-10">
          <div className="w-35 h-35 rounded-full bg-gray-100 border-4 border-blue-300 flex items-center justify-center overflow-hidden mb-2">
            <img
              src={userData.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-black text-3xl font-mono mt-4">
            {userData.fullName}
          </h1>
          <h1 className="text-black text-2xl font-serif mt-4">
            {userData.title}
          </h1>
          <div className="flex flex-row gap-40 items-center mt-10">
            {userData.github && (
              <span
                onClick={() =>
                  window.open(userData.github, "_blank", "noopener,noreferrer")
                }
                className="hover:text-blue-500 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Github
              </span>
            )}
            {userData.linkedin && (
              <span
                onClick={() =>
                  window.open(userData.linkedin, "_blank", "noopener,noreferrer")
                }
                className="hover:text-blue-500 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </span>
            )}
            {userData.email && (
              <span className="hover:text-blue-500 cursor-pointer">
                <InboxIcon className="w-5 h-5 inline-block mr-2 text-gray-600" />
                {userData.email}
              </span>
            )}
            {userData.phone && (
              <span className="hover:text-blue-500 cursor-pointer">
                <PhoneIcon className="w-5 h-5 inline-block mr-2 text-gray-600" />
                {userData.phone}
              </span>
            )}
            {userData.location && (
              <span className="hover:text-blue-500 cursor-pointer">
                <MapPinIcon className="w-5 h-5 inline-block mr-2 text-gray-600" />
                {userData.location}
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Gray background div */}
          <div className="flex flex-col bg-[#f9fbfc] min-w-[1000px] items-start mt-10 pb-10 border-1 border-gray-300">
            {/* About Me Div  */}
            <div className="flex items-center ml-70 mb-3 mt-15">
              <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-300 shadow-sm mr-7 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif text-gray-900">About</h2>
                <div className="w-20 mt-1 rounded-full h-1 bg-slate-900"></div>
              </div>
            </div>
            <div className="border-2 w-[1000px] min-h-[100px] rounded-2xl ml-70 mt-13 p-4">
              <div className="text-xl p-5 whitespace-pre-wrap">
                {userData.aboutMe || "User Info Here..."}
              </div>
            </div>

            {/* Skills section here  */}
            <div className="flex items-center ml-70 mb-2 mt-20">
              <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-300 shadow-sm mr-7 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
                  <div className="w-1"></div>
                  <ChevronRightIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif text-gray-900">Skills</h2>
                <div className="w-20 mt-1 rounded-full h-1 bg-slate-900"></div>
              </div>
            </div>
            <div className="border-2 w-[1000px] min-h-[100px] rounded-2xl ml-70 mt-13 p-4">
              {userData.skills ? (
                <div className="p-5">
                  <ul className="list-disc list-inside space-y-2">
                    {userData.skills.split(",").map((skill, index) => (
                      <li key={index} className="text-xl text-gray-800">
                        {skill.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <span className="text-xl p-5 text-gray-500">
                  No skills listed
                </span>
              )}
            </div>

            {/* Education Section Here  */}
            <div className="flex items-center ml-70 mb-2 mt-20">
              <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-300 shadow-sm mr-7 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif text-gray-900">Education</h2>
                <div className="w-20 mt-1 rounded-full h-1 bg-slate-900"></div>
              </div>
            </div>
            <div className="border-2 w-[1000px] min-h-[100px] rounded-2xl ml-70 mt-13 p-4">
              <div className="text-xl p-5 whitespace-pre-wrap">
                {userData.education || "User Education Here..."}
              </div>
            </div>

            {/* Experience Section Here  */}
            <div className="flex items-center ml-70 mb-2 mt-20">
              <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-300 shadow-sm mr-7 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BriefcaseIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif text-gray-900">Experience</h2>
                <div className="w-20 mt-1 rounded-full h-1 bg-slate-900"></div>
              </div>
            </div>
            <div className="border-2 w-[1000px] min-h-[100px] rounded-2xl ml-70 mt-13 p-4">
              <div className="text-xl p-5 whitespace-pre-wrap">
                {userData.workExperience || "User Experience Here..."}
              </div>
            </div>

            {/* Projects Section Here  */}
            <div className="flex items-center ml-70 mb-2 mt-20">
              <div className="w-12 h-12 bg-white rounded-lg p-2 border border-gray-300 shadow-sm mr-7 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FolderIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif text-gray-900">Projects</h2>
                <div className="w-20 mt-1 rounded-full h-1 bg-slate-900"></div>
              </div>
            </div>
            <div className="border-2 w-[1000px] min-h-[100px] rounded-2xl ml-70 mt-13 p-4">
              <div className="text-xl p-5 whitespace-pre-wrap">
                {userData.projects || "User Projects Here..."}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const WrappedMinimalist = Transitions(Minimalist);
export default WrappedMinimalist;
