export const formatDate = seconds => {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${formattedDate} | ${formattedTime}`;
};
