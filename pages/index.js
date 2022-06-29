import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/decentralized-factoring-challenge");
  });

  return <Layout></Layout>;
}
