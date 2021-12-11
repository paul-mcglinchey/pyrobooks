import { Fragment } from "react";
import { makeDate } from "../helpers/dateParser";

const cols = [
  "Title", "Notes", "Date"
]

const ClientSessions = (props) => {

  const { sessions } = props;

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  {cols.map((c, i) => {
                    return (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                        key={i}
                      >
                        {c}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {sessions.map((s) => {
                  return (
                    <tr key={s._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        {s.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        <div className="flex space-x-2">
                          {s.notes.map((n, i) => {
                            return (
                              <span key={i} className="bg-gray-800 rounded uppercase tracking-wide text-sm font-medium px-2">
                                {n}
                              </span>
                            )
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                        {makeDate(s.date, '/')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientSessions;