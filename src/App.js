// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./App.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  
  const callButton = () => {
    window.location.href = 'tel:+79381289658';
  };
  

  const fetchPhotos = async () => {
    const response = await axios.get(
      "http://test-backend.itdelta.agency/api/images"
    );
    setPhotos(response.data);
  };

  const openModal = async (id) => {
    const response = await axios.get(
      `http://test-backend.itdelta.agency/api/image/${id}`
    );
    setSelectedPhoto(response.data.image);
    setComments(response.data.comments);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addComment = async (id) => {
    await axios.post(
      `http://test-backend.itdelta.agency/api/image/${id}/comments`,
      { comment: newComment }
    );
    setNewComment("");
    fetchPhotos(); // Обновляем список комментариев
  };

  const messageButton = () => {
    window.open("https://t.me/egprog", "_blank");
  };

  return (
    <div>
      <div className="profile-box">
        <div className="profile-banner">
          <div className="profile-banner-helper">
            <div className="profile-avatar"></div>
          </div>
        </div>
        <div className="profile-text-btn-box">
          <div className="profile-text">Ricardo Cooper</div>
          <div className="profile-btn-box">
            <button className="profile-btn message-btn" onClick={messageButton}>
              Message
            </button>
            <button className="profile-btn call-btn" onClick={callButton}>
              Call
            </button>
          </div>
        </div>
      </div>
      <div className="gallery">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-item"
            onClick={() => openModal(photo.id)}
          >
            <img className="photo" src={photo.image} alt={`Фото ${photo.id}`} />
            <p>ID: {photo.id}</p>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div onClick={closeModal} className="centered-container">
          <div className="modal-window">
            <div className="photo-big-helper">
              <img
                className="photo-big"
                src={selectedPhoto}
                alt="Большое фото"
              />
            </div>
            <div className="comment-text">Comment</div>
            <div className="photo-big-helper">
              <textarea
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-textarea"
              ></textarea>
            </div>
            <div className="comment-text-text">
              Write a few sentences about the photo.
            </div>
            <div className="photo-big-helper">
              <button
                onClick={() => addComment(selectedPhoto.id)}
                className="save-btn"
              >
                Save
              </button>
            </div>
            <div className="comment-text">Comments</div>
            {comments.map((comment) => (
              <div className="comments-comment" key={comment.id}>
                {comment.author}: {comment.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
