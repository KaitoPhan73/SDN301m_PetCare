// "use client";
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/redux/store";
// import {
//   increment,
//   decrement,
//   incrementByAmount,
// } from "@/redux/Counter/counterSilce";
// export default function AboutPage() {
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <div>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <span>{count}</span>
//         <button
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import CustomTable from "@/components/FeTable/CustomTable";
import { TBrandBase } from "@/types/Brand";
import { TableColumnsType } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/redux/Counter/counterSilce";
export default function AboutPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <></>
    // <CustomTable
    //   onDelete
    //   onEdit
    //   columns={columns}
    //   props={props}
    //   rowKey="id"
    //   // dataSource={arr}
    //   getData={getBrands}
    // />
  );
}
