import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../../components/backend/Container";
import Empty from "../../../components/backend/Empty";
import TableArticlesLoading from "../../../components/backend/Loading/TableArticlesLoading";
import TableArticles from "../../../components/backend/Table/TableArticles";
import TabsArticles from "../../../components/backend/TabsArticles";

import { getArticles } from "../../../utils/action/articles";

function GetArticles() {
  const [data, setData] = useState({
    data: {},
    success: false,
    error: false,
    loading: true,
    message: "",
    page: {},
  });

  useEffect(() => {
    getArticles(setData);
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const createdAt = query.get("createdAt");

  return (
    <Container title={"Artikel"}>
      {/* header */}
      <div className="space-y-3">
        <TabsArticles />
        {data.loading ? (
          <TableArticlesLoading />
        ) : data.data.length === 0 ? (
          <Empty />
        ) : (
          <TableArticles data={data.data} />
        )}
      </div>
    </Container>
  );
}

export default GetArticles;
