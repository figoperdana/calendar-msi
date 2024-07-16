import React, { useEffect, useState, useContext } from "react";
import { gapi } from "gapi-script";
import { AuthContext } from "../context/AuthProvider";
import ReactPaginate from 'react-paginate';
import '../css/Pagination.css';

const AllEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const eventsPerPage = 10;
  const pagesVisited = pageNumber * eventsPerPage;

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        const auth = gapi.auth2.getAuthInstance();
        const googleUser = auth.currentUser.get();
        const oauthToken = googleUser.getAuthResponse().access_token;

        gapi.client.setToken({ access_token: oauthToken });

        try {
          const response = await gapi.client.calendar.events.list({
            calendarId: "primary",
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
          });

          const fetchedEvents = response.result.items.map(event => ({
            id: event.id,
            summary: event.summary,
            description: event.description,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date)
          }));

          setEvents(fetchedEvents);
          setFilteredEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events: ", error);
        }
      };

      fetchEvents();
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    const filtered = events.filter(event =>
      event.summary.includes(search) || (event.description && event.description.includes(search))
    );
    setFilteredEvents(filtered);
  };

  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container mt-5">
      <h2 className="my-4">All Events</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for events"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Summary</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents
            .slice(pagesVisited, pagesVisited + eventsPerPage)
            .map(event => (
              <tr key={event.id}>
                <td>{event.summary}</td>
                <td>{event.description}</td>
                <td>{event.start.toString()}</td>
                <td>{event.end.toString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
};

export default AllEvents;