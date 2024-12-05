import axios from '../../Utils/axios'
export {removetv} from '../Reducers/tvSlice'
import { loadtv } from '../Reducers/tvSlice'
export const asyncLoadtv=(id)=>async(dispatch,getState)=>{
    try{
        const detail=await axios.get(`/tv/${id}`)
        const externalId=await axios.get(`/tv/${id}/external_ids`)
        const recommendation=await axios.get(`/tv/${id}/recommendations`)
        const videos=await axios.get(`/tv/${id}/videos`)
        const similar=await axios.get(`/tv/${id}/similar`)
        const watchprovider=await axios.get(`/tv/${id}/watch/providers`)
        let multiDetails={
            detail:detail.data,
            externalId:externalId.data,
            recommendation:recommendation.data.results,
            videos:videos.data.results.find(m=>m.type==="Trailer"),
            similar:similar.data.results,
            watchprovider:watchprovider.data.results,
        };
        dispatch(loadtv(multiDetails))

    }catch(error){
        console.log(error)
    }

}