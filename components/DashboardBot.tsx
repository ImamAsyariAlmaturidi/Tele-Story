import React from "react";

const DashboardBot = () => {
  return (
    <>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 text-xs">Category</th>
                  <th className="px-4 py-3 text-xs">Status</th>
                  <th className="px-4 py-3 text-xs">Until Date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border ">
                    Bot Music
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-black bg-green-100 rounded-sm">
                      Running
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">6/4/2000</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border ">
                    Bot File Sharing
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-black bg-red-500 rounded-sm">
                      Expired
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">6/4/2000</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border ">
                    Management Bot
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-black bg-green-100 rounded-sm">
                      Running
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">6/4/2000</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="px-4 py-3 text-xs font-semibold border ">
                    Userbot
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-black bg-green-100 rounded-sm">
                      Running
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">6/4/2000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardBot;
