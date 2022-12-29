import React, { useState, useEffect } from "react";
import "./App.css";
import apiAuth from "./api";

const App = () => {
  const [facility, setFacility] = useState([]);
  const [floor, setFloor] = useState([]);
  const [sector, setSector] = useState([]);

  useEffect(() => {
    getfacility();
    getfloor();
    getSector();
  }, []);

  function getfacility() {
    apiAuth.get("/api/facility/").then((res) => {
      console.log("facility", res.data);
      setFacility(res.data);
    });
  }

  function getfloor() {
    apiAuth.get("/api/floor/").then((res) => {
      console.log("floor", res.data);
      setFloor(res.data);
    });
  }

  function getSector() {
    apiAuth.get("/api/sector/").then((res) => {
      console.log("sector", res.data);
      setSector(res.data);
    });
  }

  const filteredFloor = facility.map((f) => {
    const temp2 = floor.filter((item) => item.facility === f.id);
    return [...temp2];
  });

  const filteredSector = floor.map((f) => {
    const temp2 = sector.filter((item) => item.floor === f.id);
    return [...temp2];
  });

  return (
    <div className="container">
      {facility.map((pro) => {
        return (
          <>
            <div className="card">
              <h2>{pro.facility_name}</h2>
              {filteredFloor.map((fil) =>
                fil.map((item) =>
                  item.facility === pro.id ? (
                    <div>
                      <h5>{item.floor_name}</h5>
                      <div className="sec">
                      {filteredSector.map((sec) =>
                        sec.map((sec1) =>
                          sec1.floor === item.id ? (
                            
                              <p>{sec1.sector_name}</p>
                            
                          ) : (
                            <></>
                          )
                        )
                      )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                )
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default App;
