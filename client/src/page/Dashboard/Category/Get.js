import React, { useEffect, useState } from "react";
import { categoryRequest } from "../../../utils/action";

// components
import Category from "../../../components/Dashboard/Loading/Category";
import Sidebar from "./Sidebar";
import OpenSidebar from "../../../components/Dashboard/OpenSidebar";
import Sub from "../../../components/Dashboard/Sub";
import CardCategory from "../../../components/Dashboard/CardCategory";
import NoData from "../../../components/NoData";
import SubDarkMode from "../../../components/SubDarkMode";

function Get() {
  // sidebar add
  const [show, setShow] = useState(false);

  const [data, setData] = useState({
    list: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await categoryRequest();
        setData({
          list: response.data.data,
          loading: false,
        });
      } catch (error) {
        setData({
          error: error,
          loading: false,
        });
      }
    }

    getCategory();
  }, []);

  if (data.loading) {
    return (
      <Sub title={"Loading"}>
        <Category />
      </Sub>
    );
  } else if (data.list.length === 0) {
    return (
      <Sub title={"Kategori"}>
        <div className="space-y-8">
          <div className="flex justify-end">
            <OpenSidebar setShow={setShow}>
              <Sidebar setShow={setShow} show={show} />
            </OpenSidebar>
          </div>
          <NoData />
        </div>
      </Sub>
    );
  } else if (data.error) {
    return <h1>Terjadi Kesalahan</h1>;
  } else {
    return (
      <Sub title={"Kategori"}>
        <div className="space-y-8">
          <div className="flex justify-end">
            <OpenSidebar setShow={setShow}>
              <Sidebar setShow={setShow} show={show} />
            </OpenSidebar>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.list?.map(({ _id, category }) => (
              <CardCategory key={_id} category={category} id={_id} />
            ))}
          </div>
        </div>
      </Sub>
    );
  }
}

export default Get;
