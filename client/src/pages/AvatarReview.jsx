import ImageProfile from "../ImageProfile.jsx";

export default function AvatarReview({ userId, username, photo }) {
  const colors = ['bg-teal-200', 'bg-red-200', 'bg-green-200', 'bg-purple-200',
    'bg-blue-200', 'bg-yellow-200', 'bg-orange-200', 'bg-pink-200',
    'bg-fuchsia-200', 'bg-rose-200'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  const initial = username ? username[0] : ''; // Get first character of username for initial

  return (
    <div className="flex items-center space-x-2"> {/* Added flex container to layout the avatar and username side by side */}
      <div className={`w-8 h-8 relative rounded-full flex items-center justify-center ${color}`}>
        {photo ? (
          // If photo is provided, show the image
          <ImageProfile src={photo} alt={username} className="w-full h-full rounded-full object-cover" />
        ) : (
          // If no photo is provided, show the initial with a colored background
          <div className="text-center w-full opacity-70">{initial}</div>
        )}
      </div>
      {username && <div className="text-sm font-medium">{username}</div>} {/* Display the username next to the avatar */}
    </div>
  );
}
