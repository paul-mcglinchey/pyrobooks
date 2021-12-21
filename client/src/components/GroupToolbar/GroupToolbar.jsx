import { Fragment } from 'react';
import { GroupInfoDisplay, GroupCreateButton, GroupSelector } from ".";

import { Fetch } from '..';

import { endpoints, requestHelper, useFetch } from '../../utilities'

const GroupToolbar = ({ userGroup, setUserGroup}) => {

  const updateUserGroup = group => {
    sessionStorage.setItem(
      'userGroup',
      JSON.stringify(group)
    )
    setUserGroup(group);

    console.log(userGroup);
  }

  const setDefaultGroup = groups => {
    if (!userGroup) {
      updateUserGroup(groups.filter(g => g.default)[0]);
    }
  }

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.groups, requestHelper.requestBuilder("GET"))}
      render={({ response, error, isLoading }) => (
        <Fragment>
          <div className="text-white">
            {isLoading && <span className="text-6xl font-extrabold tracking-wide">LOADING</span>}
            {response && response.groups && (
              <Fragment>
                <div className="flex space-x-4">
                  <GroupInfoDisplay groups={response.groups} />
                  <GroupCreateButton />
                  <GroupSelector
                    groups={response.groups}
                    userGroup={userGroup}
                    updateUserGroup={updateUserGroup}
                    setDefaultGroup={setDefaultGroup}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    />
  )
}

export default GroupToolbar;