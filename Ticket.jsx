export default function Ticket({ data }) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Conference Ticket</h2>
      <div className="space-y-4">
        <img
          src={data.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <div>
          <p className="font-semibold">Name:</p>
          <p>{data.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{data.email}</p>
        </div>
      </div>
    </div>
  );
}