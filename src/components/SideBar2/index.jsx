import "./SideBar2.css";

const SideBar2 = () => {
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="head">
            <div className="user-img">
              <img src="https://github.com/Elias-FS.png" alt="" />
            </div>
            <div className="user-details">
              <p className="title">Web Developer</p>
              <p className="name">Elias Fausto</p>
            </div>
          </div>
          <div className="nav">
            <div className="menu">
              <p className="title">Main</p>
              <ul>
                <li>
                  <a href="#">
                    <i className="fas fa-home"></i>{" "}
                    <span className="text">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fas fa-home"></i>{" "}
                    <span className="text">Dashboard</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar2;
