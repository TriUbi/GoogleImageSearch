import { IImage } from "./IImage";
import { ISearchInformation } from "./ISearchInformation";
import { ISpelling } from "./ISpelling";

export interface IImageSearchData {
    items: IImage[];
    searchInformation: ISearchInformation;
    spelling?: ISpelling;
  }