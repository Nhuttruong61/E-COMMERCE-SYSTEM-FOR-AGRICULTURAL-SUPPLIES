import React from "react";
import { useSelector } from "react-redux";
import ComposedChartComponent from "../chart/ComposedChartComponent";
import BarChartNoPaddingComponent from "../chart/BarChartNoPaddingComponent";
import BarChartComponent from "../chart/BarChartComponent";

function Dashboard() {
  const products = useSelector((state) => state.product);
  const orders = useSelector((state) => state.orders);

  return (
    <div className="w-full">
      <div className=" flex w-full py-2">
        <div className="h-[400px] w-[50%] flex-col ">
          <ComposedChartComponent orders={orders} />
          <div className="flex justify-center">
            <p className="font-[600]">
              Biểu đồ thể hiện danh thu theo từng tháng{" "}
            </p>
          </div>
        </div>
        <div className="h-[400px] w-[50%] flex-col">
          <BarChartNoPaddingComponent products={products} />
          <div className="flex justify-center">
            <p className="font-[600]">
              Biểu đồ thể hiện 10 sản phẩm bán chạy nhất{" "}
            </p>
          </div>
        </div>
      </div>
      <div className=" my-10">
        <div className="h-[400px] w-[50%]">
          <BarChartComponent orders={orders} />
          <div className="w-full flex justify-center">
            <p className="font-[600]">
              Biểu đồ thể hiện danh thu các tuần trong tháng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
