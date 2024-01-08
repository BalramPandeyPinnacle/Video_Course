import React, { useState, useEffect } from 'react';

const CourseDetails = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch('http://localhost:3001/cc/65967d361b2b4cb3c9e2703f');
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {courseData.map((chapter, index) => (
        <div key={index}>
          <h2>{`Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}</h2>
          {chapter.days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h3>{`Day ${day.dayNumber}`}</h3>
              {day.topics.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <h4>{`${topic.serialNumber}. ${topic.title}`}</h4>
                  <p>Video Link: <a href={topic.selectedVideo} target="_blank" rel="noopener noreferrer">{topic.title} Video</a></p>
                  <p>PDF Link: <a href={topic.selectedPdf} target="_blank" rel="noopener noreferrer">{topic.title} PDF</a></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
