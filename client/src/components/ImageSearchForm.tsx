import { useState, ChangeEvent, FormEvent } from "react";

interface IImageSearchFormProps {
    search: (text: string) => void
}
export const ImageSearchForm = (props: IImageSearchFormProps ) => {

  const [userSearchText, setUserSearchText] = useState("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    setUserSearchText(e.target.value); 
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.search(userSearchText);
  }
  return (
    <>
  <form className="search-form" onSubmit={handleSubmit}>
  <input value={userSearchText} onChange={handleChange}/>
  <button>Search</button>
</form>
</>
)
}
