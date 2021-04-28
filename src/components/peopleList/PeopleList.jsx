import React, {
  useState, useRef, Fragment,
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
      <header
        className="header"
      >
        <h3>{name}</h3>
        <p>
          Year:
          {birth}
        </p>
      </header>
      <main>
        {comments && comments.map((comment) => (
          <Fragment key={comment.id}>
            <h3>Saved comment:</h3>
            <p>{comment.title}</p>
            <button
              type="button"
              onClick={() => removeHandler(comment.id)}
            >
              X
            </button>
          </Fragment>
        ))}
      </main>
      <footer className="footer">
        <form onSubmit={(event) => submitHandler(event)}>
          <button
            type="submit"
            className="footer__button"
          >
            Add Comment
          </button>
          <textarea
            placeholder="Write a comment"
            ref={commentRef}
            className="footer__textarea"
            required
          />
        </form>
      </footer>
    </section>
  );
};

PeopleList.propTypes = {
  name: PropTypes.string.isRequired,
  birth: PropTypes.string.isRequired,
};
