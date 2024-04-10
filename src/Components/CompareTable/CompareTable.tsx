import "./CompareTable.scss";
import React from "react";

type PackageInfoProps = {
  name: string;
  version: string;
  Description: string;
  Keywords: string[];
  Homepage: string;
  Repository: string;
  Bugs: string;
  License: string;
  LastModificationDate: string;
  AuthorsPublishers: string;
  Maintainers: string;
};

const PacakgeInfo: React.FC<PackageInfoProps> = ({
  Description,
  Keywords,
  AuthorsPublishers,
  LastModificationDate,
  License,
  Maintainers,
  Homepage,
  Repository,
  Bugs,
  name,
  version,
}) => {
  return (
    <>
      <div className="tableHead">
        <div>{name}</div>
        <div>{version}</div>
      </div>
      <div className="tableRow">{Description}</div>
      <div className="tableRow">
        {Keywords?.map((keyword, idx) => (
          <span key={idx}>
            {keyword}
            {Keywords.length - 1 !== idx ? "," : <></>}
          </span>
        ))}
      </div>
      <div className="tableRow" style={{ justifyContent: "space-around" }}>
        <a href={Homepage} target="_blank">
          Homepage
        </a>
        <a href={Repository} target="_blank">
          Github
        </a>
        <a href={Bugs} target="_blank">
          Bugs
        </a>
      </div>
      <div className="tableRow">
        <span>{License}</span>
      </div>
      <div className="tableRow">
        <span>{LastModificationDate}</span>
      </div>
      <div className="tableRow">
        <span>{AuthorsPublishers}</span>
      </div>
      <div className="tableRow">
        <span>{Maintainers}</span>
      </div>
    </>
  );
};

type PackageData = {
  data: any;
  loading: boolean;
};

const Table: React.FC<PackageData> = ({ loading, data }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="Table" className="tableContainer">
      <div className="tableColoumn tableDesctiprion" style={{ color: "blue" }}>
        <div className="tableRow">Pacakge Name</div>
        <div className="tableRow">Description</div>
        <div className="tableRow">Keywords</div>
        <div className="tableRow">Repository</div>
        <div className="tableRow">License</div>
        <div className="tableRow">Last Modification Date</div>
        <div className="tableRow">Authors/Publishers</div>
        <div className="tableRow">Maintainers</div>
      </div>

      {data.map((element: any, idx: number) => {
        return (
          <div className="tableColoumn" key={idx}>
            <PacakgeInfo
              name={element?.collected?.metadata?.name}
              version={element?.collected?.metadata?.version}
              Description={element?.collected?.metadata?.description}
              Keywords={element?.collected?.metadata?.keywords}
              Homepage={element?.collected?.metadata?.links?.homepage}
              Repository={element?.collected?.metadata?.links?.repository}
              Bugs={element?.collected?.metadata?.links?.bugs}
              License={element?.collected?.metadata?.license}
              LastModificationDate={element?.collected?.metadata?.date}
              AuthorsPublishers={
                element?.collected?.metadata?.publisher
                  ? element?.collected?.metadata?.publisher.email
                  : "N/A"
              }
              Maintainers={
                element?.collected?.metadata?.maintainers &&
                element.collected.metadata.maintainers.length > 0
                  ? element.collected.metadata.maintainers[0].email
                  : "N/A"
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Table;
