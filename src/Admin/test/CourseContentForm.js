// CourseContentForm.js
import React, { useState } from 'react';

const CourseContentForm = () => {
  const [courseContent, setCourseContent] = useState({
    chapterNumber: '',
    chapterTitle: '',
    courseId: '',
    days: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseContent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDay = () => {
    setCourseContent((prevData) => ({
      ...prevData,
      days: [...prevData.days, { dayNumber: '', videoUrl: '', pdfUrl: '' }],
    }));
  };

  const handleDayInputChange = (index, event) => {
    const { name, value } = event.target;
    setCourseContent((prevData) => ({
      ...prevData,
      days: prevData.days.map((day, i) =>
        i === index ? { ...day, [name]: value } : day
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(courseContent);
    // Add logic to send the data to your server or perform other actions
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Chapter Number:
        <input
          type="number"
          name="chapterNumber"
          value={courseContent.chapterNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Chapter Title:
        <input
          type="text"
          name="chapterTitle"
          value={courseContent.chapterTitle}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Course ID:
        <input
          type="text"
          name="courseId"
          value={courseContent.courseId}
          onChange={handleInputChange}
        />
      </label>
      <br />

      {courseContent.days.map((day, index) => (
        <div key={index}>
          <label>
            Day Number:
            <input
              type="number"
              name="dayNumber"
              value={day.dayNumber}
              onChange={(e) => handleDayInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            Video URL:
            <input
              type="text"
              name="videoUrl"
              value={day.videoUrl}
              onChange={(e) => handleDayInputChange(index, e)}
            />
          </label>
          <br />
          <label>
            PDF URL:
            <input
              type="text"
              name="pdfUrl"
              value={day.pdfUrl}
              onChange={(e) => handleDayInputChange(index, e)}
            />
          </label>
          <br />
        </div>
      ))}

      <button type="button" onClick={handleAddDay}>
        Add Day
      </button>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseContentForm;
