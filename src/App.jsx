import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/Details/Details";
import Explore from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import WatchList from "./pages/watchList/WatchList";

import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { fetchDataFromApi } from "./utils/api";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoint = ["tv", "movie"];
    let allGenres = [];
    endPoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises); // returns all api call together

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log(typeof allGenres);

    allGenres = Object.fromEntries(
      Object.entries(allGenres).filter(([key, value]) => value !== null)
    );

    // console.log(filteredObject);

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/watchList" element={<WatchList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
