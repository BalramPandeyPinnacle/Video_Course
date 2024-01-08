import React from 'react'
import AddCourse from './Admin/AddCourse'
import AddChapter from './Admin/AddChapter'
import VideoUploadForm from './Admin/VideoUploadForm'
import PdfUploadForm from './Admin/PdfUploadForm'
import Styles from "./Admin.module.css"
import CourseDetails from './Admin/CourseDetails'
import ChapterComponent from './Admin/ChapterContainer'
import CourseContentForm from './Admin/test/CourseContentForm'

export default function App() {
  
  return (
    <div>
      <AddCourse/>
      <div className={Styles["video-upload-div"]}><VideoUploadForm/></div>
      <div className={Styles["video-upload-div"]}><PdfUploadForm/></div>
      <AddChapter/>
      {/*<CourseDetails/>*/}
    <ChapterComponent/>

    {/* <CourseContentForm/> */}

      
      
      
    </div>
  )
}
