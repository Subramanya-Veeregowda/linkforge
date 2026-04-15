import CustomFooter from "./CustomFooter";

function ExpiredPopup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white p-6  rounded-lg shadow-lg text-center">
        <h2 className="text-red-600 font-bold text-2xl">❌ SELF-DESTRUCTED LINK!</h2>
        <p className="text-gray-600  mt-2 text-xl">
          This link has been expired.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Contact admin for more info.
        </p>
      </div>
     <div className="mt-6 opacity-80">
       <CustomFooter/>
     </div>
    </div>
  );
}

export default ExpiredPopup;