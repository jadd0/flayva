import Tags from './components/Tags';
import { useState } from 'react';
import RecipeSearch from './RecipeSearch';
import UserSearch from './UserSearch';

export default function Search() {
  const [current, setCurrent] = useState(true);
  // False = users
  // True = recipes


  function userSearchRequest() {

  }

  function recipeSearchRequest() {

  }

  function SearchBar() {
    return (
      <div className="border-1 border-black h-20">
        <input className="w-8/12" />
      </div>
    )
  }

  function switchCurrent() {
    setCurrent(!current);
    console.log(current);
  }

  function SwitchBar() {
    return (
      <div className="flex justify-center items-center gap-4 w-full">
        <button onClick={switchCurrent} className="w-36 h-8 bg-blue-500 text-white rounded-md">
          Switch to {current ? 'Recipes' : 'Users'}
        </button>
      </div>
    );
  }

	return (
		<>
			<div className="w-screen h-screen flex justify-center items-center gap-20">
				<div className="w-4/12 h-9/12 border-1 border-black rounded-md">
					<SearchBar />
          <SwitchBar  />
          {current ? <RecipeSearch/> : <UserSearch />}
				</div>
				<Tags />
			</div>
		</>
	);
}
