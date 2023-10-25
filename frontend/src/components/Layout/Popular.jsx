import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductRd } from "../../redux/action/productAction";
import ProductCart from "../Product/ProductCart";
function Popular() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const { data } = useSelector((state) => state.event);
  const [dataSort, setDataSort] = useState([]);
  const [dataPopular, setDataPopular] = useState([]);
  const [dataEvent, setDataEvent] = useState([]);
  useEffect(() => {
    if (data) {
      const unExpiredProducts = data.filter((item) => {
        return isNotExpired(new Date(item.expirationDate));
      });
      setDataEvent(unExpiredProducts);
    } else {
      setDataEvent([]);
    }
  }, [data]);
  const getAllProduct = async () => {
    dispatch(getAllProductRd());
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const allProduct = productData?.data ? [...productData?.data] : [];
    const sortedProduct = allProduct?.sort((a, b) => b.sold_out - a.sold_out);
    const data = sortedProduct?.slice(0, 5);
    setDataSort(data);
  }, []);
  useEffect(() => {
    const eventId = dataEvent.map((item) => {
      return {
        idProductEvent: item.product[0]._id,
        discount: item.discount,
      };
    });
    const updatedDataSort = dataSort.map((item) => {
      const event = eventId.find(
        (eventItem) => eventItem.idProductEvent === item._id
      );
      if (event) {
        return {
          ...item,
          distCount: item.distCount + event.discount,
        };
      }
      return item;
    });

    setDataPopular(updatedDataSort);
  }, [dataEvent, dataSort]);
  const isNotExpired = (expirationDate) => {
    const currentDate = new Date();
    return expirationDate > currentDate;
  };
  return (
    <div className=" p-6 rounded-lg mb-12  md:px-[10%]">
      <div className=" flex justify-center text-center items-center">
        <p className="  my-8 font-[700] md:text-[32px] text-[20px] border px-6 bg-[#0e9c49] text-white rounded-[20px]">
          PHỔ BIẾN
        </p>
      </div>
      <div className="grid gap-[5px] mx-1 md:grid-cols-4 grid-cols-2  md:gap-[10px] lg:grid-cols-5 lg:gap-[20px]  xl:gap-[30px]">
        {dataPopular && dataPopular.length !== 0 && (
          <>
            {dataPopular &&
              dataPopular.map((i, index) => (
                <ProductCart key={index} item={i} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(Popular);
