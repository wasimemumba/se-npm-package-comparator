import React, { useEffect, useState } from "react";
import "./ComparisonStyles.scss";
import { Tag } from "antd";
import axios from "axios";
import { CalculateWinner, convertToApiUrl } from "../../utils/ComparisonUtils";

type ComparisonProps = {
  data: any;
};

const Comparison: React.FC<ComparisonProps> = ({ data }) => {
  const [result, setResult] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  // const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const { result, index } = CalculateWinner(data[0], data[1]);

    setIndex(index);
    setResult(result);
  }, []);

  // useEffect(() => {
  //   const getLanguages = async () => {
  //     const githubUrl: string = data[index].collected.metadata.links.repository;

  //     const apiUrl = convertToApiUrl(githubUrl);
  //     try {
  //       const result = await axios.get(apiUrl + "/languages");
  //       setLanguages(Object.keys(result.data));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getLanguages();
  // }, [index]);

  const languages = ["JavaScript", "TypeScript", "HTML", "CSS"];

  return (
    <>
      <div
        style={{
          color: "blue",
        }}
      >
        <div className="Result">
          <h1>{result}</h1>
        </div>
        <div className="DetailsContainer">
          <div className="Details">
            <div
              className="DetailsContent"
              style={{
                padding: "0rem 2rem",
              }}
            >
              <h2>Recommended : {data[index].collected.metadata.name} </h2>
              <p
                style={{
                  color: "black",
                }}
              >
                {data[index].collected.metadata.description}
              </p>
              <p
                style={{
                  color: "black",
                }}
              >
                visit the link{" "}
                <a
                  style={{
                    color: "blue",
                  }}
                  href={data[index].collected?.metadata?.links?.homepage}
                  target="_blank"
                >
                  Homepage
                </a>
              </p>
            </div>
            <div className="Stats">
              <div className="StatResult">
                <div>Downloads</div>
                <div>
                  {Math.round(data[index].evaluation.popularity.downloadsCount)}
                  +
                </div>
              </div>
              <div className="StatResult">
                <div>Stars</div>
                <div>{data[index].collected.npm.starsCount}+</div>
              </div>
              <div className="StatResult">
                <div>Health</div>
                <div>{data[index].evaluation.quality.health * 100}%</div>
              </div>
            </div>
          </div>
          <div className="Languages">
            <div
              style={{
                padding: "0rem 5rem",
                borderBottom: "1px solid #e0e0e0",
                marginTop: "1rem",
                fontWeight: "bold",
              }}
            >
              Languages
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem 2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {languages.map((language, index) => (
                  <Tag key={index} color="blue">
                    {language}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comparison;
