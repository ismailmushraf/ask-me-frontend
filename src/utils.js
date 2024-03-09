export function formatPostedTime(createdAt) {
  const postDate = new Date(createdAt);
  const now = new Date();

  const timeDifference = now - postDate;

  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return postDate.toLocaleString();
  }
}

export function shortenUserName(fullname) {
  return fullname.split(" ").map(item => item[0]).join('');
}

