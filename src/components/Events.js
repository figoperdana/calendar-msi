import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { gapi } from "gapi-script";

const Events = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { user, token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && token) {
      const event = {
        summary: title,
        description: detail,
        start: {
          dateTime: new Date(`${date}T${startTime}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(`${date}T${endTime}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      gapi.client.setToken({ access_token: token });

      try {
        await gapi.client.request({
          path: '/calendar/v3/calendars/primary/events',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(event),
        });
        alert("Event created successfully");
        setTitle("");
        setDetail("");
        setDate("");
        setStartTime("");
        setEndTime("");
      } catch (error) {
        console.error("Error creating event: ", error);
        alert(`Error creating event: ${error.result.error.message}`);
      }
    } else {
      alert("You must be logged in to create an event");
    }
  };

//   return (
//     <div>
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//         />
//         <input
//           type="text"
//           value={detail}
//           onChange={(e) => setDetail(e.target.value)}
//           placeholder="Detail"
//           required
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <input
//           type="time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           required
//         />
//         <input
//           type="time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//           required
//         />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default Events;

return (
    <div className="container mt-5">
      <h2 className="my-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Detail</label>
          <input
            type="text"
            className="form-control"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Detail"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Start Time</label>
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>End Time</label>
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create</button>
      </form>
    </div>
  );
};

export default Events;
