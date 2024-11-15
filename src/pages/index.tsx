import axios from "axios";
import { PropertyType } from "@/mock-api/type";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";
import { DataTable } from "@/components/property/table";
import { columns } from "@/components/property/columns";

const Properties = ({
  apiData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={apiData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("/get/properties");
  const apiData: PropertyType[] = res.data;

  return {
    props: {
      apiData,
    },
  };
};

export default Properties;
