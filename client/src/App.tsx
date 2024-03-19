import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import { IImageSearchData } from "./models/IImageSearchData";
import './App.css'; 
import { Favourites } from "./components/Favourites";




const App = () => {
  const [userSearchText, setUserSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<IImageSearchData>({items: [],
    searchInformation: {
      searchTime: 0
    }
});
  const { isAuthenticated, user } = useAuth0();

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    setUserSearchText(e.target.value); 
  }

  const handleSubmit = async (e: FormEvent, searchText: string = userSearchText) => {
    e.preventDefault();

    let response = await axios.get<IImageSearchData>(
      `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=751d085b7b4f64115&num=10&searchType=image&q=${searchText}`
     );
     

setSearchResults({
      items: response.data.items.map((item) => ({
        searchTerm: userSearchText,
        link: item.link,
        image: { byteSize: item.image.byteSize },
      })),
      searchInformation: response.data.searchInformation,
      spelling: response.data.spelling,
    })
  }


  return (
    
    <>
    {isAuthenticated ? (
    <>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input value={userSearchText} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      </div>

<div className="search-results">
      <h3>Search Results:</h3>
      {searchResults.searchInformation.searchTime && <p>{searchResults.searchInformation.searchTime}</p>}
</div>
{
  searchResults.spelling && <p
  onClick={(e) =>
    handleSubmit(e, searchResults.spelling?.correctedQuery)
    }>Did u mean: {searchResults.spelling.correctedQuery}?</p>
}
<div className="list-container">
      <ul>
        {searchResults.items.map((item, index) => (
          <li key={index}>
          <img src={item.link} alt=""/>
           <span onClick={async ()=> {

            let favourite = { 
              id: user?.sub,
            favourite: {
                url: item.link,
                titel: item.searchTerm,
                byteSize: item.image.byteSize
            }}

          let response = await axios.post("http://localhost:3000/favourites/add/", favourite);

          console.log(response);
          

           }}>favo</span>
          </li>
         
        ))}
      </ul>
      </div>
      <div>
        <Favourites/>
      </div>
       <div>
      <LogoutButton />
      </div>
    </>
  ) : (
    <LoginButton />
  )}
      </>
  )}

export default App