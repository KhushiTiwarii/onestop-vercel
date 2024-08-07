import React from 'react';
import styled from 'styled-components';



const ProjectCard = ({ project }) => {
  return (
    <div className="bg-transparent rounded-lg shadow-lg overflow-hidden w-80 m-5 relative text-white border border-[#854CE6] border-[0.01px]">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-base mb-4 text-gray-300">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
