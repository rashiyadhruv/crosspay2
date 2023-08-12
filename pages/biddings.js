import React from "react";

import Page from "../components/Page";
import WalletOverview from "../components/WalletOverview";
import Layout from "../components/Layout";
import PageMarketplace from "../components/PageMarketplace";

const Dashboard = () => {
  return (
    <Layout>
      <PageMarketplace typeofcontent="marketplace" />
    </Layout>
  );
};

export default Dashboard;
