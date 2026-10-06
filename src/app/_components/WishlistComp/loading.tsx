import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <FaSpinner className="text-4xl text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Loading wishlist...</p>
        </div>
      </div>
    </div>
  );
}
