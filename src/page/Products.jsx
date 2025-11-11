import React from 'react'
import Header from '../component/Header'
import { useQuery } from "@tanstack/react-query";
import {
  getNavbar
} from "../api/products";

export default function Products() {

  // ===== Query Data =====
  const { data: navData, refetch: refetchNav } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });
  const listNav = navData || [];

  console.log(navData);
  
  return (
    <div>
      <Header data= {listNav}/>
    </div>
  )
}
