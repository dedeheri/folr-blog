import React, { useEffect, useState } from "react";
import CardCategory from "../../../components/backend/CardCategory";
import Container from "../../../components/backend/Container";
import { getCategoryRequest } from "../../../utils/action/category";

function GetCategory() {
  // state
  const [category, setCategory] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    data: {},
  });
  // calling api
  useEffect(() => {
    getCategoryRequest(setCategory);
  }, []);

  console.log(category);

  return (
    <Container title={"Kategori"}>
      {category.loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.data.map((c, i) => (
              <CardCategory key={i} data={c} />
            ))}
          </div>

          {/* overview */}
        </>
      )}
    </Container>
  );
}

export default GetCategory;
