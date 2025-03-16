export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500">Preparing your thumbnail generator</p>
      </div>
    </div>
  );
} 