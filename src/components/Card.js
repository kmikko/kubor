import React from "react";

const Card = props =>
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <svg
          className="placeholder"
          width="1280px"
          height="960px"
          alt="Image"
        />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <svg
              className="placeholder"
              width="96px"
              height="96px"
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>.
        <a>css</a> <a>responsive</a>
        <br />
        <small>11:09 PM - 1 Jan 2016</small>
      </div>
    </div>
  </div>;

export default Card;
