import React, { useEffect, useState, useContext } from "react";
import { gapi } from "gapi-script";
import { AuthContext } from "../context/AuthProvider";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user && token) {
      const fetchEvents = async () => {
        gapi.client.setToken({ access_token: token });

        try {
          const response = await gapi.client.calendar.events.list({
            calendarId: "primary",
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: new Date('2024-01-01T00:00:00Z').toISOString(),
            timeMax: new Date('2024-12-31T23:59:59Z').toISOString()
          });

          const fetchedEvents = response.result.items.map(event => ({
            id: event.id,
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date)
          }));

          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events: ", error);
        }
      };

      fetchEvents();
    }
  }, [user, token]);

  return (
    <div>
      <h2 className="text-center mt-2">Calendar</h2>
      <div className="container mt-5 mb-5">
        <div className="mt-5"></div>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default Calendar;
