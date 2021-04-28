import React, {
  useState, useRef,
} from 'react';
import './PeopleList.scss';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export const PeopleList = ({ name, birth }) => {
  const [comments, setComments] = useState([]);
  const commentRef = useRef(null);

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

    setComments((prevVal) => [
      ...prevVal,
      prepearedComment,
    ]);
  }

  function removeHandler(id) {
    setComments((prevComment) => {
      const filteredComments = prevComment.filter((comment) => comment.id !== id);
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
            className="button is-small is-success"
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
      <div className="comments">
        <h4>Saved comments:</h4>
        {comments && comments.map((comment) => (
          <div
            className="comments__item"
            key={comment.id}
          >
            <p>{comment.title}</p>
            <button
              type="button"
              className="comments__button"
              onClick={() => removeHandler(comment.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

PeopleList.propTypes = {
  name: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
};
