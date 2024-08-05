import ImageProfile from "../ImageProfile.jsx"
export default function Avatar({ userId, username, online, photo }) {
  const colors = ['bg-teal-200', 'bg-red-200', 'bg-green-200', 'bg-purple-200',
    'bg-blue-200', 'bg-yellow-200', 'bg-orange-200', 'bg-pink-200',
    'bg-fuchsia-200', 'bg-rose-200'];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  const initial = username ? username[0] : ''; // Get first character of username for initial

  return (
    <div className={`w-8 h-8 relative rounded-full flex items-center justify-center ${color}`}>
      {photo ? (
        // If photo is provided, show the image
        <ImageProfile src={photo} alt={username} className="w-full h-full rounded-full object-cover" />
      ) : (
        // If no photo is provided, show the initial with a colored background
        <div className="text-center w-full opacity-70">{initial}</div>
      )}
      {online ? (
        <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-0 rounded-full border border-white"></div>
      ) : (
        <div className="absolute w-3 h-3 bg-gray-400 bottom-0 right-0 rounded-full border border-white"></div>
      )}
    </div>
  );
}
