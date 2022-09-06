import React from "react";
import Container from "../../../components/backend/Container";
import TabsArticles from "../../../components/backend/TabsArticles";

function Draft() {
  return (
    <Container title={"Artikel"}>
      {/* header */}
      <div className="space-y-3">
        <TabsArticles />
      </div>
    </Container>
  );
}

export default Draft;
