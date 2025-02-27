import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getAllProjectCards, deactivateProjectById } from "../../services/ProjectService.jsx";
import { MdEdit, MdDelete, MdPerson } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { PiFilesFill } from "react-icons/pi";
import Swal from "sweetalert2";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement('#root');

const NewProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate(); 
  const { projectId } = useParams();

  useEffect(() => {
    getAllProjectCards()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project cards:", error);
        Swal.fire("Error", "Failed to fetch project cards. Please try again.", "error");
      });
  }, []);

  const handleDeactivate = (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateProjectById(projectId)
          .then(() => {
            Swal.fire(
              'Deactivated!',
              'Your project has been deactivated.',
              'success'
            );
            setProjects(projects.filter(project => project.projectId !== projectId));
          })
          .catch((error) => {
            console.error("Deactivate error:", error);
            Swal.fire(
              'Error!',
              'Failed to deactivate the project.',
              'error'
            );
          });
      }
    });
  };
  
  const editProject = (projectId) => {
    navigate(`/project/update/${projectId}`);
  };

  const handleAssignEmployee = (projectId) => {
    navigate(`/project/assign/${projectId}`);
  };

  const projectProgress = (projectId) => {
    navigate(`/progress/${projectId}`);
  };

  const projectReviews = (projectId) => {
    navigate(`/reviews/${projectId}`);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return <div className="mt-10 text-center">No projects available.</div>;
  }

  return (
    <>
      <div className="mt-10">
        <div className="mx-auto">
          <main>
            <div className="px-4">
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.projectId}
                    className="mb-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl"
                    onClick={() => openModal(project)}
                  >
                    <img
                      className="object-cover w-full h-48 rounded-t-lg"
                      src={
                        project.image
                          ? `http://localhost:8080/${project.image.replace(
                              /\\/g,
                              "/"
                            )}`
                          : ""
                      }
                      alt={project.projectName}
                    />
                    <div className="pt-2 pb-6 pl-6 pr-6">
                      <div className="flex items-center justify-between pb-2 border-b-2 border-gray-300">
                        <div className="flex items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                              {project.projectName}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm font-medium">
                          <span
                            className={`bg-indigo-100 text-indigo-500 rounded-md pl-1 pr-1 status-label-${project.projectStatus.toLowerCase()}`}
                          >
                            {project.projectStatus}
                          </span>
                        </p>
                        <div className="flex">
                          <MdPerson
                            className="mr-2 text-green-500 cursor-pointer"
                            size={20}
                            onClick={() => handleAssignEmployee(project.projectId)}
                          />
                          <MdEdit
                            className="mr-2 text-blue-800 cursor-pointer"
                            size={20}                           
                            onClick={() => editProject(project.projectId)}
                          />
                          <MdDelete
                            className="text-red-600 cursor-pointer"
                            size={20}
                            onClick={() => handleDeactivate(project.projectId)}
                          />
                        </div>
                      </div>

                      <p className="my-6 text-sm font-normal text-gray-500">
                        {project.projectDescription}
                      </p>
                      <div className="flex justify-between">
                        <span className="badge badge-green">
                          {new Date(project.createdDate).toLocaleDateString()}
                        </span>
                        <span className="badge badge-red">
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                    </div>
                    <div className="flex justify-end mb-5 mr-5">
                          <GiProgression
                            className="mr-2 text-green-700 cursor-pointer"
                            size={20}
                            onClick={() => projectProgress(project.projectId)}
                          />
                          <PiFilesFill
                            className="mr-2 text-blue-900 cursor-pointer"
                            size={20}                           
                            onClick={() => projectReviews(project.projectId)}
                          />
                        
                        </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {selectedProject && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          contentLabel="Project Summary"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#7DD3FC', // Skyblue300 background color
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              textAlign: 'center',
            },
          }}
        >
          <h2>Project Summary</h2>
          <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
          <p><strong>Project Description:</strong> {selectedProject.projectDescription}</p>
          <p><strong>Client Name:</strong> {selectedProject.clientName}</p>
          <p><strong>Consultant Name:</strong> {selectedProject.consultantName}</p>
          <p><strong>Created Date:</strong> {new Date(selectedProject.createdDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(selectedProject.endDate).toLocaleDateString()}</p>
          <div className="flex justify-end mt-4">
            <button onClick={closeModal} className="px-4 py-2 mr-4 text-white bg-blue-500 rounded">OK</button>
            <button onClick={closeModal} className="px-4 py-2 text-black bg-gray-300 rounded">Cancel</button>
          </div>
        </Modal>
      )}

      <style>{`
        .status-label-completed {
          background-color: #34d399;
          color: #ffffff;
        }

        .status-label-ongoing {
          background-color: #60a5fa;
          color: #ffffff;
        }

        .status-label-upcoming {
          background-color: #fcd34d;
          color: #ffffff;
        }

        .badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .badge-green {
          background-color: #34d399;
          color: #ffffff;
        }

        .badge-red {
          background-color: #f87171;
          color: #ffffff;
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:shadow-xl:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
};

export default NewProjectCard;
