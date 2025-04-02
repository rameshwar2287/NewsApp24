import React, {useState,useEffect} from "react";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=>{
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const updatepage = async () => {
    try {
        props.setprogress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c58f86a94ec941c7a48b7461740d5560`
        console.log("Fetching URL:", url);

        setLoading(true);
        let response = await fetch(url);

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        props.setprogress(50);
        let parseData = await response.json();

        console.log("API Response:", parseData);

        if (parseData.status !== "ok") {
            throw new Error(`API Error: ${parseData.message}`);
        }

        setArticle(parseData.articles);
        setLoading(false);
        setTotalResults(parseData.totalResults);
        props.setprogress(100);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
    }
};

  useEffect(() => {
    updatepage();
    document.title=`News 24x7-${capitalizeFirstLetter(props.category)}`;
  // eslint-disable-next-line
  }, [])
  
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

    return (
      <>
        <div className="container my-3" style={{paddingTop:'50px'}}>
          <h2 className="my-3 text-center" >
            News 24x7 - Top {capitalizeFirstLetter(props.category)}{" "}
            Headlines
          </h2>
          {loading && (
            <div>
              <div className="d-flex justify-content-center align-item-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          )}
          <div className="container ">
          <InfiniteScroll
          dataLength={article.length}
            next={fetchMoreData}
            hasMore={article.length !== totalResults}
            loader={<div className="container my-3">
              <div className="d-flex justify-content-center align-item-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>}
            >
            {
              <div className="row">
                {article.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <Newsitems
                        title={
                          element.title !== null
                            ? element.title.slice(0, 45)
                            : " No Title"
                        }
                        description={
                          element.description !== null
                            ? element.description.slice(0, 88)
                            : "No Description"
                        }
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            }
          </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }

News.defaultProps = {
  category: "general",
  country: "in",
  pageSize: 9,
};
News.propTypes = {
  category: PropTypes.string.isRequired,
};
export default News;