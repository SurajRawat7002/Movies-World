export { removeMovie } from "../Reducers/MovieSlice";
import axios from "../../Utils/axios";
import { loadMovie } from "../Reducers/MovieSlice";

export const asyncLoadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);
    let multiDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendation: recommendation.data.results,
      videos: videos.data.results.find(m=>m.type==="Trailer"),
      similar: similar.data.results,
      watchprovider: watchprovider.data.results.US,
    };
    dispatch(loadMovie(multiDetails))
  } catch (error) {
    console.log(error);
  }
};
