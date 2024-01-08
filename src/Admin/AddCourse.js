import React, { useState } from "react"
import Swal from "sweetalert2"
import styles from "./Admin.module.css"

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDetails, setCourseDetails] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [rating, setRating] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const clearField = () => {
    setCourseTitle("")
    setCourseDetails("")
    setTeacherName("")
    setRating("")
    setPrice("")
    setCategory("")
  }

  const addCourseHandler = async (e) => {
    e.preventDefault()
    const videoData = {
      courseTitle,
      courseDetails,
      rating,
      teacherName,
      price,
      category
    }

    try {
      const response = await fetch("http://localhost:7000/vc/api/add-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      })

      if (response.ok) {
        const newVideo = await response.json()

        console.log("New video added:", newVideo)
        clearField()

        // Use SweetAlert for success notification
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New course added successfully!",
          
        })
      } else {
        console.error("Failed to add video")
      }

      window.location.reload()// reload 
    } catch (error) {
      console.error("Error adding video:", error)
    }
  }

  return (
    <div className={styles["AddCourse-fullPage"]}>
      <div className={styles["AddCourse-Heading"]}>
        <h4>Add New Course</h4>
      </div>
      <input
        type="text"
        placeholder="Enter Course Title"
        className={styles["AddCourse-inputbox"]}
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Course Details"
        className={styles["AddCourse-inputbox"]}
        value={courseDetails}
        onChange={(e) => setCourseDetails(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Teacher's Name"
        className={styles["AddCourse-inputbox"]}
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
      ></input>
        <input
        type="text"
        placeholder="Category"
        className={styles["AddCourse-inputbox"]}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="Rating"
        className={styles["AddCourse-inputbox"]}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      ></input>
      <input
        type="number"
        placeholder="price"
        className={styles["AddCourse-inputbox"]}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <button
        type="submit"
        className={styles["AddCourse-addCourseBtn"]}
        onClick={addCourseHandler}
      >
        Add Course
      </button>
    </div>
  )
}