import React, {
  useState, useRef, useEffect,
} from 'react';
import './PeopleList.scss';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Comments } from '../comments/Comments';

const PeopleList = ({ name, birth, humanId }) => {
  const [comments, setComments] = useState([]);
  const commentRef = useRef(null);

  useEffect(() => {
    const commentBox = JSON.parse(localStorage.getItem(`${humanId}`));
    if (!commentBox) {
      return;
    }
    setComments(commentBox);
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const userComment = commentRef.current.value;
    if (!userComment) {
      return;
    }

    const prepearedComment = {
      title: userComment,
      id: uuidv4(),
    };
    commentRef.current.value = '';

    setComments((prevComments) => {
      const newComments = [
        ...prevComments,
        prepearedComment,
      ];
      localStorage.setItem(`${humanId}`, JSON.stringify(newComments));
      return newComments;
    });
  }

  function removeComment(id) {
    setComments((prevComment) => {
      const filteredComments = prevComment.filter((comment) => comment.id !== id);
      localStorage.setItem(`${humanId}`, JSON.stringify(filteredComments));
      return filteredComments;
    });
  }

  return (
    <section className="section">
      <div
        className="human-info"
      >
        <h3>{name}</h3>
        <p>
          Year:
          {birth}
        </p>
        <form
          className="human-info__form"
          onSubmit={(event) => submitHandler(event)}
        >
          <button
            type="submit"
            className="human-info__button button is-small is-success"
          >
            Add Comment
          </button>
          <textarea
            placeholder="Write a comment"
            ref={commentRef}
            className="human-info__textarea textarea is-small is-hovered"
            required
          />
        </form>
      </div>
      <Comments
        deleteComment={removeComment}
        comments={comments}
      />
    </section>
  );
};

PeopleList.propTypes = {
  humanId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
};

export default PeopleList;
