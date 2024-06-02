import React from "react";

export default function UserDetail({ params }: { params: { slug: string } }) {
  return <div>pagedetail {params.slug}</div>;
}
