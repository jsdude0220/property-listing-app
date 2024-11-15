import axios from "axios";
import { PropertyType } from "@/mock-api/type";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";
import Detail from "@/components/property/detail";

const PropertyDetails = ({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto py-10">
      <Detail id={id} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("/get/properties");
  const apiData: PropertyType[] = res.data;

  const paths = apiData.map((item: PropertyType) => ({
    params: { id: `${item.id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({
  params,
}: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id,
    },
  };
};

export default PropertyDetails;
