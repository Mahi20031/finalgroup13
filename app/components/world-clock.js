"use client";
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import timezonesData from '../timezones.json';

const WorldTime = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [timeData, setTimeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const timezoneOptions = timezonesData.map(tz => ({
    value: tz.utc[0], 
    label: tz.text 
  }));

  const fetchTime = async () => {
    if (!selectedTimezone) {
      setError('Please select a timezone.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${selectedTimezone.value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch time data');
      }
      const data = await response.json();
      setTimeData({
        datetime: data.datetime,
        timezone: data.timezone 
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let intervalId;
    if (timeData.datetime) {
      intervalId = setInterval(() => {
        setTimeData(prevData => ({
          ...prevData,
          datetime: new Date(new Date(prevData.datetime).getTime() + 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timeData.datetime]);

  const formattedTime = timeData.datetime
    ? new Date(timeData.datetime).toLocaleTimeString('en-US', { timeZone: timeData.timezone })
    : '';

  const formattedDate = timeData.datetime
    ? new Date(timeData.datetime).toLocaleDateString('en-US', { timeZone: timeData.timezone })
    : '';

  return (
    <div className="flex flex-col items-center justify-center p-5 w-full">
      <Select
        options={timezoneOptions}
        onChange={setSelectedTimezone}
        value={selectedTimezone}
        className="w-full max-w-xs md:max-w-md text-black"
        placeholder="Select or type a timezone"
        noOptionsMessage={() => "No timezones found"}
        isSearchable
      />
      <button
        onClick={fetchTime}
        disabled={loading}
        className="mt-4 px-5 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-750 disabled:bg-blue-350 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loading ? 'Loading...' : 'Search'}
      </button>
      {error && <p className="text-red-400">{error}</p>}
      {formattedTime && (
        <div className="text-center mt-3">
          <p className="text-7x2  tabular-nums font-semibold">{formattedTime}</p>
          <p className="text-4x2">{formattedDate}</p>
        </div>
      )}
    </div>
  );
};
export default WorldTime;