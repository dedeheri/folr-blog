import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../../components/backend/Container";
import TableArticlesLoading from "../../../components/backend/Loading/TableArticlesLoading";
import TableArticles from "../../../components/backend/TableArticles";
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

  if (data.loading) {
    return <TableArticlesLoading />;
  }

  return (
    <Container title={"Artikel"}>
      {/* header */}
      <div className="space-y-3">
        <TabsArticles />
        <TableArticles data={data.data} />
      </div>
    </Container>
  );
}

export default GetArticles;
