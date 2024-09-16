import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import Modal from '../UI/Modal.jsx';
import Header from '../Header.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { deleteEvent, fetchEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const {id} = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({signal, id})
  })
  const { mutate, isPending: mutateIsPending, isError: mutateIsError, error: mutateError } = useMutation({
    mutationFn: ({signal}) => deleteEvent({id, signal}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  const handleDelete = (id) => {
    mutate({id})
  }

  let content;

  if (isPending) {
    content = (<div id="event-details-content" className="center">
      <p>Fetching event data...</p>
    </div>)
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock 
          title="Failed to load event details" 
          message={error.info?.message || "Please try again later..."}
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="No image available" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
    {isDeleting && (
      <Modal onClose={handleStopDelete}>
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this event? This action cannot be undone.</p>
      <div className="form-actions">
        {mutateIsPending && <p>Deleting, please wait...</p>}
        {!mutateIsPending && (
          <>
            <button onClick={handleStopDelete} className='button-text'>Cancel</button>
            <button onClick={() => handleDelete(data.id)} className='button'>Delete</button>
          </>
        )}
      </div>
      {mutateIsError && <ErrorBlock title="Failed to delete event" message={mutateError.info?.message || "Failed to delete event. Please try again later."}/>}
      </Modal>
    )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
