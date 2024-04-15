import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/SelectedPacakgesContext";
import axios from "axios";
import CompareTable from "./CompareTable/CompareTable";
import LineChart from "./LineChart.tsx/LineChart";
import { Alert, Spin } from "antd";
import Comparison from "./Comparison/Comparison";
import { dummyPackageData } from "../data";

const ComparisonSections: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [Error, setError] = useState<string>("");
  const { selected } = useMyContext();

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setData(dummyPackageData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // i think this approach is wrong
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       selected.map(async (element) => {
  //         console.log(element);
  //         const response = await axios.get(
  //           `https://api.npms.io/v2/search?q=${element}&size=1`
  //         );
  //         setData((prevData: any) => [...prevData, response.data.results[0]]);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const promises = selected.map((element) => {
  //         const response = axios.get(
  //           `https://api.npms.io/v2/package/${element}`
  //         );
  //         return response;
  //       });
  //       const results = await Promise.all(promises);
  //       const data = results.map((element) => element.data);
  //       setData(data);
  //     } catch (error: any) {
  //       if (error.response.status === 404) {
  //         setError(
  //           `${error.response.config.url.replace(
  //             /^https:\/\/api\.npms\.io\/v2\/package\//,
  //             ""
  //           )} Package not found`
  //         );
  //       } else {
  //         setError("Something went wrong");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [selected]);

  return (
    <>
      {Error ? (
        <div
          style={{
            margin: "2rem 0",
          }}
        >
          {" "}
          <Alert
            message={Error}
            description="Please check the package name and try again."
            type="error"
            closable
            onClose={() => console.log("hello")}
          />
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5rem 0",
          }}
        >
          <Spin tip="loading" size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              margin: "5rem 0",
            }}
          >
            <CompareTable loading={loading} data={data} />
          </div>

          <div
            style={{
              margin: "5rem 0",
            }}
          >
            <h1
              style={{
                color: "blue",
              }}
            >
              Downloads
            </h1>
            <LineChart
              loading={loading}
              line1Name={data[0]?.collected?.metadata?.name}
              line2Name={data[1]?.collected?.metadata?.name}
              Line1={data[0]?.collected?.npm?.downloads}
              Line2={data[1]?.collected?.npm?.downloads}
            />
          </div>
          <div>
            <Comparison data={data} />
          </div>
        </>
      )}
    </>
  );
};

export default ComparisonSections;
