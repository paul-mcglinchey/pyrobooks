import { useState } from 'react';
import { Fetch, ClientEntry, SpinnerIcon, ClientPrompter } from '..';
import { endpoints, useFetch, requestHelper } from '../../utilities';
import Paginator from '../Common/Paginator';

const ClientList = ({ userGroup }) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Fetch
      fetchOutput={useFetch(`${endpoints.clients}?pageNumber=${pageNumber}&pageSize=${pageSize}&groupname=${userGroup && userGroup.groupname}`, requestHelper.requestBuilder("GET"), [pageSize, pageNumber])}
      render={({ response, error, isLoading }) => (
        <div className="rounded-lg flex flex-col space-y-0 pb-2 min-h-96">
          {isLoading && (
            <div className="flex justify-center py-10">
              <SpinnerIcon className="text-white h-12 w-12" />
            </div>
          )}
          <div className="flex flex-col flex-grow">
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