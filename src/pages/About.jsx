import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-lg">
        Welcome to our Task Management App! Developed by Bhavin Chaudhari, a dedicated software engineer, this application is designed to streamline your daily task management needs. Our app offers a range of features, including:
      </p>
      <ul className="list-disc pl-6 my-4 space-y-2 text-lg">
        <li>Create and organize tasks effortlessly with a user-friendly interface.</li>
        <li>Edit tasks to keep your workflow flexible and adaptive.</li>
        <li>Search tasks by title, description, or ID for quick access.</li>
        <li>Filter tasks by status to focus on what's pending or completed.</li>
        <li>Mark tasks as completed or revert them back to pending as needed.</li>
        <li>Delete tasks that are no longer relevant to keep your list clean.</li>
      </ul>
      <p className="text-lg">
        Whether you're managing a personal to-do list or organizing team projects, our app is designed to help you stay productive and focused. Thank you for choosing our Task Management App. We hope it makes a positive impact on your productivity!
      </p>
    </div>
  );
};

export default About;
