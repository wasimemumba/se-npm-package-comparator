import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import type { SelectProps } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "../../Context/SelectedPacakgesContext";

type AutoCompleteInputPropType = {
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const AutoCompleteInput2: React.FC<AutoCompleteInputPropType> = ({
  setShowTable,
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { selected, setSelected } = useMyContext();

  // i think this approach is wrong
  // useEffect(() => {
  //   const getOptions = setTimeout(async () => {
  //     if (keyword.length < 2) {
  //       setOptions([]);
  //       return;
  //     }
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `https://api.npms.io/v2/search?q=${keyword}`
  //       );
  //       const newOptions = response.data.results.map((element: any) => ({
  //         value: element.package.name,
  //         label: element.package.name,
  //       }));
  //       setOptions(newOptions);
  //     } catch (error: any) {
  //       if (axios.isAxiosError(error)) {
  //         console.log(error.status);
  //         toast.error(error.message + "\n Please try again later");
  //       } else {
  //         toast.error("Something went wrong Please try again later");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 500);

  //Debounce in useEffect
  useEffect(() => {
    const getOptions = setTimeout(async () => {
      if (keyword.length < 2) {
        setOptions([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.npms.io/v2/search?q=${keyword}`
        );
        const newOptions = response.data.results.map((element: any) => ({
          value: element.package.name,
          label: element.package.name,
        }));
        setOptions(newOptions);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(getOptions);
    };
  }, [keyword]);

  const handleChange = (value: string[]) => {
    setKeyword("");

    if (value.length < 2) {
      setShowTable(false);
    }
    if (value.length > 2) {
      toast.error("You can only select 2 packages");
      return;
    }

    setSelected(value);
  };

  const HandleCompare = () => {
    if (selected.length !== 2) {
      toast.error("Please select 2 packages to compare");
      return;
    }

    setShowTable(true);
  };
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Select
          mode="multiple"
          allowClear
          maxCount={2}
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={handleChange}
          options={options}
          onKeyDown={(e) => {
            setKeyword((prev) => {
              if (e.key === "Backspace") {
                return prev.slice(0, -1);
              }
              return prev + e.key;
            });
          }}
          onBlur={() => {
            setKeyword("");
          }}
        />
        <Button
          loading={loading}
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
          }}
          type="primary"
          onClick={HandleCompare}
        >
          Compare
        </Button>
      </div>
    </>
  );
};

export default AutoCompleteInput2;
