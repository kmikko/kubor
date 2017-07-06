// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="nav has-shadow is-default">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item">
                <span className="icon">
                  <i className="fa fa-server" />
                </span>
                <span>Kubernetes Overseer</span>
              </a>
            </div>
            <div className="nav-right nav-menu is-hidden">
              <a className="nav-item is-tab">Item 1</a>
              <a className="nav-item is-tab">Item 2</a>
              <a className="nav-item is-tab">Item 3</a>
            </div>
          </div>
        </nav>

        <div className="columns is-marginless is-maincontent">
          <div className="column is-2 hero is-fullheight is-hidden-mobile">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>Customers</a>
                  <ul>
                    <li>
                      <a>Mega Corporation Ltd</a>
                    </li>
                    <li>
                      <a>Newly founded startup</a>
                    </li>
                    <li>
                      <a>Oldest customer</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <p className="menu-label">Workloads</p>
              <ul className="menu-list">
                <li>
                  <a>Deployments</a>
                </li>
                <li>
                  <a>Jobs</a>
                </li>
                <li>
                  <a>Pods</a>
                </li>
              </ul>
              <p className="menu-label">Forecasts</p>
              <ul className="menu-list">
                <li>
                  <a>Weekly</a>
                </li>
                <li>
                  <a>Monthly</a>
                </li>
              </ul>
              <p className="menu-label">Administration</p>
              <ul className="menu-list">
                <li>
                  <a>Cluster configuration</a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column is-10">
            <div className="columns is-multiline">
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="http://bulma.io/images/placeholders/1280x960.png"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img
                            src="http://bulma.io/images/placeholders/96x96.png"
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">John Smith</p>
                        <p className="subtitle is-6">@johnsmith</p>
                      </div>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a>css</a> <a>responsive</a>
                      <br />
                      <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="http://bulma.io/images/placeholders/1280x960.png"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img
                            src="http://bulma.io/images/placeholders/96x96.png"
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">John Smith</p>
                        <p className="subtitle is-6">@johnsmith</p>
                      </div>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a>css</a> <a>responsive</a>
                      <br />
                      <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img
                        src="http://bulma.io/images/placeholders/1280x960.png"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img
                            src="http://bulma.io/images/placeholders/96x96.png"
                            alt="Image"
                          />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">John Smith</p>
                        <p className="subtitle is-6">@johnsmith</p>
                      </div>
                    </div>

                    <div className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a>css</a> <a>responsive</a>
                      <br />
                      <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-12">
                <div className="card">
                  <div className="card-content">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            <abbr title="Position">Pos</abbr>
                          </th>
                          <th>Team</th>
                          <th>
                            <abbr title="Played">Pld</abbr>
                          </th>
                          <th>
                            <abbr title="Won">W</abbr>
                          </th>
                          <th>
                            <abbr title="Drawn">D</abbr>
                          </th>
                          <th>
                            <abbr title="Lost">L</abbr>
                          </th>
                          <th>
                            <abbr title="Goals for">GF</abbr>
                          </th>
                          <th>
                            <abbr title="Goals against">GA</abbr>
                          </th>
                          <th>
                            <abbr title="Goal difference">GD</abbr>
                          </th>
                          <th>
                            <abbr title="Points">Pts</abbr>
                          </th>
                          <th>Qualification or relegation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <td>
                            <a
                              href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                              title="Leicester City F.C."
                            >
                              Leicester City
                            </a>{' '}
                          </td>
                          <td>38</td>
                          <td>23</td>
                          <td>12</td>
                          <td>3</td>
                          <td>68</td>
                          <td>36</td>
                          <td>+32</td>
                          <td>81</td>
                          <td>
                            Qualification for the{' '}
                            <a
                              href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_LeagueGroup_stage"
                              title="2016–17 UEFA Champions League"
                            >
                              Champions League group stage
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>
                            <a
                              href="https://en.wikipedia.org/wiki/Arsenal_F.C."
                              title="Arsenal F.C."
                            >
                              Arsenal
                            </a>
                          </td>
                          <td>38</td>
                          <td>20</td>
                          <td>11</td>
                          <td>7</td>
                          <td>65</td>
                          <td>36</td>
                          <td>+29</td>
                          <td>71</td>
                          <td>
                            Qualification for the{' '}
                            <a
                              href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_LeagueGroup_stage"
                              title="2016–17 UEFA Champions League"
                            >
                              Champions League group stage
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>3</th>
                          <td>
                            <a
                              href="https://en.wikipedia.org/wiki/Tottenham_Hotspur_F.C."
                              title="Tottenham Hotspur F.C."
                            >
                              Tottenham Hotspur
                            </a>
                          </td>
                          <td>38</td>
                          <td>19</td>
                          <td>13</td>
                          <td>6</td>
                          <td>69</td>
                          <td>35</td>
                          <td>+34</td>
                          <td>70</td>
                          <td>
                            Qualification for the{' '}
                            <a
                              href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_LeagueGroup_stage"
                              title="2016–17 UEFA Champions League"
                            >
                              Champions League group stage
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>4</th>
                          <td>
                            <a
                              href="https://en.wikipedia.org/wiki/Manchester_City_F.C."
                              title="Manchester City F.C."
                            >
                              Manchester City
                            </a>
                          </td>
                          <td>38</td>
                          <td>19</td>
                          <td>9</td>
                          <td>10</td>
                          <td>71</td>
                          <td>41</td>
                          <td>+30</td>
                          <td>66</td>
                          <td>
                            Qualification for the{' '}
                            <a
                              href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_LeaguePlay-off_round"
                              title="2016–17 UEFA Champions League"
                            >
                              Champions League play-off round
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>5</th>
                          <td>
                            <a
                              href="https://en.wikipedia.org/wiki/Manchester_United_F.C."
                              title="Manchester United F.C."
                            >
                              Manchester United
                            </a>
                          </td>
                          <td>38</td>
                          <td>19</td>
                          <td>9</td>
                          <td>10</td>
                          <td>49</td>
                          <td>35</td>
                          <td>+14</td>
                          <td>66</td>
                          <td>
                            Qualification for the{' '}
                            <a
                              href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Europa_LeagueGroup_stage"
                              title="2016–17 UEFA Europa League"
                            >
                              Europa League group stage
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="column is-12">
                <article className="message">
                  <div className="message-header">
                    <p>Hello World</p>
                    <button className="delete" />
                  </div>
                  <div className="message-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat
                    ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
                    fringilla. Nullam gravida purus diam, et dictum{' '}
                    <a>felis venenatis</a> efficitur. Aenean ac{' '}
                    <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
                    arcu et sollicitudin porttitor, tortor urna tempor ligula,
                    id porttitor mi magna a neque. Donec dui urna, vehicula et
                    sem eget, facilisis sodales sem.
                  </div>
                </article>
              </div>
              <div className="column is-12">
                <div className="tile is-ancestor">
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">Hello World</p>
                      <p className="subtitle">What is up?</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">Foo</p>
                      <p className="subtitle">Bar</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">Third column</p>
                      <p className="subtitle">With some content</p>
                      <div className="content">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin ornare magna eros, eu pellentesque tortor
                          vestibulum ut. Maecenas non massa sem. Etiam finibus
                          odio quis feugiat facilisis.
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
