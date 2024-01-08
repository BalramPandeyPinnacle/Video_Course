// src/components/ChapterComponent.js
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './ChapterComponent.css';

const ChapterComponent = ({ courseId }) => {
  const [chapters, setChapters] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`http://localhost:3001/cc/6598f60c987ec2489d60ae0f`);
        if (!response.ok) {
          throw new Error(`Error fetching chapters: ${response.status}`);
        }
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchChapters();
  }, [courseId]);

  const handleChapterClick = (chapterId) => {
    setSelectedTopic(null); // Reset selected topic when clicking on a new chapter
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => ({
        ...chapter,
        isOpen: chapter._id === chapterId ? !chapter.isOpen : chapter.isOpen,
      }))
    );
  };

  const handleTopicClick = (videoUrl, topicId) => {
    setSelectedTopic(topicId);
    setSelectedVideo(videoUrl);
    console.log(videoUrl);
  };

  return (
    <div className="chapter-container">
      <div className="sidebar">
        {chapters.map((chapter) => (
          <div key={chapter._id} className={`chapter-title chapter-sidebar ${chapter.isOpen ? 'open' : ''}`} onClick={() => handleChapterClick(chapter._id)}>
            {chapter.chapterTitle}
          </div>
        ))}
      </div>
      <div className="submenu-container">
        {chapters.map((chapter) => (
          <div key={chapter._id} className={`submenu ${chapter.isOpen ? 'open' : ''}`}>
            <h3 className="chapter-heading" onClick={() => handleChapterClick(chapter._id)}>
              {chapter.chapterTitle}
            </h3>
            {chapter.isOpen && (
              <div>
                {chapter.days.map((day) => (
                  <div key={day._id}>
                    {day.topics.map((topic) => (
                      <div key={topic._id} className={`topic topic-item ${selectedTopic === topic._id ? 'active' : ''}`} onClick={() => handleTopicClick(topic.selectedVideo, topic._id)}>
                        {topic.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="video-container video-frame">
        {selectedVideo && (
          <ReactPlayer
            url={selectedVideo}
            controls
            width="100%"
            height="100%"
            className="video-frame-inner"
            onError={(e) => console.error('Error playing video:', e)}
          />
        )}
      </div>
    </div>
  );
};

export default ChapterComponent;
