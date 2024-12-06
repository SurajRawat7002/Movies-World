import axios from "axios";
const instance=axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmM1ZGFiZTVhZjg2MDIyNjhlYmNmNzdiZjUzMjU0NCIsIm5iZiI6MTczMTU2NjAzMi4xODcwMjUzLCJzdWIiOiI2NzM1OTM5NDQ4ZTlkMmNmMDFhODY2MWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dCv3OfG4ZfMM4TQZmGjby0O36LkeIAVkXpZWF5mOHpw'
      }
})
export default instance;
