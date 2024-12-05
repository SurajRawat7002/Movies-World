import axios from "../../Utils/axios";
import { loadperson } from "../Reducers/personSlice";
export {removeperson} from '../Reducers/personSlice'
export const asyncLoadPerson=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/person/${id}`)
        const externalId=await axios.get(`/person/${id}/external_ids`)
        const movieCredit=await axios.get(`/person/${id}/movie_credits`)
        let multiDetails={
            detail:detail.data,
            externalId:externalId.data,
            movieCredit:movieCredit.data,
            // externalId:externalId.data,
            // recommendation:recommendation.data.results,
            // videos:videos.data.results.find(m=>m.type==="Trailer"),
            // similar:similar.data.results,
            // watchprovider:watchprovider.data.results,
        };
        dispatch(loadperson(multiDetails))
    }catch(err){
        console.log(err)

    }
}