import React, { Component } from "react";

import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [
        {
          id: 1,
          name: "#flatshoes",
          posts: "16k"
        },
        {
          id: 2,
          name: "#heels",
          posts: "5k"
        },
        {
          id: 3,
          name: "#redshoes",
          posts: "6k"
        },
        {
          id: 4,
          name: "#sportshoes",
          posts: "1k"
        }
      ],
      selectedTabId: "Home",
      data: [],
      errored: [],
      keyword: "#shoes,#sandals",
      btnStatus: false
    };
  }

  onNavbar = item => {
    this.setState({ selectedTabId: item });
  };
  checkUrl = key => {
    this.setState({ errored: { [key]: "true" } });
  };

  onType = () => {
    const check = document.getElementsByClassName("bootstrap-tagsinput")[0]
      .lastChild;
    check.style.display = "block";
    const search = document.getElementsByClassName("form-control-feedback")[0];
    search.style.top = "1%";
  };

  componentDidMount() {
    fetch("http://www.mocky.io/v2/5d8686a032000024b607b40e")
      .then(res => res.json())
      .then(response => {
        this.setState({
          data: response.articles,
          btnStatus: true
        });
      });
  }

  render() {
    const {
      suggestions,
      selectedTabId,
      data,
      errored,
      keyword,
      btnStatus
    } = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            <span className="fa fa-arrow-left"></span>
          </a>
          <form className="form-inline">
            <span className="fa fa-question"></span>
          </form>
        </nav>

        <div className="main col-lg-10 col-md-10 col-sm-10">
          <div className="form-group has-search" onClick={this.onType}>
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control input-tags"
              data-role="tagsinput"
              value={keyword}
              onChange={e => {
                this.setState({ keyword: e.target.value });
              }}
            />
          </div>
          <div className="may-search">
            <p>You may also search for:</p>
            <div className="container">
              <div className="row justify-content-center align-items-center h-100">
                {suggestions.map((category, key) => (
                  <div className="col-md-3" key={key}>
                    <div className="search-cards">
                      <p className="margin-bottom font-weight-bold">
                        {" "}
                        {category.name}
                      </p>
                      <p className="margin-bottom">{category.posts} posts</p>
                    </div>
                    {/* <p>{category.name}</p> */}
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <h1>200k</h1>
                <p className="font-size">
                  Number of people talking about #fashion, #shoes
                </p>
              </div>
              <div className="col">
                <h1>20k</h1>
                <p className="font-size">
                  Number of Kofluence influencers talking about #fashion, #shoes
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <section id="tabs">
              <div className="container">
                <div className="row gallery-row">
                  <div className="col-xs-12 ">
                    <nav>
                      <div
                        className="nav nav-tabs nav-fill"
                        id="nav-tab"
                        role="tablist"
                      >
                        <a
                          className={
                            selectedTabId === "Home"
                              ? "nav-item nav-link active"
                              : "nav-item nav-link"
                          }
                          id="nav-home-tab"
                          data-toggle="tab"
                          href="#Home"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                          onClick={() => this.onNavbar("Home")}
                        >
                          Top Posts
                        </a>
                        <a
                          className={
                            selectedTabId === "Profile"
                              ? "nav-item nav-link active"
                              : "nav-item nav-link"
                          }
                          id="nav-profile-tab"
                          data-toggle="tab"
                          href="#Home"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                          onClick={() => this.onNavbar("Profile")}
                        >
                          Latest Posts
                        </a>
                      </div>
                    </nav>

                    <div
                      className="tab-content py-3 px-3 px-sm-0"
                      id="nav-tabContent"
                    >
                      <div
                        className={
                          selectedTabId === "Home"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="Home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <div className="row justify-content-center align-items-center h-100">
                          {data.map((list, key) =>
                            errored[key] === "true" ||
                            list.urlToImage === null ? (
                              ""
                            ) : (
                              <div
                                className="gallery-item col-md-3 col-sm-5"
                                key={key}
                              >
                                <img
                                  src={list.urlToImage}
                                  className="gallery-image"
                                  onError={() => this.checkUrl(key)}
                                  alt="gallery"
                                />

                                <div className="gallery-item-info align-items-end">
                                  <ul>
                                    <li className="gallery-item-comments text-left">
                                      <span className="visually-hidden">
                                        Comments:
                                      </span>
                                      <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      3000
                                    </li>
                                    <li className="gallery-item-likes">
                                      <span className="visually-hidden">
                                        Likes:
                                      </span>
                                      <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      7000
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          selectedTabId === "Profile"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="Profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="row justify-content-center align-items-center h-100">
                          {data.map((list, key) =>
                            errored[key] === "true" ||
                            list.urlToImage === null ? (
                              ""
                            ) : (
                              <div
                                className="gallery-item col-md-3 col-sm-5"
                                key={key}
                              >
                                <img
                                  src={list.urlToImage}
                                  className="gallery-image"
                                  onError={() => this.checkUrl(key)}
                                  alt="gallery"
                                />

                                <div className="gallery-item-info align-items-end">
                                  <ul>
                                    <li className="gallery-item-comments text-left">
                                      <span className="visually-hidden">
                                        Comments:
                                      </span>
                                      <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      3000
                                    </li>
                                    <li className="gallery-item-likes">
                                      <span className="visually-hidden">
                                        Likes:
                                      </span>
                                      <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      7000
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {btnStatus ? (
                    <button className="btn btn-danger btn-lg">
                      Start A Campaign
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
