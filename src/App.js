import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavInshort from "./components/NavInshort";
import NewsContent from "./components/NewsContent/NewsContent";
import WeatherApp from "./components/Weather/weatherapp";

function App() {
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  const [keyword, setKeyword] = useState('');
  const [sortby, setSortby] = useState("publishedAt");

  const apiKey = "d697e969514c4aa98744e2052da689c5";

  // console.log(process.env);
  const newsApi = async () => {
    try {
      if(keyword.length !== 0) {
        if(sortby !== "publishedAt") {
          var news = await axios.get(
            `https://newsapi.org/v2/everything?q=${keyword}&sortBy=${sortby}&apiKey=${apiKey}&pageSize=${loadMore}`
          );
        }
        else {
          var news = await axios.get(
            `https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${apiKey}&pageSize=${loadMore}`
          );
        }
      }
      else {
        var news = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=${loadMore}&category=${category}`
        );
      }
      // console.log(news);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
    // eslint-disable-next-line
  }, [newsResults, loadMore, category]);

  return (
    <div className="App" id="#home">
      <NavInshort setCategory={setCategory} setCountry={setCountry} setSortby={setSortby}/>
      <div className="search-area">
        <input className="input" onChange={event => setKeyword(event.target.value)} />
        {/* {console.log(keyword)} */}
        <button
          className="search"
          onClick={() => {newsApi()}}
          key={keyword}
        >
          Search
        </button>
      </div>
      <div className="main-content">
        <div className="news-block">
          {newsResults && (
            <NewsContent
              newsArray={newsArray}
              newsResults={newsResults}
              loadMore={loadMore}
              setLoadMore={setLoadMore}
            />
          )}
        </div>
        <div className="weather-block">
          <WeatherApp />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
