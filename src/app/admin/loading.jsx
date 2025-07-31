export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Admin Panel...
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we prepare your dashboard
        </p>
      </div>
    </div>
  );
}
