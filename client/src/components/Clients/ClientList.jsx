import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Fetch, ClientEntry, SpinnerIcon, ClientPrompter, SquareIconButton } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';
import { Paginator, Selector } from '..';

const filterOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Assignee', value: 'assignee' },
  { label: 'Last Visit', value: 'lastVisit' },
  { label: 'Date of Birth', value: 'dateOfBirth' },
]

const ClientList = ({ userGroup }) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [filterValue, setFilterValue] = useState(null);

  const query = `pageNumber=${pageNumber}&pageSize=${pageSize}&groupname=${userGroup && userGroup.groupname}&${filter.value}=${filterValue}`;

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}?${query}`, requestHelper.requestBuilder("GET"), [pageSize, pageNumber, filter, filterValue])}
      render={({ response, error, isLoading }) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
          {isLoading && (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          )}
          <div className="flex flex-col flex-grow">
            <div className="py-1 my-2 flex justify-between items-center text-gray-600 space-x-4 bg-gray-800 px-4 rounded-lg">
              <div className="flex flex-grow space-x-4 items-center">
                <input onChange={(e) => setFilterValue(e.target.value)} className="flex flex-1 px-2 my-2 bg-transparent outline-none focus:outline-none text-gray-400" />
                <Selector options={filterOptions} setValue={setFilter} option={filter} />
                <SearchIcon className="w-6 h-6" />
              </div>
            </div>
            {response && response.clients && (
              response.totalClients > 0 ? (
                response.clients.map((c) => {
                  return (
                    <ClientEntry c={c} key={c._id} userGroup={userGroup} />
                  )
                })
              ) : (
                <ClientPrompter />
              )
            )}
          </div>
          {response && !isLoading && (
            <Paginator pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} totalClients={response.totalClients} />
          )}
        </div>
      )
      }
    />
  )
}

export default ClientList;