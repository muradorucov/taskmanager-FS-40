export default function SettingsPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
}
